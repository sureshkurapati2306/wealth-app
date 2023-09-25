import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { State } from './wealth-dashboard.reducer';
import { ASNBWhiteList, AccountSummary, RiskProfile, Setting } from '@cimb/shared/models';
import * as Actions from './wealth-dashboard.actions';
import { WealthDashboardEffects } from './wealth-dashboard.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { WealthService } from '../../services/wealth-dashboard/wealth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AsnbService } from '../../../modules/asnb/services/asnb.service';
import { AsnbApiResponse } from '../../../modules/asnb/models';
import { ASNBDowntimeMaintenance } from '../../../modules/asnb/mocks/data';


const mockASNBDowntimeScheduledMaintenance: any = ASNBDowntimeMaintenance;
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

const riskProfileEnquiryMockData: RiskProfile = {
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

const asnbWhiteListMockData: ASNBWhiteList = {
    validateWhitelisted: true,
};

const asnbLinkAccountMockData = {
    accountExist: true,
};

const asnbUserAccountStatusMockData: AsnbApiResponse = {
    status: 'success',
    code: 200,
    message: 'Success',
    data: true,
};

const mockState: State = {
    riskProfile: riskProfileEnquiryMockData,
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
    ASNBDowntimeScheduledMaintenance: null,
};



class MockWealthService {
    getAccountSummary() {
        /* mock */
    }
    getRiskProfileEnquiry() {
        /* mock */
    }
    getAccountSummaryWithoutCif() {
        /* mock */
    }
    getSettingsData() {
        /* mock */
    }
}

class MockAsnbService {
    checkWhitelist() {
        /* mock */
    }
    getAccountLinkingStatus() {
        /* mock */
    }
    getUserAccountStatus() {
        /* mock */
    }
    getASNBScheduledMaintenance() {
        /* mock */
    }
}

describe('WealthDashboardEffects', () => {
    let actions$: Observable<any>;
    let effects: WealthDashboardEffects;
    let store: MockStore<any>;
    let wealthService: WealthService;
    let asnbService: AsnbService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                WealthDashboardEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState: mockState }),
                {
                    provide: WealthService,
                    useClass: MockWealthService,
                },
                {
                    provide: AsnbService,
                    useClass: MockAsnbService,
                },
            ],
        });

        effects = TestBed.inject(WealthDashboardEffects);
        store = TestBed.inject(MockStore);
        wealthService = TestBed.inject(WealthService);
        asnbService = TestBed.inject(AsnbService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should run loadAccountSummary Success path', (done) => {
        const spy = jest
            .spyOn(wealthService, 'getAccountSummary')
            .mockReturnValue(of(accountSummaryMockData));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(
            Actions.loadAccountSummary({
                data: {
                    bankId: '',
                    branchId: '',
                    govIssueIdentType: 'New IC',
                },
            }),
        );

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.loadAccountSummary$.subscribe((action) => {
            expect(action).toEqual(
                Actions.loadAccountSummarySuccess({
                    data: accountSummaryMockData,
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should run loadAccountSummary Failure path', (done) => {
        const spy = jest
            .spyOn(wealthService, 'getAccountSummary')
            .mockReturnValue(throwError('Mock error'));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(
            Actions.loadAccountSummary({
                data: {
                    bankId: '',
                    branchId: '',
                    govIssueIdentType: 'New IC',
                },
            }),
        );

        // subscribe to the Effect stream and verify it dispatches a FAILURE action
        effects.loadAccountSummary$.subscribe((action) => {
            expect(action).toEqual(
                Actions.loadAccountSummaryFailure({
                    error: 'Mock error',
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should run getRiskProfileEnquiry Success path', (done) => {
        const spy = jest
            .spyOn(wealthService, 'getRiskProfileEnquiry')
            .mockReturnValue(of(riskProfileEnquiryMockData));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(
            Actions.riskProfileEnquiry({
                data: {
                    custName: 'CEFRR ESOTVU EUM LPLCUU',
                    custIdType: '',
                    custIdIssue: '',
                },
            }),
        );

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.riskProfile$.subscribe((action) => {
            expect(action).toEqual(
                Actions.riskProfileEnquirySuccess({
                    data: riskProfileEnquiryMockData,
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should run getRiskProfileEnquiry Failure path', (done) => {
        const spy = jest
            .spyOn(wealthService, 'getRiskProfileEnquiry')
            .mockReturnValue(throwError('Mock error'));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(
            Actions.riskProfileEnquiry({
                data: {
                    custName: 'CEFRR ESOTVU EUM LPLCUU',
                    custIdType: '',
                    custIdIssue: '',
                },
            }),
        );

        // subscribe to the Effect stream and verify it dispatches a FAILURE action
        effects.riskProfile$.subscribe((action) => {
            expect(action).toEqual(
                Actions.riskProfileEnquiryFailure({
                    error: 'Mock error',
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    // it('should run getSettingsData Success path', (done) => {
    //     const spy = jest
    //         .spyOn(wealthService, 'getSettingsData')
    //         .mockReturnValue(of(settingsMockData));

    //     // create an actions stream and immediately dispatch a GET action
    //     actions$ = of(Actions.settingsData());

    //     // subscribe to the Effect stream and verify it dispatches a SUCCESS action

    //     effects.settingsData$.subscribe((action) => {
    //         expect(action).toEqual(
    //             Actions.settingsDataSuccess({
    //                 data: settingsMockData,
    //             }),
    //         );
    //         expect(spy).toHaveBeenCalledTimes(1);
    //         done();
    //     });
    // });

    // it('should run getSettingsData Failure path', (done) => {
    //     const error = new Error('Mock error');
    //     const spy = jest.spyOn(wealthService, 'getSettingsData').mockReturnValue(throwError(error));

    //     // create an actions stream and immediately dispatch a GET action
    //     actions$ = of(Actions.settingsData());

    //     // subscribe to the Effect stream and verify it dispatches a FAILURE action
    //     effects.settingsData$.subscribe((action) => {
    //         expect(action).toEqual(
    //             Actions.settingsDataFailure({
    //                 error: 'Mock error',
    //             }),
    //         );
    //         expect(spy).toHaveBeenCalledTimes(1);
    //         done();
    //     });
    // });

    it('should run asnbWhiteListEnquiry Success path', (done) => {
        const spy = jest
            .spyOn(asnbService, 'checkWhitelist')
            .mockReturnValue(of(asnbWhiteListMockData));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(Actions.asnbWhiteListEnquiry());

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.asnbWhiteList$.subscribe((action) => {
            expect(action).toEqual(
                Actions.asnbWhiteListEnquirySuccess({
                    data: asnbWhiteListMockData,
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should run asnbWhiteListEnquiry Failure path', (done) => {
        const spy = jest
            .spyOn(asnbService, 'checkWhitelist')
            .mockReturnValue(throwError('Mock error'));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(Actions.asnbWhiteListEnquiry());

        // subscribe to the Effect stream and verify it dispatches a FAILURE action
        effects.asnbWhiteList$.subscribe((action) => {
            expect(action).toEqual(
                Actions.asnbWhiteListEnquiryFailure({
                    error: 'Mock error',
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should run asnbLinkAccountEnquiry Success path', (done) => {
        const spy = jest
            .spyOn(asnbService, 'getAccountLinkingStatus')
            .mockReturnValue(of(asnbLinkAccountMockData));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(Actions.asnbLinkAccountEnquiry());

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.asnbLinkAccount$.subscribe((action) => {
            expect(action).toEqual(
                Actions.asnbLinkAccountEnquirySuccess({
                    data: asnbLinkAccountMockData,
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should run asnbLinkAccountEnquiry Failure path', (done) => {
        const spy = jest
            .spyOn(asnbService, 'getAccountLinkingStatus')
            .mockReturnValue(throwError('Mock error'));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(Actions.asnbLinkAccountEnquiry());

        // subscribe to the Effect stream and verify it dispatches a FAILURE action
        effects.asnbLinkAccount$.subscribe((action) => {
            expect(action).toEqual(Actions.asnbLinkAccountEnquiryFailure());
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should run loadAsnbUserAccountStatus Success path', (done) => {
        const spy = jest
            .spyOn(asnbService, 'getUserAccountStatus')
            .mockReturnValue(of(asnbUserAccountStatusMockData));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(Actions.loadAsnbUserAccountStatus());

        // subscribe to the Effect stream and verify it dispatches a SUCCESS action
        effects.loadAsnbUserAccountStatus$.subscribe((action) => {
            expect(action).toEqual(
                Actions.loadAsnbUserAccountStatusSuccess({
                    payload: asnbUserAccountStatusMockData,
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should run loadAsnbUserAccountStatus Failure path', (done) => {
        const spy = jest
            .spyOn(asnbService, 'getUserAccountStatus')
            .mockReturnValue(throwError('Mock error'));

        // create an actions stream and immediately dispatch a GET action
        actions$ = of(Actions.loadAsnbUserAccountStatus());

        // subscribe to the Effect stream and verify it dispatches a FAILURE action
        effects.loadAsnbUserAccountStatus$.subscribe((action) => {
            expect(action).toEqual(
                Actions.loadAsnbUserAccountStatusFailure({
                    error: 'Mock error',
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    //asnb scheduled downtime
    it('should get ASNB Downtime Maintenance on success path', (done) => {
        const spy = jest
            .spyOn(asnbService, 'getASNBScheduledMaintenance')
            .mockReturnValue(of(mockASNBDowntimeScheduledMaintenance));

        actions$ = of(Actions.WDLoadScheduledMaintenance());

        effects.fetchScheduledMaintenance$.subscribe((action) => {
            expect(action).toEqual(
                Actions.WDLoadScheduledMaintenanceSuccess({
                    payload: mockASNBDowntimeScheduledMaintenance,
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should get ASNB Downtime Maintenance on failed path', (done) => {
        const spy = jest
            .spyOn(asnbService, 'getASNBScheduledMaintenance')
            .mockReturnValue(throwError('Mock error'));

        actions$ = of(Actions.WDLoadScheduledMaintenance());

        effects.fetchScheduledMaintenance$.subscribe((action) => {
            expect(action).toEqual(
                Actions.WDLoadScheduledMaintenanceFailure({
                    error: 'Mock error',
                }),
            );
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
     });
});
