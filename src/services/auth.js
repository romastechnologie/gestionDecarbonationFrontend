import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
export const useAuthStore = defineStore("auth", () => {
    const errors = ref({});
    const user = ref({});
    const isAuthenticated = ref(!!JwtService.getToken());
    function setAuth(authUser) {
        isAuthenticated.value = true;
        user.value = authUser.user;
        errors.value = {};
        formatRole(authUser.user);
        formatPrivilege(authUser.user);
        JwtService.saveUser(user.value.id.toString());
        JwtService.saveToken(authUser.token);
        JwtService.saveUserName(authUser.user.nom);
        JwtService.saveUserLastName(authUser.user.prenom);
        JwtService.saveUserPhone(authUser.user.telephone);
        JwtService.setUserEmail(authUser.user.email);
    }
    function formatPrivilege(user) {
        const privile = ref([]);
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
    function formatRole(user) {
        const rol = ref([]);
        if (user && user.userRoles) {
            user.userRoles.forEach(element => {
                if (element.role != null) {
                    rol.value.push(element.role.nom);
                }
            });
            JwtService.saveRole(JSON.stringify(rol.value));
        }
    }
    function setError(error) {
        errors.value = { ...error };
    }
    function purgeAuth() {
        isAuthenticated.value = false;
        user.value = {};
        errors.value = [];
        JwtService.destroyToken();
        JwtService.destroyUserPrivilege();
    }
    function login(credentials) {
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
    function register(credentials) {
        return ApiService.post("auth/register", credentials)
            .then(({ data }) => {
            setAuth(data);
        })
            .catch(({ response }) => {
            setError(response.data.errors);
        });
    }
    function forgotPassword(email) {
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
        }
        else {
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
//# sourceMappingURL=auth.js.map