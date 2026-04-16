export interface TableauImdgPortuaire {
    id: number;
    classeIMDG: string;
    exempleMarchandise: string;
    unNumber: string;
    codeHS: string;
    mesurePortuaire: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    setFieldValue: (field: string, value: any) => void;

}