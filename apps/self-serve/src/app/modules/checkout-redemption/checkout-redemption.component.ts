import { Component, OnInit } from '@angular/core';
import { Investments } from '@cimb/shared/models';
import { AppService } from '../../core/services/app.service' 
import { Router } from '@angular/router';
export interface AccountList {
  id: number;
  name: string;
  isActive: boolean;
  hasJointAccount: boolean;
}


@Component({
  selector: 'cimb-checkout-redemption',
  templateUrl: './checkout-redemption.component.html',
  styleUrls: ['./checkout-redemption.component.scss'],
})
export class CheckoutRedemptionComponent implements OnInit {
  pageTitle = 'Checkout';
  currentUrl: any;
  constructor(
    private router: Router,
    private appService:AppService
  ) {
    this.currentUrl = this.appService.getPreviousUrl();
  }
  isBackButtonEnabled = true;

  unitTrustAccount = 'V-840611-023';

  cardAccountTitle = 'Select Settlement Account';
  cardAccountSelectionPlaceholder = 'Select Settlement Account';

  investments: Investments[];

  cardTitleForInvestment = 'Selected Investment(s)';

  redemptionUnits = 2000;
  redemptionAmount = 1440.0;

  isNeededOnPage = false;

  cardTitleForTotal = 'Summary';

  totalLabel = 'Total Redemption Amount';

  isForRedemption = true;

  totalRedemptionUnits = 2000;

  totalRedemptionAmount = 1440.0;

  isInActiveSelected = false;
  isJointAccountSelected = false;

  accounts: AccountList[];
  
  hasOptionValidation = true;

  isPaymentAccount = true;
  total = 1;

  factaEnabled = false;

  panelClass=['mat-autocomplete-panel custom-autocomplete mat-menu-panel custom-menu-panel with-divider mat-autocomplete-visible custom-mat-select-panel'];

  ngOnInit(): void {
    this.investments = [
      {
        assetType: 'Local Equity',
        fundName: 'Eastspring Investment Dana Dynamik',
        isCompliant: true,
        salesCharge: 122.5,
        netInvestmentAmount: 6877.5,
        amount: 7000.0,
      },
    ];

    //accounts dropdown
    this.accounts = [
      {
        id: 1,
        name: 'CIMB Current Account 76289086745 (Balance MYR 20,242.00',
        isActive: true,
        hasJointAccount: true,
      },
      {
        id: 2,
        name: 'CIMB Current Account 16285729231 (Balance MYR 223,242.00)',
        isActive: false,
        hasJointAccount: false,
      },
      {
        id: 3,
        name: 'CIMB Saving Account 16285729231 (Balance MYR 1,242.00)',
        isActive: true,
        hasJointAccount: true,
      },
      {
        id: 4,
        name: 'CIMB Saving Account 34585798765 (Balance MYR 143,562.00)',
        isActive: false,
        hasJointAccount: false,
      },
      {
        id: 5,
        name: 'CIMB Saving Account 45685729456 (Balance MYR 43,562.00)',
        isActive: false,
        hasJointAccount: false,
      },
    ]
  }
  backButtonEvent(){
    if(this.currentUrl==="/dashboard;tab=0"){
      this.currentUrl ='/dashboard';
    }
    this.router.navigate([this.currentUrl]);
  }
}
