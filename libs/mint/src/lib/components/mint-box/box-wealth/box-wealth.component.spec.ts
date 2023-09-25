import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxWealthComponent } from './box-wealth.component';

describe('BoxWealthComponent', () => {
  let component: BoxWealthComponent;
  let fixture: ComponentFixture<BoxWealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxWealthComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxWealthComponent);
    component = fixture.componentInstance;
    component.accountSummary = {
      "totalAsset": 1093422.420000,
      "totalLiability": 1381243.86,
      "cifNumber": "10110000120648",
      "assetsPct": 44.2,
      "liabilitiesPct": 55.8,
      "myInvestmentPct": 4.1,
      "myDepositPct": 95.9,
      "myLoansPct": 96.8,
      "myCreditCardsPct": 3.2,
      "customerName": "John Doe",
      "lastUpdated": "2022-03-17T11:31:19.627852",
      "assetLiabilities": [
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
              "investmentLastUpdated": null,
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
              "investmentLastUpdated": null,
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
              "investmentLastUpdated": null,
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
              "investmentLastUpdated": null,
              "nextPaymentDueDate": null
          }
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
