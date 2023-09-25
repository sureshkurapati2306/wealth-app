import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MemoizedSelector } from '@ngrx/store';
import { MintOfficeFeatureUnitTrustTransactionsComponent } from './mint-office-feature-unit-trust-transactions.component';
import { UnitTrustTransaction } from '../core/models/unit-trust-transactions.model';
import { State } from './+state/unit-trust-transactions.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BreadcrumbsComponent } from '../mint-office-ui-breadcrumbs/breadcrumbs/breadcrumbs.component';
import { MatTabsModule } from '@angular/material/tabs';
import * as Selectors from './+state/unit-trust-transactions.selectors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';


const mockData: UnitTrustTransaction[] = [
  {
    "processingStatusDate":null,
    "rejectedName": null,
    "rejectedDate": null,
    "rejectedRemark": null,
    "cifNumber": null,
    "accountStatus": null,
    "jointIndicator": null,
    "mobileNo": null,
    "indicativeCharges": null,
    "fileStatusDate": null,
    "fileStatus": null,
    "transactionStatusDate": "2021-12-22T09:51:09.000+00:00",
    "transactionStatus": "Cancelled",
    "transactionUnit": 100.200000,
    "paymentTo": "",
    "contactNo": "0122176370",
    "fdAccountNo": "",
    "einvestsmart": "0",
    "staffIndicator": "2",
    "userId": "",
    "payableAmount": 0.00,
    "taxAmount": 0.00,
    "taxRate": 0.000000,
    "taxCode": "",
    "taxId": 0,
    "netInvestment": 4.96,
    "totalInvestment": 5.00,
    "chargesAmount": 0.01,
    "chargesPercentage": 0.007520,
    "chargeId": 10,
    "utAccountNo": "A80111457",
    "toFundName": "",
    "toFundCode": "",
    "fundName": "CIMB-PRINCIPAL STRATEGIC INCOME BOND FUND",
    "fundCode": "CBT39D",
    "settlementAccount": "8001041503",
    "icNumber": "750702105695",
    "seqNo": 1,
    "clientId": "750702105695",
    "clientName": "XXXXXXT MILLIO",
    "transactionType": "01",
    "transactionDatetime": "2021-12-22T09:51:09.000+00:00",
    "referenceNo": "1-1",
    "transId": 2,
    "auditId": 2,
    "auditDate": "2021-12-16T09:30:42.000+00:00",
    "otp": "NA",
    "moduleName": "Logout",
    "eventName": "Logout And Audit",
    "channelName": "Web Browser",
    "statusInd": "S",
    "browserName": "Chrome",
    "osVersion": "Win10",
    "ipAddress": "12.1.2.1",
    "statusRemark": null,
    "riskRatingInd": null,
    "documentInd": null
  }
];

const mockState: State = {
  entities: mockData,
  currentEntity: 1,
  hasSearched: false,
  searchQuery: {
    status: 'All'
  },
  status: 'pending',
  error: ''
};

let mockSelectUTPurchasingTransactions: MemoizedSelector<Record<string, unknown>, UnitTrustTransaction[]>;
let mockSelectUTRedemptionTransactions: MemoizedSelector<Record<string, unknown>, UnitTrustTransaction[]>;
let mockSelectUTSwitchingTransactions: MemoizedSelector<Record<string, unknown>, UnitTrustTransaction[]>;

@Component({selector: 'cimb-office-ut-search-form', template: ''}) 
class UtSearchFormStubComponent {}

@Component({selector: 'cimb-office-ut-list-table', template: ''}) 
class UtListTableStubComponent {}

describe('MintOfficeFeatureUnitTrustTransactionsComponent', () => {
  let component: MintOfficeFeatureUnitTrustTransactionsComponent;
  let fixture: ComponentFixture<MintOfficeFeatureUnitTrustTransactionsComponent>;
  let actions$: Observable<any>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        MintOfficeFeatureUnitTrustTransactionsComponent, 
        BreadcrumbsComponent,
        UtSearchFormStubComponent,
        UtListTableStubComponent,
      ],
      imports: [ 
        BrowserAnimationsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTabsModule,
        RouterTestingModule
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({ initialState: mockState })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    mockSelectUTPurchasingTransactions = store.overrideSelector(
      Selectors.selectUTSwitchingTransactions,
      []
    );
    mockSelectUTRedemptionTransactions = store.overrideSelector(
      Selectors.selectUTRedemptionTransactions,
      []
    );
    mockSelectUTSwitchingTransactions = store.overrideSelector(
      Selectors.selectUTSwitchingTransactions,
      []
    );
    fixture = TestBed.createComponent(MintOfficeFeatureUnitTrustTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    mockSelectUTPurchasingTransactions.setResult( mockState.entities );
    mockSelectUTRedemptionTransactions.setResult( mockState.entities );
    mockSelectUTSwitchingTransactions.setResult( mockState.entities );

    store.refreshState();
    fixture.detectChanges();

    expect(component).toBeDefined();
  });

  it('clickCancelTransactions', () => {
    expect(component.clickCancelTransactions(mockData)).toBeUndefined();
  });

  it('cancelTransactions', () => {
    expect(component.cancelTransactions(mockData, 'sample comments')).toBeUndefined();
  });

  it('search', () => {
    expect(component.search({
      status: 'All'
    })).toBeUndefined();
  });

  it('clear', () => {
    expect(component.clear()).toBeUndefined();
  });

  it('tabChanged', () => {

    component.tabChanged({
      index: 1
    });

    expect(component.tabName).toBe('Redemption');

    component.tabChanged({
      index: 2
    });

    expect(component.tabName).toBe('Switching');

    component.tabChanged({
      index: 0
    });

    expect(component.tabName).toBe('Purchase');

  });

});
