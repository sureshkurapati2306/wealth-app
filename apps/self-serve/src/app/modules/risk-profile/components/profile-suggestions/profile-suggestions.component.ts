import { Component, TemplateRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent, DialogSelectTransactionComponent } from '@cimb/mint';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import * as fromStore from '../../../../core/state/reducers';
import { AnalyticService } from '@cimb/shared/services';
import { getClicksCustomerInfo } from 'apps/self-serve/src/app/core/state/clicks/clicks.selectors';
import { takeUntil } from 'rxjs/operators';
import * as WealthDashboardSelectors from '../../../../core/state/wealth-dashboard/wealth-dashboard.selectors';
@Component({
    selector: 'cimb-profile-suggestions',
    templateUrl: './profile-suggestions.component.html',
    styleUrls: ['./profile-suggestions.component.scss'],
})
export class ProfileSuggestionsComponent implements OnInit, OnDestroy{
    @ViewChild('assetClassesDialog') assetClassesDialog: TemplateRef<any>;
    accounts: any[] = [];
    userType$: Observable<any>;
    userSubscription: Subscription;
    customerType: any;
    casaIndicator: string;
    soleProp: string;
    amlCheckResult = true;
    _unsubscribeAll: Subject<void> = new Subject<void>();
    constructor(private _matDialog: MatDialog, private store: Store<fromStore.AppState>,private analyticService: AnalyticService,) {}

    ngOnInit(): void {
        this.userType$ = this.store.select('userReducer');
        this.userSubscription = this.userType$.subscribe((users) => {
            this.customerType = users.userType;
            this.soleProp = users.user.sole_prop;
        });
        this.store.select(WealthDashboardSelectors.selectUtAccountAndCasaIndicator).pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
            this.accounts = data?.accounts;
            this.casaIndicator = data?.casaIndicator;
        });
        this.store.select(getClicksCustomerInfo).pipe(takeUntil(this._unsubscribeAll)).subscribe((info) => {
            this.amlCheckResult = info['amlCheckResult'] ? true : false;
        });
    }
    openAssetClassesDialog() {
        this._matDialog.open(this.assetClassesDialog, {
            backdropClass: 'no-backdrop',
            panelClass: 'modalAssetClass',
            maxWidth: '800px',
            autoFocus: false,
        });
    }

    openDialog() {
        if (this.casaIndicator === 'N') {
            this.checkCASASolePropAML(
                'Unable to Transact (No CASA)',
                '<p>To complete your transaction, open a current or savings account/-i with CIMB. You may apply via CIMB Clicks.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>',
                'Okay'
            );
            this.analyticService.loadPopUpAnalytics('Unable to Transact (No CASA)');
        }
        //Sole prop indicator
        else if (this.soleProp === 'P') {
            this.checkCASASolePropAML(
                'Unable to Transact <p><strong>(Sole Proprietor Customer)</strong></p>',
                '<br><p>For Unit Trust transactions as a sole proprietor customer, please visit any CIMB branch.</p>',
                'Okay'
            );
            this.analyticService.loadPopUpAnalytics(
                'Unable to Transact <br> (Sole Proprietor Customer)',
            );
        }
        // Under AML watch list
        else if (!this.amlCheckResult) {
            this.checkCASASolePropAML(
                'Unable to Proceed',
                '<p>We regret to inform that we are unable to process your application. Thank you for your interest.</p><p><strong>For assistance, please visit any CIMB branch.</strong></p>',
                'Close'
            );
             this.analyticService.loadPopUpAnalytics(
                'Unable to Proceed',
             );   
        } else {
            this._matDialog.open(DialogSelectTransactionComponent, {
                panelClass: ['full-width', 'select-acc'],
                maxWidth: '772px',
                autoFocus: false,
                data: {
                    selectedAccount: this.accounts[0]?.ut_account_no,
                    accounts: this.accounts,
                }
            });
        }
    }
    checkCASASolePropAML(dialogHeading,dialogContent,dialogButtonProceedText) {
        this._matDialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogHeading: dialogHeading,
                dialogContent: dialogContent,
                dialogButtonProceed: true,
                dialogButtonProceedText: dialogButtonProceedText,
                dialogImage: '<em class="icon-danger"></em>',
            },
        });
    }

    
    ngOnDestroy() {
        this._matDialog.closeAll();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
