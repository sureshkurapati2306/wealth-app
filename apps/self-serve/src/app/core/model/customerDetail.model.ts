export interface CustomerDetail {
    bankAccounts: BankAccount[];
    branchCode: null;
    accountRelation: null;
    birthDate: string;
    profession: null;
    idNo: string;
    idType: string;
    idTypeCode: string;
    idCntyIssued: string;
    name: string;
    cntyCitizenship: string;
    addresses: Address[];
    prStatus: null;
    customerId: null;
    staffIndicator: string;
    homePhone: null;
    nationality: string;
    accountStatus: null;
    cardNum: null;
    gender: string;
    race: string;
    maritalStatus: string;
    religion: null;
    email: string;
    cifNo: string;
    clientGroup: string;
    occupation: string;
}

export interface BankAccount {
    accountType: string;
    accountNumber: string;
    settlementAcctType: string;
    signingCondition: string;
    resStatus: string;
    staffInd: string;
    curCode: null;
    branchId: number;
    joint_indicator: string;
    casa_account_format: string;
    casa_account_name: string;
    account_status: string;
    casa_account_balance: number;
    isActive?: boolean;
    name: string;
    casa_account_no: string;
    isSufficientAmount: boolean;
}

export interface Address {
    addressType: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    state: string;
    country: string;
    postcode: string;
}
