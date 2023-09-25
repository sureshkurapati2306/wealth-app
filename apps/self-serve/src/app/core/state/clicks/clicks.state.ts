export interface ClicksState {
    cifNumber: string;
    customerIDNumber: string;
    customerIDType: string;
    debitCardNumber: string;
    customerIDTypeDesc: string;
    customerType?: string;
    ipAddress: string;
    accountStatus?: string;
}

export const initialState: ClicksState = {
    cifNumber: null,
    customerIDNumber: null,
    customerIDType: null,
    debitCardNumber: null,
    customerIDTypeDesc: null,
    customerType: null,
    ipAddress: null,
    accountStatus:null
};
