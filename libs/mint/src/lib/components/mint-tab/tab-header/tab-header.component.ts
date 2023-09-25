import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AnalyticService } from '@cimb/shared/services';
import { MintDialogService } from '../../mint-dialog';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';

@Component({
  selector: 'cimb-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
})
export class TabHeaderComponent implements OnInit {
  @Input() account = [];
  @Input() selectedAccount;
  @Input() selectedUnittrustAccountNumber;
  @Input() solePropIndicator;
  @Input() portfolioDatalist;
  @Input() dashBoard;
  @Input() casaIndicator;
  @Input() selectedTabIndex;
  @Input() joinOrUtAccountIndicator: 'N';
  @Input() joinAndUtAccountIndicator: false;
  @Input() purchaseDetailData;

  @Input() isTransactionDataLoaded = false;

  @Input() addNewInvestmentEnabled = false;

  @Output() accountListChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectedAccountChangeEvent : EventEmitter<any> = new EventEmitter();
  @Output() dateFilteredPurchaseDetailDataEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectedAccountDialogCart :  EventEmitter<any> = new EventEmitter();
  @Input() amlResult;
  chosenItem = '';
  chosenItemTemp = '';
  addNewInvestment = 'Add New Investment';
  portfolioAccountTemp = [];
  previousSelectAccount = null;
  tempSelctedValue = null;

  // Set to false to hide the CTA button - WJ-4674
  showMakePrimaryButton = false;

  constructor(
    public dialog: MatDialog, 
    private analyticService: AnalyticService,
    private mintDialogService: MintDialogService
  ) {}

  ngOnInit(): void {
    this.chosenItemTemp = this.selectedAccount;
    this.chosenItem = this.selectedAccount;
    this.previousSelectAccount = this.selectedAccount;
  }

  dialogSetPrimary() {
    //this.selectedAccount = this.tempSelctedValue ? this.tempSelctedValue : this.selectedAccount;
    const dialogRef1 = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogHeading: 'Change Primary Unit Trust Account',
        dialogContent:
          '<p>Are you sure you want to change your primary unit trust account to <strong>' +
          (this.tempSelctedValue
            ? this.tempSelctedValue
            : this.selectedAccount) +
              '</strong>? This will be the default Unit Trust account shown in your Dashboard. </p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Cancel',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Update',
        dialogImage:
          '<img src="./assets/images/transaction.svg" alt="Change Primary Unit Trust Account" />',
      },
    });
    // Calling dialog Minimum Holding
    dialogRef1.afterClosed().subscribe((result) => {
      if (result === 'proceed') {
        //this.dialogMinHolding();
        this.viewAccountClick()
      } else {
        this.rollbackAccountSelection(this.selectedAccount);
      }
    });
  }

  rollbackAccountSelection(value) {
    if (value) {
      this.portfolioAccountTemp = [];

      const accountList = [...this.account];
      let listItem;
      if (accountList && accountList.length >= 1) {
        for (let m = 0; m < accountList.length; m++) {
          listItem = { ...accountList[m] };
          if (listItem.ut_account_no === value) {
            listItem.default_ind = 'Y';
          } else {
            listItem.default_ind = 'N';
          }
          this.portfolioAccountTemp.push(listItem);
        }
        this.account = this.portfolioAccountTemp;
        this.selectedAccount = value;
      }
    }
  }
  dialogMinHolding() {
    const dialogRef2 = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogHeading: 'Minimum Holding Requirement',
        dialogContent:
          '<p>This investment requires a minimum holding of <strong>1,000</strong> units. You may choose to redeem all or change redemption units to meet this requirement.</p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Change Redemption units',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Redeem all & add to cart',
        dialogImage: '<em class="icon-danger"></em>',
      },
    });
    this.analyticService.loadPopUpAnalytics('Minimum Holding Requirement');
    // Calling dialog Minimum Holding
    dialogRef2.afterClosed().subscribe((result) => {
      if (result === 'proceed') {
        this.dialogRedemption();
      }
    });
  }
  dialogRedemption() {
    const dialogRef3 = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-danger"></em>',
        dialogHeading: 'Unable to Transact',
        dialogContent:
          '<p>You already requested a <strong>full redemption</strong> for this fund which is currently under processing. Hence, no subsequent transaction could be performed.</p>',
        dialogButtonCancel: false,
        dialogButtonCancelText: 'Close',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'View Transaction History',
      },
    });
    // Calling dialog Cart
    dialogRef3.afterClosed()
  }



  accountListChange(event: MatRadioChange) {
    if (event) {
      this.chosenItemTemp = event.value;
      this.chosenItem = event.value;
      this.tempSelctedValue = event.value;

      //this.selectedAccount = event.value;
    }

    //this.selectedAccountChangeEvent.emit(this.selectedAccount)
  }

  viewAccountClick() {
    if (this.chosenItemTemp) {
      this.accountListChangeEvent.emit(this.chosenItemTemp);
    }
  }

  dateFilteredPurchaseDetailData(event) {
    this.dateFilteredPurchaseDetailDataEvent.emit(event)
  }

  selectedAccountDialogCartEvent(event) {
    this.selectedAccountDialogCart.emit(event)
}
}
