import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { State } from '../+state/sms-delivery-log.reducer';
import { UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemoizedSelector } from '@ngrx/store';

import { SmsDeliveryDetailComponent } from './sms-delivery-detail.component';
import { Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockData: any[] = [
  {
    "id": 0,
    "contactNumber": "01114300869",
    "utAccountNo": "A80120396",
    "clientId": "500211507504",
    "smsContent": "Unit Trust purchase request Ref 7000802 of RM 10,000.00 from account ending 0396 is received for processing on 01 Aug 2022.",
    "category": "01",
    "smsDeliveryStatus": "SMS delivery successful",
    "deliveryDateTime": "2022-08-01T16:36:49"
  },
  {
    "id": 0,
    "contactNumber": "01160939796",
    "utAccountNo": "A80111431",
    "clientId": "880318145905",
    "smsContent": "Unit Trust purchase request Ref 7000803 of RM 2.00 from account ending 1431 is received for processing on 02 Aug 2022.",
    "category": "01",
    "smsDeliveryStatus": "SMS delivery successful",
    "deliveryDateTime": "2022-08-02T14:42:06"
  },
  {
    "id": 0,
    "contactNumber": "01160939796",
    "utAccountNo": "A80111431",
    "clientId": "880318145905",
    "smsContent": "Unit Trust redemption request Ref 7000804 of 1,050.00 units from account ending 1431 is received for processing on 02 Aug 2022.",
    "category": "02",
    "smsDeliveryStatus": "SMS delivery successful",
    "deliveryDateTime": "2022-08-02T14:55:19"
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
  error: '',
  selectedEntity: null
};

let mockSelectUnitTrustDetail: MemoizedSelector<Record<string, unknown>, UnitTrustTransaction>;

describe('SmsDetailComponent', () => {
  let component: SmsDeliveryDetailComponent;
  let fixture: ComponentFixture<SmsDeliveryDetailComponent>;
  let actions$: Observable<any>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        SmsDeliveryDetailComponent,
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
    fixture = TestBed.createComponent(SmsDeliveryDetailComponent);
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

  it('should ngOnDestroy', () => {
    expect(component.ngOnDestroy()).toBeUndefined();
  });
});
