import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { DecimalPipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockDataTopup, mockDataRedeem, mockDataSwitch, mockSwitchUnitTrustPurchaseData, mockfundData } from './mock/data';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { DashboardComponent } from '../../../modules/dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CartService', () => {
  let service: CartService;
  let store: MockStore;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [CartService, DecimalPipe, MatDialog,
        provideMockStore({ initialState: {} })
      ],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    service = TestBed.inject(CartService);
    expect(service).toBeTruthy();
  });

  it('CartService callAddToCart - topup', () => {
    service = TestBed.inject(CartService);
    const callSwithApi = false;
    expect(service.callAddToCart(mockDataTopup, callSwithApi)).toBeUndefined();
  });

  it('CartService callAddToCart - redeem', () => {
    service = TestBed.inject(CartService);
    const callSwithApi = false;
    expect(service.callAddToCart(mockDataRedeem, callSwithApi)).toBeUndefined();
  });

  it('CartService callAddToCart - switch', () => {
    service = TestBed.inject(CartService);
    const callSwithApi = false;
    expect(service.callAddToCart(mockDataSwitch, callSwithApi)).toBeFalsy();
  });

  it('CartService callAddToCart - switch', () => {
    service = TestBed.inject(CartService);
    expect(service.fullRedemptionPopUp()).toBeFalsy();
  });

  //   it('CartService callAddToCart - unable to transact because full switch out request is processing - click View Transaction History in modal', async ()  => {
  //     jest.spyOn(store, 'select').mockReturnValueOnce(of({
  //       purchaseDetailData: mockSwitchUnitTrustPurchaseData
  //     }));

  //     service = TestBed.inject(CartService);
  //     const fixture = TestBed.createComponent(DashboardComponent);
  //     const loaderDocumentRoot = TestbedHarnessEnvironment.documentRootLoader(fixture);
  //     fixture.detectChanges();

  //     const callSwithApi = false;
  //     expect(service.callAddToCart(mockDataTopup, callSwithApi)).toBeFalsy();

  //     const unableToTransactAlertDialog = await loaderDocumentRoot.getAllHarnesses(MatDialogHarness);

  //     expect(unableToTransactAlertDialog.length).toBe(1);

  //     const viewTransactionHistoryButton = await loaderDocumentRoot.getHarness(MatButtonHarness.with({text: 'View Transaction History'}));

  //     await viewTransactionHistoryButton.click();

  //   });

  it('CartService callAddToCart - topup & switch cart', () => {
    service = TestBed.inject(CartService);
    expect(service.callAddToCart(mockDataTopup, true)).toBeUndefined();
  });

  it('CartService callAddToCart - redeem & switch cart', () => {
    service = TestBed.inject(CartService);
    expect(service.callAddToCart(mockDataRedeem, true)).toBeUndefined();
  });

  it('CartService callAddToCart - switch and switch cart', () => {
    service = TestBed.inject(CartService);
    expect(service.callAddToCart(mockDataSwitch, true)).toBeUndefined();
  });

  it('CartService removeFromCart - topup', () => {
    service = TestBed.inject(CartService);
    const fund_code = "001";
    expect(service.removeFromCart(mockDataTopup, fund_code)).toBeUndefined();
  });

  it('CartService removeFromCart - redeem', () => {
    service = TestBed.inject(CartService);
    const fund_code = "002";
    expect(service.removeFromCart(mockDataRedeem, fund_code)).toBeUndefined();
  });

  it('CartService removeFromCart - switch', () => {
    service = TestBed.inject(CartService);
    const fund_code = "003";
    expect(service.removeFromCart(mockDataSwitch, fund_code)).toBeUndefined();
  });

  it('CartService updateCartItem - topup', () => {
    service = TestBed.inject(CartService);
    jest.spyOn(service, 'updateFundDetailStore').mockReturnValue();
    const index = 0;
    const amount = 0;
    const unit = 0;
    expect(service.updateCartItem(mockDataTopup, index, amount, unit)).toBeUndefined();
  });

  it('CartService updateCartItem - redeem', () => {
    service = TestBed.inject(CartService);
    jest.spyOn(service, 'updateFundDetailStore').mockReturnValue();
    const index = 2;
    const amount = 2;
    const unit = 2;
    expect(service.updateCartItem(mockDataRedeem, index, amount, unit)).toBeUndefined();
  });

  it('CartService updateCartItem - switch', () => {
    service = TestBed.inject(CartService);
    jest.spyOn(service, 'updateFundDetailStore').mockReturnValue();
    const index = 3;
    const amount = 3;
    const unit = 3;
    expect(service.updateCartItem(mockDataSwitch, index, amount, unit)).toBeUndefined();
  });

  it('CartService reCalculateTaxCart topup', () => {
    service = TestBed.inject(CartService);
    expect(service.reCalculateTaxCart(mockDataTopup)).toBeUndefined();
  });

  it('CartService reCalculateTaxCart redeem', () => {
    service = TestBed.inject(CartService);
    expect(service.reCalculateTaxCart(mockDataRedeem)).toBeUndefined();
  });

  it('CartService reCalculateTaxCart switch', () => {
    service = TestBed.inject(CartService);
    expect(service.reCalculateTaxCart(mockDataSwitch)).toBeUndefined();
  });

  it('CartService dialogUnableToTransactDueToFullReedeem redeem', () => {
    service = TestBed.inject(CartService);
    expect(service.dialogUnableToTransactDueToFullReedeem()).toBeUndefined();
  });
  it('refesh CartData', () => {
    service = TestBed.inject(CartService);
    const userData = { customer_name: 'test user', user: { cimb_staff: 'test staff' } };
    expect(service.refreshDataFundDetails(mockfundData as any, userData as any)).toBeUndefined();
  });
  it('CartService ngOnDestroy', () => {
    service = TestBed.inject(CartService);
    expect(service.ngOnDestroy()).toBeUndefined();
  });

  // Tests that the method returns the correct value for flow 02 and situation1
  it('test_flow_02_situation1', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation1';
    const flow = '02';
    const item = {
      card_redemption_amount: 50
    };
    const result = service.addToCartTotalInvestment(situation, flow, item);
    expect(result).toBe(50);
  });

  // Tests that the method returns the correct value for flow 02 and situation1
  it('test_flow_02_situation1', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation1';
    const flow = '02';
    const item = {
      card_redemption_amount: 50
    };
    const result = service.addToCartTotalInvestment(situation, flow, item);
    expect(result).toBe(50);
  });

  // Tests that the method returns the correct value for flow 03 and situation1
  it('test_flow_03_situation1', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation1';
    const flow = '03';
    const item = {
      totalInvestment: 200
    };
    const result = service.addToCartTotalInvestment(situation, flow, item);
    expect(result).toBe(200);
  });

  // Tests that the method returns 0.0 for an unknown flow and situation1
  it('test_unknown_flow_situation1', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation1';
    const flow = '04';
    const item = {};
    const result = service.addToCartTotalInvestment(situation, flow, item);
    expect(result).toBe(0.0);
  });

  // Tests that the method returns 0.0 for a flow not equal to 01, 02 or 03 and situation2
  it('test_flow_not_010203_situation2', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation2';
    const flow = '04';
    const item = {};
    const cartData = {};
    const result = service.addToCartTotalInvestment(situation, flow, item, 100, cartData);
    expect(result).toBe(0.0);
  });

  // Tests that the method returns 0.0 for situation2 and no cartData provided
  it('test_no_cart_data_situation2', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation2';
    const flow = '01';
    const item = {};
    const result = service.addToCartTotalInvestment(situation, flow, item);
    expect(result).toBe(0.0);
  });

  // Tests that when flow is '01' and totalInvestment is provided, it returns the rounded totalInvestment
  it('test_happy_path_flow_01', () => {
    service = TestBed.inject(CartService);
    const flow = '01';
    const totalInvestment = 100.1234;
    const total_redemption_amount = 0;
    const result = service.addToCartTotalInvestmentSituation3(flow, totalInvestment, total_redemption_amount);
    expect(result).toBe(100.12);
  });

  // Tests that when flow is '02' and total_redemption_amount is provided, it returns the rounded total_redemption_amount
  it('test_happy_path_flow_02', () => {
    service = TestBed.inject(CartService);
    const flow = '02';
    const totalInvestment = 0;
    const total_redemption_amount = 300.4567;
    const result = service.addToCartTotalInvestmentSituation3(flow, totalInvestment, total_redemption_amount);
    expect(result).toBe(300.46);
  });

  // Tests that when situation is 'situation1' and flow is '01', it returns the sum of totalSalesCharges and salesChargeAmount if cartData exists
  it('test_situation1_flow01_cartDataNotNull', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation1';
    const flow = '01';
    const cartData = { totalSalesCharges: 10 };
    const salesChargeAmount = 5;

    const result = service.addToCartTotalSalesCharges(situation, flow, cartData, salesChargeAmount);

    expect(result).toBe(15);
  });

  // Tests that when situation is 'situation2' and flow is '01', it returns salesChargeAmount if cartData exists
  it('test_situation2_flow01_cartDataNotNull', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation2';
    const flow = '01';
    const cartData = { totalSalesCharges: 10 };
    const salesChargeAmount = 5;

    const result = service.addToCartTotalSalesCharges(situation, flow, cartData, salesChargeAmount);

    expect(result).toBe(5);
  });

  // Tests that when situation is 'situation1' and flow is '01', it returns the sum of totalNetInvestmentAmount and cardNetAmount
  it('test_situation1_flow01', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation1';
    const flow = '01';
    const cartData = { totalNetInvestmentAmount: 100, totalSalesCharges: 10 };
    const cardNetAmount = 50;

    const result = service.addToCartTotalNetAmount(situation, flow, cartData, cardNetAmount);

    expect(result).toBe(150);
  });

  // Tests that when situation is 'situation2' and flow is '01', it returns cardNetAmount
  it('test_situation2_flow01', () => {
    service = TestBed.inject(CartService);
    const situation = 'situation2';
    const flow = '01';
    const cartData = { totalNetInvestmentAmount: 100, totalSalesCharges: 10 };
    const cardNetAmount = 50;

    const result = service.addToCartTotalNetAmount(situation, flow, cartData, cardNetAmount);

    expect(result).toBe(50);
  });

  // Tests that the method returns the correct value for flow '02' and item with card_redemption_amount
  it('returns the correct value for flow 02 and item with card_redemption_amount', () => {
    service = TestBed.inject(CartService);
    const flow = '02';
    const item = { card_redemption_amount: 100.00 };
    const result = service.removeFromCartTotalInvestment(flow, item);
    expect(result).toEqual(100.00);
  });

  // Tests that the method returns the correct value for flow '03' and item with card_net_amount
  it('returns the correct value for flow 03 and item with card_net_amount', () => {
    service = TestBed.inject(CartService);
    const flow = '03';
    const item = { card_net_amount: 200.00 };
    const result = service.removeFromCartTotalInvestment(flow, item);
    expect(result).toEqual(200.00);
  });

});
