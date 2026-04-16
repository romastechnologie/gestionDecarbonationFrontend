export interface PortARisk {
    id: number;
    region: string;
    nomPort: string;
    country: string;
    un_Locode: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    setFieldValue: (field: string, value: any) => void;

}