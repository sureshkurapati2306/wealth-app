import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../core/services/app.service';

@Component({
  selector: 'cimb-switch-request-completed',
  templateUrl: './switch-request-completed.component.html',
  styleUrls: ['./switch-request-completed.component.scss'],
})
export class SwitchRequestCompletedComponent {
  currentUrl: any;
  constructor(
    private router: Router,
    private appService:AppService
  ) {
    this.currentUrl = this.appService.getPreviousUrl();
  }
  pageTitle = 'Switch Request Completed';
  isBackButtonEnabled = false;

  cardTitleOrder = 'Order Summary (2 funds)';

  message = 'Your transaction request has been placed with us succesfully';
  accountName = '';
  unitTrustAccount = 'V-840611-023';
  referenceNumber = '[Ref 7000149]';
  status = 'Pending Processing';
  dateTime = '4 Sept 2020 at 10:31 AM';
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

  transactionStatusName = 'pending';
  totalCardTitle = 'Total';

  backButtonEvent(){
    if(this.currentUrl==="/dashboard;tab=0"){
      this.currentUrl ='/dashboard';
    }
    this.router.navigate([this.currentUrl]);
  }
}
