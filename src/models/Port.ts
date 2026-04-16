export interface Port {
    id: number;
    nomPort: string;
    locode: string;
    codePays: string;
    codePort: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    setFieldValue: (field: string, value: any) => void;

}