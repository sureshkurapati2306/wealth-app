import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AnalyticService } from '@cimb/shared/services';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';

@Component({
  selector: 'cimb-dashboard-redeem',
  templateUrl: './dashboard-redeem.component.html',
  styleUrls: ['./dashboard-redeem.component.scss'],
})
export class DashboardRedeemComponent implements OnInit, OnChanges {
  @Input() unit: number;
  @Input() minimumUnit = "100";
  @Input() maximumUnit = "99999.99";
  @Input() salesCharge = 0;
  @Input() indicativeAmount;
  @Input() indicativeDate;
  @Input() disabled = false;
  @Input() indexVal = 0;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<any> = new EventEmitter();
  minimumAmount = 1;
  maximumAmount = 99999.99;
  minMessage = '';
  indicativeAmountDisplay = 0;
  amountAdded = false;

  amount = new FormControl('', [
    Validators.required,
    Validators.min(this.minimumAmount),
    Validators.max(this.maximumAmount),
  ]);

  constructor(
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private analyticService: AnalyticService
  ) {}
  ngOnInit(): void {
    this.minimumAmount = parseFloat(this.minimumUnit);
    this.maximumAmount = parseFloat(this.maximumUnit);
    this.indicativeAmountDisplay = this.indicativeAmount ? parseInt(this.indicativeAmount.replace(',', '')) : 0.00;
    this.minMessage = 'Min ' + this.minimumAmount + ' units';
    this.amount = new FormControl('', [
      Validators.required,
      Validators.min(this.minimumAmount),
      Validators.max(this.maximumAmount),
    ]);
    this.amount.setValue(this.unit);
  }
  ngOnChanges() {

    // create header using child_id
    this.amount.setValue(this.unit);
  }
  getErrorMessage() {
    if (this.amount.hasError('min')) {
      return 'Minimum redemption is ' + this.minimumAmount + ' unit.';
    }
    return this.amount.hasError('max') ? 'Exceed available units.' : '';
  }

  openIndicativeAmountActionSheet(): void {
    this._bottomSheet.open(MobileTooltipComponent, {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Indicative Amount',
        actionContent:
          '<p>The Indicative Amount comes from multiplying the number of selected units by the current NAV price and excludes any charges. However, the actual amount may differ based on the closing NAV price. If you transact after 2pm, the closing price on the next business day will be used.</p>',
        buttonRed: true,
      },
    });
  }

  redeem() {
    this.amountAdded = true;
    if ( parseFloat(this.amount.value) < this.minimumAmount) {
      this.dialog.open(DialogAlertComponent, {
        panelClass: ['custom-dialog', 'dialog-inverse-button'],
        maxWidth: '600px',
        autoFocus: false,
        backdropClass: 'backdrop-modal',
        data: {
          dialogImage: '<em class="icon-danger"></em>',
          dialogHeading: 'Minimum Holding Requirement',
          dialogContent:
            '<p>This investment requires a minimum holding of <strong>' +
            this.minimumAmount +
            '</strong> units. You may choose to redeem all or change redemption units to meet this requirement.</p>',
          dialogButtonCancel: true,
          dialogButtonCancelText: 'Change Redemption units',
          dialogButtonProceed: true,
          dialogButtonProceedText: 'Redeem all & add to cart',
        },
      });
      this.analyticService.loadPopUpAnalytics('Minimum Holding Requirement');
    } else {
      this.addToCart.emit({ amount: this.amount.value, index: this.indexVal, flow: 'redeem' });
    }
  }

  removeUnit() {
    this.removeFromCart.emit(this.indexVal);
  }
}
