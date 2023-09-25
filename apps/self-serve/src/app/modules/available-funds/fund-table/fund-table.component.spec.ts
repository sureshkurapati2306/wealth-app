import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { FundTableComponent } from './fund-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { mockfundListResponse, mockFundDetailData } from '../mock/data';
import { EventService } from '@cimb/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OverlayModule } from '@angular/cdk/overlay';
import { DecimalPipe } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MintPaginatorModule } from '@cimb/mint';
import { of } from 'rxjs';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {
    getFundDetail,
} from '../+state/available-funds.selectors';

describe('FundTableComponent', () => {
    let component: FundTableComponent;
    let fixture: ComponentFixture<FundTableComponent>;
    let bottomSheet: any;
    let service: EventService;
    let formGroup: FormGroup;
    let loader: HarnessLoader;
    let paginator: MatPaginatorHarness;
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FundTableComponent],
            imports: [
                ReactiveFormsModule,
                MatTableModule,
                RouterTestingModule,
                NgxPaginationModule,
                OverlayModule,
                MatOptionModule,
                MatSelectModule,
                MintPaginatorModule,
                MatDialogModule,
                MatPaginatorModule,
                NoopAnimationsModule
            ],
            providers: [
                DecimalPipe,
                MatBottomSheet,
                {
                    provide: EventService,
                    useValue: {
                        onReceived: jest.fn(),
                        onAddItem: jest.fn(),
                    },
                },
                provideMockStore({
                    initialState: {
                        riskCategories: null,
                        assetsClasses: null,
                        fundHouse: null,
                        fundDetail: null,
                    },
                    selectors: [
                        { selector: getFundDetail, value: mockfundListResponse },
                    ],
                }),
            ],
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(FundTableComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        service = TestBed.inject(EventService);
        component = fixture.componentInstance;
        bottomSheet = TestBed.inject(MatBottomSheet);
        fixture.detectChanges();

        paginator = await loader.getHarness(MatPaginatorHarness);

    });

    it('should change pages', async () => {

        await paginator.goToNextPage();

        await paginator.setPageSize(20);

        expect(component).toBeTruthy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('showDetailPage - click', () => {
        const fund = { fund_code: 'BHL17D' };
        component.fundList = mockfundListResponse;

        // expect(component.showDetailPage(mockFundDetailData)).toBeUndefined();
        expect(component.loadAnalytisFundDetails(fund)).toBeUndefined();
    });

    it('ngOnChanges ', () => {
        component.fundList = mockfundListResponse;

        expect(component.ngOnChanges()).toBeUndefined();
    });

    it('call ng on changes', ()=> {
        component.fundList =  mockfundListResponse;
        component.ngOnChanges();
        expect(component.pageLength).toEqual(2);
        expect(component.startIndex).toEqual(1);
        expect(component.endIndex).toEqual(2);

    })

    it('getRoundNumber ', () => {
        expect(component.getRoundNumber(1000)).toEqual('1,000.00');
    });

    it('onPageSizeChange ', () => {
        component.fundList = mockfundListResponse;
        const event = { value: 5 };
        expect(component.onPageSizeChange(event)).toBeUndefined();
    });

    it('amountEnteredValid value-0.00', () => {
        const indexElement = { value: '0.00' };
        expect(component.amountEnteredValid(indexElement)).toBeTruthy();
    });

    it('amountEnteredValid value-0.0', () => {
        const indexElement = { value: '0.0' };
        expect(component.amountEnteredValid(indexElement)).toBeTruthy();
    });

    it('amountEnteredValid value-0.', () => {
        const indexElement = { value: '0.' };
        expect(component.amountEnteredValid(indexElement)).toBeTruthy();
    });

    it('amountEnteredValid value-', () => {
        const indexElement = { value: '' };
        expect(component.amountEnteredValid(indexElement)).toBeTruthy();
    });

    it('amountEnteredValid value-.00', () => {
        const indexElement = { value: '.00' };
        expect(component.amountEnteredValid(indexElement)).toBeTruthy();
    });

    it('amountEnteredValid value-00', () => {
        const indexElement = { value: '00' };
        expect(component.amountEnteredValid(indexElement)).toBeTruthy();
    });

    it('amountEnteredValid value-000', () => {
        const indexElement = { value: '000' };
        expect(component.amountEnteredValid(indexElement)).toBeTruthy();
    });

    it('acceptNumbersOnly ', () => {
        const event = { charCode: 51, which: 51 };
        expect(component.acceptNumbersOnly(event)).toBeTruthy();
    });

    it('updateFundList equal fund code', () => {
        const values = { index: 0, productForm: {value : "1,111.11"} };
        component.fundList = [
            {
                "maximum_initial_subscription_amount_str": "9,999,999,999.00",
                "close_date": "16 Mar 2022",
                "three_month_ind": "EQUAL",
                "switch_indicator": 1,
                "fund_document": [

                ],
                "cart_total_investment": 2000,
                "fund_code": "HDU16D",
                "risk_rating": "5",
                "minimum_initial_subscription_amount": 1000,
                "maximum_subsequent_subscription_amount": 9999999999,
                "manager_code": "HDU",
                "sales_charge_staff": 2.5,
                "minimum_initial_subscription_amount_str": "1,000.00",
                "class_name": "FIXED INCOME",
                "min_holding": 2000,
                "minimum_subsequent_subscription_amount_str": "100.00",
                "current_holding": "N",
                "min_redem_amt": 2,
                "recommend_fund": "Y",
                "fund_status": "A",
                "cart_ind": true,
                "class_seq": 2,
                "maximum_initial_subscription_amount": 9999999999,
                "fund_name": "Affin Hwang Aiiman Select Income Fund",
                "one_month_ind": "EQUAL",
                "fund_indicator": "I",
                "manager_name": "Affin Hwang Asset Management Berhad",
                "three_month": "0.00",
                "cart_list": {
                   "cart_switch_sales_charges": 0,
                   "cart_net_amount": 1950,
                   "cart_total_switch_out": 0,
                   "cart_switch_out_amount": 0,
                   "cart_total_redem": 0,
                   "cart_redem_amount": 2000,
                   "cart_total_investment": 2000,
                   "cart_total_switch_in": 0,
                   "cart_sales_percentage" : 0,
                   "cart_txn_type": "01",
                   "cart_switch_in_amount": 0,
                   "cart_sales_charges": 50,
                   "cart_switch_sales_percentage": 0
                },
                "one_month": "0.00",
                "max_redem_amt": 9999999999,
               "max_switch_amt" : 0,
                "maximum_subsequent_subscription_amount_str": "9,999,999,999.00",
                "nav_price": 0.4612,
                "min_switch_amt": 2,
                "risk_name": "Balanced",
                "product_category": "FIX_ INCOME ",
                "minimum_subsequent_subscription_amount": 100,
                "sales_charge_nonstaff": 2.5
             },
        ]
        expect(component.updateFundList(values)).toBeUndefined();
    });

    it('updateFundList Unequal fund code', () => {
        const values = { index: 1, productForm: {value : "1,111.11"} };
        component.fundList = [
            {
                "maximum_initial_subscription_amount_str": "9,999,999,999.00",
                "close_date": "16 Mar 2022",
                "three_month_ind": "EQUAL",
                "switch_indicator": 1,
                "fund_document": [

                ],
                "cart_total_investment": 2000,
                "fund_code": "HDU16D",
                "risk_rating": "5",
                "minimum_initial_subscription_amount": 1000,
                "maximum_subsequent_subscription_amount": 9999999999,
                "manager_code": "HDU",
                "sales_charge_staff": 2.5,
                "minimum_initial_subscription_amount_str": "1,000.00",
                "class_name": "FIXED INCOME",
                "min_holding": 2000,
                "minimum_subsequent_subscription_amount_str": "100.00",
                "current_holding": "N",
                "min_redem_amt": 2,
                "recommend_fund": "Y",
                "fund_status": "A",
                "cart_ind": true,
                "class_seq": 2,
                "maximum_initial_subscription_amount": 9999999999,
                "fund_name": "Affin Hwang Aiiman Select Income Fund",
                "one_month_ind": "EQUAL",
                "fund_indicator": "I",
                "manager_name": "Affin Hwang Asset Management Berhad",
                "three_month": "0.00",
                "cart_list": {
                   "cart_switch_sales_charges": 0,
                   "cart_net_amount": 1950,
                   "cart_total_switch_out": 0,
                   "cart_switch_out_amount": 0,
                   "cart_total_redem": 0,
                   "cart_redem_amount": 2000,
                   "cart_total_investment": 2000,
                   "cart_total_switch_in": 0,
                   "cart_sales_percentage" : 0,
                   "cart_txn_type": "01",
                   "cart_switch_in_amount": 0,
                   "cart_sales_charges": 50,
                   "cart_switch_sales_percentage": 0
                },
                "one_month": "0.00",
                "max_redem_amt": 9999999999,
               "max_switch_amt" : 0,
                "maximum_subsequent_subscription_amount_str": "9,999,999,999.00",
                "nav_price": 0.4612,
                "min_switch_amt": 2,
                "risk_name": "Balanced",
                "product_category": "FIX_ INCOME ",
                "minimum_subsequent_subscription_amount": 100,
                "sales_charge_nonstaff": 2.5
             },
        ]
        expect(component.updateFundList(values)).toBeUndefined();
    });

    it('onDialogRefClose click', () => {
        const result = "Yes, clear cart and continue";
        const values = { index: 1, productForm: {value : "1,111.11"} };
        component.fundList = [
            {
                "maximum_initial_subscription_amount_str": "9,999,999,999.00",
                "close_date": "16 Mar 2022",
                "three_month_ind": "EQUAL",
                "switch_indicator": 1,
                "fund_document": [

                ],
                "cart_total_investment": 2000,
                "fund_code": "HDU16D",
                "risk_rating": "5",
                "minimum_initial_subscription_amount": 1000,
                "maximum_subsequent_subscription_amount": 9999999999,
                "manager_code": "HDU",
                "sales_charge_staff": 2.5,
                "minimum_initial_subscription_amount_str": "1,000.00",
                "class_name": "FIXED INCOME",
                "min_holding": 2000,
                "minimum_subsequent_subscription_amount_str": "100.00",
                "current_holding": "N",
                "min_redem_amt": 2,
                "recommend_fund": "Y",
                "fund_status": "A",
                "cart_ind": true,
                "class_seq": 2,
                "maximum_initial_subscription_amount": 9999999999,
                "fund_name": "Affin Hwang Aiiman Select Income Fund",
                "one_month_ind": "EQUAL",
                "fund_indicator": "I",
                "manager_name": "Affin Hwang Asset Management Berhad",
                "three_month": "0.00",
                "cart_list": {
                   "cart_switch_sales_charges": 0,
                   "cart_net_amount": 1950,
                   "cart_total_switch_out": 0,
                   "cart_switch_out_amount": 0,
                   "cart_total_redem": 0,
                   "cart_redem_amount": 2000,
                   "cart_total_investment": 2000,
                   "cart_total_switch_in": 0,
                   "cart_sales_percentage" : 0,
                   "cart_txn_type": "01",
                   "cart_switch_in_amount": 0,
                   "cart_sales_charges": 50,
                   "cart_switch_sales_percentage": 0
                },
                "one_month": "0.00",
                "max_redem_amt": 9999999999,
               "max_switch_amt" : 0,
                "maximum_subsequent_subscription_amount_str": "9,999,999,999.00",
                "nav_price": 0.4612,
                "min_switch_amt": 2,
                "risk_name": "Balanced",
                "product_category": "FIX_ INCOME ",
                "minimum_subsequent_subscription_amount": 100,
                "sales_charge_nonstaff": 2.5
             },
        ]
        expect(component.onDialogRefClose(result,values)).toBeUndefined();
    });

    describe('openNavBottomSheet()', () => {
        it('Should open tool tips', () => {
            bottomSheet.open = jest.fn();
            component.openNavBottomSheet();
            expect(bottomSheet.open).toBeCalledTimes(1);

            expect(bottomSheet.open).toHaveBeenCalledWith(component.toolTipNav, {
                panelClass: 'tooltip-action-sheet',
            });
        });
    });

    describe('openFundHolidayBottomSheet()', () => {
        it('Should open tool tips', () => {
            bottomSheet.open = jest.fn();
            component.openFundHolidayBottomSheet();
            expect(bottomSheet.open).toBeCalledTimes(1);

            expect(bottomSheet.open).toHaveBeenCalledWith(component.toolTipFundHoliday, {
                panelClass: 'tooltip-action-sheet',
            });
        });
    });

    describe('Select a row from table', () => {
        it('should select a row by fund name', () => {
            const fundName = 'Aberdeen Islamic World Equity Fund (class A)';
            expect(component.onSelectRow(fundName)).toBeUndefined();
        });
    });

    describe('onRemovedItem()', () => {
        it('Should remove item removedCart is true', () => {
            const mockResponse = { index: 1, removedCart: true };
            const spyCopmponent = jest.spyOn(component, 'onRemovedItem');
            jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

            const mockObj = {
                controls: 'VALUE',
                errors: null,
                pristine: true,
                status: 'VALID',
            };
            component.onRemovedItem(mockObj, 1);

            service.onReceived().subscribe((result) => {
                expect(result).toEqual(mockResponse);
            });

            expect(spyCopmponent).toHaveBeenCalled();
        });
        it('Should not remove item removedCart is false', () => {
            const mockResponse = { index: 1, removedCart: false };
            const spyCopmponent = jest.spyOn(component, 'onRemovedItem');
            jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

            const mockObj = {
                controls: 'VALUE',
                errors: null,
                pristine: true,
                status: 'VALID',
            };
            component.onRemovedItem(mockObj, 1);

            expect(component.productsArray).toBeDefined();
            expect(spyCopmponent).toHaveBeenCalled();
        });
    });
    describe('onAddItem()', () => {
        it('Should add item if addedToCart is true', () => {
            const mockResponse = { index: 1, addedToCart: true };
            const spyCopmponent = jest.spyOn(component, 'onAddItem');
            jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

            component.cartData = {
                "totalAmount": 0,
                "totalNetInvestmentAmount": 0,
                "totalSalesCharges": 0,
                "totalFundsCount": 0,
                "higherRiskFundCategory": 0,
                "fundList": [],
                "accountName": "",
                "unitTrustAccount": "",
                "paymentAccount": "",
                "referenceNumber": "",
                "transactionSuccessStatus": false,
                "transactionStatusName": "",
                "transactionStatus": "",
                "transactionStatusText": "",
                "transactionDate": "",
                "transactionWorkingDays": "",
                "flow": "",
                "flow_text": null,
                "total_redemption_units": 0,
                "total_redemption_amount": 0,
                "total_switch_out_units": 0,
                "total_switch_in_units": 0,
                "total_switch_out_amount": 0,
                "total_switch_in_amount": 0,
                "otpResponse": null,
                "otpResponseMessage": null,
                "otpResponseReferenceNumber": null,
                "verifyResponse": null,
                "verifyResponseMessage": null,
                "verifyResponseReferenceNumber": null,
                "postAllTransactionResponse": null,
                "cartFooterToggle": true,
                "showCartIcon": true,
                "createCartResponse": null,
                "createCartResponseMessage": null,
                "updateCartResponse": null,
                "getCartByClientIdResponse": null,
                "csId": null,
                "txnType": null,
                "clientId": null,
                "selectedCasaAccountIndex": -1,
                "switchCartResponse": null,
                "deletCartResponse": null,
                "storeTransaction": [],
                "scheduler_msg": "Transactions performed after 2pm will be executed the next business day",
                "cartSummaryId": "-1"
            };

            const mockObj = {
                controls: 'VALUE',
                errors: null,
                pristine: true,
                status: 'VALID',
                value:{
                    fund_status:'SOHO'
                }
            };
            component.onAddItem(mockObj, 1);

            service.onReceived().subscribe((result) => {
                expect(result).toEqual(mockResponse);
            });

            expect(spyCopmponent).toHaveBeenCalled();
        });

        it('Should not add item if addedToCart is false', () => {
            const mockResponse = { index: 1, addedToCart: false };
            const spyCopmponent = jest.spyOn(component, 'onAddItem');
            jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

            component.cartData = {
                "totalAmount": 0,
                "totalNetInvestmentAmount": 0,
                "totalSalesCharges": 0,
                "totalFundsCount": 0,
                "higherRiskFundCategory": 0,
                "fundList": [],
                "accountName": "",
                "unitTrustAccount": "",
                "paymentAccount": "",
                "referenceNumber": "",
                "transactionSuccessStatus": false,
                "transactionStatusName": "",
                "transactionStatus": "",
                "transactionStatusText": "",
                "transactionDate": "",
                "transactionWorkingDays": "",
                "flow": "",
                "flow_text": null,
                "total_redemption_units": 0,
                "total_redemption_amount": 0,
                "total_switch_out_units": 0,
                "total_switch_in_units": 0,
                "total_switch_out_amount": 0,
                "total_switch_in_amount": 0,
                "otpResponse": null,
                "otpResponseMessage": null,
                "otpResponseReferenceNumber": null,
                "verifyResponse": null,
                "verifyResponseMessage": null,
                "verifyResponseReferenceNumber": null,
                "postAllTransactionResponse": null,
                "cartFooterToggle": true,
                "showCartIcon": true,
                "createCartResponse": null,
                "createCartResponseMessage": null,
                "updateCartResponse": null,
                "getCartByClientIdResponse": null,
                "csId": null,
                "txnType": null,
                "clientId": null,
                "selectedCasaAccountIndex": -1,
                "switchCartResponse": null,
                "deletCartResponse": null,
                "storeTransaction": [],
                "scheduler_msg": "Transactions performed after 2pm will be executed the next business day",
                "cartSummaryId": "-1"
            };
            
            const mockObj = {
                controls: 'VALUE',
                errors: null,
                pristine: true,
                status: 'VALID',
                value:{
                    fund_status:'SOHO'
                }
            };
            component.onAddItem(mockObj, 1);

            expect(component.productsArray).toBeDefined();
            expect(spyCopmponent).toHaveBeenCalled();
        });
    });

    describe('onUpdateCart()', () => {
        it('Should update item if updateCart is true', () => {
            const mockResponse = { index: 1, updateCart: true };
            const spyCopmponent = jest.spyOn(component, 'onUpdateCart');
            jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

            const mockObj = {
                controls: 'VALUE',
                errors: null,
                pristine: true,
                status: 'VALID',
            };
            component.onUpdateCart(mockObj, 1);

            service.onReceived().subscribe((result) => {
                expect(result).toEqual(mockResponse);
            });

            expect(spyCopmponent).toHaveBeenCalled();
        });
        it('Should not update item if updateCart value is false', () => {
            const mockResponse = { index: 1, updateCart: false };
            const spyCopmponent = jest.spyOn(component, 'onUpdateCart');
            jest.spyOn(service, 'onReceived').mockReturnValue(of(mockResponse));

            const mockObj = {
                controls: 'VALUE',
                errors: null,
                pristine: true,
                status: 'VALID',
            };
            component.onUpdateCart(mockObj, 1);
            expect(component.productsArray).toBeDefined();
            expect(spyCopmponent).toHaveBeenCalled();
        });
    });
    it('ngOnInit ', () => {
        component.hideAmountField = true;
        component.ngOnInit();
        expect(component.displayedColumns.length).toBe(5);
    });
});
