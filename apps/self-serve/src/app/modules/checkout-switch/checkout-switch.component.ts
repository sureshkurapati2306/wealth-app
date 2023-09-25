import { Component } from '@angular/core';
import { AppService } from '../../core/services/app.service' 
import { Router } from '@angular/router';

@Component({
  selector: 'cimb-checkout-switch',
  templateUrl: './checkout-switch.component.html',
  styleUrls: ['./checkout-switch.component.scss'],
})
export class CheckoutSwitchComponent {
  constructor(
    private router: Router,
    private appService:AppService
  ) {
    this.currentUrl = this.appService.getPreviousUrl();
  }
  unitTrustAccount = 'V-840611-023';
  pageTitle = 'Checkout';
  isBackButtonEnabled = true;

  cardTitleInvestment = 'Selected Investment(s)';

  switchOutAssetType = 'Fixed Income';
  switchOutFundName = 'Affin Hwang Select Bond Fund - RM';
  switchOutUnits = 2000;
  switchOutAmount = 2048.0;

  switchInAssetType = 'Regional Equity';
  switchInFundName = 'Affin Hwang Select Income';
  switchInUnits = 2619.98;
  switchInAmount = 2027.52;
  netSwitchInAmount = 2037.76;
  switchingFee = 10.14;

  totalFund = 1;
  totalSwitchOutUnits = 2000.0;
  totalSwitchInUnits = 2619.98;

  totalCardTitle = 'Summary';
  currentUrl: string;

  backButtonEvent(){
    if(this.currentUrl==="/dashboard;tab=0"){
      this.currentUrl ='/dashboard';
    }
    this.router.navigate([this.currentUrl]);
  }
}
