export interface ApiResponseBase {
    status: string;
    code: number;
    message: string;
}

export type RiskStatus = '' | 'L' | 'M' | 'HC' | 'HI';

export type TransactionStatus =
    | 'Successful'
    | 'Unsuccessful'
    | 'Pending'
    | 'Accepted For Processing';

export interface AsnbMember {
    name: string;
    membershipNumber: string;
    value: string;
}
export interface Fund {
    id: string;
    ubb?: number;
    ubc?: number;
    curency?: string;
    logo_code?: string;
    fund_name: string;
    total_units?: number;
    unit_balance?: number;
    current_value?: number;
    cash_investments?: number;
}

export interface ASNBFunds {
    fix_price: Fund[];
    variable_price?: Fund[];
}

export interface FundTabData extends AsnbMember {
    fundData: ASNBFunds;
}

export interface Investment {
    alcName: string;
    alcSeq: number;
    alDesc: string;
    alCode: string;
    alCategory: string;
    accountNumber: string;
    amount: number;
    currencyCode: string;
    investmentLastUpdated: string;
}

export interface CommonDropDown {
    id: string;
    value: string;
}

export interface HideTopUp {
    status?: boolean;
    message?: string;
}

export interface CartPurchaseSummary {
    name: string;
    category: string;
    total_bank_charge: string | number;
    total_net_investment_amount: string | number;
    total_amount: string | number;
    total_sales_charge: string | number;
}
export interface CartAccountDetails {
    name: string;
    asnb_membership_number: string | number;
    membership_id_type: string;
    id_number: string | number;
    relationship: string;
    reason: string;
}
export interface CartSource {
    source_of_funds: string;
    source_of_wealth: string;
}

export interface PastTransaction {
    transactionAmount: string;
    transactionDate: string;
    transactionType: string;
}
export interface PastTransactionResponse {
    transactionalDetail: Array<PastTransaction>;
    errorCode: string;
    errorMsg: string;
}

export interface PastTransactionMap {
    [key: string]: PastTransactionResponse;
}

export interface ASNBLinkAccount {
    accountLinked: boolean;
}
export interface AsnbFund {
    blockedUnits: number;
    certUnits: number;
    eligibleLoanUnits: number;
    epfUnits: number;
    fundId: string;
    loanUnits: number;
    nav: number;
    provisionalUnits: number;
    totalUnits: number;
    ubbUnits: number;
    ubcUnits: number;
    uhAccountStatus: string;
    uhHoldings: number;
    unitBalance: number;
}

export interface FundDetails {
    fix_price?: AsnbFund[];
    variable_price?: AsnbFund[];
}

export interface AsnbOverview {
    name: string;
    uhId: string;
    currentInvestment: number;
    lastUpdateDate: string;
}

export interface AsnbSubheaderContent {
    title: string;
    description: string;
    goToWealthDashboardText: string;
    lastUpdate?: string;
}

export interface AsnbApiResponse extends ApiResponseBase {
    data: boolean;
}

export interface AsnbRiskStatusApiResponse extends ApiResponseBase {
    data: RiskStatus;
}

export type FundType = 'fixed price' | 'variable price';

export interface AsnbCheckout {
    investmentType: string;
    stageTableId: string;
    guardianDetails: {
        unitHolderId: string;
        name: string;
    };
    minorDetails?: {
        unitHolderId: string;
        name: string;
    };
    favouriteDetails?: {
        unitHolderId: string;
        reasonOfTransfer: string;
        reasonOfTransferValue: string;
    };
    fundId: string;
    fundName: string;
    fundType: FundType | null;
    amount: number | null;
    sof?: {
        id: string;
        value: string;
    };
    sow?: {
        id: string;
        value: string;
    };
    bankCharge: number;
    salesCharge: string | null;
    salesChargePercentage: string | null;
    total: number;
    transactionStatus: string;
    timeStamp: string;
    identificationNumber: string;
    unitsAlloted: number | null;
    navPrice: number | null;
    transactionId: string;
    bankAccountNumber: string;
    asnbReferenceNo: string | null;
    errorCode?: string;
    errorMessage?: string;
}

export interface AsnbCheckAccountLinkResponse {
    link: boolean;
    delink: boolean;
}

export interface AsnbCardDetail {
    label: string;
    value: string;
}

export interface FetchStatus {
    status: 'loading' | 'success' | 'error';
    error: string;
}

export interface FundDetail {
    id: string;
    name: string;
    type: FundType | null;
}

export interface SummaryInvoiceItem {
    name: string;
    amount: number | string;
    decimalFormat: string;
    hideCurrency?: boolean;
    isNotAvailable?: boolean;
}

export interface AsnbCreateOrderRequest {
    guardianDetails: {
        unitHolderId: string;
        name: string;
    };
    minorDetails?: {
        unitHolderId: string;
        name: string;
    };
    favouriteDetails?: {
        unitHolderId: string;
        reasonOfTransfer: string;
    };
    amount: number;
    fundId: string;
    sof?: string;
    sow?: string;
    investmentType: string;
}

export interface AsnbCreateOrderResponse {
    stageTableId: string;
    amount: number;
    bankCharge: number;
    total: number;
}

export interface AsnbCreateSubscriptionRequest {
    stageTableId: string;
    otp: string;
    bankAccountNumber: string;
    transactionId: string;
    acctType: string;
    bankId: number;
}

export interface AsnbCreateSubscriptionResponse extends ApiResponseBase {
    data: {
        transactionStatus: string;
        timeStamp: string;
        identificationNumber: string;
        unitsAlloted: number;
        navPrice: number;
        transactionId: string;
        asnbReferenceNo: string;
        errorCode?: string;
        netInvestment: number;
        salesCharge: string;
        totalInvestment: number;
        feePct: string;
    };
    error?: any;
}
export interface FundMapDetail {
    fundId: string;
    fundShortName: string;
    paramText: string;
    fundType: string;
}

export interface AsnbTransactionLimit {
    currentLimit: number;
    maxLimit: number;
}

export interface AsnbOtp {
    message: string;
    transactionId: string;
}

export interface ScheduledMaintenance {
    dataPresent: string;
    startTime: string;
    startDate: string;
    endTime: string;
    endDate: string;
}
export interface ASNBScheduledDowntimeInfo {
    scheduledMaintenance: ScheduledMaintenance;
    maintenanceStartTime: string;
    maintenanceEndTime: string;
    hasScheduledMaintenance: boolean;
}

export interface AsnbAccountListingRequest {
    stageTableId: string;
}

export interface AsnbAccountListingResponse {
    accounts: {
        name: string;
        casa_account_no: string;
        account_status: string;
        casa_account_balance: number;
        casa_account_format: string;
        isSufficientAmount: boolean;
        bankId: number;
        acctType: string;
    };
}
export interface RedirectionInfo {
    url: string;
}

export interface AsnbLookupParamApiResponse {
    SOURCEOFFUND: Array<{ paramValue: string; paramText: string }>;
}

export interface AsnbSofSow {
    id: string;
    value: string;
}

export interface AsnbFundListing {
    amount: string | number;
    fundCode: string;
    fundId: string | number;
    fundShortName: string;
    fundLongName: string;
    fundStatus: string;
    fundType: string;
}

export interface AsnbInquiry {
    agentCode: string;
    bankAccountDuplication: string;
    bankAccountVerified: string;
    bankCustPhoneNumber: string | null;
    bankTxnReferenceNumber: string;
    branchCode: string;
    channelType: string;
    deviceOwner: string;
    firstName: string;
    fundDetail: AsnbInquiryFundDetail[];
    grandTotalBlockedUnits: number;
    grandTotalCertUnits: number;
    grandTotalEpfUnits: number;
    grandTotalLoanUnits: number;
    grandTotalProvisionAlUnits: number;
    grandTotalUhHoldings: number;
    grandTotalUnitBalance: number;
    grandTotalUnits: number;
    identificationNumber: string;
    identificationType: string;
    inquiryCode: string;
    investorFlag: string;
    lastUpdateDate: string;
    mobileNumberDuplication: string;
    omniSverifiCationDue: string;
    participateinasnbmkt: string;
    purposeOfInvestment: string;
    requestOridentification: string;
    riskProfile: string;
    totalMinorAccount: number;
    transactionChannel: string;
    transactionDate: string;
    transactionStatus: string;
    transactionTime: string | null;
    typeClosed: string;
    unitHolderId: string;
    fundId: string;
    filtrationFlag: string;
    guardianId: string;
    guardianIcType: string;
    guardianIcNumber: string;
    rejectCode: string;
    rejectReason: string;
    occupationCategory: string;
    minorDetail: AsnbInquiryMinorDetail[];
}

interface AsnbInquiryFundDetail {
    blockedUnits: number;
    certUnits: number;
    eligibleLoanUnits: number | string;
    epfUnits: number;
    fundId: string;
    loanUnits: number;
    nav: number;
    provisionalUnits: number;
    totalUnits: number;
    ubbUnits: number;
    ubcUnits: number | string;
    uhAccountStatus: string;
    uhHoldings: number;
    unitBalance: number;
}

interface AsnbInquiryMinorDetail {
    adam50: number;
    icno: string;
    icnoType: string;
    name: string;
    uhid: string;
}

export interface OperationHourResponse {
    startTime: string;
    endTime: string;
}

export interface UrlMaintenanceApiResponse {
    urlCode: string;
    urlDesc: string;
}

export interface AsnbIdTypeApiResponse {
    idType: string;
    description: string;
}

export interface AsnbRelationshipApiResponse {
    THIRDPARTYRELATIONSHIP: Array<{ paramValue: string; paramText: string }>;
}

export interface AsnbIdType {
    id: string;
    value: string;
}

export interface AsnbRelationship {
    id: string;
    value: string;
}

export interface AsnbValidateFavouriteApiRequest {
    nickname: string;
    beneAsnbFundCode: string;
    beneIdType: string;
    relationship: string;
    beneAsnbAcctNo: string;
    beneIdNo: string;
}

interface AsnbValidateFavouriteApiSuccessResponse {
    stageID: string;
}
export interface AsnbSaveFavouriteApiRequest {
    stageTableId: string;
    otp: string;
    transactionId: string;
}

export interface AsnbSaveFavouriteApiResponse extends ApiResponseBase {
    error: string;
    data: AsnbFavouriteSummary;
}

export interface AsnbValidateFavouriteApiErrorResponse {
    rejectCode: string | null;
    rejectReason: string;
    field: string | null;
}

export interface AsnbValidateFavouriteApiResponse extends ApiResponseBase {
    data: Array<AsnbValidateFavouriteApiSuccessResponse | AsnbValidateFavouriteApiErrorResponse>;
}

export interface AsnbAddFavourite {
    nickname: string;
    membershipNumber: string;
    fundCode: string;
    idType: string;
    idNumber: string;
    relationship: string;
    stageId: string;
    transactionId: string;
    timestamp: string;
}

export interface AsnbFavouriteSummary {
    transactionId: string;
    date: string;
    nickName: string;
    beneClientName: string;
    beneClientId: string;
    beneClientIdType: string;
    beneAsnbAccountNo: string;
    relationship: string;
    transStatus: string;
}

export interface AsnbFavourite {
    no: number;
    nickname: string;
    beneName: string;
    fundCode: string;
    fundDesc: string;
    beneClientId: string;
    relationship: string;
    memberIdType: string;
    asnbAccountNo: string;
    transId: string;
}

export interface AsnbPurchaseFavouriteSummary {
    beneName: string;
    beneClientId: string;
    relationship: string;
    memberIdType: string;
    asnbAccountNo: string;
    transId: string;
}

export interface AsnbFavouriteList {
    asnbFavouriteDetails: AsnbFavourite[];
    totalAsnbFavourites: number;
    totalPages: number;
}

export interface FavouriteOptions {
    action: string;
    description: string;
}

export interface AsnbFavouriteApiResponse extends ApiResponseBase {
    data: AsnbFavouriteList;
}
export interface AsnbLookupParamApiTransferReasonResponse {
    REASONFORTRANSFER: Array<{ paramValue: string; paramText: string }>;
}

export interface AsnbTransactionStatusMembershipDetail {
    label: string;
    value: string;
}

export interface AsnbRejectCodeMapping {
    rejectCode: string;
    descriptionTechnical: string;
    displayMessageEng: string;
    displayMessageBm: string;
}

export interface AsnbRemoveFavouriteRequest {
    transId: string;
}

export interface AsnbRemoveFavouriteResponse extends ApiResponseBase {
    data: string;
}
export interface AsnbFundType {
    fundId: number;
    fundCode: string;
    fundShortName: string;
    fundLongName: string;
    fundType: string;
    fundStatus: string;
    amount: number;
}

export interface AsnbFundTypeMaps {
    [key: string]: AsnbFundType;
}

export interface AsnbEligibleFunds {
    eligibleFunds: Array<string>;
    rejectCode?: string;
    rejectMessage?: string;
}

export interface AsnbCashTransactionRequest {
    fundId: string;
    unitHolderId?: string;
}
