export interface RoleObject {
    code: number;
    message: string;
    data: RoleData[];
  }
export interface RoleData {
    id: number;
    nom: string;
    description: string;
    createdAt?: string;
    rolePermissions?: RolePermission[];
    users?:UserRole[];
  }

  export interface RolePermission {
    permissionId: number;
    permission: Permission;
  }

 export interface Permission {
    id:number,
    nom: string;
    description: string;
  }

 export interface Role {
    id: number;
    nom: string;
    description: string;
    privileges: string[];
    createdAt: string;
    setFieldValue: (field: string, value: any) => void;
    
} 

export interface UserRole {
    id: number;
    nomComplet: string;
    telephone: string;
    sexe: string;
    email: string;
    createdAt: string;
  }