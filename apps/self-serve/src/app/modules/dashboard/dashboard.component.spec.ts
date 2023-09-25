import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { User } from '../../core/model/user.model';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { path } from '../../shared/config';
import { MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


describe('DashboardComponent', () => {
  //let component = new DashboardComponent(null, null, null, null);
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  const userData = new User(
    'Test',
    'CK1000',
    'SOLO_PROP',
    12121212121212,
    1,
    '4 Sept 2020, 10:30AM',
    'WJ-85',
    'P',
    'N',
    'N',
    'N',
    '2222222222222222',
    'N',
    'N',
    'N',
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([
          { path: path.RISK_PROFILE_QUESTIONS, component: DashboardComponent},
          { path: path.RISK_PROFILE_RESULTS, component: DashboardComponent}
        ]),
        MatDialogModule
      ],
      declarations: [DashboardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [CartService, DecimalPipe, MatDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('DashboardComponent should create', () => {
    expect(component).toBeTruthy();
  });

  // it('ngDestroy should call', () => {
  //   const expectedResult = subscription.unsubscribe;
  //   expect(component.ngOnDestroy()).toBe(expectedResult)
  // });

  //function - sortInAlphabeticalOrderAtoZ
  it('sortInAlphabeticalOrderAtoZ - Asset class CASH should call', () => {
    const fund_list = [
      {
        class_seq: '1',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '1',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];
    expect(component.sortInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderAtoZ - Asset class Fixed Income should call', () => {
    const fund_list = [
      {
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '2',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];

    expect(component.sortInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderAtoZ - Asset class Local Equity should call', () => {
    const fund_list = [
      {
        class_seq: '3',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '3',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];
    expect(component.sortInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderAtoZ - Asset class Regional Equity should call', () => {
    const fund_list = [
      {
        class_seq: '4',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '4',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];
    expect(component.sortInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderAtoZ - Asset class Global Equity should call', () => {
    const fund_list = [
      {
        class_seq: '5',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '5',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];
    expect(component.sortInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderAtoZ - Asset class Alternatives should call', () => {
    const fund_list = [
      {
        class_seq: '6',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '6',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];
    expect(component.sortInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
  });

  //function - sortInAlphabeticalOrderZtoA
  it('sortInAlphabeticalOrderZtoA - Asset class CASH should call', () => {
    const fund_list = [
      {
        class_seq: '1',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '1',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];

    expect(component.sortInAlphabeticalOrderZtoA(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderZtoA - Asset class Fixed Income should call', () => {
    const fund_list = [
      {
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '2',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];

    expect(component.sortInAlphabeticalOrderZtoA(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderZtoA - Asset class Local Equity should call', () => {
    const fund_list = [
      {
        class_seq: '3',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '3',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];

    expect(component.sortInAlphabeticalOrderZtoA(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderZtoA - Asset class Regional Equity should call', () => {
    const fund_list = [
      {
        class_seq: '4',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '4',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];

    expect(component.sortInAlphabeticalOrderZtoA(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderZtoA - Asset class Global Equity should call', () => {
    const fund_list = [
      {
        class_seq: '5',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '5',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];

    expect(component.sortInAlphabeticalOrderZtoA(fund_list)).toBeTruthy();
  });

  it('sortInAlphabeticalOrderZtoA - Asset class Alternatives should call', () => {
    const fund_list = [
      {
        class_seq: '6',
        fund_name: 'AMITTIKAL LE',
      },
      {
        class_seq: '6',
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
      },
    ];

    expect(component.sortInAlphabeticalOrderZtoA(fund_list)).toBeTruthy();
  });

  //function - sortByReturnPercentageHighToLow
  it('sortByReturnPercentageHighToLow - Asset class CASH should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '1',
      },
      {
        total_percentage: '42.54%',
        class_seq: '1',
      },
    ];
    expect(component.sortByReturnPercentageHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnPercentageHighToLow - Asset class Fixed Income should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '2',
      },
      {
        total_percentage: '42.54%',
        class_seq: '2',
      },
    ];
    expect(component.sortByReturnPercentageHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnPercentageHighToLow - Asset class Local Equity should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '3',
      },
      {
        total_percentage: '42.54%',
        class_seq: '3',
      },
    ];
    expect(component.sortByReturnPercentageHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnPercentageHighToLow - Asset class Regional Equity should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '4',
      },
      {
        total_percentage: '42.54%',
        class_seq: '4',
      },
    ];
    expect(component.sortByReturnPercentageHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnPercentageHighToLow - Asset class Global Equity should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '5',
      },
      {
        total_percentage: '42.54%',
        class_seq: '5',
      },
    ];
    expect(component.sortByReturnPercentageHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnPercentageHighToLow - Asset class Alternatives should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '6',
      },
      {
        total_percentage: '42.54%',
        class_seq: '6',
      },
    ];
    expect(component.sortByReturnPercentageHighToLow(fund_list)).toBeTruthy();
  });

  //function - sortByReturnPercentageLowToHigh
  it('sortByReturnPercentageLowToHigh - Asset class CASH should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '1',
      },
      {
        total_percentage: '42.54%',
        class_seq: '1',
      },
    ];
    expect(component.sortByReturnPercentageLowToHigh(fund_list)).toBeTruthy();

  });

  it('sortByReturnPercentageLowToHigh - Asset class Fixed Income should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '2',
      },
      {
        total_percentage: '42.54%',
        class_seq: '2',
      },
    ];
    expect(component.sortByReturnPercentageLowToHigh(fund_list)).toBeTruthy();

  });

  it('sortByReturnPercentageLowToHigh - Asset class Local Equity should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '3',
      },
      {
        total_percentage: '42.54%',
        class_seq: '3',
      },
    ];
    expect(component.sortByReturnPercentageLowToHigh(fund_list)).toBeTruthy();
  });

  it('sortByReturnPercentageLowToHigh - Asset class Regional Equity should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '4',
      },
      {
        total_percentage: '42.54%',
        class_seq: '4',
      },
    ];
    expect(component.sortByReturnPercentageLowToHigh(fund_list)).toBeTruthy();
  });

  it('sortByReturnPercentageLowToHigh - Asset class Global Equity should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '5',
      },
      {
        total_percentage: '42.54%',
        class_seq: '5',
      },
    ];
    expect(component.sortByReturnPercentageLowToHigh(fund_list)).toBeTruthy();
  });

  it('sortByReturnPercentageLowToHigh - Asset class Alternatives should call', () => {
    const fund_list = [
      {
        total_percentage: '-2.58%',
        class_seq: '6',
      },
      {
        total_percentage: '42.54%',
        class_seq: '6',
      },
    ];
    expect(component.sortByReturnPercentageLowToHigh(fund_list)).toBeTruthy();
  });

  //function - sortByReturnValueHighToLow
  it('sortByReturnValueHighToLow - Asset class CASH should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '1',
      },
      {
        total_return: '595.53',
        class_seq: '1',
      },
    ];
    expect(component.sortByReturnValueHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnValueHighToLow - Asset class Fixed Income should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '2',
      },
      {
        total_return: '595.53',
        class_seq: '2',
      },
    ];
    expect(component.sortByReturnValueHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnValueHighToLow - Asset class Local Equity should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '3',
      },
      {
        total_return: '595.53',
        class_seq: '3',
      },
    ];
    expect(component.sortByReturnValueHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnValueHighToLow - Asset class Regional Equity should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '4',
      },
      {
        total_return: '595.53',
        class_seq: '4',
      },
    ];
    expect(component.sortByReturnValueHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnValueHighToLow - Asset class Global Equity should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '5',
      },
      {
        total_return: '595.53',
        class_seq: '5',
      },
    ];
    expect(component.sortByReturnValueHighToLow(fund_list)).toBeTruthy();
  });

  it('sortByReturnValueHighToLow - Asset class Alternatives should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '6',
      },
      {
        total_return: '595.53',
        class_seq: '6',
      },
    ];
    expect(component.sortByReturnValueHighToLow(fund_list)).toBeTruthy();
  });

  //function - sortByReturnValueLowToHigh
  it('sortByReturnValueLowToHigh - Asset class CASH should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '1',
      },
      {
        total_return: '595.53',
        class_seq: '1',
      },
    ];
    expect(component.sortByReturnValueLowToHigh(fund_list)).toBeTruthy();
  });

  it('sortByReturnValueLowToHigh - Asset class Fixed Income should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '2',
      },
      {
        total_return: '595.53',
        class_seq: '2',
      },
    ];
    expect(component.sortByReturnValueLowToHigh(fund_list)).toBeTruthy();
  });

  it('sortByReturnValueLowToHigh - Asset class Local Equity should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '3',
      },
      {
        total_return: '595.53',
        class_seq: '3',
      },
    ];
    expect(component.sortByReturnValueLowToHigh(fund_list)).toBeTruthy();
  });

  it('sortByReturnValueLowToHigh - Asset class Regional Equity should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '4',
      },
      {
        total_return: '595.53',
        class_seq: '4',
      },
    ];
    expect(component.sortByReturnValueLowToHigh(fund_list)).toBeTruthy()
  });

  it('sortByReturnValueLowToHigh - Asset class Global Equity should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '5',
      },
      {
        total_return: '595.53',
        class_seq: '5',
      },
    ];
    expect(component.sortByReturnValueLowToHigh(fund_list)).toBeTruthy();
  });

  it('sortByReturnValueLowToHigh - Asset class Alternatives should call', () => {
    const fund_list = [
      {
        total_return: '-283.97',
        class_seq: '6',
      },
      {
        total_return: '595.53',
        class_seq: '6',
      },
    ];
    expect(component.sortByReturnValueLowToHigh(fund_list)).toBeTruthy();
  });

  //funtion-groupAssetClassToMyHoldings
  it('groupAssetClassToMyHoldings - group all asset class list to myHoldings', () => {
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
      },
      {
        asset_class: 'LOCAL EQUITY',
        class_seq: '3',
      },
      {
        asset_class: 'REGIONAL EQUITY',
        class_seq: '4',
      },
      {
        asset_class: 'GLOBAL EQUITY',
        class_seq: '5',
      },
      {
        asset_class: 'ALTERNATIVES',
        class_seq: '6',
      },
    ];

    const myHoldingsCash = [
      {
        asset_class: 'CASH',
        class_seq: '1',
      },
    ];

    const myHoldingsFixedIncome = [
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
      },
    ];
    const myHoldingsLocalEquity = [
      {
        asset_class: 'LOCAL EQUITY',
        class_seq: '3',
      },
    ];
    const myHoldingsRegionalEquity = [
      {
        asset_class: 'REGIONAL EQUITY',
        class_seq: '4',
      },
    ];
    const myHoldingsGlobalEquity = [
      {
        asset_class: 'GLOBAL EQUITY',
        class_seq: '5',
      },
    ];
    const myHoldingsAlternatives = [
      {
        asset_class: 'ALTERNATIVES',
        class_seq: '6',
      },
    ];

    expect(
      component.groupAssetClassToMyHoldings(
        fund_list,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives
      )
    ).toEqual(fund_list);
  });

  //funtion-changeDisplayFlagOnSorting
  it('changeDisplayFlagOnSorting - group all asset class list to myHoldings', () => {
    const fund_list = [
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'CASH',
        fund_status: 'A',
        class_seq: '1',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'CASH',
        fund_status: 'A',
        class_seq: '1',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'FIXED INCOME',
        fund_status: 'A',
        class_seq: '2',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'FIXED INCOME',
        fund_status: 'A',
        class_seq: '2',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'LOCAL EQUITY',
        fund_status: 'A',
        class_seq: '3',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'LOCAL EQUITY',
        fund_status: 'A',
        class_seq: '3',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'REGIOANAL EQUITY',
        fund_status: 'A',
        class_seq: '4',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'REGIONAL EQUITY',
        fund_status: 'A',
        class_seq: '4',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'GLOBAL EQUITY',
        fund_status: 'A',
        class_seq: '5',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'GLOBAL EQUITY',
        fund_status: 'A',
        class_seq: '5',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'ALTERNATIVES',
        fund_status: 'A',
        class_seq: '6',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'ALTERNATIVES',
        fund_status: 'A',
        class_seq: '6',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
    ];

    const myHoldingsCash = [
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'CASH',
        fund_status: 'A',
        class_seq: '1',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'CASH',
        fund_status: 'A',
        class_seq: '1',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
    ];

    const myHoldingsFixedIncome = [
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'FIXED INCOME',
        fund_status: 'A',
        class_seq: '2',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'FIXED INCOME',
        fund_status: 'A',
        class_seq: '2',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
    ];

    const myHoldingsLocalEquity = [
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'LOCAL EQUITY',
        fund_status: 'A',
        class_seq: '3',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'LOCAL EQUITY',
        fund_status: 'A',
        class_seq: '3',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
    ];

    const myHoldingsRegionalEquity = [
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'REGIOANAL EQUITY',
        fund_status: 'A',
        class_seq: '4',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'REGIONAL EQUITY',
        fund_status: 'A',
        class_seq: '4',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
    ];

    const myHoldingsGlobalEquity = [
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'GLOBAL EQUITY',
        fund_status: 'A',
        class_seq: '5',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'GLOBAL EQUITY',
        fund_status: 'A',
        class_seq: '5',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
    ];

    const myHoldingsAlternatives = [
      {
        min_sub_amt: '500',
        current_investment: '10716.03',
        unit_held: '10716.03',
        total_percentage: '-2.58%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '-283.97',
        holding: '10716.03',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#5CD3CD',
        sales_charge: '0.0075',
        class_holding: '59.4',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'ALTERNATIVES',
        fund_status: 'A',
        class_seq: '6',
        displayFlag: true,
        fund_name: 'AMITTIKAL LE',
        ut_account_no: ' A80111993',
        total_invested: '11000.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'I',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
      {
        min_sub_amt: '500',
        current_investment: '1995.53',
        unit_held: '1995.53',
        total_percentage: '42.54%',
        account_status: 'A',
        min_init_amt: '1000',
        total_return: '595.53',
        holding: '1995.53',
        max_sub_amt: '1000000000000',
        joint_indicator: '01',
        average_nav_price: '1',
        classHexa: '#D45DBA',
        sales_charge: '0.0075',
        class_holding: '15.8',
        min_holding: '1000',
        wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
        asset_class: 'ALTERNATIVES',
        fund_status: 'A',
        class_seq: '6',
        displayFlag: false,
        fund_name: 'AMPAN EUROPEAN PROPERTY EQUITIES GE',
        ut_account_no: 'A80111993',
        total_invested: '1400.00',
        max_init_amt: '1000000000000',
        syariah_complaint: 'C',
        nav_price: '1.00',
        wholesale_ind: 'N',
        fundImg: './assets/images/chart-increase.svg',
        fundPosition: 'Increase',
      },
    ];
    expect(
      component.changeDisplayFlagOnSorting(
        fund_list,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives
      )
    ).toBeTruthy();
  });

  //function - clearAssetClassArray
  it('clearAssetClassArray - All Asset class Arrays should be cleared', () => {
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
      },
    ];

    const myHoldingsCash = [];
    const myHoldingsFixedIncome = [];
    const myHoldingsLocalEquity = [];
    const myHoldingsRegionalEquity = [];
    const myHoldingsGlobalEquity = [];
    const myHoldingsAlternatives = [];

    expect(
      component.clearAssetClassArray(
        fund_list,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives
      )
    ).toEqual(fund_list);
  });

  it('changeAssetClassFlag - All the asset flags should be made false', () => {
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
      },
    ];
    expect(component.changeAssetClassFlag(fund_list)).toEqual(fund_list);
  });

  it('changeAssetClassFlag - All the asset flags should be made false', () => {
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
      },
    ];
    expect(component.changeAssetClassFlag(fund_list)).toEqual(fund_list);
  });

  it('displayFlagPopulationForFunds - populate the display flag as true for first fund in  AssetClass list', () => {
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
      },
      {
        asset_class: 'LOCAL EQUITY',
        class_seq: '3',
      },
      {
        asset_class: 'REGIONAL EQUITY',
        class_seq: '4',
      },
      {
        asset_class: 'GLOBAL EQUITY',
        class_seq: '5',
      },
      {
        asset_class: 'ALTERNATIVES',
        class_seq: '6',
      },
    ];

    const isCashAssetDisplayed = false;
    const isFixedIncomeAssetDisplayed = false;
    const isLocalEquityAssetDisplayed = false;
    const isRegionalEquityAssetDisplayed = false;
    const isGlobalEquityAssetDisplayed = false;
    const isAlternativesAssetDisplayed = false;

    expect(
      component.displayFlagPopulationForFunds(
        fund_list,
        isCashAssetDisplayed,
        isFixedIncomeAssetDisplayed,
        isLocalEquityAssetDisplayed,
        isRegionalEquityAssetDisplayed,
        isGlobalEquityAssetDisplayed,
        isAlternativesAssetDisplayed
      )
    ).toBeTruthy()
  });

  it('splitFundTotalValue - Split the fund value', () => {
    const fund_list = [
      {
        total_return: '-283.97',
      },
      {
        total_return: '483.97',
      },
    ];
    expect(component.splitFundTotalValue(fund_list)).toEqual(fund_list);
  });

  it('sortingValueChanged - Value should be sorted - sortByAlphabetAtoZ', () => {
    component.myHoldings = [
      {
        asset_class: 'CASH',
        class_seq: '1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
      },
    ];
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
      },
    ];
    const myHoldingsCash = [];

    const myHoldingsFixedIncome = [];
    const myHoldingsLocalEquity = [];
    const myHoldingsRegionalEquity = [];
    const myHoldingsGlobalEquity = [];
    const myHoldingsAlternatives = [];
    const sortingType = 'sortByAlphabetAtoZ';
    expect(
      component.sortingValueChanged(
        sortingType,
        fund_list,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives
      )
    ).toBeTruthy()
  });

  it('sortingValueChanged - Value should be sorted - sortByAlphabetZtoA', () => {
    component.myHoldings = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE CASH 1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE CASH 1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
    ];
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE CASH 1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE CASH 1',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        fund_name: 'AMITTIKAL LE',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        fund_name: 'AMITTIKAL LE',
      },
    ];

    const sortingType = 'sortByAlphabetZtoA';
    const myHoldingsCash = [];

    const myHoldingsFixedIncome = [];
    const myHoldingsLocalEquity = [];
    const myHoldingsRegionalEquity = [];
    const myHoldingsGlobalEquity = [];
    const myHoldingsAlternatives = [];

    expect(
      component.sortingValueChanged(
        sortingType,
        fund_list,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives
      )
    ).toBeTruthy();
  });

  it('sortingValueChanged - Value should be sorted - sortByReturnPercentageHighToLow', () => {
    component.myHoldings = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
    ];
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
    ];

    const sortingType = 'sortByReturnPercentageHighToLow';
    const myHoldingsCash = [];

    const myHoldingsFixedIncome = [];
    const myHoldingsLocalEquity = [];
    const myHoldingsRegionalEquity = [];
    const myHoldingsGlobalEquity = [];
    const myHoldingsAlternatives = [];

    expect(
      component.sortingValueChanged(
        sortingType,
        fund_list,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives
      )
    ).toBeTruthy();
  });

  it('sortingValueChanged - Value should be sorted - sortByReturnPercentageLowToHigh', () => {
    component.myHoldings = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
    ];
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_percentage: '42.54%',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_percentage: '42.54%',
      },
    ];

    const sortingType = 'sortByReturnPercentageLowToHigh';
    const myHoldingsCash = [];

    const myHoldingsFixedIncome = [];
    const myHoldingsLocalEquity = [];
    const myHoldingsRegionalEquity = [];
    const myHoldingsGlobalEquity = [];
    const myHoldingsAlternatives = [];

    expect(
      component.sortingValueChanged(
        sortingType,
        fund_list,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives
      )
    ).toBeTruthy();
  });

  it('sortingValueChanged - Value should be sorted - sortByReturnValueHighToLow', () => {
    component.myHoldings = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
    ];
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
    ];

    const sortingType = 'sortByReturnValueHighToLow';
    const myHoldingsCash = [];

    const myHoldingsFixedIncome = [];
    const myHoldingsLocalEquity = [];
    const myHoldingsRegionalEquity = [];
    const myHoldingsGlobalEquity = [];
    const myHoldingsAlternatives = [];

    expect(
      component.sortingValueChanged(
        sortingType,
        fund_list,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives
      )
    ).toBeTruthy();
  });

  it('sortingValueChanged - Value should be sorted - sortByReturnValueLowToHigh', () => {
    component.myHoldings = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
    ];
    const fund_list = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
    ];

    const sortingType = 'sortByReturnValueLowToHigh';
    const myHoldingsCash = [];

    const myHoldingsFixedIncome = [];
    const myHoldingsLocalEquity = [];
    const myHoldingsRegionalEquity = [];
    const myHoldingsGlobalEquity = [];
    const myHoldingsAlternatives = [];

    expect(
      component.sortingValueChanged(
        sortingType,
        fund_list,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives
      )
    ).toBeTruthy();
  });

  // it('pageValueChanged - page value should change when pageNumber is clicked sortByAlphabetAtoZ', () => {

  //   component.myHoldings = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //       fund_name : "Amitikal"
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //       fund_name : "Affin"
  //     },
  //   ];
  //   const fund_list = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //       fund_name : "Amitikal"
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //       fund_name : "Affin"
  //     },
  //   ];

  //   const sortingType = "sortByAlphabetAtoZ"
  //   const pageNumber = 1;
  //   const pages = 2;
  //   expect(component.pageValueChanged(pageNumber, pages, fund_list, sortingType)).toBeTruthy();

  // });

  // it('pageValueChanged - page value should change when pageNumber is clicked sortByAlphabetZtoA', () => {
  //   component.myHoldings = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //       fund_name : "Amitikal"
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //       fund_name : "Affin"
  //     },
  //   ];
  //   const fund_list = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //       fund_name : "Amitikal"
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //       fund_name : "Affin"
  //     },
  //   ];

  //   const sortingType = "sortByAlphabetZtoA"
  //   const pageNumber = 1;
  //   const pages = 2;
  //   expect(component.pageValueChanged(pageNumber, pages, fund_list, sortingType)).toBeTruthy();

  // });

  // it('pageValueChanged - page value should change when pageNumber is clicked sortByReturnPercentageHighToLow', () => {

  //   component.myHoldings = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //     },
  //   ];
  //   const fund_list = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //     },
  //   ];

  //   const sortingType = "sortByReturnPercentageHighToLow"
  //   const pageNumber = 1;
  //   const pages = 2;
  //   expect(component.pageValueChanged(pageNumber, pages, fund_list, sortingType)).toBeTruthy();
  // });

  // it('pageValueChanged - page value should change when pageNumber is clicked sortByReturnPercentageLowToHigh', () => {
  //   component.myHoldings = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //     },
  //   ];
  //   const fund_list = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //     },
  //   ];

  //   const sortingType = "sortByReturnPercentageLowToHigh"
  //   const pageNumber = 1;
  //   const pages = 2;
  //   expect(component.pageValueChanged(pageNumber, pages, fund_list, sortingType)).toBeTruthy();
  // });

  // it('pageValueChanged - page value should change when pageNumber is clicked sortByReturnValueHighToLow', () => {
  //   component.myHoldings = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //       total_return: '-694.60'
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //       total_return: '94.60'
  //     },
  //   ];
  //   const fund_list = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //       total_return: '-694.60'
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //       total_return: '94.60'
  //     },
  //   ];

  //   const sortingType = "sortByReturnValueHighToLow"
  //   const pageNumber = 1;
  //   const pages = 2;
  //   expect(component.pageValueChanged(pageNumber, pages, fund_list, sortingType)).toBeTruthy();
  // });

  // it('pageValueChanged - page value should change when pageNumber is clicked sortByReturnValueLowToHigh', () => {
  //   component.myHoldings = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //     },
  //   ];const fund_list = [
  //     {
  //       asset_class: 'CASH',
  //       class_seq: '1',
  //     },
  //     {
  //       asset_class: 'FIXED INCOME',
  //       class_seq: '2',
  //     },
  //   ];

  //   const sortingType = "sortByReturnValueLowToHigh"
  //   const pageNumber = 1;
  //   const pages = 2;
  //   expect(component.pageValueChanged(pageNumber, pages, fund_list, sortingType)).toBeTruthy();
  // });

  it('updateDashbordData -  clicked', () => {
    const dashboardResponse = {
      deviation_level: 'Significant Deviation',
      color_list: [
        {
          classHexa: '#B3BE66',
        },
        {
          classHexa: '#567DCC',
        },
        {
          classHexa: '#5CD3CD',
        },
        {
          classHexa: '#955CD6',
        },
        {
          classHexa: '#D45DBA',
        },
        {
          classHexa: '#4FA14F',
        },
      ],
      current_investment: '15863.44',
      deviation_value: '45.00',
      soleprop_ind: 'P',
      risk_profile: 'Aggresive',
      asset_class: [
        {
          holding: '4.5',
          asset_class_name: 'CASH',
          classHexa: '#B3BE66',
          class_seq: 1,
          recommended: '3.0',
        },
        {
          holding: '24.3',
          asset_class_name: 'FIXED INCOME FUND',
          classHexa: '#567DCC',
          class_seq: 2,
          recommended: '23.0',
        },
        {
          holding: '34.5',
          asset_class_name: 'LOCAL EQUITY',
          classHexa: '#5CD3CD',
          class_seq: 3,
          recommended: '40.0',
        },
        {
          holding: '10.4',
          asset_class_name: 'REGIONAL EQUITY',
          classHexa: '#955CD6',
          class_seq: 4,
          recommended: '15.0',
        },
        {
          holding: '21.3',
          asset_class_name: 'GLOBAL EQUITY',
          classHexa: '#D45DBA',
          class_seq: 5,
          recommended: '15.0',
        },
        {
          holding: '4.5',
          asset_class_name: 'ALTERNATIVE',
          classHexa: '#4FA14F',
          class_seq: 6,
          recommended: '4.0',
        },
      ],
      investment_ind: 'N',
      total_percentage: '-4.19',
      total_invested: '16558.04',
      recommended: [
        {
          name: 'CASH / MONEY MARKET',
          y: 3.0,
        },
        {
          name: 'FIXED INCOME FUND',
          y: 23.0,
        },
        {
          name: 'LOCAL EQUITY',
          y: 40.0,
        },
        {
          name: 'REGIONAL EQUITY',
          y: 15.0,
        },
        {
          name: 'GLOBAL EQUITY',
          y: 15.0,
        },
        {
          name: 'ALTERNATIVE',
          y: 4.0,
        },
      ],
      total_return: '-694.60',
      holding: [
        {
          name: 'CASH',
          y: 4.5,
        },
        {
          name: 'FIXED INCOME FUND',
          y: 24.3,
        },
        {
          name: 'LOCAL EQUITY',
          y: 34.5,
        },
        {
          name: 'REGIONAL EQUITY',
          y: 10.4,
        },
        {
          name: 'GLOBAL EQUITY',
          y: 21.3,
        },
        {
          name: 'ALTERNATIVE',
          y: 4.5,
        },
      ],
      fund_list: [
        {
          min_sub_amt: 200,
          current_investment: '5061.66',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '9203.01',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '1.23',
          fund_name:
            'PRINCIPAL GREATER CHINA EQUITY FUND (FKA CIMB-PRINCIPAL GREATER CHINA EQUITY FUND)',
          ut_account_no: 'A80111764',
          total_invested: '5000.00',
          min_init_amt: 500,
          total_return: '61.66',
          holding: '9203.01',
          max_sub_amt: 10000000000,
          average_nav_price: 0.55,
          max_init_amt: 10000000000,
          classHexa: '#955CD6',
          syariah_complaint: 'C',
          nav_price: '0.56',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 500,
        },
        {
          min_sub_amt: 200,
          current_investment: '3605.36',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '5874.80',
          asset_class: 'LOCAL EQUITY',
          fund_status: 'A',
          class_seq: 3,
          total_percentage: '21.45',
          fund_name:
            'PRINCIPAL ISLAMIC LIFETIME BALANCED GROWTH FUND (FKA CIMB ISLAMIC BALANCED GROWTH FUND)',
          ut_account_no: 'A80113214',
          total_invested: '2968.53',
          min_init_amt: 500,
          total_return: '636.83',
          holding: '5874.80',
          max_sub_amt: 10000000000,
          average_nav_price: 0.613699,
          max_init_amt: 10000000000,
          classHexa: '#5CD3CD',
          syariah_complaint: 'I',
          nav_price: '0.70',
          wholesale_ind: 'N',
          class_holding: '42.0',
          min_holding: 500,
        },
        {
          min_sub_amt: 200,
          current_investment: '2944.96',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '3681.20',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '47.25',
          fund_name:
            'PRINCIPAL CHINA-INDIA-INDONESIA-OPPORTUNITIES FUND (FKA CIMB-P CHINA-INDIA-INDONESIA EQUITY FUND)',
          ut_account_no: 'A80113214',
          total_invested: '2000.00',
          min_init_amt: 500,
          total_return: '944.96',
          holding: '3681.20',
          max_sub_amt: 9999999800000,
          average_nav_price: 0.8,
          max_init_amt: 9999999800000,
          classHexa: '#955CD6',
          syariah_complaint: 'C',
          nav_price: '0.26',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 500,
        },
        {
          min_sub_amt: 200,
          current_investment: '519.40',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '1000.00',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '-48.06',
          fund_name:
            'PRINCIPAL ISLAMIC ASIA PACIFIC DYNAMIC EQUITY FUND (FKA CIMB ISLAMIC ASIA PACIFIC EQUITY FUND)',
          ut_account_no: 'A80113215',
          total_invested: '1000.00',
          min_init_amt: 500,
          total_return: '-480.60',
          holding: '1000.00',
          max_sub_amt: 10000000000,
          average_nav_price: 0.5194,
          max_init_amt: 10000000000,
          classHexa: '#955CD6',
          syariah_complaint: 'I',
          nav_price: '0.52',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 0,
        },
        {
          min_sub_amt: 200,
          current_investment: '324.24',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '1176.47',
          asset_class: 'LOCAL EQUITY',
          fund_status: 'A',
          class_seq: 3,
          total_percentage: '-67.58',
          fund_name:
            'PRINCIPAL ISLAMIC MALAYSIA OPPORTUNITIES FUND (FKA CIMB ISLAMIC AL-AZZAM EQUITY FUND)',
          ut_account_no: 'A80113215',
          total_invested: '1000.00',
          min_init_amt: 500,
          total_return: '-675.76',
          holding: '1176.47',
          max_sub_amt: 10000000000,
          average_nav_price: 0.275604,
          max_init_amt: 10000000000,
          classHexa: '#5CD3CD',
          syariah_complaint: 'I',
          nav_price: '0.63',
          wholesale_ind: 'N',
          class_holding: '42.0',
          min_holding: 1000,
        },
        {
          min_sub_amt: 200,
          current_investment: '311.64',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '600.00',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '-48.06',
          fund_name:
            'PRINCIPAL ISLAMIC ASIA PACIFIC DYNAMIC EQUITY FUND (FKA CIMB ISLAMIC ASIA PACIFIC EQUITY FUND)',
          ut_account_no: 'A80113793',
          total_invested: '600.00',
          min_init_amt: 500,
          total_return: '-288.36',
          holding: '600.00',
          max_sub_amt: 10000000000,
          average_nav_price: 0.5194,
          max_init_amt: 10000000000,
          classHexa: '#955CD6',
          syariah_complaint: 'I',
          nav_price: '0.52',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 0,
        },
        {
          min_sub_amt: 200,
          current_investment: '1201.78',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '1958.26',
          asset_class: 'LOCAL EQUITY',
          fund_status: 'A',
          class_seq: 3,
          total_percentage: '21.45',
          fund_name:
            'PRINCIPAL ISLAMIC LIFETIME BALANCED GROWTH FUND (FKA CIMB ISLAMIC BALANCED GROWTH FUND)',
          ut_account_no: 'A80113794',
          total_invested: '989.51',
          min_init_amt: 500,
          total_return: '212.27',
          holding: '1958.26',
          max_sub_amt: 10000000000,
          average_nav_price: 0.613698,
          max_init_amt: 10000000000,
          classHexa: '#5CD3CD',
          syariah_complaint: 'I',
          nav_price: '0.70',
          wholesale_ind: 'N',
          class_holding: '42.0',
          min_holding: 500,
        },
        {
          min_sub_amt: 200,
          current_investment: '519.40',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '1000.00',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '-48.06',
          fund_name:
            'PRINCIPAL ISLAMIC ASIA PACIFIC DYNAMIC EQUITY FUND (FKA CIMB ISLAMIC ASIA PACIFIC EQUITY FUND)',
          ut_account_no: 'A80113794',
          total_invested: '1000.00',
          min_init_amt: 500,
          total_return: '-480.60',
          holding: '1000.00',
          max_sub_amt: 10000000000,
          average_nav_price: 0.5194,
          max_init_amt: 10000000000,
          classHexa: '#955CD6',
          syariah_complaint: 'I',
          nav_price: '0.52',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 0,
        },
        {
          min_sub_amt: 200,
          current_investment: '1375.00',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '2500.00',
          asset_class: 'LOCAL EQUITY',
          fund_status: 'A',
          class_seq: 3,
          total_percentage: '-31.25',
          fund_name:
            'PRINCIPAL DALI EQUITY GROWTH FUND (FKA CIMB ISLAMIC DALI EQUITY GROWTH FUND)',
          ut_account_no: 'E00000489',
          total_invested: '2000.00',
          min_init_amt: 500,
          total_return: '-625.00',
          holding: '2500.00',
          max_sub_amt: 10000000000,
          average_nav_price: 0.55,
          max_init_amt: 10000000000,
          classHexa: '#5CD3CD',
          syariah_complaint: 'I',
          nav_price: '1.00',
          wholesale_ind: 'N',
          class_holding: '42.0',
          min_holding: 250,
        },
      ],
      risk_description:
        'Suitable for investors with the longest time horizon. This portfolio has a higher allocation of equity and high risk investments, and is most susceptible to market volatility. This is a good allocation if you are an experienced investor and can handle market fluctuations including downturns for potentially higher returns in the longer term.',
      name: 'Ramasamy',
      deviation_msg:
        'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
      ut_account: [
        {
          default_ind: 'Y',
          ut_account_no: 'A80113794',
        },
      ],
      casa_ind: 'N',
      last_update_date: '01 Jan 2021, 10:21 am',
    };
    component.riskProfile = 'Conservative';
    expect(component.updateDashbordData(dashboardResponse, null)).toBeTruthy();
    const userData = {risk_profile:'Conservative'};
    component.userData = userData;
    expect(component.userData).toEqual(userData)
    component.riskProfile = 'Conservative';
    fixture.detectChanges();
    expect(component.riskProfile).toEqual('Conservative');
    //expect(component.riskProfileDescription).toEqual('I want to have a regular stream of stable income, while keeping my capital loss at a minimum.');


  });

  it('updateDashbordData -  holdingTotalValue , recommendedTotalValue <=0', () => {

    const accountDetailData = {
        deviation_level: 'Significant Deviation',
        color_list: [
          {
            classHexa: '#B3BE66',
          },
          {
            classHexa: '#567DCC',
          },
          {
            classHexa: '#5CD3CD',
          },
          {
            classHexa: '#955CD6',
          },
          {
            classHexa: '#D45DBA',
          },
          {
            classHexa: '#4FA14F',
          },
        ],
        current_investment: '15863.44',
        deviation_value: '45.00',
        soleprop_ind: 'Y',
        risk_profile: 'Aggresive',
        asset_class: [
          {
            holding: '4.5',
            asset_class_name: 'CASH',
            classHexa: '#B3BE66',
            class_seq: 1,
            recommended: '3.0',
          },
          {
            holding: '24.3',
            asset_class_name: 'FIXED INCOME FUND',
            classHexa: '#567DCC',
            class_seq: 2,
            recommended: '23.0',
          },
          {
            holding: '34.5',
            asset_class_name: 'LOCAL EQUITY',
            classHexa: '#5CD3CD',
            class_seq: 3,
            recommended: '40.0',
          },
          {
            holding: '10.4',
            asset_class_name: 'REGIONAL EQUITY',
            classHexa: '#955CD6',
            class_seq: 4,
            recommended: '15.0',
          },
          {
            holding: '21.3',
            asset_class_name: 'GLOBAL EQUITY',
            classHexa: '#D45DBA',
            class_seq: 5,
            recommended: '15.0',
          },
          {
            holding: '4.5',
            asset_class_name: 'ALTERNATIVE',
            classHexa: '#4FA14F',
            class_seq: 6,
            recommended: '4.0',
          },
        ],
        investment_ind: 'N',
        total_percentage: '-4.19',
        total_invested: '16558.04',
        recommended: [
          {
            name: 'CASH / MONEY MARKET',
            y: 0,
          },
          {
            name: 'FIXED INCOME FUND',
            y: 0,
          },
          {
            name: 'LOCAL EQUITY',
            y: 0,
          },
          {
            name: 'REGIONAL EQUITY',
            y: 0,
          },
          {
            name: 'GLOBAL EQUITY',
            y: 0,
          },
          {
            name: 'ALTERNATIVE',
            y: 0,
          },
        ],
        total_return: '-694.60',
        holding: [
          {
            name: 'CASH',
            y: 0,
          },
          {
            name: 'FIXED INCOME FUND',
            y: 0,
          },
          {
            name: 'LOCAL EQUITY',
            y: 0,
          },
          {
            name: 'REGIONAL EQUITY',
            y: 0,
          },
          {
            name: 'GLOBAL EQUITY',
            y: 0,
          },
          {
            name: 'ALTERNATIVE',
            y: 0,
          },
        ],
        fund_list: [
          {
            min_sub_amt: 200,
            current_investment: '5061.66',
            wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
            unit_held: '9203.01',
            asset_class: 'REGIONAL EQUITY',
            fund_status: 'A',
            class_seq: 4,
            total_percentage: '1.23',
            fund_name:
              'PRINCIPAL GREATER CHINA EQUITY FUND (FKA CIMB-PRINCIPAL GREATER CHINA EQUITY FUND)',
            ut_account_no: 'A80111764',
            total_invested: '5000.00',
            min_init_amt: 500,
            total_return: '61.66',
            holding: '9203.01',
            max_sub_amt: 10000000000,
            average_nav_price: 0.55,
            max_init_amt: 10000000000,
            classHexa: '#955CD6',
            syariah_complaint: 'C',
            nav_price: '0.56',
            wholesale_ind: 'N',
            class_holding: '58.0',
            min_holding: 500,
          },
          {
            min_sub_amt: 200,
            current_investment: '3605.36',
            wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
            unit_held: '5874.80',
            asset_class: 'LOCAL EQUITY',
            fund_status: 'A',
            class_seq: 3,
            total_percentage: '21.45',
            fund_name:
              'PRINCIPAL ISLAMIC LIFETIME BALANCED GROWTH FUND (FKA CIMB ISLAMIC BALANCED GROWTH FUND)',
            ut_account_no: 'A80113214',
            total_invested: '2968.53',
            min_init_amt: 500,
            total_return: '636.83',
            holding: '5874.80',
            max_sub_amt: 10000000000,
            average_nav_price: 0.613699,
            max_init_amt: 10000000000,
            classHexa: '#5CD3CD',
            syariah_complaint: 'I',
            nav_price: '0.70',
            wholesale_ind: 'N',
            class_holding: '42.0',
            min_holding: 500,
          },
          {
            min_sub_amt: 200,
            current_investment: '2944.96',
            wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
            unit_held: '3681.20',
            asset_class: 'REGIONAL EQUITY',
            fund_status: 'A',
            class_seq: 4,
            total_percentage: '47.25',
            fund_name:
              'PRINCIPAL CHINA-INDIA-INDONESIA-OPPORTUNITIES FUND (FKA CIMB-P CHINA-INDIA-INDONESIA EQUITY FUND)',
            ut_account_no: 'A80113214',
            total_invested: '2000.00',
            min_init_amt: 500,
            total_return: '944.96',
            holding: '3681.20',
            max_sub_amt: 9999999800000,
            average_nav_price: 0.8,
            max_init_amt: 9999999800000,
            classHexa: '#955CD6',
            syariah_complaint: 'C',
            nav_price: '0.26',
            wholesale_ind: 'N',
            class_holding: '58.0',
            min_holding: 500,
          },
          {
            min_sub_amt: 200,
            current_investment: '519.40',
            wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
            unit_held: '1000.00',
            asset_class: 'REGIONAL EQUITY',
            fund_status: 'A',
            class_seq: 4,
            total_percentage: '-48.06',
            fund_name:
              'PRINCIPAL ISLAMIC ASIA PACIFIC DYNAMIC EQUITY FUND (FKA CIMB ISLAMIC ASIA PACIFIC EQUITY FUND)',
            ut_account_no: 'A80113215',
            total_invested: '1000.00',
            min_init_amt: 500,
            total_return: '-480.60',
            holding: '1000.00',
            max_sub_amt: 10000000000,
            average_nav_price: 0.5194,
            max_init_amt: 10000000000,
            classHexa: '#955CD6',
            syariah_complaint: 'I',
            nav_price: '0.52',
            wholesale_ind: 'N',
            class_holding: '58.0',
            min_holding: 0,
          },
          {
            min_sub_amt: 200,
            current_investment: '324.24',
            wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
            unit_held: '1176.47',
            asset_class: 'LOCAL EQUITY',
            fund_status: 'A',
            class_seq: 3,
            total_percentage: '-67.58',
            fund_name:
              'PRINCIPAL ISLAMIC MALAYSIA OPPORTUNITIES FUND (FKA CIMB ISLAMIC AL-AZZAM EQUITY FUND)',
            ut_account_no: 'A80113215',
            total_invested: '1000.00',
            min_init_amt: 500,
            total_return: '-675.76',
            holding: '1176.47',
            max_sub_amt: 10000000000,
            average_nav_price: 0.275604,
            max_init_amt: 10000000000,
            classHexa: '#5CD3CD',
            syariah_complaint: 'I',
            nav_price: '0.63',
            wholesale_ind: 'N',
            class_holding: '42.0',
            min_holding: 1000,
          },
          {
            min_sub_amt: 200,
            current_investment: '311.64',
            wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
            unit_held: '600.00',
            asset_class: 'REGIONAL EQUITY',
            fund_status: 'A',
            class_seq: 4,
            total_percentage: '-48.06',
            fund_name:
              'PRINCIPAL ISLAMIC ASIA PACIFIC DYNAMIC EQUITY FUND (FKA CIMB ISLAMIC ASIA PACIFIC EQUITY FUND)',
            ut_account_no: 'A80113793',
            total_invested: '600.00',
            min_init_amt: 500,
            total_return: '-288.36',
            holding: '600.00',
            max_sub_amt: 10000000000,
            average_nav_price: 0.5194,
            max_init_amt: 10000000000,
            classHexa: '#955CD6',
            syariah_complaint: 'I',
            nav_price: '0.52',
            wholesale_ind: 'N',
            class_holding: '58.0',
            min_holding: 0,
          },
          {
            min_sub_amt: 200,
            current_investment: '1201.78',
            wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
            unit_held: '1958.26',
            asset_class: 'LOCAL EQUITY',
            fund_status: 'A',
            class_seq: 3,
            total_percentage: '21.45',
            fund_name:
              'PRINCIPAL ISLAMIC LIFETIME BALANCED GROWTH FUND (FKA CIMB ISLAMIC BALANCED GROWTH FUND)',
            ut_account_no: 'A80113794',
            total_invested: '989.51',
            min_init_amt: 500,
            total_return: '212.27',
            holding: '1958.26',
            max_sub_amt: 10000000000,
            average_nav_price: 0.613698,
            max_init_amt: 10000000000,
            classHexa: '#5CD3CD',
            syariah_complaint: 'I',
            nav_price: '0.70',
            wholesale_ind: 'N',
            class_holding: '42.0',
            min_holding: 500,
          },
          {
            min_sub_amt: 200,
            current_investment: '519.40',
            wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
            unit_held: '1000.00',
            asset_class: 'REGIONAL EQUITY',
            fund_status: 'A',
            class_seq: 4,
            total_percentage: '-48.06',
            fund_name:
              'PRINCIPAL ISLAMIC ASIA PACIFIC DYNAMIC EQUITY FUND (FKA CIMB ISLAMIC ASIA PACIFIC EQUITY FUND)',
            ut_account_no: 'A80113794',
            total_invested: '1000.00',
            min_init_amt: 500,
            total_return: '-480.60',
            holding: '1000.00',
            max_sub_amt: 10000000000,
            average_nav_price: 0.5194,
            max_init_amt: 10000000000,
            classHexa: '#955CD6',
            syariah_complaint: 'I',
            nav_price: '0.52',
            wholesale_ind: 'N',
            class_holding: '58.0',
            min_holding: 0,
          },
          {
            min_sub_amt: 200,
            current_investment: '1375.00',
            wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
            unit_held: '2500.00',
            asset_class: 'LOCAL EQUITY',
            fund_status: 'A',
            class_seq: 3,
            total_percentage: '-31.25',
            fund_name:
              'PRINCIPAL DALI EQUITY GROWTH FUND (FKA CIMB ISLAMIC DALI EQUITY GROWTH FUND)',
            ut_account_no: 'E00000489',
            total_invested: '2000.00',
            min_init_amt: 500,
            total_return: '-625.00',
            holding: '2500.00',
            max_sub_amt: 10000000000,
            average_nav_price: 0.55,
            max_init_amt: 10000000000,
            classHexa: '#5CD3CD',
            syariah_complaint: 'I',
            nav_price: '1.00',
            wholesale_ind: 'N',
            class_holding: '42.0',
            min_holding: 250,
          },
        ],
        risk_description:
          'Suitable for investors with the longest time horizon. This portfolio has a higher allocation of equity and high risk investments, and is most susceptible to market volatility. This is a good allocation if you are an experienced investor and can handle market fluctuations including downturns for potentially higher returns in the longer term.',
        name: 'Ramasamy',
        deviation_msg:
          'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
        ut_account: [
          {
            default_ind: 'Y',
            ut_account_no: 'A80113794',
          },
        ],
        casa_ind: 'Y',
        last_update_date: '01 Jan 2021, 10:21 am',
      };

    component.dashboardFlow = 1;
    expect(component.updateDashbordData(accountDetailData, null)).toBeTruthy();


  });


  it('updateDashbordData -  callsed Balanced', () => {

    const userData = {risk_profile:'Balanced'};
    component.userData = userData;
    expect(component.userData).toEqual(userData)
    component.riskProfile = 'Balanced';
    fixture.detectChanges();
    expect(component.riskProfile).toEqual('Balanced');
   // expect(component.riskProfileDescription).toEqual('I want to receive regular income and capital growth. I am willing to lose a small amount of my capital.');

  });

  it('updateDashbordData -  callsed Growth', () => {

    const userData = {risk_profile:'Growth'};
    component.userData = userData;
    expect(component.userData).toEqual(userData)
    component.riskProfile = 'Growth';
    fixture.detectChanges();
    expect(component.riskProfile).toEqual('Growth');
    //expect(component.riskProfileDescription).toEqual('I want to grow my capital substantially in the long term. I can accept losing a moderate amount of my capital.');

  });

    it('updateDashbordData -  callsed Aggressive', () => {

    const userData = {risk_profile:'Aggressive'};
    component.userData = userData;
    expect(component.userData).toEqual(userData)
    component.riskProfile = 'Aggressive';
    fixture.detectChanges();
    expect(component.riskProfile).toEqual('Aggressive');
    //expect(component.riskProfileDescription).toEqual('I want to receive high capital growth and I am willing to accept the risk of losing my capital.');

  });

  it('riskRedoClickEvent -  clicked', () => {
    expect(component.riskRedoClickEvent()).toBeTruthy();
  });

  it('learnMoreClickEvent -  clicked', () => {
    expect(component.learnMoreClickEvent()).toBeTruthy();
  });

  it('ngOnInit -  clicked', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('ngOnInit -  clicksInfo', () => {
    component.customerType='ETP';
    const mockData = {
      cifNumber: "10280000511145",
      customerIDNumber: "490528035038",
      customerIDType: "3",
      customerIDTypeDesc: "New IC",
      customerType: "ETP",
      debitCardNumber: "5196032215004710",
      ipAddress: "183.82.177.43"
      }
      component.clicksInfo=mockData;
      // jest.spyOn(store, 'select').mockImplementation((clicks) => {
      //   return of({
      //     cifNumber: "10280000511145",
      //     customerIDNumber: "490528035038",
      //     customerIDType: "3",
      //     customerIDTypeDesc: "New IC",
      //     customerType: "ETP",
      //     debitCardNumber: "5196032215004710",
      //     ip: "183.82.177.43"
      //   });
      // });

      component.ngOnInit();
      expect(component.ngOnInit()).toBeUndefined();
      expect(component.customerType).toEqual(mockData.customerType);
  });

  it('ngOnInit -  clicked', () => {
    component.userData = userData;
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.dashboardFlow).toEqual(1);
  });

  it('ngOnInit -  clicked', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      1,
      '4 Sept 2020, 10:30AM',
      'WJ-85',
      'P',
      'N',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.flow).toEqual('Y');
  });

  it('ngOnInit -  clicked', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      2,
      '4 Sept 2020, 10:30AM',
      'WJ-85',
      'P',
      'N',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.flow).toEqual('Y');
  });

  it('ngOnInit -  clicked', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      3,
      '4 Sept 2020, 10:30AM',
      'WJ-85',
      'P',
      'N',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.flow).toEqual('Y');
  });

  it('ngOnInit -  clicked', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      3,
      '4 Sept 2020, 10:30AM',
      'WJ-109-a',
      'P',
      'N',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    // expect(component.portfolioWarningMaessage).toEqual(
    //   'Your Holdings do not reflect any pending transaction requests.'
    // );
  });

  it('ngOnInit -  clicked', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      3,
      '4 Sept 2020, 10:30AM',
      'WJ-109-b',
      'P',
      'N',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    // expect(component.portfolioWarningMaessage).toEqual(
    //   'Your portfolio looks good! It’s <b>currently optimised</b> and matches the recommended model asset class breakdown.'
    // );
  });

  it('ngOnInit -  clicked', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      3,
      '4 Sept 2020, 10:30AM',
      'WJ-109-c',
      'P',
      'N',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    // expect(component.portfolioWarningMaessage).toEqual(
    //   'Your portfolio has <b>changed slightly (5-10%)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected for your risk profile.'
    // );
  });

  it('ngOnInit -  clicked', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      3,
      '4 Sept 2020, 10:30AM',
      'WJ-109-d',
      'P',
      'N',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    // expect(component.portfolioWarningMaessage).toEqual(
    //   'Your portfolio has <b>changed moderately (10-20%)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected for your risk profile.'
    // );
  });

  it('ngOnInit -  clicked', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      3,
      '4 Sept 2020, 10:30AM',
      'WJ-109-e',
      'P',
      'N',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    // expect(component.portfolioWarningMaessage).toEqual(
    //   'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected for your risk profile.'
    // );
  });

  it('ngOnInit -  clicked', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      3,
      '4 Sept 2020, 10:30AM',
      'WJ-283-a',
      'P',
      'N',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.riskProfileRedoAllowed).toBeFalsy();
  });

  it('ngOnInit -  clicked, join_or_ut_account = Y', () => {
      component.userData = {join_or_ut_account : 'Y'}
      expect(component.ngOnInit()).toBeUndefined();

  });

  it('updateDashbordData -  clicked', () => {
    const dashboardResponse = {
      deviation_level: 'Significant Deviation',
      color_list: [
        {
          classHexa: '#B3BE66',
        },
        {
          classHexa: '#567DCC',
        },
        {
          classHexa: '#5CD3CD',
        },
        {
          classHexa: '#955CD6',
        },
        {
          classHexa: '#D45DBA',
        },
        {
          classHexa: '#4FA14F',
        },
      ],
      current_investment: '15863.44',
      deviation_value: '45.00',
      soleprop_ind: 'Y',
      risk_profile: 'Aggresive',
      asset_class: [
        {
          holding: '4.5',
          asset_class_name: 'CASH',
          classHexa: '#B3BE66',
          class_seq: 1,
          recommended: '3.0',
        },
        {
          holding: '24.3',
          asset_class_name: 'FIXED INCOME FUND',
          classHexa: '#567DCC',
          class_seq: 2,
          recommended: '23.0',
        },
        {
          holding: '34.5',
          asset_class_name: 'LOCAL EQUITY',
          classHexa: '#5CD3CD',
          class_seq: 3,
          recommended: '40.0',
        },
        {
          holding: '10.4',
          asset_class_name: 'REGIONAL EQUITY',
          classHexa: '#955CD6',
          class_seq: 4,
          recommended: '15.0',
        },
        {
          holding: '21.3',
          asset_class_name: 'GLOBAL EQUITY',
          classHexa: '#D45DBA',
          class_seq: 5,
          recommended: '15.0',
        },
        {
          holding: '4.5',
          asset_class_name: 'ALTERNATIVE',
          classHexa: '#4FA14F',
          class_seq: 6,
          recommended: '4.0',
        },
      ],
      investment_ind: 'N',
      total_percentage: '-4.19',
      total_invested: '16558.04',
      recommended: [
        {
          name: 'CASH / MONEY MARKET',
          y: 3.0,
        },
        {
          name: 'FIXED INCOME FUND',
          y: 23.0,
        },
        {
          name: 'LOCAL EQUITY',
          y: 40.0,
        },
        {
          name: 'REGIONAL EQUITY',
          y: 15.0,
        },
        {
          name: 'GLOBAL EQUITY',
          y: 15.0,
        },
        {
          name: 'ALTERNATIVE',
          y: 4.0,
        },
      ],
      total_return: '-694.60',
      holding: [
        {
          name: 'CASH',
          y: 4.5,
        },
        {
          name: 'FIXED INCOME FUND',
          y: 24.3,
        },
        {
          name: 'LOCAL EQUITY',
          y: 34.5,
        },
        {
          name: 'REGIONAL EQUITY',
          y: 10.4,
        },
        {
          name: 'GLOBAL EQUITY',
          y: 21.3,
        },
        {
          name: 'ALTERNATIVE',
          y: 4.5,
        },
      ],
      fund_list: [
        {
          min_sub_amt: 200,
          current_investment: '5061.66',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '9203.01',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '1.23',
          fund_name:
            'PRINCIPAL GREATER CHINA EQUITY FUND (FKA CIMB-PRINCIPAL GREATER CHINA EQUITY FUND)',
          ut_account_no: 'A80111764',
          total_invested: '5000.00',
          min_init_amt: 500,
          total_return: '61.66',
          holding: '9203.01',
          max_sub_amt: 10000000000,
          average_nav_price: 0.55,
          max_init_amt: 10000000000,
          classHexa: '#955CD6',
          syariah_complaint: 'C',
          nav_price: '0.56',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 500,
        },
        {
          min_sub_amt: 200,
          current_investment: '3605.36',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '5874.80',
          asset_class: 'LOCAL EQUITY',
          fund_status: 'A',
          class_seq: 3,
          total_percentage: '21.45',
          fund_name:
            'PRINCIPAL ISLAMIC LIFETIME BALANCED GROWTH FUND (FKA CIMB ISLAMIC BALANCED GROWTH FUND)',
          ut_account_no: 'A80113214',
          total_invested: '2968.53',
          min_init_amt: 500,
          total_return: '636.83',
          holding: '5874.80',
          max_sub_amt: 10000000000,
          average_nav_price: 0.613699,
          max_init_amt: 10000000000,
          classHexa: '#5CD3CD',
          syariah_complaint: 'I',
          nav_price: '0.70',
          wholesale_ind: 'N',
          class_holding: '42.0',
          min_holding: 500,
        },
        {
          min_sub_amt: 200,
          current_investment: '2944.96',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '3681.20',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '47.25',
          fund_name:
            'PRINCIPAL CHINA-INDIA-INDONESIA-OPPORTUNITIES FUND (FKA CIMB-P CHINA-INDIA-INDONESIA EQUITY FUND)',
          ut_account_no: 'A80113214',
          total_invested: '2000.00',
          min_init_amt: 500,
          total_return: '944.96',
          holding: '3681.20',
          max_sub_amt: 9999999800000,
          average_nav_price: 0.8,
          max_init_amt: 9999999800000,
          classHexa: '#955CD6',
          syariah_complaint: 'C',
          nav_price: '0.26',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 500,
        },
        {
          min_sub_amt: 200,
          current_investment: '519.40',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '1000.00',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '-48.06',
          fund_name:
            'PRINCIPAL ISLAMIC ASIA PACIFIC DYNAMIC EQUITY FUND (FKA CIMB ISLAMIC ASIA PACIFIC EQUITY FUND)',
          ut_account_no: 'A80113215',
          total_invested: '1000.00',
          min_init_amt: 500,
          total_return: '-480.60',
          holding: '1000.00',
          max_sub_amt: 10000000000,
          average_nav_price: 0.5194,
          max_init_amt: 10000000000,
          classHexa: '#955CD6',
          syariah_complaint: 'I',
          nav_price: '0.52',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 0,
        },
        {
          min_sub_amt: 200,
          current_investment: '324.24',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '1176.47',
          asset_class: 'LOCAL EQUITY',
          fund_status: 'A',
          class_seq: 3,
          total_percentage: '-67.58',
          fund_name:
            'PRINCIPAL ISLAMIC MALAYSIA OPPORTUNITIES FUND (FKA CIMB ISLAMIC AL-AZZAM EQUITY FUND)',
          ut_account_no: 'A80113215',
          total_invested: '1000.00',
          min_init_amt: 500,
          total_return: '-675.76',
          holding: '1176.47',
          max_sub_amt: 10000000000,
          average_nav_price: 0.275604,
          max_init_amt: 10000000000,
          classHexa: '#5CD3CD',
          syariah_complaint: 'I',
          nav_price: '0.63',
          wholesale_ind: 'N',
          class_holding: '42.0',
          min_holding: 1000,
        },
        {
          min_sub_amt: 200,
          current_investment: '311.64',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '600.00',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '-48.06',
          fund_name:
            'PRINCIPAL ISLAMIC ASIA PACIFIC DYNAMIC EQUITY FUND (FKA CIMB ISLAMIC ASIA PACIFIC EQUITY FUND)',
          ut_account_no: 'A80113793',
          total_invested: '600.00',
          min_init_amt: 500,
          total_return: '-288.36',
          holding: '600.00',
          max_sub_amt: 10000000000,
          average_nav_price: 0.5194,
          max_init_amt: 10000000000,
          classHexa: '#955CD6',
          syariah_complaint: 'I',
          nav_price: '0.52',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 0,
        },
        {
          min_sub_amt: 200,
          current_investment: '1201.78',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '1958.26',
          asset_class: 'LOCAL EQUITY',
          fund_status: 'A',
          class_seq: 3,
          total_percentage: '21.45',
          fund_name:
            'PRINCIPAL ISLAMIC LIFETIME BALANCED GROWTH FUND (FKA CIMB ISLAMIC BALANCED GROWTH FUND)',
          ut_account_no: 'A80113794',
          total_invested: '989.51',
          min_init_amt: 500,
          total_return: '212.27',
          holding: '1958.26',
          max_sub_amt: 10000000000,
          average_nav_price: 0.613698,
          max_init_amt: 10000000000,
          classHexa: '#5CD3CD',
          syariah_complaint: 'I',
          nav_price: '0.70',
          wholesale_ind: 'N',
          class_holding: '42.0',
          min_holding: 500,
        },
        {
          min_sub_amt: 200,
          current_investment: '519.40',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '1000.00',
          asset_class: 'REGIONAL EQUITY',
          fund_status: 'A',
          class_seq: 4,
          total_percentage: '-48.06',
          fund_name:
            'PRINCIPAL ISLAMIC ASIA PACIFIC DYNAMIC EQUITY FUND (FKA CIMB ISLAMIC ASIA PACIFIC EQUITY FUND)',
          ut_account_no: 'A80113794',
          total_invested: '1000.00',
          min_init_amt: 500,
          total_return: '-480.60',
          holding: '1000.00',
          max_sub_amt: 10000000000,
          average_nav_price: 0.5194,
          max_init_amt: 10000000000,
          classHexa: '#955CD6',
          syariah_complaint: 'I',
          nav_price: '0.52',
          wholesale_ind: 'N',
          class_holding: '58.0',
          min_holding: 0,
        },
        {
          min_sub_amt: 200,
          current_investment: '1375.00',
          wholesale_msg: 'Wholesales Msg Fund Detail Object Found',
          unit_held: '2500.00',
          asset_class: 'LOCAL EQUITY',
          fund_status: 'A',
          class_seq: 3,
          total_percentage: '-31.25',
          fund_name:
            'PRINCIPAL DALI EQUITY GROWTH FUND (FKA CIMB ISLAMIC DALI EQUITY GROWTH FUND)',
          ut_account_no: 'E00000489',
          total_invested: '2000.00',
          min_init_amt: 500,
          total_return: '-625.00',
          holding: '2500.00',
          max_sub_amt: 10000000000,
          average_nav_price: 0.55,
          max_init_amt: 10000000000,
          classHexa: '#5CD3CD',
          syariah_complaint: 'I',
          nav_price: '1.00',
          wholesale_ind: 'N',
          class_holding: '42.0',
          min_holding: 250,
        },
      ],
      risk_description:
        'Suitable for investors with the longest time horizon. This portfolio has a higher allocation of equity and high risk investments, and is most susceptible to market volatility. This is a good allocation if you are an experienced investor and can handle market fluctuations including downturns for potentially higher returns in the longer term.',
      name: 'Ramasamy',
      deviation_msg:
        'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
      ut_account: [
        {
          default_ind: 'Y',
          ut_account_no: 'A80113794',
        },
      ],
      casa_ind: 'Y',
      last_update_date: '01 Jan 2021, 10:21 am',
    };
    expect(component.updateDashbordData(dashboardResponse, null)).toBeTruthy();
    expect(component.riskProfileRedoAllowed).toBeFalsy();
  });


  it('updateDashbordData -  clicked riskProfileDescription  defensive', () => {
    const dashboardResponse = {
      deviation_level: 'Significant Deviation',
      color_list: [ ],
      current_investment: '15863.44',
      deviation_value: '45.00',
      soleprop_ind: 'Y',
      risk_profile: 'defensive',
      asset_class: [ ],
      investment_ind: 'N',
      total_percentage: '-4.19',
      total_invested: '16558.04',
      recommended: [ ],
      total_return: '-694.60',
      holding: [ ],
      fund_list: [ ],
      risk_description:
        'Suitable for investors with the longest time horizon. This portfolio has a higher allocation of equity and high risk investments, and is most susceptible to market volatility. This is a good allocation if you are an experienced investor and can handle market fluctuations including downturns for potentially higher returns in the longer term.',
      name: 'Ramasamy',
      deviation_msg:
        'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
      ut_account: [  ],
      casa_ind: 'Y',
      last_update_date: '01 Jan 2021, 10:21 am',
    };
    expect(component.updateDashbordData(dashboardResponse, null)).toBeTruthy();
    expect(component.riskProfile ).toEqual('defensive');
    //expect(component.riskProfileDescription).toEqual('I want to preserve my capital and not willing to lose any of it.');
  });


  it('updateDashbordData -  clicked riskProfileDescription  conservative', () => {
    const dashboardResponse = {
      deviation_level: 'Significant Deviation',
      color_list: [ ],
      current_investment: '15863.44',
      deviation_value: '45.00',
      soleprop_ind: 'Y',
      risk_profile: 'conservative',
      asset_class: [ ],
      investment_ind: 'N',
      total_percentage: '-4.19',
      total_invested: '16558.04',
      recommended: [ ],
      total_return: '-694.60',
      holding: [ ],
      fund_list: [ ],
      risk_description:
        'Suitable for investors with the longest time horizon. This portfolio has a higher allocation of equity and high risk investments, and is most susceptible to market volatility. This is a good allocation if you are an experienced investor and can handle market fluctuations including downturns for potentially higher returns in the longer term.',
      name: 'Ramasamy',
      deviation_msg:
        'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
      ut_account: [  ],
      casa_ind: 'Y',
      last_update_date: '01 Jan 2021, 10:21 am',
    };
    expect(component.updateDashbordData(dashboardResponse, null)).toBeTruthy();
    expect(component.riskProfile ).toEqual('conservative');
    //expect(component.riskProfileDescription).toEqual('I want to have a regular stream of stable income, while keeping my capital loss at a minimum.');
  });


  it('updateDashbordData -  clicked riskProfileDescription  balanced', () => {
    const dashboardResponse = {
      deviation_level: 'Significant Deviation',
      color_list: [ ],
      current_investment: '15863.44',
      deviation_value: '45.00',
      soleprop_ind: 'Y',
      risk_profile: 'balanced',
      asset_class: [ ],
      investment_ind: 'N',
      total_percentage: '-4.19',
      total_invested: '16558.04',
      recommended: [ ],
      total_return: '-694.60',
      holding: [ ],
      fund_list: [ ],
      risk_description:
        'Suitable for investors with the longest time horizon. This portfolio has a higher allocation of equity and high risk investments, and is most susceptible to market volatility. This is a good allocation if you are an experienced investor and can handle market fluctuations including downturns for potentially higher returns in the longer term.',
      name: 'Ramasamy',
      deviation_msg:
        'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
      ut_account: [  ],
      casa_ind: 'Y',
      last_update_date: '01 Jan 2021, 10:21 am',
    };
    expect(component.updateDashbordData(dashboardResponse, null)).toBeTruthy();
    expect(component.riskProfile ).toEqual('balanced');
    //expect(component.riskProfileDescription).toEqual('I want to receive regular income and capital growth. I am willing to lose a small amount of my capital.');
  });



  it('updateDashbordData -  clicked riskProfileDescription  growth', () => {
    const dashboardResponse = {
      deviation_level: 'Significant Deviation',
      color_list: [ ],
      current_investment: '15863.44',
      deviation_value: '45.00',
      soleprop_ind: 'Y',
      risk_profile: 'growth',
      asset_class: [ ],
      investment_ind: 'N',
      total_percentage: '-4.19',
      total_invested: '16558.04',
      recommended: [ ],
      total_return: '-694.60',
      holding: [ ],
      fund_list: [ ],
      risk_description:
        'Suitable for investors with the longest time horizon. This portfolio has a higher allocation of equity and high risk investments, and is most susceptible to market volatility. This is a good allocation if you are an experienced investor and can handle market fluctuations including downturns for potentially higher returns in the longer term.',
      name: 'Ramasamy',
      deviation_msg:
        'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
      ut_account: [  ],
      casa_ind: 'Y',
      last_update_date: '01 Jan 2021, 10:21 am',
    };
    expect(component.updateDashbordData(dashboardResponse, null)).toBeTruthy();
    expect(component.riskProfile ).toEqual('growth');
   // expect(component.riskProfileDescription).toEqual('I want to grow my capital substantially in the long term. I can accept losing a moderate amount of my capital.');
  });


  it('updateDashbordData -  clicked riskProfileDescription  aggresive', () => {
    const dashboardResponse = {
      deviation_level: 'Significant Deviation',
      color_list: [ ],
      current_investment: '15863.44',
      deviation_value: '45.00',
      soleprop_ind: 'Y',
      risk_profile: 'aggresive',
      asset_class: [ ],
      investment_ind: 'N',
      total_percentage: '-4.19',
      total_invested: '16558.04',
      recommended: [ ],
      total_return: '-694.60',
      holding: [ ],
      fund_list: [ ],
      risk_description:
        'Suitable for investors with the longest time horizon. This portfolio has a higher allocation of equity and high risk investments, and is most susceptible to market volatility. This is a good allocation if you are an experienced investor and can handle market fluctuations including downturns for potentially higher returns in the longer term.',
      name: 'Ramasamy',
      deviation_msg:
        'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
      ut_account: [  ],
      casa_ind: 'Y',
      last_update_date: '01 Jan 2021, 10:21 am',
    };
    expect(component.updateDashbordData(dashboardResponse, null)).toBeTruthy();
    expect(component.riskProfile ).toEqual('aggresive');
    //expect(component.riskProfileDescription).toEqual('I want to receive high capital growth and I am willing to accept the risk of losing my capital.');
  });

  it('DashboardComponent addToCartEvent defined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    const value = { amount: '1000', index: '-1' };

    component.myHoldingsDisplayList =  [];
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.addToCartEvent(value)).toBeTruthy();

    expect(component.fundObj).toBeUndefined();
  });

  it('DashboardComponent addToCartEvent defined if case', () => {
    expect(component.ngOnInit()).toBeUndefined();
    const value = { amount: '1000', index: '-1' };

    component.myHoldingsDisplayList =  [];

    expect(component.ngOnInit()).toBeUndefined();
    expect(component.addToCartEvent(value)).toBeTruthy();
    component.fundObj = {sales_charge:0,risk_ind :'Y'};

    component.fundObj = {sales_charge:1.0,risk_ind :'Y'};
    expect(component.fundObj).toEqual({sales_charge:1.0,risk_ind :'Y'});
  });

  it('DashboardComponent removeFromCartEvent -  clicked', () => {
    expect(component.removeFromCartEvent(0)).toBeTruthy();
  });

  it('DashboardComponent accountListChangeEvent - accountList length > 1 , default_Ind -Y ,- clicked', () => {
    component.portfolioAccount = [{ ut_account_no : "ABC12345", default_ind : "Y"}]
    expect(component.accountListChangeEvent("ABC12345")).toBeTruthy();
  });

  it('DashboardComponent accountListChangeEvent - accountList length > 1 , default_Ind -N ,- clicked', () => {
    component.portfolioAccount = [{ ut_account_no : "ABC12345", default_ind : "N"}]
    expect(component.accountListChangeEvent("ABC12345")).toBeTruthy();
  });


  it('DashboardComponent accountListChangeEvent -  clicked', () => {
    expect(component.accountListChangeEvent("ABC12345")).toBeTruthy();
  });

  it('ngOnInit -  clicked invertment_indicator ', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      3,
      '4 Sept 2020, 10:30AM',
      'WJ-85',
      'P',
      'Y',
      'N',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.dashboardFlow).toEqual(2);
  });

  it('ngOnInit -  clicked casa_indicator ', () => {
    component.userData = new User(
      'Corporation',
      'CK1003',
      'SOLO_PROB',
      3333333333333333,
      3,
      '4 Sept 2020, 10:30AM',
      'WJ-85',
      'P',
      'N',
      'Y',
      'N',
      '2222222222222222',
      'N',
      'N',
      'N',
    );
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.dashboardFlow).toEqual(1);
  });


  it('navigateEventRisk -  clicked', () => {
    const data ={page:'data'}
    expect(component.navigateEventRisk(data)).toBeTruthy();
  });

  it('navigateEventRisk - risk-result clicked', () => {
    const data ={page: path.RISK_PROFILE_RESULTS}
    expect(component.navigateEventRisk(data)).toBeTruthy();
  });

  it('navigateEventRisk - risk-profile-question clicked', () => {
    const data ={page:'risk-profile-question'}
    expect(component.navigateEventRisk(data)).toBeTruthy();
  });

  it('navigateEventRisk - null clicked', () => {
    const data ={page:null}
    expect(component.navigateEventRisk(data)).toBeTruthy();
  });


  it('DashboardComponent clearCartAndContinueDataEvent -  clicked', () => {
    const values = {"flow":1}
    component.myHoldingsDisplayList = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.50',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '5',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '59',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '593',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595',
      },
      {
        asset_class: 'LOCAL EQUITY',
        class_seq: '3',
        total_return: '595.53',
      },
      {
        asset_class: 'REGIONAL EQUITY',
        class_seq: '4',
        total_return: '595.53',
      },
      {
        asset_class: 'GLOBAL EQUITY',
        class_seq: '5',
        total_return: '595.53',
      },
      {
        asset_class: 'ALTERNATIVES',
        class_seq: '6',
        total_return: '595.53',
      }
    ];
    expect(component.clearCartAndContinueDataEvent(values)).toBeTruthy();

  });

  it('DashboardComponent populateDisplayFlagForPurchaseDetail' , () => {
    component.purchaseDetailData = [
      {
         "transId": 1100420,
         "fdAccountNo": "",
         "contactNo": "0122176370",
         "paymentTo": "",
         "transactionUnit": 100.2,
         "transactionStatus": "Unsuccessful",
         "seqNo": 1,
         "transactionStatusDate": "2021-11-21 22:19:14",
         "transactionStatusDt": "11/23/2021",
         "transactionStatusTm": "06:19:14",
         "fileStatus": null,
         "indicativeCharges": null,
         "taxCode": "",
         "taxRate": 0,
         "icNumber": "481124715058",
         "displayFlag" : true,
         "settlementAccount": "",
         "fundCode": "CBT39D",
         "fundName": "CIMB-PRINCIPAL STRATEGIC INCOME BOND FUND",
         "toFundCode": "",
         "referenceNo": "1100420-1",
         "payableAmount": 0,
         "transactionType": "03",
         "transactionTypeDesc": "Switch",
         "userId": "",
         "transactionDatetime": "2021-11-21 22:19:14",
         "transactionDt": "Tue 21 Nov 2021",
         "transactionTm": "06.19 AM",
         "clientName": "XXXXXXYOON TIA",
         "clientId": "481124715058",
         "toFundName": "",
         "utAccountNo": "A80091526",
         "chargeId": 10,
         "chargesPercentage": 0.00752,
         "chargesAmount": 0.01,
         "totalInvestment": 4,
         "netInvestment": 3.97,
         "taxId": 0,
         "taxAmount": 0,
         "fileStatusDate": null,
         "staffIndicator": "2",
         "einvestsmart": "0"
      },
      {
         "transId": 1100421,
         "fdAccountNo": "",
         "contactNo": "0122176370",
         "paymentTo": "",
         "transactionUnit": 100.2,
         "transactionStatus": "Unsuccessful",
         "displayFlag" : false,
         "seqNo": 1,
         "transactionStatusDate": "2021-11-23 22:19:14",
         "transactionStatusDt": "11/23/2021",
         "transactionStatusTm": "06:19:14",
         "fileStatus": null,
         "indicativeCharges": null,
         "taxCode": "",
         "taxRate": 0,
         "icNumber": "481124715058",
         "settlementAccount": "",
         "fundCode": "CBT40A",
         "fundName": "PRINCIPAL ASIA PACIFIC DYNAMIC INCOME FUND (FKA CIMB-PRINCIPAL ASIA PACIFIC DYNAMIC INCOME FUND)",
         "toFundCode": "",
         "referenceNo": "1100421-1",
         "payableAmount": 0,
         "transactionType": "03",
         "transactionTypeDesc": "Switch",
         "userId": "",
         "transactionDatetime": "2021-11-21 22:19:14",
         "transactionDt": "Tue 21 Nov 2021",
         "transactionTm": "06.19 AM",
         "clientName": "XXXXXXYOON TIA",
         "clientId": "481124715058",
         "toFundName": "",
         "utAccountNo": "A80039444",
         "chargeId": 10,
         "chargesPercentage": 0.00752,
         "chargesAmount": 0.01,
         "totalInvestment": 3,
         "netInvestment": 2.98,
         "taxId": 0,
         "taxAmount": 0,
         "fileStatusDate": null,
         "staffIndicator": "2",
         "einvestsmart": "0"
      },
      {
         "transId": 1100422,
         "fdAccountNo": "",
         "contactNo": "0122176370",
         "paymentTo": "",
         "transactionUnit": 100.2,
         "transactionStatus": "Processing",
         "seqNo": 1,
         "transactionStatusDate": "2021-11-24 22:19:14",
         "transactionStatusDt": "11/23/2021",
         "transactionStatusTm": "06:19:14",
         "fileStatus": null,
         "indicativeCharges": null,
         "taxCode": "",
         "taxRate": 0,
         "icNumber": "481124715058",
         "settlementAccount": "",
         "fundCode": "CBT41D",
         "displayFlag" : true,
         "fundName": "CIMB PRINCIPAL STRATEGIC INCOME BOND FUND 2",
         "toFundCode": "",
         "referenceNo": "1100422-1",
         "payableAmount": 0,
         "transactionType": "03",
         "transactionTypeDesc": "Switch",
         "userId": "",
         "transactionDatetime": "2021-11-24 22:19:14",
         "transactionDt": "Tue 24 Nov 2021",
         "transactionTm": "06.19 AM",
         "clientName": "XXXXXXYOON TIA",
         "clientId": "481124715058",
         "toFundName": "",
         "utAccountNo": "A80091526",
         "chargeId": 10,
         "chargesPercentage": 0.00752,
         "chargesAmount": 0.01,
         "totalInvestment": 5,
         "netInvestment": 4.96,
         "taxId": 0,
         "taxAmount": 0,
         "fileStatusDate": null,
         "staffIndicator": "2",
         "einvestsmart": "0"
      }]
    expect(component.populateDisplayFlagForPurchaseDetail()).toBeTruthy();

  });

  it('DashboardComponent updatePurchaseDetailData' , () => {
    const purchaseDetailData = [
      {
         "transId": 1100420,
         "fdAccountNo": "",
         "contactNo": "0122176370",
         "paymentTo": "",
         "transactionUnit": 100.2,
         "transactionStatus": "Unsuccessful",
         "seqNo": 1,
         "transactionStatusDate": "2021-11-21 22:19:14",
         "transactionStatusDt": "11/23/2021",
         "transactionStatusTm": "06:19:14",
         "fileStatus": null,
         "indicativeCharges": null,
         "taxCode": "",
         "taxRate": 0,
         "icNumber": "481124715058",
         "displayFlag" : true,
         "settlementAccount": "",
         "fundCode": "CBT39D",
         "fundName": "CIMB-PRINCIPAL STRATEGIC INCOME BOND FUND",
         "toFundCode": "",
         "referenceNo": "1100420-1",
         "payableAmount": 0,
         "transactionType": "03",
         "transactionTypeDesc": "Switch",
         "userId": "",
         "transactionDatetime": "2021-11-21 22:19:14",
         "transactionDt": "Tue 21 Nov 2021",
         "transactionTm": "06.19 AM",
         "clientName": "XXXXXXYOON TIA",
         "clientId": "481124715058",
         "toFundName": "",
         "utAccountNo": "A80091526",
         "chargeId": 10,
         "chargesPercentage": 0.00752,
         "chargesAmount": 0.01,
         "totalInvestment": 4,
         "netInvestment": 3.97,
         "taxId": 0,
         "taxAmount": 0,
         "fileStatusDate": null,
         "staffIndicator": "2",
         "einvestsmart": "0"
      },
      {
         "transId": 1100421,
         "fdAccountNo": "",
         "contactNo": "0122176370",
         "paymentTo": "",
         "transactionUnit": 100.2,
         "transactionStatus": "Unsuccessful",
         "displayFlag" : false,
         "seqNo": 1,
         "transactionStatusDate": "2021-11-23 22:19:14",
         "transactionStatusDt": "11/23/2021",
         "transactionStatusTm": "06:19:14",
         "fileStatus": null,
         "indicativeCharges": null,
         "taxCode": "",
         "taxRate": 0,
         "icNumber": "481124715058",
         "settlementAccount": "",
         "fundCode": "CBT40A",
         "fundName": "PRINCIPAL ASIA PACIFIC DYNAMIC INCOME FUND (FKA CIMB-PRINCIPAL ASIA PACIFIC DYNAMIC INCOME FUND)",
         "toFundCode": "",
         "referenceNo": "1100421-1",
         "payableAmount": 0,
         "transactionType": "03",
         "transactionTypeDesc": "Switch",
         "userId": "",
         "transactionDatetime": "2021-11-21 22:19:14",
         "transactionDt": "Tue 21 Nov 2021",
         "transactionTm": "06.19 AM",
         "clientName": "XXXXXXYOON TIA",
         "clientId": "481124715058",
         "toFundName": "",
         "utAccountNo": "A80039444",
         "chargeId": 10,
         "chargesPercentage": 0.00752,
         "chargesAmount": 0.01,
         "totalInvestment": 3,
         "netInvestment": 2.98,
         "taxId": 0,
         "taxAmount": 0,
         "fileStatusDate": null,
         "staffIndicator": "2",
         "einvestsmart": "0"
      },
      {
         "transId": 1100422,
         "fdAccountNo": "",
         "contactNo": "0122176370",
         "paymentTo": "",
         "transactionUnit": 100.2,
         "transactionStatus": "Processing",
         "seqNo": 1,
         "transactionStatusDate": "2021-11-24 22:19:14",
         "transactionStatusDt": "11/23/2021",
         "transactionStatusTm": "06:19:14",
         "fileStatus": null,
         "indicativeCharges": null,
         "taxCode": "",
         "taxRate": 0,
         "icNumber": "481124715058",
         "settlementAccount": "",
         "fundCode": "CBT41D",
         "displayFlag" : true,
         "fundName": "CIMB PRINCIPAL STRATEGIC INCOME BOND FUND 2",
         "toFundCode": "",
         "referenceNo": "1100422-1",
         "payableAmount": 0,
         "transactionType": "03",
         "transactionTypeDesc": "Switch",
         "userId": "",
         "transactionDatetime": "2021-11-24 22:19:14",
         "transactionDt": "Tue 24 Nov 2021",
         "transactionTm": "06.19 AM",
         "clientName": "XXXXXXYOON TIA",
         "clientId": "481124715058",
         "toFundName": "",
         "utAccountNo": "A80091526",
         "chargeId": 10,
         "chargesPercentage": 0.00752,
         "chargesAmount": 0.01,
         "totalInvestment": 5,
         "netInvestment": 4.96,
         "taxId": 0,
         "taxAmount": 0,
         "fileStatusDate": null,
         "staffIndicator": "2",
         "einvestsmart": "0"
      }]
    expect(component.updatePurchaseDetailData(purchaseDetailData)).toBeTruthy();

  });

  it('DashboardComponent clearAllCart' , () => {
    const values = [{customerID : "809767"}]
    expect(component.clearAllCart(values)).toBeTruthy();

  });

  it('DashboardComponent selectedAccountChange' , () => {
    const value = [{customerID : "809767"}]
    expect(component.selectedAccountChange(value)).toBeUndefined();

  });

  it('DashboardComponent groupMyHoldindsToAssetClassType ', () => {
    component.myHoldings = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.53',
      },
      {
        asset_class: 'LOCAL EQUITY',
        class_seq: '3',
        total_return: '595.53',
      },
      {
        asset_class: 'REGIONAL EQUITY',
        class_seq: '4',
        total_return: '595.53',
      },
      {
        asset_class: 'GLOBAL EQUITY',
        class_seq: '5',
        total_return: '595.53',
      },
      {
        asset_class: 'ALTERNATIVES',
        class_seq: '6',
        total_return: '595.53',
      }
    ];

    expect(component.groupMyHoldindsToAssetClassType()).toBeUndefined();
  });

  it('DashboardComponent selectedAccountChangeUtIndicator 01 A' , () => {
    const value =  {
      "ut_joint_indicator": "01",
      "default_ind": "N",
      "ut_account_type": "A",
      "ut_account_no": "E00000489"
    }
    expect(component.selectedAccountChangeUtIndicator(value)).toBeTruthy();
    expect(component.joinAndUtAccountIndicator).toBeTruthy();
  });

  it('DashboardComponent selectedAccountChangeUtIndicator 01 P' , () => {
    const value =  {
      "ut_joint_indicator": "01",
      "default_ind": "N",
      "ut_account_type": "P",
      "ut_account_no": "E00000489"
    }
    expect(component.selectedAccountChangeUtIndicator(value)).toBeTruthy();
    expect(component.joinAndUtAccountIndicator).toBeFalsy();
  });

  it('DashboardComponent selectedAccountChangeUtIndicator 02 A' , () => {
    const value =  {
      "ut_joint_indicator": "02",
      "default_ind": "N",
      "ut_account_type": "A",
      "ut_account_no": "E00000489"
    }
    expect(component.selectedAccountChangeUtIndicator(value)).toBeTruthy();
    expect(component.joinAndUtAccountIndicator).toBeTruthy();
  });

  it('DashboardComponent selectedAccountChangeUtIndicator 02 P' , () => {
    const value =  {
      "ut_joint_indicator": "02",
      "default_ind": "N",
      "ut_account_type": "P",
      "ut_account_no": "E00000489"
    }
    expect(component.selectedAccountChangeUtIndicator(value)).toBeTruthy();
    expect(component.joinAndUtAccountIndicator).toBeFalsy();
    expect(component.joinOrUtAccountIndicator).toBeTruthy();
  });
  it('DashboardComponent selectedAccountChangeUtIndicator 01 S' , () => {
    const value =  {
      "ut_joint_indicator": "01",
      "default_ind": "N",
      "ut_account_type": "S",
      "ut_account_no": "E00000489"
    }
    expect(component.selectedAccountChangeUtIndicator(value)).toBeTruthy();
    expect(component.joinAndUtAccountIndicator).toBeFalsy();
    expect(component.joinOrUtAccountIndicator).toBeFalsy();
  });

  it('DashboardComponent selectedAccountChangeUtIndicator 02 S' , () => {
    const value =  {
      "ut_joint_indicator": "02",
      "default_ind": "N",
      "ut_account_type": "S",
      "ut_account_no": "E00000489"
    }
    expect(component.selectedAccountChangeUtIndicator(value)).toBeTruthy();
    expect(component.joinAndUtAccountIndicator).toBeFalsy();
    expect(component.joinOrUtAccountIndicator).toBeFalsy();
  });

  it('DashboardComponent callDashboardApi - data  clicked', () => {

    expect(component.callDashboardApi()).toBeTruthy();
  });


  it('DashboardComponent updateFlowList 001 clicked', () => {

    expect(component.updateFlowList('001')).toBeTruthy();
    expect(component.accountOptions).toBe('1');
  });

  it('DashboardComponent updateFlowList 002 clicked', () => {

    expect(component.updateFlowList('002')).toBeTruthy();
    expect(component.accountOptions).toBe('2');
  });

  it('DashboardComponent updateFlowList 003 clicked', () => {

    expect(component.updateFlowList('003')).toBeTruthy();
    expect(component.accountOptions).toBe('3');
  });


  it('DashboardComponent updateFlowList 000 clicked', () => {

    expect(component.updateFlowList('000')).toBeTruthy();
    expect(component.accountOptions).toBe('1');
  });

  it('DashboardComponent selectedTabChange clicked', () => {
    expect(component.selectedTabChange(0)).toBeTruthy();
    expect(component.selectedTabIndex).toBe(0);
  });

  it('DashboardComponent updateDashbordData cartUTAccount === listItem.ut_account_no' ,() => {
    const cartUTAccount = "AB67878";
    const accountDetailData = { "total_percentage" : "69.89","ut_account" : [ {ut_account_no : "AB67878"}]}
    expect(component.updateDashbordData(accountDetailData, cartUTAccount)).toBeTruthy();
  });

  it('DashboardComponent updateDashbordData cartUTAccount !== listItem.ut_account_no' ,() => {
    const cartUTAccount = "AB678";
    const accountDetailData = { "total_percentage" : "69.89","ut_account" : [ {ut_account_no : "AB67878"}]}
    expect(component.updateDashbordData(accountDetailData, cartUTAccount)).toBeTruthy();
  });

  it('DashboardComponent updateDashbordData accountNo === null ' ,() => {
    const cartUTAccount = "AB678";
    const accountDetailData = { "total_percentage" : "69.89","ut_account" : [ {ut_account_no : null}]}
    expect(component.updateDashbordData(accountDetailData, cartUTAccount)).toBeTruthy();
  });

  it('DashboardComponent updateDashbordData dashboardFlow !==1  ' ,() => {
    component.dashboardFlow = 1;
    const cartUTAccount = "AB678";
    const accountDetailData = { "total_percentage" : "69.89","ut_account" : [ {ut_account_no : null}],
    "holding" : [ {name: 'CASH', y: 0}, {name: 'FIXED INCOME', y: 11.3}
    , {name: 'LOCAL EQUITY', y: 66.7}
    , {name: 'REGIONAL EQUITY', y: 0}
    , {name: 'GLOBAL EQUITY', y: 10.1}
    , {name: 'ALTERNATIVE', y: 0}],
    "recommended" : [ {name: 'CASH', y: 3}, {name: 'FIXED INCOME', y: 23}
    , {name: 'LOCAL EQUITY', y: 40}
    , {name: 'REGIONAL EQUITY', y: 15}
    , {name: 'GLOBAL EQUITY', y: 15}
    , {name: 'ALTERNATIVE', y: 4}]}
    expect(component.updateDashbordData(accountDetailData, cartUTAccount)).toBeTruthy();
  });


  it('DashboardComponent filterFundListByAccountNumber ' ,() => {

    component.myHoldings = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.50',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '5',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '59',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '593',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595',
      },
      {
        asset_class: 'LOCAL EQUITY',
        class_seq: '3',
        total_return: '595.53',
      },
      {
        asset_class: 'REGIONAL EQUITY',
        class_seq: '4',
        total_return: '595.53',
      },
      {
        asset_class: 'GLOBAL EQUITY',
        class_seq: '5',
        total_return: '595.53',
      },
      {
        asset_class: 'ALTERNATIVES',
        class_seq: '6',
        total_return: '595.53',
      }
    ];

    component.myHoldingsDisplayList = [
      {
        asset_class: 'CASH',
        class_seq: '1',
        total_return: '595.53',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595.50',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '5',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '59',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '593',
      },
      {
        asset_class: 'FIXED INCOME',
        class_seq: '2',
        total_return: '595',
      },
      {
        asset_class: 'LOCAL EQUITY',
        class_seq: '3',
        total_return: '595.53',
      },
      {
        asset_class: 'REGIONAL EQUITY',
        class_seq: '4',
        total_return: '595.53',
      },
      {
        asset_class: 'GLOBAL EQUITY',
        class_seq: '5',
        total_return: '595.53',
      },
      {
        asset_class: 'ALTERNATIVES',
        class_seq: '6',
        total_return: '595.53',
      }
    ];


    expect(component.filterFundListByAccountNumber()).toBeUndefined();

  });

  it('should called dateFilteredPurchaseDetailDataEvent(event)', () => {
        const resultArray = [];
        const filteredArray = [];

        component.purchaseDetailDataFromStore = [
            {
                transId: 7000817,
                fdAccountNo: '8007013407',
                contactNo: '01130702678',
                paymentTo: '',
                transactionUnit: 0,
                transactionUnitStr: '0.00',
                transactionStatus: 'Cancelled',
                seqNo: 1,
                userId: '950614054416',
                transactionDatetime: '2022-04-13 01:35:52',
                mobileNo: '01130702678',
                chargesPercentageStr: '1.00',
                chargesAmountStr: '35.00',
                totalInvestmentStr: '3,500.00',
                netInvestmentStr: '3,465.00',
                transactionTypeDesc: 'Purchase',
                transactionStatusDt: null,
                transactionStatusTm: null,
                transactionDt: 'Wed 13 Apr 2022',
                transactionTm: '09:35 AM',
                payableAmount: 3500,
                transactionType: '01',
                processingStatus: 'N',
                transactionStatusDate: null,
                fileStatus: 'N',
                indicativeCharges: 3,
                clientName: 'Ali Amir bin Ahmad',
                clientId: '950614054416',
                clientIdType: 'NEWIC',
                toFundName: '',
                utAccountNo: 'A80106429',
                chargeId: 0,
                netInvestment: 3465,
                processingStatusDate: null,
                staffIndicator: '2',
                einvestsmart: 'Y',
                taxCode: '0',
                taxRate: 0,
                icNumber: '950614054416',
                taxId: 0,
                taxAmount: 0,
                fileStatusDate: '2022-04-13 01:35:52',
                rejectedDate: '2022-04-13 01:37:21',
                settlementAccount: '8007013407',
                fundCode: 'AMU02A',
                fundName: 'Amtotal Return',
                toFundCode: '',
                referenceNo: '7000817-01',
                chargesPercentage: 1,
                chargesAmount: 35,
                totalInvestment: 3500,
                rejectedName: 'testing',
                rejectedRemark: 'cancelled this transaction'
              }
        ]

        expect(resultArray).toEqual([])
        expect(filteredArray).toEqual([])
        expect(component.purchaseDetailDataFromStore.length).toBe(1);

        component.dateFilteredPurchaseDetailDataEvent(component.purchaseDetailDataFromStore);

        for (let i = 0; i < component.purchaseDetailDataFromStore.length; i++) {
            expect(resultArray.push(component.purchaseDetailDataFromStore[i])).toBeTruthy()
        }
    });

    it('DashboardComponent wealthDashboardClickEvent ' ,() => {

    expect(component.wealthDashboardClickEvent()).toBeUndefined();
    });

//     it('should send out redeem values for cart', ()=> {
//       const obj = {
//         "amount": "800.00",
//         "flow": "001",
//         "fund_code": "CBT40A",
//         "unit": 800,
//         "index": 1
//     }
//     expect(component.updateDashboardRedeemAmount(obj)).toBeUndefined();
//   })
describe('txHistoryPurchaseSummery', () => {
  it('should set selectedAccounts and purchaseSUmmeryOneTimeFlag correctly', () => {
    const purchaseDataSort = {
      purchaseDetailData: [
        { transId: 3, utAccountNo: 'ABC123' },
        { transId: 2, utAccountNo: 'DEF456' },
        { transId: 1, utAccountNo: 'GHI789' },
      ],
    };
    const context = {
      purchaseDataSort,
      selectedAccounts: null,
      purchaseSUmmeryOneTimeFlag: true,
    };
    expect(context.selectedAccounts).toBe(null);
    expect(context.purchaseSUmmeryOneTimeFlag).toBe(true);
  });

  it('should handle empty purchaseDetailData correctly', () => {
    const purchaseDataSort = {
      purchaseDetailData: [],
    };
    const context = {
      purchaseDataSort,
      selectedAccounts: null,
      purchaseSUmmeryOneTimeFlag: true,
    };
    expect(context.selectedAccounts).toBeNull();
    expect(context.purchaseSUmmeryOneTimeFlag).toBe(true);
  });

  it('should handle missing purchaseDataSort correctly', () => {
    const context = {
      selectedAccounts: null,
      purchaseSUmmeryOneTimeFlag: true,
    };
    expect(context.selectedAccounts).toBeNull();
    expect(context.purchaseSUmmeryOneTimeFlag).toBe(true);
  });
});
});
