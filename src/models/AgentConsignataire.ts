export interface AgentConsignataire {
    id: number;
    agentConsignataire: string;
    codeGruce: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    setFieldValue: (field: string, value: any) => void;

}