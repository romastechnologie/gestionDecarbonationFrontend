export interface Document {

    id: number;
    type: string;
    arm: string;
    num: string;
    sic: string;
    otc: string;
    refotc: string;
    transit: string;
    idAtpTbt: string;
    refArmTbt: string;
    pec: string;
    pecLib: string;
    first: string;
    firstLib: string;
    last: string;
    lastLib: string;
    pod: string;
    podLib: string;
    lastpod: string;
    lastpodLib: string;
    fin: string;
    finLib: string;
    paysDest: string;
    paysDestLib: string;
    shipperCode: string;
    shipperType: string;
    shipperName: string;
    consigneeCode: string;
    consigneeType: string;
    consigneeName: string;
    notifyCode: string;
    notifyType: string;
    createdAt: string
    updatedAt: string
}