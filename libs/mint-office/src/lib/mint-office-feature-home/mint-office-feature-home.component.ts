import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UnitTrustTransactionsActions from '../mint-office-feature-unit-trust-transactions/+state/unit-trust-transactions.actions';
import * as CustomerSupportActions from '../mint-office-feature-customer-support/+state/customer-support.actions';

import * as authSelector from '../mint-office-feature-login/+state/auth.selectors';
import { resetAdministratorPortalState } from '../mint-office-feature-administrator-portal/+state/administrator-portal.actions';

@Component({
  selector: 'cimb-office-home',
  templateUrl: './mint-office-feature-home.component.html',
  styleUrls: ['./mint-office-feature-home.component.scss'],
})
export class MintOfficeFeatureHomeComponent implements OnInit {
  
  constructor(
    private router: Router,
    private store: Store
  ) { }

  userName$ = this.store.select(authSelector.getUserDetail);

  userRole$ = this.store.select(authSelector.getGroupName);
  
  modules$ = this.store.select(authSelector.getModuleAccess);

  data =  [
    {
      moduleId: "1",
      description: "Page to manage and control user's role access.",
      route: '/administrator-portal',
      img: "./assets/back-office/people.svg",
      alt: "Administrator Portal"
    },
    {
      moduleId: "2",
      route: '/customer-support',
      description: "View customer's profiles and activity logs.",
      img: "./assets/back-office/document.svg",
      alt: "Customer Support"
    },
    {
      moduleId: "3",
      route: '/unit-trust-transactions',
      img: "./assets/back-office/document.svg",
      description: "Reject customer's unit trust transactions and download reports.",
      alt: "Unit Trust Transactions"
    },
    {
      moduleId: "4",
      route: '/batch-file-scheduler',
      img: "./assets/back-office/folder.svg",
      alt: "Maintenance Scheduler",
      description: "Schedule My Wealth transaction batch run time."
    },
    {
      moduleId: "5",
      description: "Download reports.",
      img: "./assets/back-office/document.svg",
      route: '/ithm-reports',
      alt: "ITHM Reports"
    },
    {
      moduleId: "11",
      description: "Page configuration to set function visibility for customers' view.",
      img: "./assets/back-office/settings.svg",
      alt: "Visibility Settings",
      route: '/visibility-settings'
    },
    {
      moduleId: "13",
      description: "Page to manage customer whitelist on Wealth Self-Serve Portal module(s) visibility.",
      img: "./assets/back-office/people.svg",
      alt: "User Whitelisting",
      route: '/user-whitelisting'
    },
    {
      moduleId: "14",
      description: "Download CSAT report and CSAT configuration",
      img: "./assets/back-office/settings.svg",
      alt: "Customer Satisfaction Modulew",
      route: '/csat-reporting'
    }
  ];
  ngOnInit() {
    this.store.dispatch(UnitTrustTransactionsActions.resetUnitTrustTransactions());
    this.store.dispatch(CustomerSupportActions.resetCustomerSupportState());
    this.store.dispatch(resetAdministratorPortalState());
  }

  isExist(id): boolean{
    return this.data.filter(x => x.moduleId === id).length > 0;
  }

  getVal(id, value){
    return this.data.filter(x => x.moduleId === id)[0][value] ? this.data.filter(x => x.moduleId === id)[0][value] : ""
  }

  goTo(id) {
    const route = this.data.filter(x => x.moduleId === id)[0]['route'];
    this.router.navigate([route])
  }
}
