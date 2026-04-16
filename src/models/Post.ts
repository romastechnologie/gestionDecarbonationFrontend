export interface Post {
    id: number;
    libelle: string;
    updatedAt: string;
    deletedAt: string;
    setFieldValue: (field: string, value: any) => void;

}