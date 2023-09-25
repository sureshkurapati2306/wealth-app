import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListHoldingComponent } from './list-holding.component';

describe('ListHoldingComponent', () => {
  let component: ListHoldingComponent;
  let fixture: ComponentFixture<ListHoldingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListHoldingComponent],
      imports: [MatDialogModule, MatBottomSheetModule, MatMenuModule,MatExpansionModule,
        RouterTestingModule, NgxPaginationModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHoldingComponent);
    component = fixture.componentInstance;
    component.myHoldings = [];
    component.itemsPerPage = 10;
    component.currentPageNumber = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnChanges', () => {

    component.ngOnChanges({
      myHoldings: new SimpleChange(undefined, [], true),
      currentPageNumber: new SimpleChange(undefined, 2, true)
    });

    expect(component).toBeTruthy();
  });

  it('should send out redeem values for cart', ()=> {
      const obj = {
        "amount": "800.00",
        "flow": "001",
        "fund_code": "CBT40A",
        "unit": 800,
        "index": 1
    }
    expect(component.updateRedeem(obj)).toBeUndefined();
  })
  it('should open fund details call analytics service', ()=> {
    const obj = {
      "amount": "800.00",
      "flow": "001",
      "fund_code": "CBT40A",
      "fund_name": "CIMB-PRINCIPAL ASSET MANAGEMENT BERHAD",
      "risk_name": "Growth",
      "unit": 800,
      "index": 1
  }
  component.openFundDetails(obj);
  expect(component.loadAnalytisFundDetails).toBeCalled();  
});

it('should call  dashBoardApi()', () => {
  expect(component.dashBoardApi());
});

it('sortHoldingInAlphabeticalOrderAtoZ - Asset class CASH should call', () => {
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
  expect(component.sortHoldingInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
});

it('sortHoldingInAlphabeticalOrderAtoZ - Asset class Fixed Income should call', () => {
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

  expect(component.sortHoldingInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
});

it('sortHoldingInAlphabeticalOrderAtoZ - Asset class Local Equity should call', () => {
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
  expect(component.sortHoldingInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
});

it('sortHoldingInAlphabeticalOrderAtoZ - Asset class Regional Equity should call', () => {
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
  expect(component.sortHoldingInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
});

it('sortHoldingInAlphabeticalOrderAtoZ - Asset class Global Equity should call', () => {
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
  expect(component.sortHoldingInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
});

it('sortHoldingInAlphabeticalOrderAtoZ - Asset class Alternatives should call', () => {
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
  expect(component.sortHoldingInAlphabeticalOrderAtoZ(fund_list)).toBeTruthy();
});

it('DashboardComponent groupHoldindsToAssetClassType ', () => {
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

  expect(component.groupHoldindsToAssetClassType()).toBeUndefined();
});
});
