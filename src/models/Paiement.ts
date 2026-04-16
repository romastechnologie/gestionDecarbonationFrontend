export interface Paiement {
    id: number;
    montant: number;
    datePaiement: string;
    modePaiement: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    setFieldValue: (field: string, value: any) => void;
}
