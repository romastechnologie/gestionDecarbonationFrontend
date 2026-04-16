import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
import { arrow } from "@popperjs/core";

/*export interface User {
  nom?: string;
  prenoms?: string;
  email: string;
  password: string;
  telephone?: string;
  api_token?: string;
}*/

export interface Reposes {
  code: number;
  message: string;
  data: Data;
}
export interface Data {
  user: User;
  token: string;
  refreshToken: string;
}
// export interface User {
//   id: number;
//   nomComplet: string;
//   telephone: string;
//   sexe: string;
//   email: string;
//   password: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt?: any;
// }

export interface User {
  id: number
  nom: string
  prenom: string
  telephone: string
  sexe: string
  email: string
  createdAt: string
  updatedAt: string
  role: Role
  userRoles: UserRole[];
}

export interface UserRole {
  role: Role;
  roleId: number;
}
export interface Role {
  id: number
  nom: string
  description: string
  rolePermissions: RolePermission[]
}

export interface RolePermission {
  id: number
  permission?: Permission
}

export interface Permission {
  id: number
  nom: string
  description: string
}


export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());


  function setAuth(authUser: Data) {
    isAuthenticated.value = true;
    user.value = authUser.user;
    errors.value = {};
    formatRole(authUser.user)
    formatPrivilege(authUser.user)
    JwtService.saveUser(user.value.id.toString());
    JwtService.saveToken(authUser.token);
    JwtService.saveUserName(authUser.user.nom);
    JwtService.saveUserLastName(authUser.user.prenom);
    JwtService.saveUserPhone(authUser.user.telephone);
    JwtService.setUserEmail(authUser.user.email);
  }

  function formatPrivilege(user: User) {
      const privile = ref<Array<string>>([]);

      user.userRoles.forEach(userRole => {
          if (userRole.role && userRole.role.rolePermissions) {
              userRole.role.rolePermissions.forEach(element => {
                  if (element.permission != null) {
                      privile.value.push(element.permission.nom);
                  }
              });
          }
      });
      JwtService.savePrivilege(JSON.stringify(privile.value));
  } 

  function formatRole(user: User) {
    const rol = ref<Array<string>>([]);
    
    if (user && user.userRoles) {
        user.userRoles.forEach(element => {
            if (element.role != null) {
                rol.value.push(element.role.nom);
            }
        });
        
        JwtService.saveRole(JSON.stringify(rol.value));
    }
}

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
    JwtService.destroyUserPrivilege();
  }

  function login(credentials: User) {
    return ApiService.post("auth/login", credentials)
      .then(({ data }) => {
        setAuth(data.data);
      })
      .catch(({ response }) => {
        setError(response.data);
      });
  }

  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    return ApiService.post("auth/register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("auth/forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
    });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("auth/verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});