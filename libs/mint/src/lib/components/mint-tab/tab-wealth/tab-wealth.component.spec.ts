import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { AccountSummary } from '@cimb/shared/models';
import { StoreModule } from '@ngrx/store';
import { TabWealthComponent } from './tab-wealth.component';

const mockData: AccountSummary = {
  "totalAsset": 1035188.4,
  "totalLiability": 1304508.09,
  "cifNumber": "10110000120648",
  "assetsPct": 44.2,
  "liabilitiesPct": 55.8,
  "myInvestmentPct": 4.4,
  "myDepositPct": 95.6,
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
      "alDesc": "HOME FLEXI",
      "alcSeq": 1,
      "alCode": "ILA",
      "alCategory": "Liabilities",
      "accountNumber": "0000000008004537492",
      "cardNumber": null,
      "amount": 321031.77,
      "currencyCode": "MYR",
      "investmentLastUpdated": null,
      "nextPaymentDueDate": "2022-05-31"
    },
    {
      "alcName": "My Credit Cards",
      "alDesc": "CIMB Cash Rebate Platinum Visa",
      "alcSeq": 2,
      "alCode": "CCA",
      "alCategory": "Liabilities",
      "accountNumber": null,
      "cardNumber": "1234567891023456",
      "amount": 9304,
      "currencyCode": null,
      "investmentLastUpdated": null,
      "nextPaymentDueDate": null
    }
  ],
  totalDeposits: 0,
  totalInvestments: 0,
  totalLoans: 0,
  totalCredits: 0,
  utInvestmentsStatus: '',
  tdaStatus: '',
  sibsStatus: '',
  cardLinkStatus: '',
  islamicCreditCardStatus: ''
};
describe('TabWealthComponent', () => {
  let component: TabWealthComponent;
  let fixture: ComponentFixture<TabWealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabWealthComponent],
      imports: [MatDialogModule, MatMenuModule, StoreModule.forRoot({}),],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabWealthComponent);
    component = fixture.componentInstance;
    component.accountSummary = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create tabChanged', () => {
    expect(component.tabChanged()).toBeUndefined();
  });
  it('should  loadAdobeAnalytics method called', () => {
    component.tabChanged();
    component.tabClickCount=1;
    component.selectedTabIndex=1;
    expect(component.loadAdobeAnalytics).toBeCalled();
  });


});
