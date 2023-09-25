import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailShellComponent } from './customer-detail-shell.component';

import { Customer } from '../../../core/models/customer.model';
import { State } from '../../+state/customer-support.reducer';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as Selectors from '../../+state/customer-support.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbsComponent } from '../../../mint-office-ui-breadcrumbs/breadcrumbs/breadcrumbs.component';

const mockState: State = {
  entities: [
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
  ],
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

let mockSelectCSRecord: MemoizedSelector<Record<string, unknown>, Customer>;

describe('CustomerDetailShellComponent', () => {
  let component: CustomerDetailShellComponent;
  let fixture: ComponentFixture<CustomerDetailShellComponent>;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailShellComponent, BreadcrumbsComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState: mockState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    mockSelectCSRecord = store.overrideSelector(
      Selectors.selectCustomerDetail,
      null
    );
    fixture = TestBed.createComponent(CustomerDetailShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    mockSelectCSRecord.setResult( mockState.entities[0] );

    store.refreshState();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should goTo', () => {
    expect(component.goTo('profile')).toBeUndefined();
  });
});
