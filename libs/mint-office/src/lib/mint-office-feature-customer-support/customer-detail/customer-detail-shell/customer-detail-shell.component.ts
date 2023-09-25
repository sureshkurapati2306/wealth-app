import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BreadcrumbsPath } from '../../../core/models/breadcrumbs-path.model';
import * as ActivityLogActions from '../../+state/activity-log.actions';
import * as CustomerSupportSelectors from '../../+state/customer-support.selectors';
import { Customer } from '../../../core/models/customer.model';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'cimb-office-customer-detail-shell',
  templateUrl: './customer-detail-shell.component.html',
  styleUrls: ['./customer-detail-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerDetailShellComponent implements OnInit, OnDestroy {

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'Customer Support',
      url: '/customer-support'
    }
  ];
  
  csRecord$: Observable<Customer>;
  csRecord: Customer;

  activePage = 'profile'; //for controlling button selected state

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // const pfId =  this.route.snapshot.params.id;

    // this.store.dispatch(CustomerSupportActions.loadCustomerDetail({
    //   pfId: parseInt(pfId)
    // }));

    this.store.dispatch(ActivityLogActions.loadActivityLogModules());

    this.store.dispatch(ActivityLogActions.loadActivityLogChannel());

    this.csRecord$ = this.store.select(CustomerSupportSelectors.selectCustomerDetail)
      .pipe(
        filter(data => {
          if(!data) {
            this.router.navigate(['customer-support']);
          }
          return !!data;  //!!data will return true if valid and false if invalid or underfined, don't proceed if false
        }),
        tap(data => {

          this.csRecord = data;

          this.breadcrumbsPaths = [
            ...this.breadcrumbsPaths,
            {
              label: this.csRecord?.accountName,
              url: null
            }
          ];

        })
      );

  }

  goTo(route: string) {
    this.activePage = route;
    this.router.navigate([route], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.store.dispatch(ActivityLogActions.resetActivityLogs());
  }

}
