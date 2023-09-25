import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAlertComponent } from '@cimb/mint';

@Component({
  selector: 'cimb-footer-cart',
  templateUrl: './footer-cart.component.html',
  styleUrls: ['./footer-cart.component.scss'],
})
export class FooterCartComponent implements OnChanges, OnDestroy {
  @Input() totalAmount = 0.00;
  @Input() totalUnit = 0.00;
  @Input() flow = "001";
  @Input() totalFundsCount = 0;
  @Input() userType: string;
  @Input() accountStatus: string;
  @Output() viewMyCart: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnChanges() {
    if (this.totalFundsCount > 0) {
      //add body class
      document.body.classList.add('footer-cart-visible');
    } else {
      //remove body class
      document.body.classList.remove('footer-cart-visible');
    }
  }

  ngOnDestroy(): void {
    //remove body class
    document.body.classList.remove('footer-cart-visible');
  }

  viewMyCartClick() {
    if (this.userType === 'NTP') {
      if (this.accountStatus === 'Y') {
        this.viewMyCart.emit();
      } else {
        const dialogRefOPenAccount = this.dialog.open(DialogAlertComponent, {
          panelClass: 'dialog-transaction-issue',
          maxWidth: '600px',
          autoFocus: false,
          backdropClass: 'backdrop-modal',
          data: {
            dialogImage:
              '<img src="./assets/images/open-account.svg" alt="Change Primary Unit Trust Account" />',
            dialogHeading: 'Open Unit Trust Account',
            dialogContent:
              "<p>We noticed you don't have a Unit Trust account with us yet. Complete your account opening to proceed with checkout.</p>",
            dialogButtonProceed: true,
            dialogButtonProceedText: 'Continue',
          },
        });

        dialogRefOPenAccount.afterClosed().subscribe((result) => {
          if (result === 'Continue') {
            this.router.navigate(['/opening-account']);
          }
        });
      }
    } else {
      this.viewMyCart.emit();
    }
  }
}
