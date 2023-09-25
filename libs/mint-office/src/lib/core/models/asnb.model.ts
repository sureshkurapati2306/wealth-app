export interface FundSuspensionTable {
    fsId: number;
    asnbFundId: string;
    suspensionReason: string;
    noticeReason: string | null;
    startDate: string;
    endDate: string;
}

export interface FundLibraryTable {
    fundId: number;
    fundCode: string;
    paramText: string;
    fundType: string;
    amount: number;
}

export interface UrlMaintenanceTable {
    id: number;
    shortCode: string;
    label: string;
    link: string;
}

interface UrlMaintenanceApiBase {
    urlCode: string;
    urlDesc: string;
}

export interface UrlMaintenanceApiRequest extends UrlMaintenanceApiBase {
    urlId?: number;
    urlTitle: string;
}

export interface UrlMaintenanceApiResponse extends UrlMaintenanceApiBase {
    urlId: number;
    urlTitle: string | null;
}

export interface FilterDropdown {
    value: string;
    viewValue: string;
}

export interface AsnbSearchFields {
    startDate?: string;
    endDate?: string;
    status?: string;
    action?: string[];
    customerId?: string;
    customerName?: string;
}

export interface SearchAccountLink {
    startDate?: string;
    endDate?: string;
    isAsnbAccountLink?: boolean | null;
    customerId?: string;
    customerName?: string;
}

export interface TransactionReportItem {
    tId: string;
    transactionDate: string;
    bankRefNo: string;
    asnbRefNo: string;
    customerName: string;
    customerId: string;
    action: string;
    fundName: string;
    status: string;
}

export interface AsnbTransactionItem {
    asnbInvestmentType: string;
    chargesAmount: number;
    clientAsnbAccountNo: string;
    clientId: string;
    clientIdType: string;
    clientIdTypeDesc: string;
    clientName: string;
    fundName: string | null;
    minorAsnbAccountNo: string;
    minorName: string;
    netInvestmentAmount: number;
    phoneNo: string | null;
    remarks: string;
    salesCharge: number;
    salesPercentage: number;
    seqNo: number;
    settlementAccount: string | null;
    thirdPartyAsnbAccountNo: string;
    thirdPartyNickname: string;
    totalInvestment: number;
    transId: number;
    transactionDatetime: string;
    transactionStatus: string;
    transactionType: string;
    txnNum: string;
    fundType: string;
}

export interface AsnbSearchLinkAccount {
    startDate?: string;
    endDate?: string;
    status?: string;
    isAsnbAccountLink?: boolean | null;
    customerId?: string;
    customerName?: string;
}

export interface AsnbLinkAccountSearchFields {
    startDate?: Date;
    endDate?: Date;
    action?: string[];
    customerId?: string;
    customerName?: string;
}

export interface AsnbLinkAccountResponse {
    linkDelinkReportDetails: {
        id: number;
        transactionDateAndTime: string;
        isAsnbAccountLink: boolean;
        customerName: string;
        customerId: number;
        membershipNumber: string;
        membershipIdTypeDesc: string;
    };
}

export interface AsnbLinkAccountItem {
    linkAccountDatetime: string;
    linkAccountAction: string;
    clientName: string;
    clientId: string;
    clientAsnbAccountNo: string;
    clientAsnbAccountType: string;
}

export interface AsnbSearchFavourite {
    startDate?: string;
    endDate?: string;
    status?: string;
    action?: string;
    customerId?: string;
    customerName?: string;
}

export interface AsnbFavouriteResponse {
    asnbAcctNo: number;
    beneAsnbAcctNo: number;
    beneClientId: number;
    beneClientIdType: string;
    beneClientName: string;
    clientId: number;
    clientIdType: string;
    clientIdTypeDesc: string;
    clientName: string;
    fundName: string;
    nickname: string;
    phoneNo: string;
    relationship: string;
    remarks: string;
    seqNo: number;
    transId: number;
    transactionDatetime: string;
    transactionStatus: string;
    transactionType: string;
}
