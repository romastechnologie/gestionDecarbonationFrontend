
export interface UsersObject {
    code: number;
    message: string;
    data: UserData[];
  }
  export  interface User {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    sexe: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    role: Role;
    userRoles?: UserRole[];
    setFieldValue: (field: string, value: any) => void;
  }

  export interface UserData {
    id: number;
    nom: string;
    description: string;
    createdAt?: string;
    userRoles?: UserRole[];
    users?:UserRole[];
  }
  
  export interface UserRole {
    roleId: number;
    role: Role;
  }

  export interface Role {
    id: number;
    nom: string;
    description: string;
    privileges: string[];
    createdAt: string;
    setFieldValue: (field: string, value: any) => void;
    
} 