import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxProductWealthComponent } from './box-product-wealth.component';

describe('BoxProductWealthComponent', () => {
  let component: BoxProductWealthComponent;
  let fixture: ComponentFixture<BoxProductWealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxProductWealthComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxProductWealthComponent);
    component = fixture.componentInstance;
    component.assetLiabilities = [
      {
          "alcName": "My Deposit",
          "alDesc": "SA PASSBOOK",
          "alcSeq": 2,
          "alCode": "SDA",
          "alCategory": "Assets",
          "accountNumber": "0000000007023039873",
          "cardNumber": null,
          "amount": 3416.91,
          "currencyCode": "MYR",
          "nextPaymentDueDate": null
      },
      {
          "alcName": "My Deposit",
          "alDesc": "CA FLEXI",
          "alcSeq": 2,
          "alCode": "CDA",
          "alCategory": "Assets",
          "accountNumber": "0000000008004321188",
          "cardNumber": null,
          "amount": 54817.11,
          "currencyCode": "MYR",
          "nextPaymentDueDate": null
      },
      {
          "alcName": "My Loans/Financing",
          "alDesc": "BIZ FLEXI",
          "alcSeq": 1,
          "alCode": "ILA",
          "alCategory": "Liabilities",
          "accountNumber": "0000000008004321188",
          "cardNumber": null,
          "amount": 74275.77,
          "currencyCode": "MYR",
          "nextPaymentDueDate": "2020-06-01"
      },
      {
          "alcName": "My Credit Cards",
          "alDesc": "CIMB Cash Rebate Platinum MasterCard",
          "alcSeq": 2,
          "alCode": "CCA",
          "alCategory": "Liabilities",
          "accountNumber": null,
          "cardNumber": "5521154096000983",
          "amount": 2460.00,
          "currencyCode": null,
          "nextPaymentDueDate": null
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create onRedoRiskProfilingClick', () => {
    expect(component.onRedoRiskProfilingClick()).toBeUndefined();
  });

  it('should create onLearnMoreClick', () => {
    expect(component.onLearnMoreClick()).toBeUndefined();
  });

});
