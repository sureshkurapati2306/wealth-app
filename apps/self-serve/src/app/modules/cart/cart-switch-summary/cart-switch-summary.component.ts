import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cimb-cart-switch-summary',
  templateUrl: './cart-switch-summary.component.html',
  styleUrls: ['./cart-switch-summary.component.scss'],
})
export class CartSwitchSummaryComponent implements OnInit {
  currentUrl: any;
  constructor(
    private router: Router,
    private appService:AppService
  ) {
    this.currentUrl = this.appService.getPreviousUrl();
  }
  pageTitle = 'Cart';
  isBackButtonEnabled = true;

  unitTrustAccount = 'V-840611-023';

  isNeededOnPage = false;

  investments;

  switchOutUnits = 2000;

  switchOutAmount = 2048.0;

  switchInUnits = 2619.98;

  switchInAmount = 2027.52;

  switchingFee = 10.14;

  netSwitchInAmount = 2037.66;

  hasSwitchOption = true;

  isForCartSwitching = true;

  totalSwitchOutUnits = 2000.0;

  totalSwitchInUnits = 2619.98;

  totalFund = 1;

  showIndicativeAmountLegendOnMobile = true;

  scheduler_msg = "Transactions performed after 2pm will be executed the next business day";

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
    ];
  }
  backButtonEvent(){
    if(this.currentUrl==="/dashboard;tab=0"){
      this.currentUrl ='/dashboard';
    }
    this.router.navigate([this.currentUrl]);
  }
}
