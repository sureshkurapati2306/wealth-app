import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import * as CustomerSupportActions from './+state/customer-support.actions';
import * as CustomerSupportSelectors from './+state/customer-support.selectors';
import { Customer, CustomerSearchFields } from '../core/models/customer.model';
import { Actions, ofType } from '@ngrx/effects';
import { SnackBarService } from '../core/services/snack-bar.service';

@Component({
  selector: 'cimb-office-customer-support',
  templateUrl: './mint-office-feature-customer-support.component.html',
  styleUrls: ['./mint-office-feature-customer-support.component.scss']
})

export class MintOfficeFeatureCustomerSupportComponent implements OnInit, OnDestroy {

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'Customer Support',
      url: null
    }
  ];

  csRecords$: Observable<Customer[]>;
  csLoadingState$: Observable<string>;
  csHasSearched$: Observable<boolean>;
  csSearchQuery$: Observable<CustomerSearchFields>;
  csSearchRecordsFailureSubscription: Subscription;

  constructor(
    private store: Store,
    private actions$: Actions,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
  
    this.csRecords$ = this.store.select(CustomerSupportSelectors.selectCSRecords);
    
    this.csLoadingState$ = this.store.select(CustomerSupportSelectors.selectLoadCSLoading);

    this.csHasSearched$ = this.store.select(CustomerSupportSelectors.selectCSHasSearched);

    this.csSearchQuery$ = this.store.select(CustomerSupportSelectors.selectCSSearchQuery);

    this.csSearchRecordsFailureSubscription = this.actions$
      .pipe(
        ofType(CustomerSupportActions.loadCustomerSupportsFailure),
      ).subscribe(data => {
        this.snackBarService.openSnackbar(data.error, 10000, 'warning');
      });
    
  }
    
  search(searchParams: CustomerSearchFields) {
    this.store.dispatch(CustomerSupportActions.loadCustomerSupports(
      { searchParams: searchParams }
    ));
  }

  clear() {
    this.store.dispatch(CustomerSupportActions.resetCustomerSupportState());
  }

  ngOnDestroy() {
    this.csSearchRecordsFailureSubscription?.unsubscribe();
  }

}
