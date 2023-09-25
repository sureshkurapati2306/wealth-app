import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '@cimb/core';
import { Observable } from 'rxjs';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { DialogRiskCategoryComponent } from '../../mint-dialog/dialog-risk-category/dialog-risk-category.component';

@Component({
  selector: 'cimb-card-cart-default-total',
  templateUrl: './card-cart-default-total.component.html',
  styleUrls: ['./card-cart-default-total.component.scss'],
})
export class CardCartDefaultTotalComponent implements OnInit{
  @Input() totalFund: number;
  @Input() totalSalesCharge: number;
  @Input() totalNetInvestmentAmount: number;
  @Input() totalAmount: number;
  @Input() totalRedemptionUnits: number;
  @Input() totalRedemptionAmount: number;

  @Input() isForCartSwitching: boolean;

  @Input() totalSwitchOutUnits: number;
  @Input() totalSwitchInUnits: number;

  @Input() highRiskCount: number;
  @Input() switchInhighRiskCount: number;

  @Input() riskFundList: [];
  @Input() unitRiskProfile: [];

  @Output() proceedToCheckoutEvent: EventEmitter<any> = new EventEmitter();
  @Output() highRiskFundsClick: EventEmitter<any> = new EventEmitter();

  @Input() flow: string;

  @Input() showIndicativeAmountLegendOnMobile: boolean;

  @Input() enableProceedToCheckout: false;

  @Input() schedulerMsg: string;

  @Input() isFundOnHoliday = false;

    
    constructor(public dialog: MatDialog, private _eventService: EventService,) {}

  ngOnInit(): void {
    if(this.highRiskCount && this.flow !== 'redeem' && this.flow === 'topup'){
      this.highRiskClick('Acknowledged').subscribe();
    }
    if(this.switchInhighRiskCount && this.flow !== 'redeem' && this.flow === 'switch'){
      this.highRiskClick('Acknowledged').subscribe();
    }
  }
  proceedToCheckout() {
    this.proceedToCheckoutEvent.emit();
  }

  unableToProceedModal() {
    this.dialog.open(DialogAlertComponent, {
      panelClass: 'dialog-transaction-issue',
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-warning">',
        dialogHeading: 'Unable to Proceed',
        dialogContent:
          '<p>You need to have an active current or savings account with CIMB to open a Unit Trust account.<br /><br /><strong>For assistance, please contact our call centre at +603 6204 7788 or visit your nearest CIMB Bank’s branch.</strong></p>',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Okay',
      },
    });
  }
  dialogRiskCategory() {
    this.dialog.open(DialogRiskCategoryComponent, {
      panelClass: ['custom-dialog', 'risk-category-dialog'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
    });
  }

  highRiskClick(label:string):Observable<void>{
   return this.dialog.open(DialogRiskCategoryComponent, {
      panelClass: ['custom-dialog', 'risk-category-dialog'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      disableClose: true,
      data: {
        hishRiskFundsList: this.riskFundList,
        riskName: this.unitRiskProfile,
        dialogButtonProceedText: label,
        highRiskCount: this.highRiskCount,
        flow: this.flow
      },
    }).afterClosed()
  }
}
