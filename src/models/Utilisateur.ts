export interface Utilisateur {

    id: number
    nom: string
    prenoms: string
    email: string
    sexe: string
    identifiant: string
    password: string
    estAgent: boolean
    createdAt: string
    updatedAt: string
    deletedAt: any
    setFieldValue: (field: string, value: any) => void;
    
}
