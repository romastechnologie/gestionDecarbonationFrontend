import type { Role } from "./Role";

export interface RoleObject {
    code: number;
    message: string;
    data: PermissionData[];
  }
export interface PermissionData {
    id: number;
    nom: string;
    description: string;
    createdAt?: string;
    rolePermissions?: RolePermission[];
}

export interface RolePermission {
    roleId: number;
    role: Role;
}

export interface Permission {
    id:number;
    nom: string;
    description: string;
    createdAt:string;
    setFieldValue: (field: string, value: any) => void;
}