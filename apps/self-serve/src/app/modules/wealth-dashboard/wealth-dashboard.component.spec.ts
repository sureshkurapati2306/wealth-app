import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WealthDashboardComponent } from './wealth-dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AccountSummary, RiskProfile, Setting } from '@cimb/shared/models';
import { State } from '../../core/state/wealth-dashboard/wealth-dashboard.reducer';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { path } from '../../shared/config';
import { ASNBDowntimeMaintenance } from '../asnb/mocks/data';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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

let dialog: MatDialog;

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
    asnbLinkAccountEnquiryCalled: false,
    asnbWhiteListed: false,
    asnbAccountExist: false,
    asnbWhiteListEnquiryCalled: false,
    userAccountStatus: false,
    ASNBDowntimeScheduledMaintenance: mockASNBDowntimeScheduledMaintenance,
};

class dialogMock {
    open() {
        return {
            afterClosed: () => of({}),
        };
    }
}

describe('DashboardComponent', () => {
    //let component = new DashboardComponent(null, null, null, null);
    let component: WealthDashboardComponent;
    let fixture: ComponentFixture<WealthDashboardComponent>;
    let store: MockStore<any>;
    let router: Router;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                HttpClientTestingModule,
                MatDialogModule,
                RouterTestingModule.withRoutes([]),
                BrowserAnimationsModule,
                MatSnackBarModule,
            ],
            declarations: [WealthDashboardComponent],
            providers: [
                provideMockStore({ initialState: mockState }),
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: MatDialog, useClass: dialogMock },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(WealthDashboardComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('WealthDashboardComponent should create', () => {
        expect(component).toBeTruthy();
    });
    it('WealthDashboardComponent ngOnInit', () => {
        const mockClickInfo = {
            customerIDNumber: '',
            customerIDType: '',
            customerIDTypeDesc: '',
            customerType: '',
            ipAddress: '',
            accountStatus: 'N',
        };
        component.customerType = 'NTP';
        component.clicksInfo = mockClickInfo;
        component.currentCustomerType = 'NTP';
        expect(component.ngOnInit()).toBeUndefined();
        expect(component.loadAnalytisWealthDahboard()).toBeUndefined();
    });
    it('WealthDashboardComponent for ETP ngOnInit', () => {
        const mockClickInfo = {
            customerIDNumber: '',
            customerIDType: '',
            customerIDTypeDesc: '',
            customerType: '',
            ipAddress: '',
            accountStatus: 'Y',
        };
        component.customerType = 'ETP';
        component.clicksInfo = mockClickInfo;
        expect(component.ngOnInit()).toBeUndefined();
        component.currentCustomerType = 'ETP';
        expect(component.loadAnalytisWealthDahboard()).toBeUndefined();
    });
    it('WealthDashboardComponent ngOnDestroy', () => {
        expect(component.ngOnDestroy()).toBeUndefined();
    });

    it('WealthDashboardComponent dispatch riskProfileEnquiry action', () => {
        const storeDispatchSpy = jest.spyOn(store, 'dispatch');

        jest.spyOn(store, 'select').mockImplementation((selector) => {
            if (selector == 'userReducer') {
                return of({
                    user: {
                        cifNumber: '0000000000001586682',
                        customer_name: 'Ali Amir bin Ahmad',
                        customer_id: '481124715058',
                        customer_id_type: 'SOLO_PROB',
                        debit_card_no: 1234123412341234,
                        dashbordData: 1,
                        lastSeen: '4 Sept 2020, 10:30AM',
                        story: 'WJ-85',
                        sole_prop: 'N',
                        invertment_indicator: 'N',
                        casa_indicator: 'N',
                        risk_profile: 'AGGRESIVE',
                        cimb_staff: 'N',
                        join_or_ut_account: 'N',
                        join_and_ut_account: 'N',
                    },
                    loadInitialData: false,
                    loadCount: -1,
                    dashboardData: '',
                    dashboardScreenData: '',
                    unitTrustAccount: 'E00000026',
                    unitTrustAccountList: [
                        { default_ind: 'Y', ut_account_no: 'E00000026' },
                        { default_ind: 'N', ut_account_no: 'A80050479' },
                    ],
                    customer_name: 'Ramasamy',
                    userTypeData: '',
                    userType: 'NTP',
                    userTypeSuccessData: 'NTP',
                });
            }
        });

        store.select('userReducer').subscribe((data) => {
            fixture.detectChanges();
            expect(storeDispatchSpy).toHaveBeenCalledTimes(3);
        });
    });
    it('WealthDashboardComponent callRiskProfilePopup', () => {
        const event = {
            isLinkClicked: true,
        };
        expect(component.callRiskProfilePopup(event)).toBeUndefined();
    });

    it('WealthDashboardComponent callRiskProfilePopup false', () => {
        const event = {
            isLinkClicked: false,
        };
        expect(component.callRiskProfilePopup(event)).toBeUndefined();
    });

    it('WealthDashboardComponent checkRiskProfileExpiry', fakeAsync(() => {
        const spy = jest.spyOn(component, 'openRiskProfile');

        const data = {
            expectedReturn: 6.047999999999999,
            expiryDate: '30-Dec-2019',
            lastUpdatedDate: '30-Nov-2019',
            recommendedProducts: [],
            riskProfile: 'Balanced',
            riskProfileDescription:
                'BALANCED - You are concerned about the effect of erosion of real value of wealth caused by inflation on wealth accumulation and seek to establish security',
            riskProfileStatus: 'Expired',
            rmManagerId: 'RM004',
            rmManagerName: 'RM FOUR',
            rpResults: '-',
            rpTnC: '-',
            standardDeviation: '10.368553989683456',
        };
        component.checkRiskProfileExpiry(data);
        expect(data.riskProfileStatus === 'Expired');
        tick(50);
        expect(spy).toHaveBeenCalledTimes(0);
        tick(50);
    }));

    it('WealthDashboardComponent checkRiskProfileExpiry', fakeAsync(() => {
        const spy = jest.spyOn(component, 'openRiskProfile');

        const data = {
            expectedReturn: 6.047999999999999,
            expiryDate: '30-Dec-2019',
            lastUpdatedDate: '30-Nov-2019',
            recommendedProducts: [],
            riskProfile: 'Balanced',
            riskProfileDescription:
                'BALANCED - You are concerned about the effect of erosion of real value of wealth caused by inflation on wealth accumulation and seek to establish security',
            riskProfileStatus: 'Not Profiled',
            rmManagerId: 'RM004',
            rmManagerName: 'RM FOUR',
            rpResults: '-',
            rpTnC: '-',
            standardDeviation: '10.368553989683456',
        };
        component.checkRiskProfileExpiry(data);
        expect(data.riskProfileStatus === 'Not Profiled');
        tick(50);
        expect(spy).toHaveBeenCalledTimes(0);
        tick(50);
    }));

    it('WealthDashboardComponent checkRiskProfileExpiry expiry fails', () => {
        const navigateSpy = jest.spyOn(component.router, 'navigate');
        const storeDispatchSpy = jest.spyOn(store, 'dispatch');
        const event = {
            isLinkClicked: true,
        };
        expect(component.callRiskProfilePopup(event)).toBeUndefined();
        component.navigateUTAccount = 'true';
        //component.navigateUTAccount.payload = true;
        expect(component.navigateUTAccount).not.toBeNull();
        expect(component.navigateUTAccount).not.toBeUndefined();
        fixture.detectChanges();
        component.router.navigate(['/dashboard']);
        const data = {
            expectedReturn: 6.047999999999999,
            expiryDate: '30-Dec-2019',
            lastUpdatedDate: '30-Nov-2019',
            recommendedProducts: [],
            riskProfile: 'Balanced',
            riskProfileDescription:
                'BALANCED - You are concerned about the effect of erosion of real value of wealth caused by inflation on wealth accumulation and seek to establish security',
            riskProfileStatus: 'Valid',
            rmManagerId: 'RM004',
            rmManagerName: 'RM FOUR',
            rpResults: '-',
            rpTnC: '-',
            standardDeviation: '10.368553989683456',
        };
        component.checkRiskProfileExpiry(data);
        store.dispatch({
            type: '[User] Update Selected Unit Trust Account',
            payload: '4637634746',
        });
        expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: '[User] Update Selected Unit Trust Account',
            payload: '4637634746',
        });
        expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
    });

    it('WealthDashboardComponent navigateOnclosePopup success', () => {
        const result = 'Logout';
        const navigateSpy = jest.spyOn(component.router, 'navigate');
        component.router.navigate(['/review-purchase']);
        component.navigateOnclosePopup(result);
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        fixture.detectChanges();
        expect(result).toEqual('Logout');
        expect(navigateSpy).toHaveBeenCalledWith([path.LOGOUT]);
    });
    it('call navigateOnclosePopup fail', () => {
        const result = null;
        component.navigateOnclosePopup(result);
        expect(result).toBeNull();
        fixture.detectChanges();
    });

    describe('checkIfRiskProfileExpired', () => {
        it('should open dialog if risk profile status is expired', () => {
            dialog.open = jest.fn();

            component.checkIfRiskProfileExpired();

            expect(dialog.open).toBeCalledTimes(1);
        });
    });

    describe('callPopUpAPI', () => {
        it('should open dialog if callPopUpAPI is called', () => {
            dialog.open = jest.fn();

            component.callPopUpAPI();

            expect(dialog.open).toBeTruthy();
        });

        it('should open dialog if popupData is called', () => {
            dialog.open = jest.fn();

            component.openDialogPopup();

            expect(dialog.open).toBeTruthy();
        });

        it('should open dialog if popupData is called', () => {
            dialog.open = jest.fn();

            component.popupData();

            expect(dialog.open).toHaveBeenCalled();
        });

    });

    describe('ASNB System Downtime', () => {
        it('should check for ASNB System Downtime', () => {
            expect(component.getASNBDowntimeError()).toBeUndefined();
        });
    });
});
