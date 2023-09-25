import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AsnbMember,
    ASNBFunds,
    AsnbFund,
    AsnbOverview,
    Investment,
    AsnbCashTransactionRequest,
} from '../../models';

import { AsnbService } from '../../services/asnb.service';

import {
    getASNBFundDetails,
    getASNBMemberList,
    getASNBOverview,
    getCheckout,
    getExternalUrlList,
    getSelectedMember,
    loadUserAccountStatus,
} from '../../+state/asnb.selectors';

import { selectASNBAssetSummary } from '../../../../core/state/wealth-dashboard/wealth-dashboard.selectors';

import {
    loadAsnbFundDetails,
    loadAsnbMinorFundDetails,
    loadUserRiskStatus,
    updateCheckoutState,
    loadPastTransaction,
    clearCheckoutState,
    loadTransactionLimit,
    asnbTopUp,
    updateSelectedMember,
    loadOperationHourDetails,
    loadExternalUrlList,
    loadScheduledMaintenance,
    clearAsnbFavouritePurchase,
    fetchDashboardInfoOwnAccount,
    fetchDashboardInfoMinorAccount,
    updateDashboardInfoOwnAccount,
    updateDashboardInfoMinorAccount,
} from '../../+state/asnb.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '@cimb/mint';

@Component({
    selector: 'cimb-asnb-dashboard',
    templateUrl: './asnb-dashboard.component.html',
    styleUrls: ['./asnb-dashboard.component.scss'],
})
export class AsnbDashboardComponent implements OnInit, OnDestroy {
    constructor(
        private asnbService: AsnbService,
        private store: Store,
        private dialog: MatDialog,
    ) {}
    fixedFunds: AsnbFund[] = [];
    variableFunds: AsnbFund[] = [];
    asnbMemberList: AsnbMember[] = [];
    asnbOverview: AsnbOverview;
    fundList?: ASNBFunds;
    fundDetailSubscription: Subscription;
    memberShipSubscription: Subscription;
    asnbOverviewSubscription: Subscription;
    minorDetails: { unitHolderId: string; name: string } | undefined;
    asnbSummarySubscription: Subscription;
    asnbSummary = {};

    selectedAccount: AsnbMember;
    lastSelectedAccount: AsnbMember;

    ngOnInit() {
        this.store.dispatch(clearAsnbFavouritePurchase());
        this.store.dispatch(clearCheckoutState());
        this.store.dispatch(fetchDashboardInfoOwnAccount());
        this.store.dispatch(fetchDashboardInfoMinorAccount());
        this.store.dispatch(loadUserRiskStatus());
        this.store.dispatch(loadTransactionLimit());
        this.store.dispatch(loadOperationHourDetails());
        this.store.select(getSelectedMember).subscribe((member) => {
            if (member?.value) {
                this.store.dispatch(
                    loadAsnbMinorFundDetails({ options: { unitHolderId: member.value } }),
                );
            } else {
                this.store.dispatch(loadAsnbFundDetails({ options: {} }));
            }
        });

        this.store.dispatch(
            asnbTopUp({
                amount: null,
                fundId: null,
                fundName: null,
            }),
        );

        this.fundDetailSubscription = this.store.select(getASNBFundDetails).subscribe((data) => {
            this.fixedFunds = data.fix_price;

            this.variableFunds = data.variable_price;
        });

        this.memberShipSubscription = this.store.select(getASNBMemberList).subscribe((data) => {
            this.asnbMemberList = data;
            this.selectedAccount = data[0];
            this.lastSelectedAccount = data[0];
        });

        this.asnbOverviewSubscription = this.store.select(getASNBOverview).subscribe((data) => {
            this.asnbOverview = data;
        });

        this.asnbSummarySubscription = this.store
            .select(selectASNBAssetSummary)
            .subscribe((data: Investment[]) => {
                this.asnbSummary = data ? data[0] : {};
            });

        this.store.select(loadUserAccountStatus).subscribe((accountStatus) => {
            if (typeof accountStatus === 'boolean' && !accountStatus) {
                this.dialog
                    .open(DialogAlertComponent, {
                        panelClass: ['custom-dialog', 'dialog-inverse-button'],
                        maxWidth: '600px',
                        autoFocus: false,
                        disableClose: true,
                        backdropClass: 'backdrop-modal',
                        data: {
                            dialogHeading: 'Account Invalid',
                            dialogContent:
                                '<p>We’re sorry, your account’s status didn’t meet the ASNB criteria.</p><br><p>Please contact ASNB Customer Service Centre by calling 03-7730 8899 to resolve this issue. (Account status - INVALID)</p>',
                            dialogButtonCancel: false,
                            dialogButtonProceed: true,
                            dialogButtonProceedText: 'Okay',
                            dialogImage: '<em class="icon-danger"></em>',
                        },
                    })
                    .afterClosed()
                    .subscribe(() => {
                        this.onChangeMemberShip(this.lastSelectedAccount);
                    });
            }
        });

        this.store.select(getExternalUrlList).subscribe((data) => {
            if (Object.keys(data).length === 0) this.store.dispatch(loadExternalUrlList());
        });

        //Get ASNB feature settings
        this.asnbService.getAsnbFeatureSettings();

        //Get ASNB Scheduled Maintenence
        this.store.dispatch(loadScheduledMaintenance());
    }

    onChangeMemberShip(selectedMember: AsnbMember) {
        this.store.dispatch(loadScheduledMaintenance());

        this.store.dispatch(updateSelectedMember({ payload: selectedMember }));
        this.store
            .select(getCheckout)
            .pipe(first())
            .subscribe((data) => {
                let minorDetails = data.minorDetails;

                // Selected item is guardian
                if (selectedMember.membershipNumber === data.guardianDetails.unitHolderId) {
                    //Remove minor details
                    if (minorDetails) {
                        minorDetails = undefined;
                    }
                    this.store.dispatch(updateDashboardInfoOwnAccount());
                } else {
                    minorDetails = {
                        unitHolderId: selectedMember.membershipNumber,
                        name: selectedMember.name,
                    };
                    this.store.dispatch(updateDashboardInfoMinorAccount());
                }

                this.minorDetails = minorDetails;

                this.store.dispatch(
                    updateCheckoutState({
                        payload: {
                            ...data,
                            minorDetails,
                        },
                    }),
                );
            });
        // update checkout state with name and membership number without fundId and amount
        this.lastSelectedAccount = this.selectedAccount;
        this.selectedAccount = selectedMember;
    }

    fetchPastTransaction(fundId: string) {
        let unitHolderId = '';
        this.store.select(getSelectedMember).subscribe((member) => {
            unitHolderId = member.membershipNumber;
        });

        const isMinor = unitHolderId !== this.asnbMemberList[0].membershipNumber;

        const options: AsnbCashTransactionRequest = {
            fundId,
        };

        if (isMinor) {
            options.unitHolderId = unitHolderId;
        }

        this.store.dispatch(loadPastTransaction({ options }));
    }

    ngOnDestroy(): void {
        this.fundDetailSubscription.unsubscribe();
        this.memberShipSubscription.unsubscribe();
        this.asnbOverviewSubscription.unsubscribe();
        this.asnbSummarySubscription.unsubscribe();
    }
}
