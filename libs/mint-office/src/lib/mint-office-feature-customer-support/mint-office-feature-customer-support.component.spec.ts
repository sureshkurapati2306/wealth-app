import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BreadcrumbsComponent } from '../mint-office-ui-breadcrumbs/breadcrumbs/breadcrumbs.component';
import { TablePaginatorComponent } from '../mint-office-ui-paginator/table-paginator/table-paginator.component';
import { State } from './+state/customer-support.reducer';
import * as Selectors from './+state/customer-support.selectors';


import { MintOfficeFeatureCustomerSupportComponent } from './mint-office-feature-customer-support.component';
import { Customer } from '../core/models/customer.model';
import { Observable } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

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

let mockSelectCSRecords: MemoizedSelector<Record<string, unknown>, Customer[]>;

@Component({selector: 'cimb-office-cs-search-form', template: ''}) 
class CsSearchFormStubComponent {}

@Component({selector: 'cimb-office-cs-list-table', template: ''}) 
class CsListTableStubComponent {}

describe('MintOfficeFeatureCustomerSupportComponent', () => {
  let component: MintOfficeFeatureCustomerSupportComponent;
  let fixture: ComponentFixture<MintOfficeFeatureCustomerSupportComponent>;
  let actions$: Observable<any>;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        MintOfficeFeatureCustomerSupportComponent, 
        BreadcrumbsComponent, 
        CsSearchFormStubComponent, 
        CsListTableStubComponent,
        TablePaginatorComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatPaginatorModule,
        MatSnackBarModule
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({ initialState: mockState }),
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    mockSelectCSRecords = store.overrideSelector(
      Selectors.selectCSRecords,
      []
    );
    fixture = TestBed.createComponent(MintOfficeFeatureCustomerSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    mockSelectCSRecords.setResult( mockState.entities );

    store.refreshState();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call search', () => {
    expect(component.search({})).toBeUndefined();
  });

  it('should call clear', () => {
    expect(component.clear()).toBeUndefined();
  });
});
