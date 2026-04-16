export interface Privilege {

    id: number
    code: string
    libelle: string
    description: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    setFieldValue: (field: string, value: any) => void;
    
}