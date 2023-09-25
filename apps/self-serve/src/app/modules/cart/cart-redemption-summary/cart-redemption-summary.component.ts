import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cimb-cart-redemption-summary',
  templateUrl: './cart-redemption-summary.component.html',
  styleUrls: ['./cart-redemption-summary.component.scss'],
})
export class CartRedemptionSummaryComponent implements OnInit {
  currentUrl: any;
  constructor(private router: Router,
    private appService:AppService
  ) {
    this.currentUrl = this.appService.getPreviousUrl();
  }
  pageTitle = 'Cart';
  isBackButtonEnabled = true;

  investments;

  unitTrustAccount = 'V-840611-023';

  redemptionUnits = 2000;

  redemptionAmount = 1440.0;

  isNeededOnPage = false;

  totalFund = 1;

  totalRedemptionUnits = 2000;

  totalRedemptionAmount = 1440.0;

  hasRedeemOption = true;

  showIndicativeAmountLegendOnMobile = true;

  scheduler_msg = "Transactions performed after 2pm will be executed the next business day"

  ngOnInit(): void {
    this.investments = [
      {
        assetType: 'Cash',
        fundName: 'Principal Islamic Deposit',
        isCompliant: true,
        salesCharge: 17.5,
        netInvestmentAmount: 982.5,
        amount: 1000.0,
        isHoliday: false,
      },
      {
        assetType: 'Local Equity',
        fundName: 'Eastspring Investment Dana Dynamik',
        isCompliant: true,
        salesCharge: 122.5,
        netInvestmentAmount: 6877.5,
        amount: 7000.0,
        isHoliday: true,
      },
    ];
  }
  backButtonEvent(){
    if(this.currentUrl==="/dashboard;tab=0"){
      this.currentUrl ='/dashboard';
    }
    this.router.navigate([this.currentUrl]);
  }
}
