import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

import { Router } from '@angular/router';
import { AnalyticService } from '@cimb/shared/services';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { DialogSelectTransactionComponent } from '../../mint-dialog/dialog-select-transaction/dialog-select-transaction.component';


@Component({
  selector: 'cimb-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss'],
})
export class ButtonAddComponent {
  @Input() buttonLabel: string;
  @Input() solePropIndicator;
  @Input() selectedAccount;
  @Input() accounts;
  @Input() casaIndicator;
  @Input() joinOrUtAccountIndicator: 'N';
  @Input() joinAndUtAccountIndicator: false;
  @Output() selectedAccountDialogCart: EventEmitter<any> = new EventEmitter();
  @Input() amlCheckResult;

  timeoutHandler: any;

  constructor(
    public dialog: MatDialog,
    private router: Router, 
    private analyticService: AnalyticService) {}

  dialogSelectTransation() {
    this.dialog.open(DialogSelectTransactionComponent, {
      panelClass: ['full-width', 'select-acc'],
      maxWidth: '772px',
      autoFocus: false,
      data: {
        selectedAccount: this.selectedAccount,
        accounts: this.accounts,
      },
    });
  }
  public mouseUp() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
     if(!this.amlCheckResult) {
      this.dialog.open(DialogAlertComponent, {
        panelClass: ['custom-dialog', 'dialog-inverse-button'],
        maxWidth: '600px',
        autoFocus: false,
        backdropClass: 'backdrop-modal',
        data: {
          dialogHeading: 'Unable to Proceed',
          dialogContent: '<p>We regret to inform that we are unable to process your application. Thank you for your interest.</p><p><strong>For assistance, please visit any CIMB branch.</strong></p>',
          dialogButtonProceed: true,
          dialogButtonProceedText: 'Close',
          dialogImage:
            '<em class="icon-danger"></em>',
       },
      });

      }
      else if  (this.casaIndicator === 'Y') {
        this.dialog.open(DialogAlertComponent, {
          panelClass: ['custom-dialog', 'dialog-inverse-button'],
          maxWidth: '600px',
          autoFocus: false,
          backdropClass: 'backdrop-modal',
          data: {
            dialogHeading: 'Unable to Transact (No CASA)',
            dialogContent: '<p>To complete your transaction, open a current or savings account/-i with CIMB. You may apply via CIMB Clicks.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>',
            dialogButtonProceed: true,
            dialogButtonProceedText: 'Okay',
            dialogImage:
              '<em class="icon-danger"></em>',
         },
        });
        this.analyticService.loadPopUpAnalytics('Unable to Transact (No CASA)');
      }
       //Sole prop indicator
      else if (this.solePropIndicator === 'P') {
        this.dialog.open(DialogAlertComponent, {
          panelClass: 'custom-dialog',
          maxWidth: '600px',
          autoFocus: false,
          backdropClass: 'backdrop-modal',
          data: {
            dialogHeading: 'Unable to Transact <p><strong>(Sole Proprietor Customer)</strong></p>',
            dialogContent:
              '<br><p>For Unit Trust transactions as a sole proprietor customer, please visit any CIMB branch.</p>',
            dialogButtonProceed: true,
            dialogButtonProceedText: 'Okay',
            dialogImage: '<em class="icon-danger"></em>',
          },
        });
        this.analyticService.loadPopUpAnalytics('Unable to Transact <br> (Sole Proprietor Customer)');
      } else if(this.joinOrUtAccountIndicator){
        this.dialog.open(DialogAlertComponent, {
          panelClass: ['custom-dialog', 'dialog-inverse-button'],
          maxWidth: '600px',
          autoFocus: false,
          backdropClass: 'backdrop-modal',
          data: {
            dialogHeading: 'Unable to Transact (Joint Account)',
            dialogContent: '<p>Only the <strong>primary account</strong> holder can transact using this Unit Trust account.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>',

            dialogButtonProceed: true,
            dialogButtonProceedText: 'Okay',
            dialogImage:
              '<em class="icon-danger"></em>',
          },
        });
        this.analyticService.loadPopUpAnalytics('Unable to Transact (Joint Account)');
      }else if(this.joinAndUtAccountIndicator){
        this.dialog.open(DialogAlertComponent, {
          panelClass: ['custom-dialog', 'dialog-inverse-button'],
          maxWidth: '600px',
          autoFocus: false,
          backdropClass: 'backdrop-modal',
          data: {
            dialogHeading: 'Unable to Transact (Joint Account)',
            dialogContent: '<p>You need all joint account holders signatories to transact using this Unit Trust account.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>',

            dialogButtonProceed: true,
            dialogButtonProceedText: 'Okay',
            dialogImage:
              '<em class="icon-danger"></em>',
          },
        });
        this.analyticService.loadPopUpAnalytics('Unable to Transact (Joint Account)');
      }
      else{
          //Bug WJ-3101 - fix for a single account
          if(this.accounts.length === 1) {
            this.router.navigate(['/available-funds']);
          } else {
            const dialogRef = this.dialog.open(DialogSelectTransactionComponent, {
            panelClass: ['full-width', 'select-acc'],
            maxWidth: '772px',
            autoFocus: false,
            data: {
              selectedAccount: this.selectedAccount,
              accounts: this.accounts,
            },
          });
          dialogRef.afterClosed().subscribe(response => {
            this.selectedAccountDialogCart.emit(response.selectedAccount);
          });
        }
      }

      this.timeoutHandler = null;
    }
  }

  public mouseDown() {
    this.timeoutHandler = setTimeout(() => {
      this.timeoutHandler = null;
    }, 500);
  }

  goToConsumerContactCentreLink() {
    // console.log("ButtonAddComponent :: goToConsumerContactCentreLink :: ");
  }
}
