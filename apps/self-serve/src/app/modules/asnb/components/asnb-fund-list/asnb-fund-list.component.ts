import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
    getCheckout,
    getTopUp,
    getUserRiskStatus,
    getFetchStatus,
    getPastTransaction,
    getFundTypesMap,
    getTransactionLimit,
    getASNBDowntimeScheduledMaintenance,
    getSofSowList,
} from '../../+state/asnb.selectors';
import {
    AsnbCheckout,
    AsnbFund,
    CommonDropDown,
    HideTopUp,
    RiskStatus,
    ScheduledMaintenance,
    FundType,
    PastTransactionResponse as PastTransactionList,
} from '../../models';
import { AsnbSourceOfFundWealthComponent } from '../asnb-source-of-fund-wealth/asnb-source-of-fund-wealth.component';

import * as AsnbActions from '../../+state/asnb.actions';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { DowntimeService } from 'apps/self-serve/src/app/core/services/downtime/downtime.service';
import { investmentType } from '../../constants';
import { getSofValue, getSowValue } from '../../utils';

interface FundList {
    fundId: string;
    currency: string;
    currentValue?: {
        label: string;
        value: number;
    };
    totalUnits?: {
        label: string;
        value: number;
    };
    ubb?: {
        label: string;
        value: number;
    };
    ubc?: {
        label: string;
        value: number;
    };
}

@Component({
    selector: 'cimb-asnb-fund-list',
    templateUrl: './asnb-fund-list.component.html',
    styleUrls: ['./asnb-fund-list.component.scss'],
})
export class AsnbFundListComponent implements OnInit, OnDestroy {
    @Input() fundListData!: AsnbFund;
    @Input() hideTopUp?: HideTopUp;
    @Input() fundType?: FundType;
    @Input() disableTopUp?: boolean;
    @Output() fetchPastTransactions = new EventEmitter<string>();

    fundList!: FundList;
    fundTopUpForm: FormGroup;
    isInitialState = true;
    pastTxnList: PastTransactionList;
    pastTxnErrorCode: string;
    pastTxnErrorMsg: string;
    pastTransactionSubscription: Subscription;
    currentTransactionLimit: number;

    topUpInfo$ = this.store.select(getTopUp);
    status$ = this.store.select(getFetchStatus);
    fundTypesMap$ = this.store.select(getFundTypesMap);
    transactionLimit$ = this.store.select(getTransactionLimit);
    sourceOfWealthAndFund$ = this.store.select(getSofSowList);

    scheduledMaintenance: ScheduledMaintenance;

    maintenanceStartTime;
    maintenanceEndTime;

    hasScheduledMaintenance = false;

    constructor(
        private store: Store,
        private changeDetector: ChangeDetectorRef,
        public dialog: MatDialog,
        private router: Router,
        private DS: DowntimeService,
    ) {}
    displayedColumns: string[] = ['date', 'description', 'amount'];

    dataSource = new MatTableDataSource<any[]>();

    sourceOfWealthAndFund: CommonDropDown[] = [];

    format = 'HH:mm:ss';
    now = moment().utcOffset('+0800').format(this.format);
    time = moment(this.now, this.format);

    tooltipHeading = 'UBB/UBC';
    tooltipText = `Investment through Financing: The eligible units will be the lower value between UBB /UBC for the fund. Please take note the UBB/UBC just represents as indication. Further information to be obtained from the Agent/ASNB

        Unit Trusts Collateral for loan facility: The eligible units between total holding cash units and UBC for the fund. Please take note the UBB/UBC just represents as indication. Further information to be obtained from the Agent/ASNB.`;

    ngOnInit() {
        this.fundList = this.formatFundListData();
        this.fundTopUpForm = new FormGroup({
            amount: new FormControl(''),
        });

        this.topUpInfo$.subscribe((data) => {
            if (data) {
                if (data.fundId !== this.fundList.fundId) {
                    this.fundTopUpForm.reset();
                    this.isInitialState = false;
                    this.changeDetector.detectChanges();
                    this.isInitialState = true;
                }
            }
        });

        this.pastTransactionSubscription = this.store
            .select(getPastTransaction)
            .subscribe((data) => {
                this.pastTxnList = data[this.fundListData.fundId];
            });

        this.transactionLimit$.subscribe((data) => {
            this.currentTransactionLimit = data.maxLimit - data.currentLimit;
        });

        //asnb downtime
        this.DS.getASNBScheduledDowntime().subscribe((data) => {
            if (data) {
                this.scheduledMaintenance = data.scheduledMaintenance;
                this.maintenanceStartTime = moment(data.maintenanceStartTime, 'HH:mm A').format(
                    'hh:mm A',
                );
                this.maintenanceEndTime = moment(data.maintenanceEndTime, 'HH:mm A').format(
                    'hh:mm A',
                );
                this.hasScheduledMaintenance = data.hasScheduledMaintenance;
            }
        });
    }

    formatFundListData(): FundList {
        const formattedFundList: FundList = {
            fundId: this.fundListData.fundId,
            currency: 'MYR',
        };

        if (this.fundListData.uhHoldings !== undefined) {
            formattedFundList.currentValue = {
                label: 'Current Value',
                value: this.fundListData.uhHoldings,
            };
        }

        if (this.fundListData.totalUnits !== undefined) {
            formattedFundList.totalUnits = {
                label: 'Total Units',
                value: this.fundListData.totalUnits,
            };
        }

        if (this.fundListData.ubbUnits !== undefined && this.fundListData.ubbUnits > -1) {
            formattedFundList.ubb = {
                label: 'UBB',
                value: this.fundListData.ubbUnits,
            };
        }

        if (this.fundListData.ubcUnits) {
            formattedFundList.ubc = {
                label: 'UBC',
                value: this.fundListData.ubcUnits,
            };
        }
        return formattedFundList;
    }

    changeValueEvent() {
        const amount = this.fundTopUpForm.value.amount as string;
        this.fundTypesMap$.subscribe((data) => {
            this.store.dispatch(
                AsnbActions.asnbTopUp({
                    fundName: data[this.fundListData.fundId].fundLongName,
                    amount: parseInt(amount.replace(/,/g, '')),
                    fundId: this.fundListData.fundId,
                }),
            );
        });
    }

    showPastTransactions(expanded: boolean) {
        if (expanded) {
            this.fetchPastTransactions.emit(this.fundListData.fundId);
        }
    }

    onTopUp() {
        let showSofSowPopUp = false;
        let showSow = false;

        let userRiskStatus: RiskStatus = '';

        this.store.select(getUserRiskStatus).subscribe((data) => {
            userRiskStatus = data;
        });

        const topUpInfo: Partial<AsnbCheckout> = {
            fundType: this.fundType,
            investmentType: investmentType.topUp,
        };

        this.topUpInfo$.subscribe((data) => {
            topUpInfo.amount = data.amount;
            topUpInfo.fundId = data.fundId;
            topUpInfo.fundName = data.fundName;

            if (userRiskStatus !== 'HI') this.showASNBMaintenanceScreen();
            showSofSowPopUp = updateShowSofSowPopUpState(userRiskStatus, data.amount);
            showSow = updateShowSowState(userRiskStatus);
        });

        if (showSofSowPopUp) {
            this.displaySofSowDialog(showSow, topUpInfo);
        } else {
            this.dispatchCreateOrder(topUpInfo, true);
        }
    }

    showASNBMaintenanceScreen() {
        this.store
            .select(getASNBDowntimeScheduledMaintenance)
            .pipe(
                tap((data: ScheduledMaintenance) => {
                    const startTime = moment(data?.startTime, this.format);
                    const endTime = moment(data?.endTime, this.format);

                    if (this.time.isBetween(startTime, endTime)) {
                        this.router.navigate(['/asnb-dashboard/scheduled-maintenance']);
                        return true;
                    } else {
                        return false;
                    }
                }),
            )
            .subscribe();
    }

    dispatchCreateOrder(payload: Partial<AsnbCheckout>, showMaintenance?: boolean) {
        this.store
            .select(getCheckout)
            .pipe(first())
            .subscribe((checkoutData) => {
                if (showMaintenance) this.showASNBMaintenanceScreen();
                this.store.dispatch(
                    AsnbActions.createOrder({
                        payload: {
                            ...checkoutData,
                            ...payload,
                        },
                    }),
                );
            });
    }

    displaySofSowDialog(showSow: boolean, topUpInfo: Partial<AsnbCheckout>) {
        let sourceOfWealthAndFund: CommonDropDown[] = [];
        this.sourceOfWealthAndFund$.subscribe((data) => {
            if (data.length === 0) this.store.dispatch(AsnbActions.loadSofSowList());
            sourceOfWealthAndFund = data;
        });

        const dialogRef = this.dialog.open(AsnbSourceOfFundWealthComponent, {
            panelClass: 'source-of-wealth-and-funds-dialog',
            disableClose: true,
            data: {
                showSow,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
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
            this.dispatchCreateOrder(topUpInfo, true);
        });
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        this.pastTransactionSubscription.unsubscribe();
    }
}

export function updateShowSofSowPopUpState(userRiskStatus: RiskStatus, amount: number): boolean {
    if (userRiskStatus !== 'HI' && amount < 25000) return false;
    return true;
}

export function updateShowSowState(userRiskStatus: RiskStatus): boolean {
    if (userRiskStatus === 'HI') return true;
    return false;
}
