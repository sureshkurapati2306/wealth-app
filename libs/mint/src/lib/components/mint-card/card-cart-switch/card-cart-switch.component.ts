import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';

@Component({
  selector: 'cimb-card-cart-switch',
  templateUrl: './card-cart-switch.component.html',
  styleUrls: ['./card-cart-switch.component.scss'],
})
export class CardCartSwitchComponent implements OnInit {
  @Input() investments;

  @Input() switchOutUnits: number;

  @Input() switchOutAmount: number;

  @Input() switchInUnits: number;

  @Input() switchInAmount: number;

  @Input() switchingFee: number;

  @Input() netSwitchInAmount: number;

  @Input() hasSwitchOption: boolean;

  fundDetailLink = 'http://';

  checkboxLabel = 'Switch all';

  redeem = new FormControl('', [
    Validators.required,
    Validators.min(1000),
    Validators.max(6000),
  ]);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.changeFundModal();
  }
  edit() {
    this.redeem.patchValue(this.switchOutUnits);
  }
  getRedeemMessage() {
    if (this.redeem.hasError('min')) {
      return 'Minimum switch out is 100 units.  ';
    }
    return this.redeem.hasError('max') ? 'Exceed available units.' : '';
  }
  //modal for Change Fund
  changeFundModal() {
    this.dialog.open(DialogAlertComponent, {
      panelClass: ['dialog-transaction-issue', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-warning-bubble">',
        dialogHeading: 'Change Fund',
        dialogContent:
          '<p>You have <strong>Affin Hwang Select Income</strong> fund for this asset class in your cart. Changing to a different fund will clear <strong>Affin Hwang Select Income</strong> fund from your cart.  <br /><br />Do you want to continue?</p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Cancel',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Yes',
      },
    });
  }
}
