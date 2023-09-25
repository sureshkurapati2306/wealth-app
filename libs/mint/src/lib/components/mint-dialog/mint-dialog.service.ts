import { formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnalyticService } from '@cimb/shared/services';
import { merge } from 'lodash';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { MintDialogComponent } from './mint-dialog.component';
import { MintDialogConfig } from './mint-dialog.type';

@Injectable({
    providedIn: 'root',
})
export class MintDialogService {
    private _defaultConfig: MintDialogConfig = {
        title: 'Confirm action',
        message: 'Are you sure you want to confirm this action?',
        note: '',
        icon: {
            show: true,
            name: 'ic_warning_48px.svg',
            color: 'warn',
        },
        actions: {
            confirm: {
                show: true,
                label: 'Confirm',
                color: 'primary',
                click: () => null,
            },
            cancel: {
                show: true,
                label: 'Cancel',
                click: () => null,
            },
        },
        dismissible: false,
    };

    constructor(private _matDialog: MatDialog, private analyticService: AnalyticService) {}

    open(config: MintDialogConfig = {}): MatDialogRef<MintDialogComponent> {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(MintDialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'mint-dialog-panel',
        });
    }

    /**
     * Show "You currently have a pending Purchase/Redeem/Switch transaction in your cart" dialog.
     */
    showPendingOtherTransactionInCartDialog(previousFlow: string, currentFlow: string): MatDialogRef<DialogAlertComponent> {

        let previousFlowText = null;
        if (previousFlow === 'topup' || previousFlow === '001') {
            previousFlowText = 'Purchase';
        } else if (previousFlow === 'redeem' || previousFlow === '002') {
            previousFlowText = 'Redeem';
        } else if (previousFlow === 'switch' || previousFlow === '003') {
            previousFlowText = 'Switch';
        }
        
        let currentFlowText = null;
        if (currentFlow === '001') {
            currentFlowText = 'Purchase';
        } else if (currentFlow === '002') {
            currentFlowText = 'Redeem';
        } else if (currentFlow === '003') {
            currentFlowText = 'Switch';
        }

        const conf = {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-warning">',
                dialogHeading: 'Pending Transaction in Cart',
                dialogContent:
                    '<p>You currently have a pending <strong>' +
                    previousFlowText +
                    '</strong> transaction in your cart. Adding a <strong>' +
                    currentFlowText +
                    '</strong> transaction to your cart will clear your cart.</p>' +
                    '<p>Do you want to continue?</p>',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Cancel',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Yes, clear cart and continue',
            },
        };

        const dialogRef = this._matDialog.open(DialogAlertComponent, conf);
        this.analyticService.loadPopUpAnalytics('Pending Transaction in Cart');
        return dialogRef;
        
    }

    /**
     * Show "You have a pending transaction from Unit Trust account X" dialog.
     */
    showPendingTransactionInOtherAccountDialog(utAccount: string) {

        const conf = {
            maxWidth: '600px',
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            backdropClass: 'backdrop-modal',
            autoFocus: false,
            data: {
                dialogHeading: 'Pending Transaction in Cart',
                dialogImage: '<em class="icon-warning-bubble"></em>',
                dialogButtonCancel: true,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Yes, clear cart and continue',
                dialogContent:
                    '<p>You have a pending transaction from Unit Trust account <strong>' +
                    utAccount +
                    '</strong>. Adding items from a different Unit Trust account will clear your cart.</p><p>Do you want to continue?</p>',

                dialogButtonCancelText: 'Cancel',
            },
        };

        const dialogRef = this._matDialog.open(DialogAlertComponent, conf);
        this.analyticService.loadPopUpAnalytics('Pending Transaction in Cart');
        return dialogRef;

    }

    /**
     * Show "You need to maintain a minimum holding of X units" dialog for Switch transaction.
     */
    showMinimumHoldingRequirementsForSwitchDialog(minimumHoldingUnits: number) {

        const conf = {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-danger"></em>',
                dialogHeading: 'Minimum Holding Requirement',
                dialogContent:
                '<p>You need to maintain a minimum holding of <strong>' +
                formatNumber(minimumHoldingUnits, 'en-US', '1.2-2') +
                '</strong> units to stay invested in this fund. Switch all or change your switch out units.</p>',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Change switch out units',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Switch all and add to cart',
            },
        };

        return this._matDialog.open(DialogAlertComponent, conf);
    
    }
    
}
