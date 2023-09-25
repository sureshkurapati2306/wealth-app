import { Action } from '@ngrx/store';
import {
    ASNBDowntimeMaintenance,
    accountData,
    bankAccounts,
    cartSummary,
    asnbFavouriteDetails,
} from '../mocks/data';

import * as AsnbActions from './asnb.actions';
import {
    State,
    getCheckoutAmount,
    getCheckoutErrorCodeState,
    getSalesChargeAndPercentage,
    getUnitsAllottedAndNavPrice,
    initialState,
    reducer,
} from './asnb.reducer';
import { pnbAPIInquiryRequestParam, mockPastTransactions } from '../mocks/data';
import {
    formatMinorDetails,
    getFundOverview,
    getOwnerDetails,
    groupFundListByFundId,
} from '../utils';
import { AsnbEligibleFunds, AsnbMember } from '../models';

const mockCheckoutBankData: any = bankAccounts;
const mockCheckoutPurchaseData: any = cartSummary;
const mockCheckoutUserData: any = accountData;
const mockCheckoutSOWSOF: any = accountData;
const mockASNBDowntimeScheduledMaintenance: any = ASNBDowntimeMaintenance;

const mockState: State = {
    checkoutBankAccount: mockCheckoutBankData,
    checkoutPurchaseSummary: mockCheckoutPurchaseData,
    checkoutUserData: mockCheckoutUserData,
    checkoutSOWSOF: mockCheckoutSOWSOF,
    asnbTopUp: {
        fundName: null,
        amount: null,
        fundId: null,
    },
    pastTransaction: {},
    status: 'pending',
    error: '',
    fundTypesMap: null,
    fundTypeIds: [],
    fundDetail: null,
    memberList: [
        {
            membershipNumber: '000000061932',
            name: 'XXXXXXXXXX',
            value: '700625125493',
        },
    ],
    asnbOverview: undefined,
    riskStatus: '',
    checkout: {
        investmentType: '',
        stageTableId: '',
        transactionId: '',
        guardianDetails: {
            unitHolderId: '',
            name: '',
        },
        fundId: '',
        amount: null,
        bankCharge: 1,
        total: 0,
        fundType: null,
        fundName: '',
        transactionStatus: '000',
        timeStamp: '',
        identificationNumber: '',
        unitsAlloted: 0,
        navPrice: 0,
        bankAccountNumber: '',
        asnbReferenceNo: '',
        salesCharge: null,
        salesChargePercentage: null,
        errorCode: null,
    },
    transactionLimit: {
        currentLimit: 0,
        maxLimit: 5000,
    },
    ASNBDowntimeScheduledMaintenance: mockASNBDowntimeScheduledMaintenance,
    sofSowList: [],
    isAccountStatusNormal: null,
    selectedAccount: null,
    eligibleFunds: null,
    allFunds: null,
    operationHourDetails: {
        startTime: null,
        endTime: null,
    },
    externalUrls: {},
    idTypes: [],
    relationships: [],
    addFavouriteDetails: {
        nickname: '',
        membershipNumber: '',
        fundCode: '',
        idType: '',
        idNumber: '',
        relationship: '',
        stageId: '',
        transactionId: '',
        timestamp: '',
    },
    transferReasonList: [],
    purchaseFavouriteDetails: {
        no: 0,
        nickname: '',
        beneName: '',
        fundCode: '',
        fundDesc: '',
        beneClientId: '',
        relationship: '',
        memberIdType: '',
        asnbAccountNo: '',
        transId: '',
    },
};

describe('Asnb Reducer', () => {
    it('should return the previous state', () => {
        const action = {} as Action;

        const result = reducer(initialState, action);

        expect(result).toBe(initialState);
    });

    it('should return the updated state with loaded as false and no error', () => {
        const action = AsnbActions.init();
        const state = { ...initialState, loaded: true, error: 'Some error' };
        const expectedState = { ...initialState, loaded: false, error: null };

        const result = reducer(state, action);

        expect(result).toEqual(expectedState);
    });

    //show bank account list
    it('should load checkout bank account data from API', () => {
        const action = AsnbActions.loadCheckoutBankAccount();

        const result = reducer(initialState, action);
        expect(result.status).toEqual('loading');
    });

    //bank data
    it('should load checkout bank account data from API on success path', () => {
        const action = AsnbActions.loadCheckoutBankAccountSuccess({
            checkoutBankAccount: mockState.checkoutBankAccount,
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.checkoutBankAccount).toBe(mockState.checkoutBankAccount);
    });

    it('should load checkout bank account data from API on failed path', () => {
        const action = AsnbActions.loadCheckoutBankAccountFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.checkoutBankAccount).toBeFalsy();
        expect(result.error).toEqual('The error message');
    });

    it('should load checkout purchase summart data from API', () => {
        const action = AsnbActions.loadCheckoutPurchaseSummary();

        const result = reducer(initialState, action);
        expect(result.status).toEqual('loading');
    });

    //cart purchase summary
    it('should get checkout purcahse  summary data from API on success path', () => {
        const action = AsnbActions.loadCheckoutPurchaseSummarySuccess({
            checkoutPurchaseSummary: mockState.checkoutPurchaseSummary,
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.checkoutPurchaseSummary).toBe(mockCheckoutPurchaseData);
    });

    it('should  get checkout purcahse  summary data from API on failed path', () => {
        const action = AsnbActions.loadCheckoutPurchaseSummaryFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.checkoutPurchaseSummary).toBeFalsy();
        expect(result.error).toEqual('The error message');
    });

    it('should load checkout user data from API', () => {
        const action = AsnbActions.loadCheckoutAccountDetails();

        const result = reducer(initialState, action);
        expect(result.status).toEqual('loading');
    });

    //cart user data
    it('should get checkout user data from API on success path', () => {
        const action = AsnbActions.loadCheckoutAccountDetailsSuccess({
            checkoutUserData: mockState.checkoutUserData,
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.checkoutUserData).toBe(mockCheckoutUserData);
    });

    it('should  get checkout user data from API on failed path', () => {
        const action = AsnbActions.loadCheckoutAccountDetailsFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.checkoutUserData).toBeFalsy();
        expect(result.error).toEqual('The error message');
    });

    //show bank account list
    it('should load checkout bank account data from API', () => {
        const action = AsnbActions.loadCheckoutBankAccount();

        const result = reducer(initialState, action);
        expect(result.status).toEqual('loading');
    });

    //SOWSOF

    it('should load checkout SOWSOF from API', () => {
        const action = AsnbActions.loadCheckoutSource();

        const result = reducer(initialState, action);
        expect(result.status).toEqual('loading');
    });
    it('should get checkout SOWSOF from API on success path', () => {
        const action = AsnbActions.loadCheckoutSourceSuccess({
            checkoutSOWSOF: mockState.checkoutSOWSOF,
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.checkoutSOWSOF).toBe(mockCheckoutSOWSOF);
    });

    it('should  get checkout SOWSOF from API on failed path', () => {
        const action = AsnbActions.loadCheckoutSourceFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.checkoutSOWSOF).toBeFalsy();
        expect(result.error).toEqual('The error message');
    });

    it('should  get checkout purcahse  summary data from API on failed path', () => {
        const action = AsnbActions.loadCheckoutPurchaseSummaryFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.checkoutPurchaseSummary).toBeFalsy();
        expect(result.error).toEqual('The error message');
    });

    //cart user data
    it('should get checkout user data from API on success path', () => {
        const action = AsnbActions.loadCheckoutAccountDetailsSuccess({
            checkoutUserData: mockState.checkoutUserData,
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.checkoutUserData).toBe(mockCheckoutUserData);
    });

    it('should  get checkout user data from API on failed path', () => {
        const action = AsnbActions.loadCheckoutAccountDetailsFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.checkoutUserData).toBeFalsy();
        expect(result.error).toEqual('The error message');
    });

    //SOWSOF
    it('should get checkout SOWSOF from API on success path', () => {
        const action = AsnbActions.loadCheckoutSourceSuccess({
            checkoutSOWSOF: mockState.checkoutSOWSOF,
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.checkoutSOWSOF).toBe(mockCheckoutSOWSOF);
    });

    it('should  get checkout SOWSOF from API on failed path', () => {
        const action = AsnbActions.loadCheckoutSourceFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.checkoutSOWSOF).toBeFalsy();
        expect(result.error).toEqual('The error message');
    });

    it('should get last 5 transactions from API', () => {
        const action = AsnbActions.loadPastTransaction({
            options: { fundId: 'ASB' },
        });

        const result = reducer(initialState, action);
        expect(result.status).toEqual('loading');
    });

    it('should get last 5 transactions from API on success path', () => {
        const action = AsnbActions.loadPastTransactionSuccess({
            payload: {
                response: { transactionalDetail: mockPastTransactions },
                options: { fundId: 'ASB' },
            },
        });

        const expected = {
            ASB: {
                transactionalDetail: [
                    {
                        transactionAmount: '123456',
                        transactionDate: new Date('2023/04/22'),
                        transactionType: 'e-Channels',
                    },
                ],
                errorCode: undefined,
                errorMsg: undefined,
            },
        };

        const formattedTransaction = {
            transactionalDetail: [
                {
                    transactionAmount: '123456',
                    transactionDate: new Date('2023/04/22'),
                    transactionType: 'e-Channels',
                },
            ],
            errorCode: undefined,
            errorMsg: undefined,
        };

        const expectedState = {
            ...initialState,
            pastTransaction: {
                ASB: formattedTransaction,
            },
            status: 'success',
            error: '',
        };

        const result = reducer(initialState, action);

        expect(result).toEqual(expectedState);
        expect(result.status).toEqual('success');
        expect(result.pastTransaction).toEqual(expected);
    });

    it('should get last 5 transactions from API on failed path', () => {
        const action = AsnbActions.loadPastTransactionFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.pastTransaction).toStrictEqual({});
        expect(result.error).toEqual('The error message');
    });
});

describe('loadAsnbFundDetails', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadAsnbFundDetails({ options: pnbAPIInquiryRequestParam });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });

    it('should load asnb fund details from API on success path', () => {
        const payload = {
            lookupRes: [
                {
                    fundId: 1,
                    fundCode: 'ASB',
                    fundShortName: 'ASB',
                    fundLongName: 'Amanah Saham Bumiputera',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 2,
                    fundCode: 'ASB2',
                    fundShortName: 'ASB 2',
                    fundLongName: 'Amanah Saham Bumiputera 2',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 3,
                    fundCode: 'ASD',
                    fundShortName: 'ASB 3 Didik',
                    fundLongName: 'Amanah Saham Bumiputera 3 - Didik',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 4,
                    fundCode: 'ASM',
                    fundShortName: 'ASM',
                    fundLongName: 'Amanah Saham Malaysia',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 5,
                    fundCode: 'ASW',
                    fundShortName: 'ASM 2 Wawasan',
                    fundLongName: 'Amanah Saham Malaysia 2 - Wawasan',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 6,
                    fundCode: 'AS1M',
                    fundShortName: 'ASM 3',
                    fundLongName: 'Amanah Saham Malaysia 3',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 7,
                    fundCode: 'ASN',
                    fundShortName: 'ASN',
                    fundLongName: 'Amanah Saham Nasional',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 8,
                    fundCode: 'ASN2',
                    fundShortName: 'ASN Equity 2',
                    fundLongName: 'ASN Equity 2',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 9,
                    fundCode: 'AASSGK',
                    fundShortName: 'ASN Equity 3',
                    fundLongName: 'ASN Equity 3',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 10,
                    fundCode: 'ASN3',
                    fundShortName: 'ASN Imbang 1',
                    fundLongName: 'ASN Imbang (Mixed Asset Balanced) 1',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 11,
                    fundCode: 'AASSGD',
                    fundShortName: 'ASN Imbang 2',
                    fundLongName: 'ASN Imbang (Mixed Asset Balanced) 2',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 12,
                    fundCode: 'AASSGS',
                    fundShortName: 'ASN Sara 1',
                    fundLongName: 'ASN Sara (Mixed Asset Conservative) 1',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 13,
                    fundCode: 'ASNE05',
                    fundShortName: 'ASN Equity 5',
                    fundLongName: 'ASN Equity 5',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 14,
                    fundCode: 'ASNS02',
                    fundShortName: 'ASN Sara 2',
                    fundLongName: 'ASN Sara (Mixed Asset Conservative) 2',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 15,
                    fundCode: 'ASNEG1',
                    fundShortName: 'ASN Equity Global',
                    fundLongName: 'ASN Equity Global',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 16,
                    fundCode: 'ASNI03',
                    fundShortName: 'ASN Imbang 3 Global',
                    fundLongName: 'ASN Imbang (Mixed Asset Balanced) 3 Global',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 17,
                    fundCode: 'ASNSK1',
                    fundShortName: 'ASN Susuk',
                    fundLongName: 'ASN Susuk',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
            ],
            fundRes: {
                agentCode: 'MBB',
                bankAccountDuplication: 'N',
                bankAccountVerified: 'U',
                bankCustPhoneNumber: 'null',
                bankTxnReferenceNumber: '41722757645616',
                branchCode: 'MBBSB029',
                channelType: 'IB',
                deviceOwner: 'CIMB',
                firstName: 'XXXXXXXXXX',
                fundDetail: [
                    {
                        blockedUnits: 0,
                        certUnits: 0,
                        eligibleLoanUnits: 143996,
                        epfUnits: 0,
                        fundId: 'ASB',
                        loanUnits: 0,
                        nav: 1,
                        provisionalUnits: 0,
                        totalUnits: 251075.58,
                        ubbUnits: 143996,
                        ubcUnits: 200000,
                        uhAccountStatus: 'NORMAL',
                        uhHoldings: 251075.58,
                        unitBalance: 251075.58,
                    },
                    {
                        blockedUnits: 0,
                        certUnits: 0,
                        eligibleLoanUnits: 200000,
                        epfUnits: 0,
                        fundId: 'ASB2',
                        loanUnits: 0,
                        nav: 1,
                        provisionalUnits: 0,
                        totalUnits: 118530.25,
                        ubbUnits: 207500,
                        ubcUnits: 200000,
                        uhAccountStatus: 'NORMAL',
                        uhHoldings: 118530.25,
                        unitBalance: 118530.25,
                    },
                    {
                        blockedUnits: 0,
                        certUnits: 0,
                        eligibleLoanUnits: '',
                        epfUnits: 0,
                        fundId: 'ASW',
                        loanUnits: 0,
                        nav: 1,
                        provisionalUnits: 0,
                        totalUnits: 351.15,
                        ubbUnits: -228.24,
                        ubcUnits: '',
                        uhAccountStatus: 'NORMAL',
                        uhHoldings: 351.15,
                        unitBalance: 351.15,
                    },
                ],
                grandTotalBlockedUnits: 0,
                grandTotalCertUnits: 0,
                grandTotalEpfUnits: 0,
                grandTotalLoanUnits: 0,
                grandTotalProvisionAlUnits: 0,
                grandTotalUhHoldings: 369956.98,
                grandTotalUnitBalance: 369956.98,
                grandTotalUnits: 369956.98,
                identificationNumber: '700625125493',
                identificationType: 'W',
                inquiryCode: '4',
                investorFlag: 'ASNB UH but Non Robo Investor',
                lastUpdateDate: '18 Sep 2017, 11:59 AM',
                mobileNumberDuplication: 'N',
                omniSverifiCationDue: 'No',
                participateinasnbmkt: 'Y',
                purposeOfInvestment: 'Investment',
                requestOridentification: 'CIMBCLICKS',
                riskProfile: 'M',
                totalMinorAccount: 2,
                transactionChannel: 'OTC',
                transactionDate: '',
                transactionStatus: 'Successful',
                transactionTime: 'null',
                typeClosed: 'N',
                unitHolderId: '000000061932',
                fundId: '',
                filtrationFlag: '',
                guardianId: '',
                guardianIcType: '',
                guardianIcNumber: '',
                rejectCode: '',
                rejectReason: '',
                occupationCategory: '',
                minorDetail: [
                    {
                        adam50: 0,
                        icno: '060311120507',
                        icnoType: 'W',
                        name: 'XXXXXXXXXX',
                        uhid: '000008492086',
                    },
                    {
                        adam50: 0,
                        icno: '090408120674',
                        icnoType: 'W',
                        name: 'XXXXXXXXXX',
                        uhid: '000008492104',
                    },
                ],
            },
        };

        const action = AsnbActions.loadAsnbFundDetailsSuccess({ payload });
        const newState = reducer(initialState, action);

        // Perform assertions
        expect(newState.asnbOverview).toEqual(getFundOverview(payload?.fundRes));
        expect(newState.memberList).toEqual([
            getOwnerDetails(payload.fundRes),
            ...(payload.fundRes?.minorDetail
                ? formatMinorDetails(payload.fundRes?.minorDetail)
                : []),
        ]);
        expect(newState.checkout.guardianDetails).toEqual({
            name: getOwnerDetails(payload.fundRes).name,
            unitHolderId: getOwnerDetails(payload.fundRes).membershipNumber,
        });
        expect(newState.riskStatus).toEqual(payload.fundRes.riskProfile);
        expect(newState.pastTransaction).toEqual({});
        expect(newState.status).toEqual('success');
        expect(newState.error).toEqual('');
    });
});
describe('updateCheckoutState', () => {
    it('should update checkout state', () => {
        const action = AsnbActions.updateCheckoutState({
            payload: mockState.checkout,
        });
        const result = reducer(initialState, action);
        expect(result.checkout).toStrictEqual(mockState.checkout);
    });
});

describe('clearCheckoutState', () => {
    it('should clear checkout state', () => {
        const action = AsnbActions.clearCheckoutState();
        const result = reducer(initialState, action);
        expect(result.checkout).toStrictEqual(initialState.checkout);
    });
});

describe('loadTransactionLimit', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadTransactionLimit();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });

    it('should return the current state', () => {
        const action = AsnbActions.loadTransactionLimitSuccess({
            payload: { currentLimit: 0, maxLimit: 5000 },
        });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({
            ...initialState,
            transactionLimit: mockState.transactionLimit,
            status: 'success',
            error: '',
        });
    });

    it('should return the current state with error', () => {
        const action = AsnbActions.loadTransactionLimitFailure({
            error: 'error',
        });
        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result).toStrictEqual({ ...initialState, status: 'error', error: 'error' });
    });
});

describe('asnbTopUp', () => {
    it('should update asnbTopUp property correctly', () => {
        const topUp = {
            fundName: 'ASB',
            amount: 100,
            fundId: 'ASB',
            type: '[Asnb/API] Asnb Top Up',
        };

        const action = AsnbActions.asnbTopUp(topUp);

        const newState = reducer(initialState, action);

        expect(newState).toStrictEqual({
            ...initialState,
            asnbTopUp: topUp,
        });
    });
});

describe('loadAsnbMinorFundDetails', () => {
    it('should handle the loadAsnbMinorFundDetailsSuccess action', () => {
        const payload = {
            lookupRes: [
                {
                    fundId: 1,
                    fundCode: 'ASB',
                    fundShortName: 'ASB',
                    fundLongName: 'Amanah Saham Bumiputera',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 2,
                    fundCode: 'ASB2',
                    fundShortName: 'ASB 2',
                    fundLongName: 'Amanah Saham Bumiputera 2',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 3,
                    fundCode: 'ASD',
                    fundShortName: 'ASB 3 Didik',
                    fundLongName: 'Amanah Saham Bumiputera 3 - Didik',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 4,
                    fundCode: 'ASM',
                    fundShortName: 'ASM',
                    fundLongName: 'Amanah Saham Malaysia',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 5,
                    fundCode: 'ASW',
                    fundShortName: 'ASM 2 Wawasan',
                    fundLongName: 'Amanah Saham Malaysia 2 - Wawasan',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 6,
                    fundCode: 'AS1M',
                    fundShortName: 'ASM 3',
                    fundLongName: 'Amanah Saham Malaysia 3',
                    fundType: 'fixed',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 7,
                    fundCode: 'ASN',
                    fundShortName: 'ASN',
                    fundLongName: 'Amanah Saham Nasional',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 8,
                    fundCode: 'ASN2',
                    fundShortName: 'ASN Equity 2',
                    fundLongName: 'ASN Equity 2',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 9,
                    fundCode: 'AASSGK',
                    fundShortName: 'ASN Equity 3',
                    fundLongName: 'ASN Equity 3',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 10,
                    fundCode: 'ASN3',
                    fundShortName: 'ASN Imbang 1',
                    fundLongName: 'ASN Imbang (Mixed Asset Balanced) 1',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 11,
                    fundCode: 'AASSGD',
                    fundShortName: 'ASN Imbang 2',
                    fundLongName: 'ASN Imbang (Mixed Asset Balanced) 2',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 12,
                    fundCode: 'AASSGS',
                    fundShortName: 'ASN Sara 1',
                    fundLongName: 'ASN Sara (Mixed Asset Conservative) 1',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 13,
                    fundCode: 'ASNE05',
                    fundShortName: 'ASN Equity 5',
                    fundLongName: 'ASN Equity 5',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 14,
                    fundCode: 'ASNS02',
                    fundShortName: 'ASN Sara 2',
                    fundLongName: 'ASN Sara (Mixed Asset Conservative) 2',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 15,
                    fundCode: 'ASNEG1',
                    fundShortName: 'ASN Equity Global',
                    fundLongName: 'ASN Equity Global',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 16,
                    fundCode: 'ASNI03',
                    fundShortName: 'ASN Imbang 3 Global',
                    fundLongName: 'ASN Imbang (Mixed Asset Balanced) 3 Global',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
                {
                    fundId: 17,
                    fundCode: 'ASNSK1',
                    fundShortName: 'ASN Susuk',
                    fundLongName: 'ASN Susuk',
                    fundType: 'variable',
                    fundStatus: 'ACTIVE',
                },
            ],
            fundRes: {
                agentCode: 'ASNB',
                bankAccountDuplication: 'N',
                bankAccountVerified: 'U',
                bankCustPhoneNumber: 'null',
                bankTxnReferenceNumber: '79490206693453',
                branchCode: 'ASNBHQ001',
                channelType: 'IB',
                deviceOwner: 'CIMB',
                firstName: 'XXXXXXXXXX',
                fundDetail: [
                    {
                        blockedUnits: 0,
                        certUnits: 0,
                        eligibleLoanUnits: 200000,
                        epfUnits: 0,
                        fundId: 'ASB',
                        loanUnits: 0,
                        nav: 1,
                        provisionalUnits: 0,
                        totalUnits: 95001.4,
                        ubbUnits: 218810,
                        ubcUnits: 200000,
                        uhAccountStatus: 'NORMAL',
                        uhHoldings: 95001.4,
                        unitBalance: 95001.4,
                    },
                ],
                grandTotalBlockedUnits: 0,
                grandTotalCertUnits: 0,
                grandTotalEpfUnits: 0,
                grandTotalLoanUnits: 0,
                grandTotalProvisionAlUnits: 0,
                grandTotalUhHoldings: 95001.4,
                grandTotalUnitBalance: 95001.4,
                grandTotalUnits: 95001.4,
                identificationNumber: '060311120507',
                identificationType: 'W',
                inquiryCode: '4',
                investorFlag: 'ASNB UH but Non Robo Investor',
                lastUpdateDate: '26 Sep 2021, 12:06 PM',
                mobileNumberDuplication: 'N',
                omniSverifiCationDue: '',
                participateinasnbmkt: 'Y',
                purposeOfInvestment: 'Investment',
                requestOridentification: 'CIMBCLICKS',
                riskProfile: 'M',
                totalMinorAccount: 0,
                transactionChannel: 'OTC',
                transactionDate: '',
                transactionStatus: 'Successful',
                transactionTime: 'null',
                typeClosed: 'N',
                unitHolderId: '000008492086',
                fundId: '',
                filtrationFlag: '',
                guardianId: '',
                guardianIcType: 'W',
                guardianIcNumber: '700625125493',
                rejectCode: '',
                rejectReason: '',
                occupationCategory: '',
                minorDetail: [],
            },
        };
        // Dispatch the action
        const action = AsnbActions.loadAsnbMinorFundDetailsSuccess({ payload });
        const newState = reducer(initialState, action);

        // Perform assertions
        expect(newState.fundDetail).toEqual(groupFundListByFundId(payload, newState).fundDetail);
        expect(newState.riskStatus).toEqual(payload.fundRes.riskProfile);
        expect(newState.pastTransaction).toEqual({});
        expect(newState.status).toEqual('success');
        expect(newState.error).toEqual('');
    });
});

describe('createOrder', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.createOrder({ payload: mockState.checkout });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });

    it('should handle the createOrderSuccess action', () => {
        const action = AsnbActions.createOrderSuccess({
            payload: mockState.checkout,
        });

        const result = reducer(initialState, action);
        expect(result.status).toEqual('success');
        expect(result.checkout).toEqual({ ...mockState.checkout, salesChargePercentage: 'N/A' });
    });

    it('should handle the createOrderFailure action', () => {
        const action = AsnbActions.createOrderFailure({
            error: 'error',
        });

        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result.error).toEqual('error');
    });
});

describe('createSubscription', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.createSubscription({
            payload: {
                stageTableId: '123',
                otp: '111111',
                bankAccountNumber: '123',
                transactionId: '123',
                acctType: 'SDA',
                bankId: 35,
            },
        });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });
});

describe('ASNB Scheduled Maintenance', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadScheduledMaintenance();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });
    it('should get ASNB Downtime Maintenance on success path', () => {
        const action = AsnbActions.loadScheduledMaintenanceSuccess({
            payload: mockState.ASNBDowntimeScheduledMaintenance,
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.ASNBDowntimeScheduledMaintenance).toBe(mockASNBDowntimeScheduledMaintenance);
    });

    it('should get ASNB Downtime Maintenance on failed path', () => {
        const action = AsnbActions.loadScheduledMaintenanceFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.ASNBDowntimeScheduledMaintenance).toBeFalsy();
        expect(result.error).toEqual('The error message');
    });
});

describe('updateSelectedMember', () => {
    it('should update the selectedAcount state', () => {
        const payload: AsnbMember = { name: 'Test Name', membershipNumber: '1234', value: '1234' };
        const action = AsnbActions.updateSelectedMember({ payload });
        const result = reducer(initialState, action);
        expect(result.selectedAccount).toStrictEqual(payload);
    });
});

describe('loadSofSowList', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadSofSowList();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });

    it('should return the current state', () => {
        const payload = [
            { id: 'SOF', value: 'Source of Fund' },
            { id: 'SOW', value: 'Source of Wealth' },
        ];
        const action = AsnbActions.loadSofSowListSuccess({ payload });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({
            ...initialState,
            sofSowList: payload,
            status: 'success',
            error: '',
        });
    });

    it('should return the current state with error', () => {
        const action = AsnbActions.loadSofSowListFailure({
            error: 'error',
        });
        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result).toStrictEqual({ ...initialState, status: 'error', error: 'error' });
    });

    it('should update state correctly on AsnbActions.createSubscriptionSuccess', () => {
        const payload = mockState.checkout;

        const action = AsnbActions.createSubscriptionSuccess({ payload });

        const newState = reducer(initialState, action);

        expect(newState.checkout).toEqual({ ...initialState.checkout, ...payload });
        expect(newState.status).toBe('success');
        expect(newState.error).toBe('');
    });

    it('should return the current state with error on AsnbActions.createSubscriptionFailure', () => {
        const action = AsnbActions.createSubscriptionFailure({ error: 'error' });
        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result).toStrictEqual({ ...initialState, status: 'error', error: 'error' });
    });

    it('should return the current state with otp error on AsnbActions.loadCheckoutOTPFailure', () => {
        const action = AsnbActions.loadCheckoutOTPFailure({
            otpError: { message: 'error' },
        });
        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result).toStrictEqual({ ...initialState, status: 'error', error: 'error' });
    });
});

describe('ASNB Get Eligible Funds', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadEligibleFunds({ payload: null });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });
    it('should get Eligible funds on success path', () => {
        const payload: AsnbEligibleFunds = {
            eligibleFunds: ['ASB 1', 'ASB 2', 'ASB 3'],
        };
        const action = AsnbActions.loadEligibleFundsSuccess({ payload });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.eligibleFunds).toBe(payload);
    });

    it('should get Eligible funds on failed path', () => {
        const action = AsnbActions.loadEligibleFundsFailure({
            error: 'The error message',
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.error).toEqual('The error message');
    });
});

describe('loadOperationHourDetails', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadOperationHourDetails();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });

    it('should return the current state', () => {
        const action = AsnbActions.loadOperationHourDetailsSuccess({
            payload: { startTime: '02:00', endTime: '21:00' },
        });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({
            ...initialState,
            operationHourDetails: mockState.operationHourDetails[0],
            status: 'success',
            error: '',
        });
    });

    it('should return the current state with error', () => {
        const action = AsnbActions.loadOperationHourDetailsFailure({
            error: 'error',
        });
        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result).toStrictEqual({ ...initialState, status: 'error', error: 'error' });
    });
});

describe('loadExternalUrlList', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadExternalUrlList();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });

    it('should return the current state with status success', () => {
        const payload = { fundPrice: 'Link 1', prospectus: 'Link 2' };
        const action = AsnbActions.loadExternalUrlListSuccess({ payload });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({
            ...initialState,
            externalUrls: payload,
            status: 'success',
            error: '',
        });
    });

    it('should return the current state with error', () => {
        const action = AsnbActions.loadExternalUrlListFailure({
            error: 'error',
        });
        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result).toStrictEqual({ ...initialState, status: 'error', error: 'error' });
    });
});

describe('loadIdTypeList', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadIdTypeList();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });

    it('should return the current state with status success', () => {
        const payload = [
            { id: 'ID1', value: 'ID 1' },
            { id: 'ID2', value: 'ID 2' },
        ];
        const action = AsnbActions.loadIdTypeListSuccess({ payload });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({
            ...initialState,
            status: 'success',
            idTypes: payload,
            error: '',
        });
    });

    it('should return the current state with error', () => {
        const action = AsnbActions.loadIdTypeListFailure({ error: 'error' });
        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result).toStrictEqual({ ...initialState, status: 'error', error: 'error' });
    });
});

describe('loadTransferReasonList', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadTransferReasonList();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });

    it('should return the current state', () => {
        const payload = [{ id: 'SAV', value: 'Savings' }];
        const action = AsnbActions.loadTransferReasonListSuccess({ payload });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({
            ...initialState,
            transferReasonList: payload,
            status: 'success',
            error: '',
        });
    });

    it('should return the current state with error', () => {
        const action = AsnbActions.loadTransferReasonListFailure({
            error: 'error',
        });
        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result).toStrictEqual({ ...initialState, status: 'error', error: 'error' });
    });
});

describe('loadRelationshipList', () => {
    it('should return the current state with status loading', () => {
        const action = AsnbActions.loadRelationshipList();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, status: 'loading' });
    });

    it('should return the current state with status success', () => {
        const payload = [
            { id: 'R1', value: 'Relationship 1' },
            { id: 'R2', value: 'Relationship 2' },
        ];
        const action = AsnbActions.loadRelationshipListSuccess({ payload });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({
            ...initialState,
            status: 'success',
            relationships: payload,
            error: '',
        });
    });

    it('should return the current state with error', () => {
        const action = AsnbActions.loadRelationshipListFailure({
            error: 'error',
        });
        const result = reducer(initialState, action);
        expect(result.status).toEqual('error');
        expect(result).toStrictEqual({ ...initialState, status: 'error', error: 'error' });
    });
});

describe('asnbAddFavourite', () => {
    it('should update the add favourite state', () => {
        const payload = {
            nickname: 'nickname',
            membershipNumber: 'membershipNumber',
            fundCode: 'fundCode',
            idType: 'idType',
            idNumber: 'idNumber',
            relationship: 'relationship',
            stageId: 'stageId',
            transactionId: 'transactionId',
            timestamp: 'timestamp',
        };
        const action = AsnbActions.updateAddFavouriteState({ payload });
        const result = reducer(initialState, action);
        expect(result).toStrictEqual({ ...initialState, addFavouriteDetails: payload });
    });
    it('should clear the add favourite state', () => {
        const action = AsnbActions.clearAddFavouriteState();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual(initialState);
    });
});

describe('asnbFavouritePurchase', () => {
    it('should update purchaseFavouriteDetails property correctly', () => {
        const payload = asnbFavouriteDetails;

        const action = AsnbActions.asnbFavouritePurchase({ payload });

        const newState = reducer(initialState, action);

        expect(newState).toStrictEqual({
            ...initialState,
            purchaseFavouriteDetails: payload,
        });
    });
    it('should clear the purchaseFavouriteDetails property', () => {
        const action = AsnbActions.clearAsnbFavouritePurchase();
        const result = reducer(initialState, action);
        expect(result).toStrictEqual(initialState);
    });
});

describe('getUnitsAllottedAndNavPrice', () => {
    it('should return unitsAlloted and navPrice values when transaction is successful and fund type is fixed price', () => {
        const transactionStatus = '000';
        const fundType = 'fixed price';
        const salesCharge = '0.00';
        const unitsAlloted = null;
        const navPrice = null;

        const result = getUnitsAllottedAndNavPrice(
            transactionStatus,
            fundType,
            salesCharge,
            unitsAlloted,
            navPrice,
        );
        expect(result).toStrictEqual({ unitsAlloted, navPrice });
    });
    it('should return unitsAlloted and navPrice values when variable price fund transaction is successful and sales charge is not 0.0', () => {
        const transactionStatus = '000';
        const fundType = 'variable price';
        const salesCharge = '1.72';
        const unitsAlloted = null;
        const navPrice = null;

        const result = getUnitsAllottedAndNavPrice(
            transactionStatus,
            fundType,
            salesCharge,
            unitsAlloted,
            navPrice,
        );
        expect(result).toStrictEqual({ unitsAlloted, navPrice });
    });
    it('should return unitsAlloted and navPrice values as 0 when transaction is unsuccessful and fund type is fixed price', () => {
        const transactionStatus = '999';
        const fundType = 'fixed price';
        const salesCharge = '0.00';
        const unitsAlloted = null;
        const navPrice = null;

        const result = getUnitsAllottedAndNavPrice(
            transactionStatus,
            fundType,
            salesCharge,
            unitsAlloted,
            navPrice,
        );
        expect(result).toStrictEqual({ unitsAlloted: 0, navPrice: 0 });
    });
    it('should return unitsAlloted and navPrice values as null for pending transaction', () => {
        const transactionStatus = '5000';
        const fundType = 'fixed price';
        const salesCharge = '0.00';
        const unitsAlloted = null;
        const navPrice = null;

        const result = getUnitsAllottedAndNavPrice(
            transactionStatus,
            fundType,
            salesCharge,
            unitsAlloted,
            navPrice,
        );
        expect(result).toStrictEqual({ unitsAlloted: null, navPrice: null });
    });
});

describe('getSalesChargeAndPercentage', () => {
    it('should return salesCharge and salesChargePercentage values as 0.00 when fund type is fixed', () => {
        const transactionStatus = '000';
        const fundType = 'fixed price';
        const salesCharge = null;
        const salesChargePercentage = null;

        const result = getSalesChargeAndPercentage(
            transactionStatus,
            fundType,
            salesCharge,
            salesChargePercentage,
        );
        expect(result).toStrictEqual({ salesCharge: '0.00', salesChargePercentage: '0.00' });
    });
    it('should return salesCharge and salesChargePercentage values when transaction is successful with sales charge exist', () => {
        const transactionStatus = '000';
        const fundType = 'variable price';
        const salesCharge = null;
        const salesChargePercentage = null;

        const result = getSalesChargeAndPercentage(
            transactionStatus,
            fundType,
            salesCharge,
            salesChargePercentage,
        );
        expect(result).toStrictEqual({ salesCharge, salesChargePercentage });
    });
    it('should return salesCharge and salesChargePercentage values as null and N/A for variable price fund with non-successful transaction', () => {
        const transactionStatus = '000';
        const fundType = 'variable price';
        const salesCharge = '0.0';
        const salesChargePercentage = '0.0';

        const result = getSalesChargeAndPercentage(
            transactionStatus,
            fundType,
            salesCharge,
            salesChargePercentage,
        );
        expect(result).toStrictEqual({ salesCharge: null, salesChargePercentage: 'N/A' });
    });
});

describe('getCheckoutAmount', () => {
    it('should return the amount value when fund type is fixed', () => {
        const fundType = 'fixed price';
        const salesCharge = '0.0';
        const amount = 45;

        const result = getCheckoutAmount(fundType, salesCharge, amount);
        expect(result).toStrictEqual(45);
    });
    it('should return the amount value when fund type is variable with successful transaction', () => {
        const fundType = 'variable price';
        const salesCharge = '1.27';
        const amount = 45;

        const result = getCheckoutAmount(fundType, salesCharge, amount);
        expect(result).toStrictEqual(45);
    });
    it('should return the amount value as null when fund type is variable with non-successful transaction', () => {
        const fundType = 'variable price';
        const salesCharge = '0.0';
        const amount = 45;

        const result = getCheckoutAmount(fundType, salesCharge, amount);
        expect(result).toStrictEqual(null);
    });
});

describe('getCheckoutErrorCodeState', () => {
    it('should return error code as null when transaction status is successful', () => {
        const transactionStatus = '000';
        const errorCode = 'error_code';

        const result = getCheckoutErrorCodeState(transactionStatus, errorCode);
        expect(result).toStrictEqual(null);
    });
    it('should return error code as null when transaction status is pending', () => {
        const transactionStatus = '5000';
        const errorCode = 'error_code';

        const result = getCheckoutErrorCodeState(transactionStatus, errorCode);
        expect(result).toStrictEqual(null);
    });
    it('should return error code as null when transaction status is unsuccessful', () => {
        const transactionStatus = '999';
        const errorCode = 'error_code';

        const result = getCheckoutErrorCodeState(transactionStatus, errorCode);
        expect(result).toStrictEqual('error_code');
    });
});
