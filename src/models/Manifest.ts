export interface Manifest {
    id: number;
    sicReference: string;
    afret: string;
    afretLib: string;
    courtier: string;
    courtierLib: string;
    rtsm: string;
    rtsmLib: string;
    rtem: string;
    rtemLib: string;
    navireNom: string;
    navireLloyd: string;
    eta: Date;
    etd: Date;
    isGeneratingQuitus: boolean;
    quitusFilePath: string;
    factureFilePath: string;
    createdAt: string
    updatedAt: string
    deletedAt: string 
}