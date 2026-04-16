export interface Equipage {

    id: number;
    crewNumber: string;
    familyName: string;
    givenNames: string;
    rankRating: string;
    nationality: string;
    dateBirth: string;
    placeBirth: string;
    documentType: string;
    documentNumber: string;
    documentIssuePlace: string;
    documentIssueDate: Date;
    documentExpiryDate: Date;
    embarkationDate: Date;
    embarkationPort: string;
    createdAt: string;
    updatedAt: string;
    setFieldValue: (field: string, value: any) => void;

}