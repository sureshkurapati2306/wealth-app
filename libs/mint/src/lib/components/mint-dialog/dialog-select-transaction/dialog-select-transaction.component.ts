import {
    Component,
    ElementRef,
    Inject,
    ViewChild,
    OnInit,
    EventEmitter,
    Output,
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AnalyticService } from '@cimb/shared/services';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

@Component({
    selector: 'cimb-dialog-select-transaction',
    templateUrl: './dialog-select-transaction.component.html',
    styleUrls: ['./dialog-select-transaction.component.scss'],
})
export class DialogSelectTransactionComponent implements OnInit {
    @ViewChild(MatMenuTrigger, { static: true, read: ElementRef })
    userMenu: ElementRef<HTMLElement>;
    selectedAccount;
    accounts;
    joinOrUtAccountIndicator = false;
    joinAndUtAccountIndicator = false;
    index = 0;
    selectedAccountObj;
    response: any = [];
    epfAccount: boolean;

    @Output() selectedAccountDialogCart: EventEmitter<any> = new EventEmitter();

    get userMenuData() {
        return {
            menuWidth: this.userMenu.nativeElement.getBoundingClientRect().width,
        };
    }
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialog: MatDialog,
        private router: Router,
        public dialogRef: MatDialogRef<DialogSelectTransactionComponent>,
        private analyticService: AnalyticService
    ) {}
    solePropIndicator = '';

    ngOnInit(): void {
        this.selectedAccount = this.data?.selectedAccount;
        this.accounts = this.data?.accounts;

        if (this.selectedAccount.includes('E', 0)) {
            this.epfAccount = true;
        } else {
            this.epfAccount = false;
        }

        if (this.selectedAccount && this.accounts.length >= 1) {
            this.index = this.accounts.map((e) => e.ut_account_no).indexOf(this.selectedAccount);
            this.selectedAccountObj = this.accounts[this.index];
        }
    }
    showWarningModal() {
        if (this.solePropIndicator === 'P') {
            this.dialog.open(DialogAlertComponent, {
                panelClass: 'custom-dialog',
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading:
                        'Unable to Transact <p><strong>(Sole Proprietor Customer)</strong></p>',
                    dialogContent:
                        '<br><p>For Unit Trust transactions as a sole proprietor customer, please visit any CIMB branch.</p>',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Okay',
                    dialogImage: '<em class="icon-danger"></em>',
                },
            });
            this.analyticService.loadPopUpAnalytics('Unable to Transact <br> (Sole Proprietor Customer)');
        } else {
            let value = null;
            if (this.selectedAccount && this.accounts.length >= 1) {
                this.index = this.accounts
                    .map((e) => e.ut_account_no)
                    .indexOf(this.selectedAccount);
                this.selectedAccountObj = this.accounts[this.index];
                value = this.accounts[this.index];
            }
            this.joinAndUtAccountIndicator = false;
            this.joinOrUtAccountIndicator = false;

            if (value && value.ut_joint_indicator === '01') {
                if (value.ut_account_type === 'A') {
                    //Join AND
                    this.joinAndUtAccountIndicator = true;
                } else {
                    this.joinAndUtAccountIndicator = false;
                }
            } else if (value && value.ut_joint_indicator === '02') {
                if (value.ut_account_type === 'A') {
                    //Join AND
                    this.joinAndUtAccountIndicator = true;
                } else {
                    this.joinAndUtAccountIndicator = false;
                    //Join OR
                    if (value.ut_account_type === 'P') {
                        this.joinOrUtAccountIndicator = true;
                    } else {
                        this.joinOrUtAccountIndicator = false;
                    }
                }
            }

            if (this.joinOrUtAccountIndicator) {
                this.dialog.open(DialogAlertComponent, {
                    panelClass: ['custom-dialog', 'dialog-inverse-button'],
                    maxWidth: '600px',
                    autoFocus: false,
                    backdropClass: 'backdrop-modal',
                    data: {
                        dialogHeading: 'Unable to Transact (Joint Account)',
                        dialogContent:
                            '<p>Only the primary account holder can transact using this Unit Trust account.</p><p><strong>For assistance, please <a (click)="goToConsumerContactCentreLink()">contact us or visit any CIMB branch.</a></strong></p>',

                        dialogButtonProceed: true,
                        dialogButtonProceedText: 'Okay',
                        dialogImage: '<em class="icon-danger"></em>',
                    },
                });
                this.analyticService.loadPopUpAnalytics('Unable to Transact (Joint Account)');
            } else if (this.joinAndUtAccountIndicator) {
                this.dialog.open(DialogAlertComponent, {
                    panelClass: ['custom-dialog', 'dialog-inverse-button'],
                    maxWidth: '600px',
                    autoFocus: false,
                    backdropClass: 'backdrop-modal',
                    data: {
                        dialogHeading: 'Unable to Transact (Joint Account)',
                        dialogContent:
                            '<p>You need all joint account holders signatories to transact using this Unit Trust account.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>',

                        dialogButtonProceed: true,
                        dialogButtonProceedText: 'Okay',
                        dialogImage: '<em class="icon-danger"></em>',
                    },
                });
                this.analyticService.loadPopUpAnalytics('Unable to Transact (Joint Account)');
            } else {
                this.response.selectedAccount = this.selectedAccount;
                this.dialogRef.close(this.response);
                this.router.navigate(['/available-funds']);
            }
        }
    }

    onSelectAccount(index) {
        if (this.accounts[index].ut_account_no.includes('E', 0)) {
            this.epfAccount = true;
        } else {
            this.epfAccount = false;
        }

        this.selectedAccount = this.accounts[index].ut_account_no;
    }

    goToConsumerContactCentreLink() {
        window.open('https://www.cimb.com.my/en/personal/help-support/contact-us.html', '_blank');
    }
}
