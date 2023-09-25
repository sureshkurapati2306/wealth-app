import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';

import { hot } from '@nrwl/angular/testing';
import { Observable, of, throwError } from 'rxjs';

import * as AsnbActions from './asnb.actions';
import { AsnbEffects } from './asnb.effects';

import * as AsnbReducer from './asnb.reducer';

import {
    accountData,
    bankAccounts,
    cartSummary,
    checkoutSourceDetail,
    pastTransaction,
    ASNBDowntimeMaintenance,
    asnbEligibleFunds,
} from '../mocks/data';
import { AsnbService } from '../services/asnb.service';
import { environment } from '@env/self-serve/environment';
import { AppService } from '../../../core/services/app.service';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import {
    AsnbLookupParamApiResponse,
    AsnbTransactionLimit,
    OperationHourResponse,
    UrlMaintenanceApiResponse,
    AsnbLookupParamApiTransferReasonResponse,
    AsnbEligibleFunds,
    AsnbCashTransactionRequest,
    PastTransactionResponse,
    AsnbRiskStatusApiResponse,
    AsnbCheckout,
    AsnbCreateSubscriptionResponse,
    AsnbCreateSubscriptionRequest,
} from '../models';
import {
    getASNBFundDetailsCondition,
    getCheckout,
    getExternalUrlList,
    getIdTypeList,
    getOperationHourDetails,
    getRelationshipList,
    getSofSowList,
    getTransferReasonList,
} from './asnb.selectors';
import * as WealthDashboardActions from '../../../core/state/wealth-dashboard/wealth-dashboard.actions';
import * as CartActions from '../../../core/state/cart/cart.actions';

class mockService {
    getCheckoutBankAccounts() {
        /* mock */
    }
    getCheckoutPurchaseSummary() {
        /* mock */
    }
    getCheckoutAccountDetails() {
        /* mock */
    }
    getCheckoutSourceDetails() {
        /* mock */
    }
    getPastTransaction() {
        /* mock */
    }
    getASNBFundListLookup() {
        /* mock */
    }
    getASNBFundListOwnAccount() {
        /* mock */
    }
    getUserRiskStatus() {
        /* mock */
    }
    createOrder() {
        /* mock */
    }
    createSubscription() {
        /* mock */
    }
    getTransactionLimit() {
        /* mock */
    }
    getASNBScheduledMaintenance() {
        /* mock */
    }
    getSourceOfWealthAndFunds() {
        /* mock */
    }
    getEligibleFunds() {
        /* mock */
    }
    getOperationHourDetails() {
        /* mock */
    }
    getExternalUrlList() {
        /* mock */
    }
    getIdTypeList() {
        /* mock */
    }
    getRelationshipList() {
        /* mock */
    }
    getTransferReasons() {
        /* mock */
    }
}

const mockCheckoutBankData: any = bankAccounts;
const mockCheckoutPurchaseData: any = cartSummary;
const mockCheckoutUserData: any = accountData;
const mockCheckoutSourceData: any = checkoutSourceDetail;
const mockPastTxn: any = pastTransaction;
const mockFundDetail: any = null;
const mockMemberList: any = null;
const mockASNBDowntimeScheduledMaintenance: any = ASNBDowntimeMaintenance;
const mockASNBEligibleFundCodes: AsnbEligibleFunds = asnbEligibleFunds;

const mockState: AsnbReducer.State = {
    checkoutBankAccount: mockCheckoutBankData,
    checkoutPurchaseSummary: mockCheckoutPurchaseData,
    checkoutUserData: mockCheckoutUserData,
    checkoutSOWSOF: mockCheckoutSourceData,
    status: 'pending',
    error: '',
    pastTransaction: mockPastTxn,
    asnbTopUp: null,
    fundDetail: null,
    memberList: null,
    asnbOverview: null,
    riskStatus: '',
    fundTypesMap: null,
    fundTypeIds: [],
    checkout: {
        investmentType: '',
        stageTableId: '',
        transactionId: '',
        guardianDetails: {
            unitHolderId: '',
            name: '',
        },
        fundId: '',
        amount: 0,
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
    },
    transactionLimit: {
        currentLimit: null,
        maxLimit: null,
    },
    ASNBDowntimeScheduledMaintenance: null,
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

describe('AsnbEffects', () => {
    let actions: Observable<Action>;
    let effects: AsnbEffects;
    let service: AsnbService;
    let mockStore: MockStore;

    //TODO: change this for ASNB
    const apiUrl = 'https://wlu.apps.tcjteam.tech/api/';
    const production = false;
    const redirection = false;
    const emanager = 'emanager';
    const wealth = 'wealth';
    const ut = 'ut';
    const otp = 'otp';
    const validate = 'validate';
    const authenticate = 'authenticate';
    const rws = 'rws';
    const gateway = '';
    const r2Enabled = false;
    const adobeAnalyticsWealth = '';
    const asnb = '';

    const Environment: typeof environment = {
        production,
        redirection,
        apiUrl,
        emanager,
        wealth,
        ut,
        otp,
        validate,
        authenticate,
        rws,
        asnb,
        gateway,
        r2Enabled,
        adobeAnalyticsWealth,
    };

    let appService: Partial<AppService>;

    beforeEach(() => {
        appService = {
            showLoadingSpinner: jest.fn(),
            hideLoadingSpinner: jest.fn(),
        };

        TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([]), NxModule.forRoot(), HttpClientTestingModule],
            providers: [
                AsnbEffects,
                provideMockActions(() => actions),
                provideMockStore({ initialState: mockState }),
                {
                    provide: 'environment',
                    useValue: Environment,
                },
                {
                    provide: AsnbService,
                    useClass: mockService,
                },
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: AppService, useValue: appService },
            ],
        });

        effects = TestBed.inject(AsnbEffects);
        mockStore = TestBed.inject(MockStore);
        service = TestBed.inject(AsnbService);
    });

    describe('init$', () => {
        it('should return loadAsnbSuccess action on success', () => {
            actions = hot('-a-|', { a: AsnbActions.init() });

            const expected = hot('-a-|', { a: AsnbActions.loadAsnbSuccess({ asnb: [] }) });

            expect(effects.init$).toBeObservable(expected);
        });
    });

    describe('loadCheckoutBankAccounts$', () => {
        //bank data
        it('should display bank account list on success path', (done) => {
            const spy = jest
                .spyOn(service, 'getCheckoutBankAccounts')
                .mockReturnValue(of(mockCheckoutBankData));

            actions = of(AsnbActions.loadCheckoutBankAccount());

            effects.loadCheckoutBankAccounts$.subscribe((action) => {
                expect(action).toEqual(
                    AsnbActions.loadCheckoutBankAccountSuccess({
                        checkoutBankAccount: mockCheckoutBankData,
                    }),
                );
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('should display bank account list on failed path', (done) => {
            const spy = jest
                .spyOn(service, 'getCheckoutBankAccounts')
                .mockReturnValue(throwError('Mock error'));

            actions = of(AsnbActions.loadCheckoutBankAccount());

            effects.loadCheckoutBankAccounts$.subscribe((action) => {
                expect(action).toEqual(
                    AsnbActions.loadCheckoutBankAccountFailure({
                        error: 'Mock error',
                    }),
                );
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('loadCheckoutPurchaseSummary$', () => {
        // purchase data
        it('should get purchase data on success path', (done) => {
            const spy = jest
                .spyOn(service, 'getCheckoutPurchaseSummary')
                .mockReturnValue(of(mockCheckoutPurchaseData));

            actions = of(AsnbActions.loadCheckoutPurchaseSummary());

            effects.loadCheckoutPurchaseSummary$.subscribe((action) => {
                expect(action).toEqual(
                    AsnbActions.loadCheckoutPurchaseSummarySuccess({
                        checkoutPurchaseSummary: mockCheckoutPurchaseData,
                    }),
                );
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('should get purchase data on failed path', (done) => {
            const spy = jest
                .spyOn(service, 'getCheckoutPurchaseSummary')
                .mockReturnValue(throwError('Mock error'));

            actions = of(AsnbActions.loadCheckoutPurchaseSummary());

            effects.loadCheckoutPurchaseSummary$.subscribe((action) => {
                expect(action).toEqual(
                    AsnbActions.loadCheckoutPurchaseSummaryFailure({
                        error: 'Mock error',
                    }),
                );
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('loadCheckoutAccountDetails$', () => {
        //cart user data
        it('should get cart user on success path', (done) => {
            const spy = jest
                .spyOn(service, 'getCheckoutAccountDetails')
                .mockReturnValue(of(mockCheckoutUserData));

            actions = of(AsnbActions.loadCheckoutAccountDetails());

            effects.loadCheckoutAccountDetails$.subscribe((action) => {
                expect(action).toEqual(
                    AsnbActions.loadCheckoutAccountDetailsSuccess({
                        checkoutUserData: mockCheckoutUserData,
                    }),
                );
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('should get cart user data on failed path', (done) => {
            const spy = jest
                .spyOn(service, 'getCheckoutAccountDetails')
                .mockReturnValue(throwError('Mock error'));

            actions = of(AsnbActions.loadCheckoutAccountDetails());

            effects.loadCheckoutAccountDetails$.subscribe((action) => {
                expect(action).toEqual(
                    AsnbActions.loadCheckoutAccountDetailsFailure({
                        error: 'Mock error',
                    }),
                );
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('loadCheckoutSource$', () => {
        //cart source of fund/wealth data
        it('should get checkout SOWSOWF on success path', (done) => {
            const spy = jest
                .spyOn(service, 'getCheckoutSourceDetails')
                .mockReturnValue(of(mockCheckoutSourceData));

            actions = of(AsnbActions.loadCheckoutSource());

            effects.loadCheckoutSource$.subscribe((action) => {
                expect(action).toEqual(
                    AsnbActions.loadCheckoutSourceSuccess({
                        checkoutSOWSOF: mockCheckoutSourceData,
                    }),
                );
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('should get checkout SOWSOWF on failed path', (done) => {
            const spy = jest
                .spyOn(service, 'getCheckoutSourceDetails')
                .mockReturnValue(throwError('Mock error'));

            actions = of(AsnbActions.loadCheckoutSource());

            effects.loadCheckoutSource$.subscribe((action) => {
                expect(action).toEqual(
                    AsnbActions.loadCheckoutSourceFailure({
                        error: 'Mock error',
                    }),
                );
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('loadPastTxn$', () => {
        it('should return loadPastTransactionSuccess action on success', (done) => {
            const options: AsnbCashTransactionRequest = {
                fundId: '',
            };
            const response: PastTransactionResponse = {
                transactionalDetail: [],
                errorCode: '',
                errorMsg: '',
            };
            const spy = jest.spyOn(service, 'getPastTransaction').mockReturnValue(of(response));

            actions = of(AsnbActions.loadPastTransaction({ options }));

            const expected = AsnbActions.loadPastTransactionSuccess({
                payload: { response, options: options },
            });

            effects.loadPastTxn$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalledWith(options);
                done();
            });
        });

        it('should return loadPastTransactionFailure action on failure', (done) => {
            const options: AsnbCashTransactionRequest = {
                fundId: '',
            };
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getPastTransaction')
                .mockReturnValue(throwError(error));

            actions = of(AsnbActions.loadPastTransaction({ options }));

            const expected = AsnbActions.loadPastTransactionFailure({ error });

            effects.loadPastTxn$.subscribe((action) => {
                expect(action).toEqual(expected);
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('loadAsnbFundDetails$', () => {
        it('should return loadAsnbFundDetailsSuccess action on success when fundTypesMap is present', (done) => {
            const options = {};
            const response = {
                data: [
                    { id: 1, name: 'Fund 1' },
                    { id: 2, name: 'Fund 2' },
                ],
            };
            const spy = jest
                .spyOn(service, 'getASNBFundListOwnAccount')
                .mockReturnValue(of(response));

            mockStore.overrideSelector(getASNBFundDetailsCondition, {
                fundTypesMap: {},
                allFunds: [],
            });

            actions = of(AsnbActions.loadAsnbFundDetails({ options }));

            const payload = {
                lookupRes: null,
                fundRes: response,
                allFunds: [],
            };

            const expected = AsnbActions.loadAsnbFundDetailsSuccess({ payload });

            effects.loadAsnbFundDetails$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalledWith(options);
                done();
            });
        });

        it('should return loadAsnbFundDetailsFailure action on failure when fundTypesMap is present', (done) => {
            const options = {};
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getASNBFundListOwnAccount')
                .mockReturnValue(throwError(error));

            mockStore.overrideSelector(getASNBFundDetailsCondition, {
                fundTypesMap: {},
                allFunds: [],
            });

            actions = of(AsnbActions.loadAsnbFundDetails({ options }));

            const expected = AsnbActions.loadAsnbFundDetailsFailure({ error });

            effects.loadAsnbFundDetails$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalledWith(options);
                done();
            });
        });

        it('should return loadAsnbFundDetailsSuccess action on success when fundTypesMap is absent', (done) => {
            const options = {};
            const lookupResponse = [];
            const lookupSpy = jest
                .spyOn(service, 'getASNBFundListLookup')
                .mockReturnValue(of(lookupResponse));
            const response = {
                data: [
                    { id: 1, name: 'Fund 1' },
                    { id: 2, name: 'Fund 2' },
                ],
            };
            const spy = jest
                .spyOn(service, 'getASNBFundListOwnAccount')
                .mockReturnValue(of(response));

            mockStore.overrideSelector(getASNBFundDetailsCondition, {
                fundTypesMap: null,
                allFunds: [],
            });

            actions = of(AsnbActions.loadAsnbFundDetails({ options }));

            const payload = {
                lookupRes: lookupResponse,
                fundRes: response,
                allFunds: lookupResponse,
            };

            const expected = AsnbActions.loadAsnbFundDetailsSuccess({ payload });

            effects.loadAsnbFundDetails$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(lookupSpy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(options);
                done();
            });
        });

        it('should return loadAsnbFundDetailsFailure action on failure when fundTypesMap is absent', (done) => {
            const options = {};
            const lookupResponse = [];
            const lookupSpy = jest
                .spyOn(service, 'getASNBFundListLookup')
                .mockReturnValue(of(lookupResponse));
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getASNBFundListOwnAccount')
                .mockReturnValue(throwError(error));

            mockStore.overrideSelector(getASNBFundDetailsCondition, {
                fundTypesMap: null,
                allFunds: [],
            });

            actions = of(AsnbActions.loadAsnbFundDetails({ options }));

            const expected = AsnbActions.loadAsnbFundDetailsFailure({ error });

            effects.loadAsnbFundDetails$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(lookupSpy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(options);
                done();
            });
        });
    });

    describe('loadAsnbMinorFundDetails$', () => {
        it('should return loadAsnbMinorFundDetailsSuccess action on success', (done) => {
            const options = { unitHolderId: '1234' };
            const response = {
                data: [
                    { id: 1, name: 'Fund 1' },
                    { id: 2, name: 'Fund 2' },
                ],
            };
            const spy = jest
                .spyOn(service, 'getASNBFundListOwnAccount')
                .mockReturnValue(of(response));

            actions = of(AsnbActions.loadAsnbMinorFundDetails({ options }));

            const payload = { lookupRes: null, fundRes: response };

            const expected = AsnbActions.loadAsnbMinorFundDetailsSuccess({ payload });

            effects.loadAsnbMinorFundDetails$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalledWith(options);
                done();
            });
        });

        it('should return loadAsnbMinorFundDetailsFailure action on failure', (done) => {
            const options = { unitHolderId: '1234' };
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getASNBFundListOwnAccount')
                .mockReturnValue(throwError(error));

            actions = of(AsnbActions.loadAsnbMinorFundDetails({ options }));

            const expected = AsnbActions.loadAsnbFundDetailsFailure({ error });

            effects.loadAsnbMinorFundDetails$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalledWith(options);
                done();
            });
        });
    });

    describe('loadUserRiskStatus$', () => {
        it('should return loadUserRiskStatusSuccess action on success', (done) => {
            const response: AsnbRiskStatusApiResponse = {
                status: 'Success',
                code: 200,
                data: 'L',
                message: 'User Risk Profile fetched successfully',
            };
            const spy = jest.spyOn(service, 'getUserRiskStatus').mockReturnValue(of(response));

            actions = of(AsnbActions.loadUserRiskStatus());

            const expected = AsnbActions.loadUserRiskStatusSuccess({ payload: response });

            effects.loadUserRiskStatus$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('should return loadUserRiskStatusFailure action on failure', (done) => {
            const error = { message: 'Some error' };
            const spy = jest.spyOn(service, 'getUserRiskStatus').mockReturnValue(throwError(error));

            actions = of(AsnbActions.loadUserRiskStatus());

            const expected = AsnbActions.loadUserRiskStatusFailure({ error });

            effects.loadUserRiskStatus$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('createOrder$', () => {
        it('should return createOrderSuccess action on success for own account', (done) => {
            const response = {
                stageTableId: '1234',
                amount: 10,
                bankCharge: 1,
                total: 11,
            };
            const spy = jest.spyOn(service, 'createOrder').mockReturnValue(of(response));

            const rawPayload: AsnbCheckout = {
                stageTableId: '',
                guardianDetails: {
                    unitHolderId: '111222333444',
                    name: 'Major',
                },
                fundId: '',
                fundName: '',
                fundType: null,
                amount: 0,
                sof: {
                    id: 'SOF',
                    value: 'Source of fund',
                },
                sow: {
                    id: 'SOW',
                    value: 'Source of wealth',
                },
                bankCharge: 0,
                total: 0,
                transactionStatus: '',
                timeStamp: '',
                identificationNumber: '',
                unitsAlloted: null,
                navPrice: null,
                transactionId: '',
                bankAccountNumber: '',
                asnbReferenceNo: null,
                salesCharge: '',
                salesChargePercentage: '',
                investmentType: '',
            };

            const payload = {
                ...rawPayload,
                ...response,
            };

            actions = of(AsnbActions.createOrder({ payload }));

            const expected = AsnbActions.createOrderSuccess({ payload });

            effects.createOrder$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                expect(appService.showLoadingSpinner).toHaveBeenCalled();
                expect(appService.hideLoadingSpinner).toHaveBeenCalled();
                done();
            });
        });

        it('should return createOrderSuccess action on success for minor account', (done) => {
            const response = {
                stageTableId: '1234',
                amount: 10,
                bankCharge: 1,
                total: 11,
            };
            const spy = jest.spyOn(service, 'createOrder').mockReturnValue(of(response));

            const rawPayload: AsnbCheckout = {
                stageTableId: '',
                guardianDetails: {
                    unitHolderId: '111222333444',
                    name: 'Major',
                },
                minorDetails: {
                    unitHolderId: '555666777888',
                    name: 'Minor',
                },
                fundId: '',
                fundName: '',
                fundType: null,
                amount: 0,
                bankCharge: 0,
                total: 0,
                transactionStatus: '',
                timeStamp: '',
                identificationNumber: '',
                unitsAlloted: null,
                navPrice: null,
                transactionId: '',
                bankAccountNumber: '',
                asnbReferenceNo: null,
                salesCharge: '',
                salesChargePercentage: '',
                investmentType: '',
            };

            const payload = {
                ...rawPayload,
                ...response,
            };

            actions = of(AsnbActions.createOrder({ payload }));

            const expected = AsnbActions.createOrderSuccess({ payload });

            effects.createOrder$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                expect(appService.showLoadingSpinner).toHaveBeenCalled();
                expect(appService.hideLoadingSpinner).toHaveBeenCalled();
                done();
            });
        });

        it('should return createOrderSuccess action on success for minor account', (done) => {
            const response = {
                stageTableId: '1234',
                amount: 10,
                bankCharge: 1,
                total: 11,
            };
            const spy = jest.spyOn(service, 'createOrder').mockReturnValue(of(response));

            const rawPayload: AsnbCheckout = {
                stageTableId: '',
                guardianDetails: {
                    unitHolderId: '111222333444',
                    name: 'Major',
                },
                minorDetails: {
                    unitHolderId: '555666777888',
                    name: 'Minor',
                },
                favouriteDetails: {
                    unitHolderId: '555666777888',
                    reasonOfTransfer: 'SAV',
                    reasonOfTransferValue: 'Savings',
                },
                fundId: '',
                fundName: '',
                fundType: null,
                amount: 0,
                bankCharge: 0,
                total: 0,
                transactionStatus: '',
                timeStamp: '',
                identificationNumber: '',
                unitsAlloted: null,
                navPrice: null,
                transactionId: '',
                bankAccountNumber: '',
                asnbReferenceNo: null,
                salesCharge: '',
                salesChargePercentage: '',
                investmentType: '',
            };

            const payload = {
                ...rawPayload,
                ...response,
            };

            actions = of(AsnbActions.createOrder({ payload }));

            const expected = AsnbActions.createOrderSuccess({ payload });

            effects.createOrder$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                expect(appService.showLoadingSpinner).toHaveBeenCalled();
                expect(appService.hideLoadingSpinner).toHaveBeenCalled();
                done();
            });
        });

        it('should return createOrderFailure action on failure', (done) => {
            const payload: AsnbCheckout = {
                stageTableId: '',
                guardianDetails: {
                    unitHolderId: '111222333444',
                    name: 'Major',
                },
                fundId: '',
                fundName: '',
                fundType: null,
                amount: 0,
                sof: {
                    id: 'SOF',
                    value: 'Source of fund',
                },
                sow: {
                    id: 'SOW',
                    value: 'Source of wealth',
                },
                bankCharge: 0,
                total: 0,
                transactionStatus: '',
                timeStamp: '',
                identificationNumber: '',
                unitsAlloted: null,
                navPrice: null,
                transactionId: '',
                bankAccountNumber: '',
                asnbReferenceNo: null,
                salesCharge: '',
                salesChargePercentage: '',
                investmentType: '',
            };
            const error = { message: 'Some error' };
            const spy = jest.spyOn(service, 'createOrder').mockReturnValue(throwError(error));

            actions = of(AsnbActions.createOrder({ payload }));

            const expected = AsnbActions.createOrderFailure({ error });

            effects.createOrder$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('createSubscription$', () => {
        it('should return createSubscriptionSuccess action on success without otp error', (done) => {
            const response: AsnbCreateSubscriptionResponse = {
                data: {
                    transactionStatus: '',
                    timeStamp: '2023-01-01T00:00:00.000+08:00',
                    identificationNumber: '',
                    unitsAlloted: 0,
                    navPrice: 0,
                    transactionId: '',
                    asnbReferenceNo: '',
                    netInvestment: 0,
                    salesCharge: '',
                    totalInvestment: 0,
                    feePct: '',
                },
                status: '',
                code: 0,
                message: '',
            };
            const spy = jest.spyOn(service, 'createSubscription').mockReturnValue(of(response));

            const state: AsnbCheckout = {
                stageTableId: '',
                guardianDetails: {
                    unitHolderId: '111222333444',
                    name: 'Major',
                },
                fundId: '',
                fundName: '',
                fundType: 'fixed price',
                amount: 0,
                bankCharge: 0,
                total: 0,
                transactionStatus: '000',
                timeStamp: '',
                identificationNumber: '',
                unitsAlloted: null,
                navPrice: null,
                transactionId: '',
                bankAccountNumber: '',
                asnbReferenceNo: null,
                salesCharge: '',
                salesChargePercentage: '',
                investmentType: '',
            };
            mockStore.overrideSelector(getCheckout, state);

            const request: AsnbCreateSubscriptionRequest = {
                stageTableId: '',
                otp: '',
                bankAccountNumber: '',
                transactionId: '',
                acctType: '',
                bankId: 0,
            };
            actions = of(AsnbActions.createSubscription({ payload: request }));

            const successPayload = {
                ...state,
                ...request,
                ...response.data,
                amount:
                    state.fundType === 'fixed price' ? state.amount : response.data.netInvestment,
                total:
                    state.fundType === 'fixed price' ? state.total : response.data.totalInvestment,
                salesChargePercentage: response.data.feePct,
            };
            const expected = new CartActions.StoreTransaction({
                referenceNumber: response.data.transactionId,
                transactionType: state.minorDetails ? 'Purchase for other' : 'Purchase',
                dateTime: response.data.timeStamp,
                fundName: state.fundName,
                transactionStatusName:
                    response.data.transactionStatus === '000' ? 'Successful' : 'Unsuccessful',
                payableAmount: state.total,
                transactionCode: '01',
                transactionDt: '01 Jan 2023',
                transactionTmSs: '12:00 AM',
                purchaseType: 'ASNB',
            });

            const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

            effects.createSubsciption$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(dispatchSpy).toHaveBeenCalledWith(
                    AsnbActions.createSubscriptionSuccess({ payload: successPayload }),
                );
                expect(dispatchSpy).toHaveBeenCalledWith(
                    WealthDashboardActions.updateLastUpdateTime({
                        timestamp: response.data.timeStamp,
                    }),
                );
                expect(spy).toHaveBeenCalled();
                expect(appService.showLoadingSpinner).toHaveBeenCalled();
                expect(appService.hideLoadingSpinner).toHaveBeenCalled();
                done();
            });
        });

        it('should return createSubscriptionSuccess action on success with otp error', (done) => {
            const response: AsnbCreateSubscriptionResponse = {
                data: {
                    transactionStatus: '',
                    timeStamp: '2023-01-01T00:00:00.000+08:00',
                    identificationNumber: '',
                    unitsAlloted: 0,
                    navPrice: 0,
                    transactionId: '',
                    asnbReferenceNo: '',
                    netInvestment: 0,
                    salesCharge: '',
                    totalInvestment: 0,
                    feePct: '',
                },
                status: '',
                code: 0,
                message: '',
                error: 'error',
            };
            const spy = jest.spyOn(service, 'createSubscription').mockReturnValue(of(response));

            const state: AsnbCheckout = {
                stageTableId: '',
                guardianDetails: {
                    unitHolderId: '111222333444',
                    name: 'Major',
                },
                fundId: '',
                fundName: '',
                fundType: 'fixed price',
                amount: 0,
                bankCharge: 0,
                total: 0,
                transactionStatus: '000',
                timeStamp: '',
                identificationNumber: '',
                unitsAlloted: null,
                navPrice: null,
                transactionId: '',
                bankAccountNumber: '',
                asnbReferenceNo: null,
                salesCharge: '',
                salesChargePercentage: '',
                investmentType: '',
            };
            mockStore.overrideSelector(getCheckout, state);

            jest.spyOn(document, 'getElementById').mockReturnValue({
                scrollIntoView: jest.fn(),
            } as any);

            const request: AsnbCreateSubscriptionRequest = {
                stageTableId: '',
                otp: '',
                bankAccountNumber: '',
                transactionId: '',
                acctType: '',
                bankId: 0,
            };
            actions = of(AsnbActions.createSubscription({ payload: request }));

            const expected = AsnbActions.loadCheckoutOTPFailure({ otpError: response });

            effects.createSubsciption$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('should return createSubscriptionFailure action on failure', () => {
            const request: AsnbCreateSubscriptionRequest = {
                stageTableId: '',
                otp: '',
                bankAccountNumber: '',
                transactionId: '',
                acctType: '',
                bankId: 0,
            };
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'createSubscription')
                .mockReturnValue(throwError(error));

            const state: AsnbCheckout = {
                stageTableId: '',
                guardianDetails: {
                    unitHolderId: '111222333444',
                    name: 'Major',
                },
                fundId: '',
                fundName: '',
                fundType: 'fixed price',
                amount: 0,
                bankCharge: 0,
                total: 0,
                transactionStatus: '000',
                timeStamp: '',
                identificationNumber: '',
                unitsAlloted: null,
                navPrice: null,
                transactionId: '',
                bankAccountNumber: '',
                asnbReferenceNo: null,
                salesCharge: '',
                salesChargePercentage: '',
                investmentType: '',
            };
            mockStore.overrideSelector(getCheckout, state);

            const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

            actions = of(AsnbActions.createSubscription({ payload: request }));

            const expected = AsnbActions.createSubscriptionFailure({ error });

            effects.createSubsciption$.subscribe();

            expect(spy).toHaveBeenCalled();
            expect(dispatchSpy).toHaveBeenCalledWith(expected);
        });
    });

    describe('loadTransactionLimit$', () => {
        it('should return loadTransactionLimitSuccess action on success', (done) => {
            const response: AsnbTransactionLimit = {
                currentLimit: 0,
                maxLimit: 5000,
            };
            const spy = jest.spyOn(service, 'getTransactionLimit').mockReturnValue(of(response));

            actions = of(AsnbActions.loadTransactionLimit());

            const expected = AsnbActions.loadTransactionLimitSuccess({ payload: response });

            effects.loadTransactionLimit$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('should return loadTransactionLimitFailure action on failure', (done) => {
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getTransactionLimit')
                .mockReturnValue(throwError(error));

            actions = of(AsnbActions.loadTransactionLimit());

            const expected = AsnbActions.loadTransactionLimitFailure({ error });

            effects.loadTransactionLimit$.subscribe((action) => {
                expect(action).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('fetchDashboardInfo$', () => {
        it('should show and hide loading spinner and dispatch fetchDashboardInfoSuccess', () => {
            // Mock the required actions
            const fetchDashboardInfoOwnAccountAction = AsnbActions.fetchDashboardInfoOwnAccount();
            const fetchDashboardInfoMinorAccountAction =
                AsnbActions.fetchDashboardInfoMinorAccount();
            const loadAsnbFundDetailsSuccessAction = AsnbActions.loadAsnbFundDetailsSuccess({
                payload: mockFundDetail,
            });
            const loadUserRiskStatusSuccessAction = AsnbActions.loadUserRiskStatusSuccess({
                payload: mockMemberList,
            });
            const loadTransactionLimitSuccessAction = AsnbActions.loadTransactionLimitSuccess({
                payload: mockState.transactionLimit,
            });
            const loadScheduledMaintenanceSuccessAction =
                AsnbActions.loadScheduledMaintenanceSuccess({
                    payload: mockASNBDowntimeScheduledMaintenance,
                });
            const loadFavouriteListSuccessAction = AsnbActions.loadFavouriteListSuccess();
            const updateDashboardInfoOwnAccount = AsnbActions.updateDashboardInfoOwnAccount();
            const updateDashboardInfoMinorAccount = AsnbActions.updateDashboardInfoMinorAccount();
            const updateDashboardInfoFavouriteList = AsnbActions.updateDashboardInfoFavouriteList();

            // Spy on the appService methods
            const showLoadingSpy = jest.spyOn(appService, 'showLoadingSpinner');
            const hideLoadingSpy = jest.spyOn(appService, 'hideLoadingSpinner');

            actions = of(
                fetchDashboardInfoOwnAccountAction,
                loadAsnbFundDetailsSuccessAction,
                loadUserRiskStatusSuccessAction,
                loadTransactionLimitSuccessAction,
                loadScheduledMaintenanceSuccessAction,
                loadFavouriteListSuccessAction,
            );

            effects.fetchDashboardInfo$.subscribe((result) => {
                expect(showLoadingSpy).toHaveBeenCalled(); // Verify that showLoadingSpinner() is called
                expect(hideLoadingSpy).toHaveBeenCalled(); // Verify that hideLoadingSpinner() is called
                expect(result).toEqual(AsnbActions.fetchDashboardInfoSuccess()); // Verify the dispatched action
            });

            actions = of(
                fetchDashboardInfoMinorAccountAction,
                loadAsnbFundDetailsSuccessAction,
                loadUserRiskStatusSuccessAction,
                loadTransactionLimitSuccessAction,
                loadScheduledMaintenanceSuccessAction,
                loadFavouriteListSuccessAction,
            );

            effects.fetchDashboardInfo$.subscribe((result) => {
                expect(showLoadingSpy).toHaveBeenCalled(); // Verify that showLoadingSpinner() is called
                expect(hideLoadingSpy).toHaveBeenCalled(); // Verify that hideLoadingSpinner() is called
                expect(result).toEqual(AsnbActions.fetchDashboardInfoSuccess()); // Verify the dispatched action
            });

            actions = of(updateDashboardInfoOwnAccount);

            effects.fetchDashboardInfo$.subscribe((result) => {
                expect(showLoadingSpy).toHaveBeenCalled(); // Verify that showLoadingSpinner() is called
                expect(hideLoadingSpy).toHaveBeenCalled(); // Verify that hideLoadingSpinner() is called
                expect(result).toEqual(AsnbActions.fetchDashboardInfoSuccess()); // Verify the dispatched action
            });

            actions = of(updateDashboardInfoMinorAccount);

            effects.fetchDashboardInfo$.subscribe((result) => {
                expect(showLoadingSpy).toHaveBeenCalled(); // Verify that showLoadingSpinner() is called
                expect(hideLoadingSpy).toHaveBeenCalled(); // Verify that hideLoadingSpinner() is called
                expect(result).toEqual(AsnbActions.fetchDashboardInfoSuccess()); // Verify the dispatched action
            });

            actions = of(updateDashboardInfoFavouriteList);

            effects.fetchDashboardInfo$.subscribe((result) => {
                expect(showLoadingSpy).toHaveBeenCalled(); // Verify that showLoadingSpinner() is called
                expect(hideLoadingSpy).toHaveBeenCalled(); // Verify that hideLoadingSpinner() is called
                expect(result).toEqual(AsnbActions.fetchDashboardInfoSuccess()); // Verify the dispatched action
            });
        });
    });

    describe('fetchScheduledMaintenance$', () => {
        it('should return loadScheduledMaintenanceSuccess action success path', (done) => {
            const spy = jest
                .spyOn(service, 'getASNBScheduledMaintenance')
                .mockReturnValue(of(mockASNBDowntimeScheduledMaintenance));

            actions = of(AsnbActions.loadScheduledMaintenance());

            const expected = AsnbActions.loadScheduledMaintenanceSuccess({
                payload: mockASNBDowntimeScheduledMaintenance,
            });

            effects.fetchScheduledMaintenance$.subscribe((action) => {
                expect(action).toEqual(expected);
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('should return loadScheduledMaintenanceFailure action failure path', (done) => {
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getASNBScheduledMaintenance')
                .mockReturnValue(throwError(error));

            actions = of(AsnbActions.loadScheduledMaintenance());

            const expected = AsnbActions.loadScheduledMaintenanceFailure({
                error,
            });

            effects.fetchScheduledMaintenance$.subscribe((action) => {
                expect(action).toEqual(expected);
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('loadSofSowList$', () => {
        it('should return loadSofSowListSuccess action on success', (done) => {
            const response: AsnbLookupParamApiResponse = {
                SOURCEOFFUND: [
                    { paramValue: 'paramValue1', paramText: 'Param Text 1' },
                    { paramValue: 'paramValue2', paramText: 'Param Text 2' },
                    { paramValue: 'paramValue3', paramText: 'Param Text 3' },
                ],
            };
            const spy = jest
                .spyOn(service, 'getSourceOfWealthAndFunds')
                .mockReturnValue(of(response));

            mockStore.overrideSelector(getSofSowList, []);

            actions = of(AsnbActions.loadSofSowList());

            const payload = response.SOURCEOFFUND.map((item) => ({
                id: item.paramValue,
                value: item.paramText,
            }));

            const expected = AsnbActions.loadSofSowListSuccess({ payload });

            effects.loadSofSowList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('should return loadSofSowListFailure action on failure', (done) => {
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getSourceOfWealthAndFunds')
                .mockReturnValue(throwError(error));

            mockStore.overrideSelector(getSofSowList, []);

            actions = of(AsnbActions.loadSofSowList());

            const expected = AsnbActions.loadSofSowListFailure({ error });

            effects.loadSofSowList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('eligible fund codes', () => {
        it('should return loadEligibleFunds action on success', (done) => {
            const spy = jest
                .spyOn(service, 'getEligibleFunds')
                .mockReturnValue(of(mockASNBEligibleFundCodes));

            actions = of(
                AsnbActions.loadEligibleFunds({
                    payload: mockASNBEligibleFundCodes,
                }),
            );

            const expected = AsnbActions.loadEligibleFundsSuccess({
                payload: mockASNBEligibleFundCodes,
            });

            effects.fetchElibleFunds$.subscribe((action) => {
                expect(action).toEqual(expected);
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('should return loadEligibleFunds action on failure', (done) => {
            const error = { message: 'Some error' };
            const spy = jest.spyOn(service, 'getEligibleFunds').mockReturnValue(throwError(error));

            actions = of(
                AsnbActions.loadEligibleFunds({
                    payload: mockASNBEligibleFundCodes,
                }),
            );

            const expected = AsnbActions.loadEligibleFundsFailure({ error });

            effects.fetchElibleFunds$.subscribe((action) => {
                expect(action).toEqual(expected);
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });

    describe('loadOperationHourDetails$', () => {
        it('should return loadOperationHourSuccess action on success', (done) => {
            const response: OperationHourResponse = {
                startTime: '02:00',
                endTime: '21:00',
            };
            const spy = jest
                .spyOn(service, 'getOperationHourDetails')
                .mockReturnValue(of(response));

            mockStore.overrideSelector(getOperationHourDetails, {
                startTime: null,
                endTime: null,
            });

            actions = of(AsnbActions.loadOperationHourDetails());

            const expected = AsnbActions.loadOperationHourDetailsSuccess({ payload: response });

            effects.loadOperationHourDetails$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalledWith();
                done();
            });
        });

        it('should return loadOperationHourFailure action on failure', (done) => {
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getOperationHourDetails')
                .mockReturnValue(throwError(error));

            mockStore.overrideSelector(getOperationHourDetails, {
                startTime: null,
                endTime: null,
            });

            actions = of(AsnbActions.loadOperationHourDetails());

            const expected = AsnbActions.loadOperationHourDetailsFailure({ error });

            effects.loadOperationHourDetails$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('loadExternalUrlList$', () => {
        it('should return loadExternalUrlListSuccess action on success', (done) => {
            const response: UrlMaintenanceApiResponse[] = [
                { urlCode: '1', urlDesc: 'Link 1' },
                { urlCode: '2', urlDesc: 'Link 2' },
                { urlCode: '3', urlDesc: 'Link 3' },
            ];
            const spy = jest.spyOn(service, 'getExternalUrlList').mockReturnValue(of(response));

            mockStore.overrideSelector(getExternalUrlList, {});

            actions = of(AsnbActions.loadExternalUrlList());

            const payload = response.reduce((acc, item) => {
                if (item.urlCode === '1') return { ...acc, fundPrice: item.urlDesc };
                else if (item.urlCode === '2') return { ...acc, prospectus: item.urlDesc };
                else return acc;
            }, {});

            const expected = AsnbActions.loadExternalUrlListSuccess({ payload });

            effects.loadExternalUrlList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('should return loadExternalUrlListFailure action on failure', (done) => {
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getExternalUrlList')
                .mockReturnValue(throwError(error));

            mockStore.overrideSelector(getExternalUrlList, {});

            actions = of(AsnbActions.loadExternalUrlList());

            const expected = AsnbActions.loadExternalUrlListFailure({ error });

            effects.loadExternalUrlList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('loadIdTypeList$', () => {
        it('should return loadIdTypeListSuccess action on success', (done) => {
            const response = [
                { idType: 'ID1', description: 'Identification 1' },
                { idType: 'ID2', description: 'Identification 2' },
            ];
            const spy = jest.spyOn(service, 'getIdTypeList').mockReturnValue(of(response));

            mockStore.overrideSelector(getIdTypeList, []);

            actions = of(AsnbActions.loadIdTypeList());

            const payload = response.map((item) => ({ id: item.idType, value: item.description }));

            const expected = AsnbActions.loadIdTypeListSuccess({ payload });

            effects.loadIdTypeList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('should return loadIdTypeListFailure action on failure', (done) => {
            const error = { message: 'Some error' };
            const spy = jest.spyOn(service, 'getIdTypeList').mockReturnValue(throwError(error));

            mockStore.overrideSelector(getIdTypeList, []);

            actions = of(AsnbActions.loadIdTypeList());

            const expected = AsnbActions.loadIdTypeListFailure({ error });

            effects.loadIdTypeList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('loadRelationshipList$', () => {
        it('should return loadRelationshipListSuccess action on success', (done) => {
            const response = {
                THIRDPARTYRELATIONSHIP: [
                    { paramValue: 'R1', paramText: 'Relationship 1' },
                    { paramValue: 'R2', paramText: 'Relationship 2' },
                ],
            };
            const spy = jest.spyOn(service, 'getRelationshipList').mockReturnValue(of(response));

            mockStore.overrideSelector(getRelationshipList, []);

            actions = of(AsnbActions.loadRelationshipList());

            const payload = response.THIRDPARTYRELATIONSHIP.map((item) => ({
                id: item.paramText,
                value: item.paramText,
            }));
            const expected = AsnbActions.loadRelationshipListSuccess({ payload });

            effects.loadRelationshipList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('should return loadRelationshipListFailure action on failure', (done) => {
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getRelationshipList')
                .mockReturnValue(throwError(error));

            mockStore.overrideSelector(getRelationshipList, []);

            actions = of(AsnbActions.loadRelationshipList());

            const expected = AsnbActions.loadRelationshipListFailure({ error });

            effects.loadRelationshipList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('loadTransferReasonList$', () => {
        it('should return transferReasonListSuccess action on success', (done) => {
            const response: AsnbLookupParamApiTransferReasonResponse = {
                REASONFORTRANSFER: [{ paramValue: 'SAV', paramText: 'Savings' }],
            };
            const spy = jest.spyOn(service, 'getTransferReasons').mockReturnValue(of(response));

            mockStore.overrideSelector(getTransferReasonList, []);

            actions = of(AsnbActions.loadTransferReasonList());

            const payload = response.REASONFORTRANSFER.map((item) => ({
                id: item.paramValue,
                value: item.paramText,
            }));

            const expected = AsnbActions.loadTransferReasonListSuccess({ payload });

            effects.loadTransferReasonList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });

        it('should return loadTransferReasonListFailure action on failure', (done) => {
            const error = { message: 'Some error' };
            const spy = jest
                .spyOn(service, 'getTransferReasons')
                .mockReturnValue(throwError(error));

            mockStore.overrideSelector(getTransferReasonList, []);

            actions = of(AsnbActions.loadTransferReasonList());

            const expected = AsnbActions.loadTransferReasonListFailure({ error });

            effects.loadTransferReasonList$.subscribe((result) => {
                expect(result).toEqual(expected);
                expect(spy).toHaveBeenCalled();
                done();
            });
        });
    });
});
