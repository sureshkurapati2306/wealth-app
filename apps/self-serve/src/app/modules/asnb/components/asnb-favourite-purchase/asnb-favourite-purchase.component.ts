import { Component, OnInit, OnDestroy } from '@angular/core';

import { AsnbService } from '../../services/asnb.service';
import { Store } from '@ngrx/store';
import {
    AsnbCheckout,
    AsnbFavourite,
    AsnbFundTypeMaps,
    CommonDropDown,
    FundType,
} from '../../models';
import { FormControl, FormGroup } from '@angular/forms';
import {
    getTransferReasonList,
    getTransactionLimit,
    getPurchaseFavouriteDetails,
    getCheckout,
    getSofSowList,
    getFundTypesMap,
} from '../../+state/asnb.selectors';
import { MatDialog } from '@angular/material/dialog';
import { AsnbSourceOfFundWealthComponent } from '../asnb-source-of-fund-wealth/asnb-source-of-fund-wealth.component';
import { loadSofSowList, loadTransferReasonList, createOrder } from '../../+state/asnb.actions';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { investmentType } from '../../constants';
import { getSofValue, getSowValue } from '../../utils';

@Component({
    selector: 'cimb-asnb-favourite-purchase',
    templateUrl: './asnb-favourite-purchase.component.html',
    styleUrls: ['./asnb-favourite-purchase.component.scss'],
})
export class AsnbFavouritePurchaseComponent implements OnInit, OnDestroy {
    pageTitle = 'Purchase for Favourite';
    favouriteDataSub: Subscription;
    favouriteData: AsnbFavourite;
    transferReasonSub: Subscription;
    transferReasons: CommonDropDown[] = [];
    selectedTransferReason: string;
    selectedTransferReasonValue: string;
    transactionLimitSub: Subscription;
    transactionLimit$ = this.store.select(getTransactionLimit);
    currentTransactionLimit: number;
    isInitialState = true;
    fundTopUpForm: FormGroup;
    isButtonEnabled = false;
    amount = 0;
    sofCheckAmount = 10000;
    sourceOfWealthAndFund$ = this.store.select(getSofSowList);
    fundTypeMapSub: Subscription;
    fundTypeMap: AsnbFundTypeMaps;

    constructor(
        private asnbService: AsnbService,
        private store: Store,
        private dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.favouriteDataSub = this.store.select(getPurchaseFavouriteDetails).subscribe((data) => {
            this.favouriteData = data;
        });

        this.fundTypeMapSub = this.store.select(getFundTypesMap).subscribe((data) => {
            this.fundTypeMap = data;
        });

        this.transferReasonSub = this.store.select(getTransferReasonList).subscribe((data) => {
            this.transferReasons = data;
            this.selectedTransferReason = data[0]?.id;
            this.selectedTransferReasonValue = data[0]?.value;
        });

        this.fundTopUpForm = new FormGroup({
            amount: new FormControl(''),
        });

        this.fundTopUpForm.controls['amount'].valueChanges.subscribe((value) => {
            if (value) {
                this.amount = parseInt(value.replace(/,/g, ''));
            } else {
                this.amount = 0;
            }
            this.isButtonEnabled = this.amount > 0 && this.amount <= this.currentTransactionLimit;
        });

        this.transactionLimitSub = this.transactionLimit$.subscribe((limit) => {
            this.currentTransactionLimit = limit.maxLimit - limit.currentLimit;
        });

        this.store.dispatch(loadSofSowList());
        this.store.dispatch(loadTransferReasonList());
    }

    ngOnDestroy() {
        this.favouriteDataSub.unsubscribe();
        this.transferReasonSub.unsubscribe();
        this.transactionLimitSub.unsubscribe();
    }

    redirectEvent() {
        this.asnbService.updateTabIndex(1);
    }

    onTransferReasonSelect(selectedItem: CommonDropDown): void {
        this.selectedTransferReason = selectedItem?.id;
        this.selectedTransferReasonValue = selectedItem?.value;
    }

    dispatchCreateOrder(topUpInfo: Partial<AsnbCheckout>) {
        this.store
            .select(getCheckout)
            .pipe(first())
            .subscribe((data) => {
                this.store.dispatch(
                    createOrder({
                        payload: {
                            ...data,
                            ...topUpInfo,
                        },
                    }),
                );
            });
    }

    onSubmit() {
        const topUpInfo: Partial<AsnbCheckout> = {
            favouriteDetails: {
                unitHolderId: this.favouriteData.asnbAccountNo,
                reasonOfTransfer: this.selectedTransferReason,
                reasonOfTransferValue: this.selectedTransferReasonValue,
            },
            fundId: this.favouriteData.fundCode,
            fundName: this.favouriteData.fundDesc,
            amount: this.amount,
            fundType: getFundType(this.fundTypeMap[this.favouriteData.fundCode].fundType),
            investmentType: investmentType.topUp,
        };

        if (this.amount >= this.sofCheckAmount) {
            let sourceOfWealthAndFund: CommonDropDown[] = [];
            this.sourceOfWealthAndFund$.subscribe((data) => {
                sourceOfWealthAndFund = data;
            });

            //Show sof dialog if amount is more than 10k
            this.openSofDialog(topUpInfo, sourceOfWealthAndFund);
        } else {
            this.dispatchCreateOrder(topUpInfo);
        }
    }

    openSofDialog(topUpInfo: Partial<AsnbCheckout>, sourceOfWealthAndFund: CommonDropDown[]) {
        this.dialog
            .open(AsnbSourceOfFundWealthComponent, {
                panelClass: 'source-of-wealth-and-funds-dialog',
                disableClose: true,
                data: {
                    showSow: false,
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (!result) return;
                if (result.sof) {
                    topUpInfo.sof = {
                        id: result.sof,
                        value: getSofValue(result, sourceOfWealthAndFund),
                    };
                }
                if (result.sow) {
                    topUpInfo.sow = {
                        id: result.sow,
                        value: getSowValue(result, sourceOfWealthAndFund),
                    };
                }
                this.dispatchCreateOrder(topUpInfo);
            });
    }
}

export function getFundType(fundType: string): FundType {
    if (fundType === 'fixed') return 'fixed price';
    return 'variable price';
}
