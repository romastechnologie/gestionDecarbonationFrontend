export interface CatagorieHsCode {
    id: number;
    code: string;
    product: string;
    productfr: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    setFieldValue: (field: string, value: any) => void;

}