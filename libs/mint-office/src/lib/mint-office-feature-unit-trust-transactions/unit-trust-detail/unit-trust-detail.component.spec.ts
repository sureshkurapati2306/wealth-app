import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { State } from '../+state/unit-trust-transactions.reducer';
import { UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemoizedSelector } from '@ngrx/store';
import * as Selectors from '../+state/unit-trust-transactions.selectors';

import { UnitTrustDetailComponent } from './unit-trust-detail.component';
import { Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
    "statusRemark": null
  },
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
    "transactionStatus": "Processing",
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
    "statusRemark": null
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

let mockSelectUnitTrustDetail: MemoizedSelector<Record<string, unknown>, UnitTrustTransaction>;

describe('UnitTrustDetailComponent', () => {
  let component: UnitTrustDetailComponent;
  let fixture: ComponentFixture<UnitTrustDetailComponent>;
  let actions$: Observable<any>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        UnitTrustDetailComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({ initialState: mockState }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    mockSelectUnitTrustDetail = store.overrideSelector(
      Selectors.selectUnitTrustDetail,
      mockData[0]
    );
    fixture = TestBed.createComponent(UnitTrustDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    mockSelectUnitTrustDetail.setResult( mockData[1] );

    store.refreshState();
    fixture.detectChanges();

    expect(component).toBeDefined();
  });

  it('should exit', () => {

    mockSelectUnitTrustDetail.setResult( null );

    store.refreshState();
    fixture.detectChanges();

    expect(component).toBeDefined();
  });

  it('should openGenericDialog', () => {
    expect(component.openGenericDialog()).toBeUndefined();
  });

  it('should clickCancelTransaction', () => {
    expect(component.clickCancelTransaction()).toBeUndefined();
  });

  it('should cancelTransaction', () => {
    expect(component.cancelTransaction('My comments')).toBeUndefined();
  });

  it('should ngOnDestroy', () => {
    expect(component.ngOnDestroy()).toBeUndefined();
  });
});
