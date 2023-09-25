import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CustomerSupportSelectors from '../../+state/customer-support.selectors';
import * as ActivityLogSelectors from '../../+state/activity-log.selectors';
import * as ActivityLogActions from '../../+state/activity-log.actions';
import { CustomerActivityLog, CustomerActivityLogChannel, CustomerActivityLogModules, CustomerActivityLogSearchFields } from '../../../core/models/customer-activity.model';
import { Customer } from '../../../core/models/customer.model';


@Component({
  selector: 'cimb-office-customer-activity-log',
  templateUrl: './customer-activity-log.component.html',
  styleUrls: ['./customer-activity-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerActivityLogComponent implements OnInit {

  activityLogRecords$: Observable<CustomerActivityLog[]>;
  loadingState$: Observable<string>;
  hasSearched$: Observable<boolean>;
  searchQuery$: Observable<CustomerActivityLogSearchFields>;
  csRecord$: Observable<Customer>;
  modules$: Observable<CustomerActivityLogModules[]>;
  channels$: Observable<CustomerActivityLogChannel[]>;

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    
    this.activityLogRecords$ = this.store.select(ActivityLogSelectors.selectActivityLogRecords);

    this.loadingState$ = this.store.select(ActivityLogSelectors.selectLoadActivityLogLoading);

    this.hasSearched$ = this.store.select(ActivityLogSelectors.selectActivityLogHasSearched);

    this.searchQuery$ = this.store.select(ActivityLogSelectors.selectActivityLogSearchQuery);

    this.csRecord$ = this.store.select(CustomerSupportSelectors.selectCustomerDetail);

    this.modules$ = this.store.select(ActivityLogSelectors.selectActivityLogModules);

    this.channels$ = this.store.select(ActivityLogSelectors.selectActivityLogChannels);

  }

  search(searchParams: CustomerActivityLogSearchFields) {    
    this.store.dispatch(ActivityLogActions.loadActivityLogs(
      { searchParams: searchParams }
    ));
  }

}
