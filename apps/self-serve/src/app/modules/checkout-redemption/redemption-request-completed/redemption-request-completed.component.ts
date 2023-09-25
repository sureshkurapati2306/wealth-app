import { Component, OnInit } from '@angular/core';
import { Investments } from '@cimb/shared/models';
import { AppService } from '../../../core/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cimb-redemption-request-completed',
  templateUrl: './redemption-request-completed.component.html',
  styleUrls: ['./redemption-request-completed.component.scss'],
})
export class RedemptionRequestCompletedComponent implements OnInit {
  currentUrl: any;
  constructor(
    private router: Router,
    private appService:AppService
  ) {
    this.currentUrl = this.appService.getPreviousUrl();
  }
  pageTitle = 'Redemption Request Completed';
  isBackButtonEnabled = false;

  message = 'Your transaction request has been placed with us succesfully';
  accountName = '';
  unitTrustAccount = 'V-840611-023';
  paymentAccount = 16285729231;
  referenceNumber = '[Ref 7000149]';
  status = 'Pending Processing';
  dateTime = '4 Sept 2020 at 10:17 AM';

  cardTitleForSummary = 'Order Summary';

  investments: Investments[];

  redemptionUnits = 2000;

  redemptionAmount = 1440.4;

  isNeededOnPage = false;

  orderSummary;

  cardTitleTotal = 'Total';

  totalRedemptionUnits = 2000;

  totalRedemptionAmount = 1440.0;

  isForRedemption = true;

  totalLabel = 'Total Redemption Amount';

  transactionStatusName = 'pending';

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

    //count number of objects in an array
    const counter = this.investments.reduce(
      (r, a) => (Object.values(a).some((v) => v) ? ++r : r),
      0
    );
    this.orderSummary = counter;
  }
  backButtonEvent(){
    if(this.currentUrl==="/dashboard;tab=0"){
      this.currentUrl ='/dashboard';
    }
    this.router.navigate([this.currentUrl]);
  }
}
