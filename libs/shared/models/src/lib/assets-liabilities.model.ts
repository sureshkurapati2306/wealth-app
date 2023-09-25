export interface AccountSummaryRequest {
    bankId: string;
    branchId: string;
    govIssueIdentType: string;
}

export interface AsnbInquiry {
    rejectCode: string;
    rejectReason: string;
}

export interface AccountSummary {
    totalAsset: number;
    totalLiability: number;
    totalDeposits: number;
    totalInvestments: number;
    totalLoans: number;
    totalCredits: number;
    cifNumber: string;
    assetsPct: number;
    liabilitiesPct: number;
    myInvestmentPct: number;
    myDepositPct: number;
    myLoansPct: number;
    myCreditCardsPct: number;
    customerName: string;
    lastUpdated: string;
    assetLiabilities: AssetLiability[];
    utInvestmentsStatus: string;
    tdaStatus: string;
    sibsStatus: string;
    cardLinkStatus: string;
    islamicCreditCardStatus: string;
    asnbInquiryStatus: string;
    asnbInquiryCode: AsnbInquiry | null;
}

export interface AssetLiability {
    alcName: string;
    alDesc: string;
    alcSeq: number;
    alCode: string;
    alCategory: string;
    accountNumber?: string;
    accountStatus?: string;
    cardNumber?: string;
    amount: number;
    currencyCode?: string;
    investmentLastUpdated?: string;
    nextPaymentDueDate?: string;
    conversionAmt?: number;
}

export interface WealthPortfolio {
    name: string;
    amount: number;
    classHexa: string;
}

export interface WealthPortfolioBox {
    name: string;
    donutColor: string;
    items: AssetLiability[];
    status: boolean;
    casaAvailability: boolean;
    haveActiveCasa: boolean;
}

export interface RiskProfileRequest {
    custName?: string;
    custIdType?: string;
    custIdIssue?: string;
}

export interface RiskProfile {
    riskProfileStatus: string;
    rpResults: string;
    riskProfile: string;
    rpTnC: string;
    riskProfileDescription: string;
    expectedReturn: number;
    standardDeviation: string;
    lastUpdatedDate: string;
    expiryDate: string;
    rmManagerName: string;
    rmManagerId: string;
    recommendedProducts: any[];
}

export interface ASNBWhiteList {
    validateWhitelisted: boolean;
}
