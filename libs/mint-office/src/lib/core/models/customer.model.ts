export interface Customer {
    pfId: number;
    utAccountNo: string;
    accountName: string;
    jointIndicator: string;
    accountStatus: string;
    cifNumber: string;
    clientIdType: string;
    clientId: string;
    authorisedSignatories: string;
    accountList: [];
}

export interface CustomerSearchFields {
    fullName?: string;
    idNumber?: string;
    cifNumber?: string;
}

export interface CustomerAccount {
    utAccountNo: string;
    accountType: string;
    accountName: string;
    accountStatus: string;
}
