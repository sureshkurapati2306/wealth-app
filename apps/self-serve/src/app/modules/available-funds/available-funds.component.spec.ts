import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from '../../core/services/cart/cart.service';

import { CimbCommonModule, fundSort } from '@cimb/common';

import { AvailableFundsComponent } from './available-funds.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MintModule, MintMultiSelectCheckboxModule } from '@cimb/mint';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EffectsModule } from '@ngrx/effects';
import {
    getAssetsClasses,
    getFundDetail,
    getFundHouse,
    getRiskCategories,
} from './+state/available-funds.selectors';
import {
    mockAssetsClassesResponse,
    mockFundHouseResponse,
    mockfundListResponse,
    mockRiskCategories,
} from './mock/data';

describe('AvailableFundsComponent', () => {
    let component: AvailableFundsComponent;
    let fixture: ComponentFixture<AvailableFundsComponent>;
    let bottomSheet: any;
    let formBuilder: FormBuilder;
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AvailableFundsComponent],
            imports: [
                HttpClientTestingModule,
                BrowserAnimationsModule,
                MatDialogModule,
                RouterTestingModule,
                StoreModule.forRoot({}),
                NgxPaginationModule,
                CimbCommonModule,
                MintModule,
                MintMultiSelectCheckboxModule,
                MatCheckboxModule,
                EffectsModule.forRoot([]),
                MatBottomSheetModule,
                ReactiveFormsModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                FormBuilder,
                CartService,
                DecimalPipe,
                provideMockStore({
                    initialState: {
                        riskCategories: null,
                        assetsClasses: null,
                        fundHouse: null,
                        fundDetail: null,
                    },
                    selectors: [
                        { selector: getRiskCategories, value: mockRiskCategories },
                        { selector: getAssetsClasses, value: mockAssetsClassesResponse },
                        { selector: getFundHouse, value: mockFundHouseResponse },
                        { selector: getFundDetail, value: mockfundListResponse },
                    ],
                }),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AvailableFundsComponent);
        component = fixture.componentInstance;
        bottomSheet = TestBed.inject(MatBottomSheet);
        formBuilder = TestBed.inject(FormBuilder);
        store = TestBed.inject(MockStore);

        // form mock data
        component.searchForm = formBuilder.group({
            riskControl: ['risk1'],
            fundHouseControl: ['house1,house2'],
            assetsClassesControl: ['asset1'],
            syariahCompliant: ['Y'],
            esgFund: ['Y']
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onFundsByClientId()', () => {
        it('should call list of funds by client Id', () => {
            component.onFundsByClientId();
        });
    });

    it('AvailableFundsComponent addToCartEvent defined', () => {
        expect(component.ngOnInit()).toBeUndefined();
        const availableFocusFundsData = [
            { recommend_fund: 'Y', fund_name: 'AMITTIKAL LE', cartAmount: 1000 },
            {
                recommend_fund: 'N',
                fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
                cartAmount: 2000,
            },
        ];
        const availableFundsData = [
            { recommend_fund: 'Y', fund_name: 'PRINCIPAL LE', cartAmount: 1000 },
            {
                recommend_fund: 'N',
                fund_name: 'PRINCIPAL AMPAN EUROPEAN PROPERTY EQUITIES GE',
                cartAmount: 2000,
            },
        ];

        const value = {
            amount: '1000',
            index: '-1',
            availableFocusFundsData: availableFocusFundsData,
            availableFundsData: availableFundsData,
        };

        expect(component.ngOnInit()).toBeUndefined();
        const tabViewName = 'CIMB Focus Funds';
        expect(component.loadAdobeAnalytics(tabViewName)).toBeUndefined();
    });

    it('AvailableFundsComponent addToCartEvent defined if case', () => {
        expect(component.ngOnInit()).toBeUndefined();
        const availableFocusFundsData = [
            { recommend_fund: 'Y', fund_name: 'AMITTIKAL LE', cartAmount: 1000, index: 0 },
            {
                recommend_fund: 'N',
                fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
                cartAmount: 2000,
                index: 1,
            },
        ];
        const availableFundsData = [
            { recommend_fund: 'Y', fund_name: 'PRINCIPAL LE', cartAmount: 1000, index: 0 },
            {
                recommend_fund: 'N',
                fund_name: 'PRINCIPAL AMPAN EUROPEAN PROPERTY EQUITIES GE',
                cartAmount: 2000,
                index: 1,
            },
        ];

        const value = {
            amount: '1000',
            index: '1',
            availableFocusFundsData: availableFocusFundsData,
            availableFundsData: availableFundsData,
        };

        expect(component.ngOnInit()).toBeUndefined();
        component.fundObj = { sales_charge: 0, risk_ind: 'Y' };

        component.fundObj = { sales_charge: 1.0, risk_ind: 'Y' };
        expect(component.fundObj).toEqual({ sales_charge: 1.0, risk_ind: 'Y' });
    });

    it('AvailableFundsComponent removeFromCartEvent -  clicked', () => {
        expect(component.removeFromCartEvent(0, 'CODE')).toBeTruthy();
    });

    it('AvailableFundsComponent backButtonEvent -  clicked', () => {
        component.currentUrl = '/dashboard;tab=0';
        expect(component.backButtonEvent()).toBeUndefined();
    });

    it('call toggle < 101 ', () => {
        component.counter = 90;
        component.toggle();
        expect(component.counter).not.toBe(90);
    });

    it('call toggle > 101 ', () => {
        component.counter = 190;
        component.toggle();
        expect(component.counter).not.toBe(190);
    });

    it('fundSort should call fundNameAsc', () => {
        const sortValue = 'fundNameAsc';
        const fund_list = [
            {
                class_seq: '1',
                fund_name: 'AMITTIKAL LE',
            },
            {
                class_seq: '3',
                fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('fundSort should call fundNameDsc', () => {
        const sortValue = 'fundNameDsc';
        const fund_list = [
            {
                class_seq: '1',
                fund_name: 'AMITTIKAL LE',
            },
            {
                class_seq: '3',
                fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('fundSort should call assetAsc', () => {
        const sortValue = 'assetAsc';
        const fund_list = [
            {
                class_seq: '1',
                class_name: 'GLOBAL EQUITY',
            },
            {
                class_seq: '3',
                class_name: 'LOCAL EQUITY',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('fundSort should call assetDsc', () => {
        const sortValue = 'assetDsc';
        const fund_list = [
            {
                class_seq: '1',
                class_name: 'GLOBAL EQUITY',
            },
            {
                class_seq: '3',
                class_name: 'LOCAL EQUITY',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('fundSort should call navPriceAsc', () => {
        const sortValue = 'navPriceAsc';
        const fund_list = [
            {
                class_seq: '1',
                nav_price: '1.4018',
            },
            {
                class_seq: '3',
                nav_price: '1.021',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('fundSort should call navPriceDsc', () => {
        const sortValue = 'navPriceDsc';
        const fund_list = [
            {
                class_seq: '1',
                nav_price: '1.4018',
            },
            {
                class_seq: '3',
                nav_price: '1.021',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('fundSort should call perf1Asc', () => {
        const sortValue = 'perf1Asc';
        const fund_list = [
            {
                class_seq: '1',
                one_month: '5.52',
            },
            {
                class_seq: '3',
                one_month: '0.32',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('fundSort should call perf1Dsc', () => {
        const sortValue = 'perf1Dsc';
        const fund_list = [
            {
                class_seq: '1',
                one_month: '5.52',
            },
            {
                class_seq: '3',
                one_month: '0.32',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('fundSort should call perf3Asc', () => {
        const sortValue = 'perf3Asc';
        const fund_list = [
            {
                class_seq: '1',
                three_month: '12.10',
            },
            {
                class_seq: '3',
                three_month: '7.21',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('fundSort should call perf3Dsc', () => {
        const sortValue = 'perf3Dsc';
        const fund_list = [
            {
                class_seq: '1',
                three_month: '12.10',
            },
            {
                class_seq: '3',
                three_month: '7.21',
            },
        ];
        expect(fundSort(fund_list, sortValue)).toBeTruthy();
    });

    it('should cal the onRiskSelected()', () => {
        expect(component.onRiskSelected(true)).toBeUndefined();
        expect(component.riskSelected).toBeTruthy();
    });

    it('should cal the onFundHouseSelected()', () => {
        expect(component.onFundHouseSelected(false)).toBeUndefined();
        expect(component.fundHouseSelected).toBeFalsy();
    });

    it('should cal the onAssetClassSelected()', () => {
        expect(component.onAssetClassSelected(true)).toBeUndefined();
        expect(component.assetClassSelected).toBeTruthy();
    });

    it('AvailableFundsComponent clearCartAndContinueDataEvent -  clicked', () => {
        const values = {
            index: 1,
            value: {
                investmentAmount: '1,000.00',
            },
        };
        component.userData = { customer_id: 481124715058 };
        component.fundList = mockfundListResponse;
        expect(component.clearCartAndContinueDataEvent(values)).toBeTruthy();
    });

    it('should call the startInvestmentEvent()', () => {
        component.startInvestmentEvent();
        expect(component).toBeTruthy();
    });
    it('should  loadAdobeAnalytics method called on tab changed', () => {
        const index = 1;
        component.userData = { customer_id: 481124715058 };
        component.onTabChanged(index);
        component.tabClickCount++;
        component.selectedIndex = 1;
        const tabViewName = 'CIMB Focus Funds';
        expect(component.loadAdobeAnalytics(tabViewName)).toBeUndefined();
    });
    it('should  onApplyFilters method called', () => {
        component.userData = { customer_id: 481124715058 };
        expect(component.onApplyFilters()).toBeTruthy;
    });
    it('should  loadAnalytisSearchFunds method called', () => {
        const filters = {
            class_name: 'Regional Equity',
            fund_code: 'HDU03A',
            fund_name: 'Affin Hwang Select Asia (ex Japan) Quantum Fund',
        };
        expect(component.loadAnalytisSearchFunds(filters)).toBeUndefined();
    });
    it('should  Option Selected method called', () => {
        let fundName = 'Affin Hwang Select Asia (ex Japan) Opportunity Fund';
        component.userData = { customer_id: 481124715058 };
        expect(component.onOptionSelected(fundName)).toBeTruthy;
        fundName = '';
        component.userData = { customer_id: 481124715058 };
        expect(component.onOptionSelected(fundName)).toBeUndefined;
    });

    it('should called checkUserType if NTP', () => {
        const customerType = 'NTP';

        expect(component.checkUserType(customerType)).toBeTruthy();
    });

    it('should called checkUserType non-NTP', () => {
        const customerType = 'ETP';

        expect(component.checkUserType(customerType)).toBeFalsy();
    });
    it('should call enableSearchResults', () => {
        component.fundList = mockfundListResponse;
        expect(component.enableSearchResults(component.fundList)).toBeUndefined();
    });
});
