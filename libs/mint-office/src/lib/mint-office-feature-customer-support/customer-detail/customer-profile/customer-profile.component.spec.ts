import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../+state/customer-support.reducer';
import { Customer } from '../../../core/models/customer.model';
import * as Selectors from '../../+state/customer-support.selectors';

import { CustomerProfileComponent } from './customer-profile.component';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MemoizedSelector } from '@ngrx/store';

const mockData: Customer[] = [
  {
    "pfId": 1,
    "utAccountNo": "A80111457",
    "accountName": "XXXXXXT MILLIO",
    "jointIndicator": "01",
    "accountStatus": "A",
    "cifNumber": "A80111457",
    "clientIdType": "NEWIC",
    "clientId": "750702105695",
    "authorisedSignatories": ""
  }
];

const mockState: State = {
  entities: mockData,
  currentEntity: null,
  hasSearched: false,
  searchQuery: {
    fullName: '',
    idNumber: '',
    cifNumber: ''
  },
  status: 'pending',
  error: ''
};

let mockSelectCustomerDetail: MemoizedSelector<Record<string, unknown>, Customer>;

describe('CustomerProfileComponent', () => {
  let component: CustomerProfileComponent;
  let fixture: ComponentFixture<CustomerProfileComponent>;
  let actions$: Observable<any>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProfileComponent ],
      imports: [
        RouterTestingModule
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
    mockSelectCustomerDetail = store.overrideSelector(
      Selectors.selectCustomerDetail,
      mockData[0]
    );
    fixture = TestBed.createComponent(CustomerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    mockSelectCustomerDetail.setResult( mockData[0] );

    store.refreshState();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
