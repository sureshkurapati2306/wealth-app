import { reducer, initialState, State } from './wealth-dashboard.reducer';
import { AccountSummary, RiskProfile, Setting } from '@cimb/shared/models';
import * as Actions from './wealth-dashboard.actions';
import { ASNBDowntimeMaintenance } from '../../../modules/asnb/mocks/data';

const accountSummaryMockData: AccountSummary = {
    totalAsset: 31231.1,
    totalLiability: 54353.09,
    totalDeposits: 2500,
    totalInvestments: 2500,
    totalLoans: 2500,
    totalCredits: 2500,
    cifNumber: '10110000120648',
    assetsPct: 55.2,
    liabilitiesPct: 44.8,
    myInvestmentPct: 4.4,
    myDepositPct: 95.6,
    myLoansPct: 96.8,
    myCreditCardsPct: 3.2,
    customerName: 'John Doe',
    lastUpdated: '2022-03-17T11:31:19.627852',
    utInvestmentsStatus: 'Success',
    tdaStatus: 'Success',
    sibsStatus: 'Success',
    cardLinkStatus: 'Success',
    islamicCreditCardStatus: 'Success',
    asnbInquiryCode: null,
    asnbInquiryStatus: '',
    assetLiabilities: [
        {
            alcName: 'My Saving Account',
            alDesc: 'SA PASSBOOK',
            alcSeq: 2,
            alCode: 'SDA',
            alCategory: 'Assets',
            accountNumber: '0000000007023039873',
            cardNumber: null,
            amount: 3416.91,
            currencyCode: 'MYR',
            investmentLastUpdated: null,
            nextPaymentDueDate: null,
        },
        {
            alcName: 'My Deposit',
            alDesc: 'CA FLEXI',
            alcSeq: 2,
            alCode: 'CDA',
            alCategory: 'Assets',
            accountNumber: '0000000008004321188',
            cardNumber: null,
            amount: 54817.11,
            currencyCode: 'MYR',
            investmentLastUpdated: null,
            nextPaymentDueDate: null,
        },
        {
            alcName: 'My Loans/Financing',
            alDesc: 'BIZ FLEXI',
            alcSeq: 1,
            alCode: 'ILA',
            alCategory: 'Liabilities',
            accountNumber: '0000000008004321188',
            cardNumber: null,
            amount: 74275.77,
            currencyCode: 'MYR',
            investmentLastUpdated: null,
            nextPaymentDueDate: '2020-06-01',
        },
        {
            alcName: 'My Credit Cards',
            alDesc: 'CIMB Cash Rebate Platinum MasterCard',
            alcSeq: 2,
            alCode: 'CCA',
            alCategory: 'Liabilities',
            accountNumber: null,
            cardNumber: '5521154096000983',
            amount: 2460.0,
            currencyCode: null,
            investmentLastUpdated: null,
            nextPaymentDueDate: null,
        },
    ],
};

const riskrofileMockData: RiskProfile = {
    riskProfileStatus: 'VALID',
    rpResults: '-',
    riskProfile: 'Balanced',
    rpTnC: '-',
    riskProfileDescription:
        'BALANCED - You are concerned about the effect of erosion of real value of wealth caused by inflation on wealth accumulation and seek to establish security',
    expectedReturn: 6.047999999999999,
    standardDeviation: '10.368553989683456',
    lastUpdatedDate: '26-Sep-2019',
    expiryDate: '26-Dec-2027',
    rmManagerName: 'ADMIN',
    rmManagerId: 'ADMIN1',
    recommendedProducts: [
        {
            fundName: 'CIMB-PRINCIPAL US FUTURE GOALS FUND',
            fundCode: 'CBT45A',
            currency: 'MYR',
            fundRiskProfile: 'Growth',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 5,
            riskProfile: '4',
        },
        {
            fundName: 'Issuer Date Test289',
            fundCode: 'IssuerDateTest289',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Amanah Saham Nasional Equity 2',
            fundCode: 'ASNE2',
            currency: 'MYR',
            fundRiskProfile: 'Aggressive',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '5',
        },
        {
            fundName: 'CIMB-PRINCIPAL BALANCED FUND',
            fundCode: 'CBT03A',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 4,
            riskProfile: '3',
        },
        {
            fundName:
                'SP SIMEKL-9 - Non-Principal Protected Autocallable Equity Linked Structured Product #',
            fundCode: '11440',
            currency: 'MYR',
            fundRiskProfile: 'Aggressive',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '5',
        },
        {
            fundName: 'General Investment Account-i 3 MONTH',
            fundCode: 'GIMGIA0001_MYR_3',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'General Investment Account-i 6 MONTH',
            fundCode: 'GIMGIA0001_MYR_6',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Amanah Saham Nasional Equity 3',
            fundCode: 'ASNE03',
            currency: 'MYR',
            fundRiskProfile: 'Aggressive',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '5',
        },
        {
            fundName: 'TERM INVESTMENT ACCOUNT-I 1 MONTH',
            fundCode: 'TIACCI0001_MYR_1',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'TERM INVESTMENT ACCOUNT-I 2 MONTHS',
            fundCode: 'TIACCI0001_MYR_2',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'TERM INVESTMENT ACCOUNT-I 3 MONTHS',
            fundCode: 'TIACCI0001_MYR_3',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Affin Hwang Select SGD Income Fund (SGD Class)',
            fundCode: 'HDU37D',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
        {
            fundName: 'PBB NIT-1 SECURITIES (2)',
            fundCode: 'PBB002',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Amanah Saham Nasional  Sara 1',
            fundCode: 'ASNS1',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Amanah Saham Nasional Sara 2',
            fundCode: 'ASNS2',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'TestTIA123',
            fundCode: 'TestTIA123_MYR_2',
            currency: 'MYR',
            fundRiskProfile: '',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '',
        },
        {
            fundName: 'GCIFXRUSH01',
            fundCode: 'v',
            currency: 'MYR',
            fundRiskProfile: 'Defensive',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '1',
        },
        {
            fundName: 'GCIFXRUSH02',
            fundCode: 'GCIFXRUSH02',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'TestProductLay123',
            fundCode: 'TestProductLay123',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
        {
            fundName: 'DCITestlay678',
            fundCode: 'DCITestlay678',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
        {
            fundName: 'TestGCI123',
            fundCode: 'TestGCI123',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'DCITest789',
            fundCode: 'DCITest789',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
        {
            fundName: 'AlternativeTest234',
            fundCode: 'AlternativeTest234',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
    ],
};

const settingsMockData: Setting[] = [
    {
        description: "Show 'add new investment' button at investment dashboard",
        enabled: false,
        utSettingId: '001',
        utSettingGroupId: '01',
    },
    {
        description:
            "Enable 'add to cart' button for topup under my holdings at investment dashboad",
        enabled: true,
        utSettingId: '002',
        utSettingGroupId: '01',
    },
    {
        description: "Enable 'add to cart' button for purchase at fund detail page",
        enabled: true,
        utSettingId: '003',
        utSettingGroupId: '01',
    },
    {
        description: "Enable 'add to cart' button for topup at fund detail page",
        enabled: true,
        utSettingId: '004',
        utSettingGroupId: '01',
    },
    {
        description: 'Allow purchase transaction in the cart',
        enabled: true,
        utSettingId: '005',
        utSettingGroupId: '01',
    },
    {
        description: "Show 'redeem radio' button at the investment dashboard",
        enabled: true,
        utSettingId: '006',
        utSettingGroupId: '02',
    },
    {
        description: "Show 'redeem radio' button at the fund details",
        enabled: true,
        utSettingId: '007',
        utSettingGroupId: '02',
    },
    {
        description: 'Allow redeem transaction in the cart',
        enabled: true,
        utSettingId: '008',
        utSettingGroupId: '02',
    },
    {
        description: "Show 'switch radio' button at the investment dashboard",
        enabled: true,
        utSettingId: '009',
        utSettingGroupId: '03',
    },
    {
        description: "Show 'switch radio' button at the fund details",
        enabled: true,
        utSettingId: '010',
        utSettingGroupId: '03',
    },
    {
        description: 'Allow switching transaction in the cart',
        enabled: true,
        utSettingId: '011',
        utSettingGroupId: '03',
    },
    {
        description: "Show 'Redo Risk Profiling' link button at investment dashboard",
        enabled: true,
        utSettingId: '012',
        utSettingGroupId: '04',
    },
    {
        description: "Show 'Learn more' link button at investment dashboard",
        enabled: true,
        utSettingId: '013',
        utSettingGroupId: '04',
    },
];

const mockASNBDowntimeScheduledMaintenance: any = ASNBDowntimeMaintenance;

const mockState: State = {
    riskProfile: riskrofileMockData,
    accountSummary: accountSummaryMockData,
    status: 'pending',
    error: '',
    settings: settingsMockData,
    compositeAccSummaryCalled: false,
    riskprofileEnquiryCalled: false,
    utAccount: null,
    casaIndicator: '',
    asnbWhiteListed: false,
    asnbLinkAccountEnquiryCalled: false,
    asnbAccountExist: false,
    asnbWhiteListEnquiryCalled: false,
    userAccountStatus: false,
    ASNBDowntimeScheduledMaintenance: mockASNBDowntimeScheduledMaintenance,
};

describe('WealthDashboard Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as any;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});

describe('loadAccountSummary action', () => {
    it('should start to load data from API', () => {
        const action = Actions.loadAccountSummary({
            data: {
                bankId: '',
                branchId: '',
                govIssueIdentType: 'New IC',
            },
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('loading');
    });
});

describe('loadAccountSummarySuccess action', () => {
    it('should successfully load data from API', () => {
        const action = Actions.loadAccountSummarySuccess({
            data: mockState.accountSummary,
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.accountSummary).toEqual(accountSummaryMockData);
    });
});

describe('loadAccountSummaryFailure action', () => {
    it('should failed to load data from API', () => {
        const action = Actions.loadAccountSummaryFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.error).toEqual('The error message');
    });

    describe('riskProfileEnquiry action', () => {
        it('should start to load data from API', () => {
            const action = Actions.riskProfileEnquiry({
                data: {
                    custName: 'CEFRR ESOTVU EUM LPLCUU',
                    custIdType: '',
                    custIdIssue: '',
                },
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('loading');
        });
    });

    describe('riskProfileEnquirySuccess action', () => {
        it('should successfully load data from API', () => {
            const action = Actions.riskProfileEnquirySuccess({
                data: mockState.riskProfile,
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('success');
            expect(result.riskProfile).toEqual(riskrofileMockData);
        });
    });

    describe('riskProfileEnquiryFailure action', () => {
        it('should failed to load data from API', () => {
            const action = Actions.riskProfileEnquiryFailure({
                error: 'The error message',
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('error');
            expect(result.error).toEqual('The error message');
        });
    });

    describe('asnbWhiteListEnquiry', () => {
        it('should start to load data from API', () => {
            const action = Actions.asnbWhiteListEnquiry();

            const result = reducer(initialState, action);

            expect(result.status).toEqual('loading');
        });
    });

    describe('asnbWhiteListEnquirySuccess', () => {
        it('should successfully load data from API', () => {
            const action = Actions.asnbWhiteListEnquirySuccess({
                data: {
                    validateWhitelisted: mockState.asnbWhiteListed,
                },
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('success');
            expect(result.asnbWhiteListed).toEqual(mockState.asnbWhiteListed);
        });
    });

    describe('asnbWhiteListEnquiryFailure', () => {
        it('should failed to load data from API', () => {
            const action = Actions.asnbWhiteListEnquiryFailure({
                error: 'The error message',
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('error');
            expect(result.error).toEqual('The error message');
        });
    });

    describe('asnbLinkAccountEnquiry', () => {
        it('should start to load data from API', () => {
            const action = Actions.asnbLinkAccountEnquiry();

            const result = reducer(initialState, action);

            expect(result.status).toEqual('loading');
        });
    });

    describe('asnbLinkAccountEnquirySuccess', () => {
        it('should successfully load data from API', () => {
            const action = Actions.asnbLinkAccountEnquirySuccess({
                data: {
                    accountExist: mockState.asnbAccountExist,
                },
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('success');
            expect(result.asnbAccountExist).toEqual(mockState.asnbAccountExist);
        });
    });

    describe('asnbLinkAccountEnquiryFailure', () => {
        it('should failed to load data from API', () => {
            const action = Actions.asnbLinkAccountEnquiryFailure();

            const result = reducer(initialState, action);

            expect(result.status).toEqual('error');
            expect(result.error).toEqual('');
        });
    });

    describe('loadAsnbUserAccountStatus', () => {
        it('should start to load data from API', () => {
            const action = Actions.loadAsnbUserAccountStatus();

            const result = reducer(initialState, action);

            expect(result.status).toEqual('loading');
        });
    });

    describe('loadAsnbUserAccountStatusSuccess', () => {
        it('should successfully load data from API', () => {
            const action = Actions.loadAsnbUserAccountStatusSuccess({
                payload: {
                    status: 'success',
                    code: 200,
                    message: 'Success',
                    data: true,
                },
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('success');
            expect(result.userAccountStatus).toEqual(true);
        });
    });

    describe('loadAsnbUserAccountStatusFailure', () => {
        it('should failed to load data from API', () => {
            const action = Actions.loadAsnbUserAccountStatusFailure({
                error: 'The error message',
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('error');
            expect(result.error).toEqual('The error message');
        });
    });

    describe('resetAsnbAccountAfterDelink', () => {
        it('should reset asnbAccountExist to false', () => {
            const action = Actions.resetAsnbAccountAfterDelink();

            const result = reducer(initialState, action);

            expect(result.asnbAccountExist).toEqual(false);
        });
    });

    describe('ASNB Scheduled Maintenance', () => {
        it('should get ASNB Downtime Maintenance on success path', () => {
            const action = Actions.WDLoadScheduledMaintenanceSuccess({
                payload: mockState.ASNBDowntimeScheduledMaintenance,
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('success');
            expect(result.ASNBDowntimeScheduledMaintenance).toBe(mockASNBDowntimeScheduledMaintenance);
        });

        it('should get ASNB Downtime Maintenance on failed path', () => {
            const action = Actions.WDLoadScheduledMaintenanceFailure({
                error: 'The error message',
            });

            const result = reducer(initialState, action);

            expect(result.status).toEqual('error');
            expect(result.ASNBDowntimeScheduledMaintenance).toBeFalsy();
            expect(result.error).toEqual('The error message');
        });
    })
});
