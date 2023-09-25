import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAllFundsListing, getCheckout, getEligibleFunds } from '../../+state/asnb.selectors';
import { Store } from '@ngrx/store';
import { EMPTY, Subscription } from 'rxjs';
import * as AsnbActions from '../../+state/asnb.actions';
import * as _ from 'lodash';
import { catchError, delay, tap } from 'rxjs/operators';
import { AsnbService } from '../../services/asnb.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '@cimb/mint';
import { AppService } from 'apps/self-serve/src/app/core/services/app.service';

@Component({
    selector: 'cimb-asnb-available-funds',
    templateUrl: './asnb-available-funds.component.html',
})
export class AsnbAvailableFundsComponent implements OnInit, OnDestroy {
    pageTitle = 'Available Funds';

    noProgressStep: boolean;

    currentUrl: string;

    availableFunds!: any;

    fundDetailSubscription: Subscription;

    unitHolderId: string;

    eligibleFunds: any[''] = [];

    noEligibleFunds = false;

    isLoading = true;

    selectedMemberHolderId: string | number = null;

    storeEligibleFundsSubscription: Subscription;

    constructor(
        private router: Router,
        private store: Store,
        private service: AsnbService,
        private dialog: MatDialog,
        private appService: AppService,
    ) {}

    ngOnInit(): void {
        this.service.selectedMemberHolderId$.subscribe((data) => {
            this.selectedMemberHolderId = data.membershipNumber;
        });

        this.store.select(getCheckout).subscribe((data: any) => {
            if (data.guardianDetails.unitHolderId === this.selectedMemberHolderId) {
                this.unitHolderId = '';
            } else {
                this.unitHolderId = data.minorDetails.unitHolderId;
            }
        });

        this.store.dispatch(
            AsnbActions.loadEligibleFunds({
                payload: this.unitHolderId,
            }),
        );

        this.geEligibleFunds();

        this.getAllFunds();
    }
    geEligibleFunds() {
        this.storeEligibleFundsSubscription = this.store
            .select(getEligibleFunds)
            .subscribe((data) => {
                if (data) {
                    if (data.rejectMessage) {
                        this.handleGetEligibleFundsRejection(data.rejectMessage);
                        this.noEligibleFunds = true;
                        this.eligibleFunds = [];
                    } else if (data.eligibleFunds.length > 0) {
                        this.noEligibleFunds = false;
                        this.eligibleFunds = data.eligibleFunds;
                        return this.eligibleFunds;
                    } else {
                        this.noEligibleFunds = true;
                        this.eligibleFunds = [];
                    }
                }
            });
    }

    handleGetEligibleFundsRejection(rejectMessage: string) {
        this.dialog
            .open(DialogAlertComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                disableClose: true,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading: 'Unable to Proceed',
                    dialogContent: `<p>${rejectMessage}<p>`,
                    dialogButtonCancel: false,
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Okay',
                    dialogImage: '<em class="icon-danger"></em>',
                },
            })
            .afterClosed()
            .subscribe(() => {
                this.onRedirectBack();
            });
    }

    getAllFunds() {
        this.store
            .select(getAllFundsListing)
            .pipe(
                delay(4000),
                tap((data) => {
                    if (data) {
                        this.isLoading = false;

                        this.noEligibleFunds = false;

                        const filteredData = data.filter((item) => {
                            if (item.fundStatus === 'ACTIVE') {
                                return this.eligibleFunds.includes(item.fundCode);
                            }
                        });
                        this.availableFunds = _.sortBy(filteredData, ['fundLongName', 'asc']);
                    } else {
                        this.noEligibleFunds = true;
                    }
                }),
                catchError(() => {
                    return EMPTY;
                }),
            )
            .subscribe();
    }
    backButtonEvent() {
        if (this.currentUrl === '/dashboard;tab=0') {
            this.currentUrl = '/dashboard';
            return this.router.navigateByUrl(this.currentUrl);
        }
    }

    onRedirectBack() {
        this.service.updateTabIndex(0);
    }

    ngOnDestroy() {
        this.storeEligibleFundsSubscription.unsubscribe();
    }
}
