import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import {
    RiskStatus,
    AsnbFundListing,
    AsnbCheckout,
    CommonDropDown,
    FundType,
} from '../../../models/asnb.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
    getAllFundsListing,
    getCheckout,
    getExternalUrlList,
    getFetchStatus,
    getSofSowList,
    getTopUp,
    getTransactionLimit,
    getUserRiskStatus,
} from '../../../+state/asnb.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAsnbRedirectionComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-redirection/dialog-asnb-redirection.component';
import { MatDialog } from '@angular/material/dialog';
import * as AsnbActions from '../../../+state/asnb.actions';
import { first } from 'rxjs/operators';
import { AsnbSourceOfFundWealthComponent } from '../../asnb-source-of-fund-wealth/asnb-source-of-fund-wealth.component';
import { investmentType } from '../../../constants';

@Component({
    selector: 'cimb-fund-table',
    templateUrl: './fund-table.component.html',
    styleUrls: ['./fund-table.component.scss'],
})
export class FundTableComponent implements OnInit, AfterViewInit {
    isInitialState = true;

    dataSource: MatTableDataSource<AsnbFundListing>;

    @Input() set data(value: AsnbFundListing[]) {
        if (value) {
            this.setAmountInFormGroup(value);
            this.dataSource = new MatTableDataSource<AsnbFundListing>(value);
        }
    }

    eligibleFundsVar: any[''] = [];

    @Input() fundList: AsnbFundListing;

    @Input() eligibleFunds: any;

    @Input() noEligibleFunds = false;

    searchControl = new FormControl();

    fundName: string;

    columnsToDisplay: string[] = ['fundName', 'amount', 'action'];

    fundTopUpForm: FormGroup[] = [];

    transactionLimit$ = this.store.select(getTransactionLimit);

    currentTransactionLimit: number;

    topUpInfo$ = this.store.select(getTopUp);

    status$ = this.store.select(getFetchStatus);

    startIndex = 1;

    pageLength: number;

    endIndex: number;

    pageSize = 16;

    sortedData: AsnbFundListing[];

    fundTypesMap$ = this.store.select(getAllFundsListing);

    @ViewChild(MatSort) sort: MatSort;

    sourceOfWealthAndFund$ = this.store.select(getSofSowList);

    highlightedRow = '';

    prospectusLink = '';
    fundPriceLink = '';

    @Input() isLoading = true;

    fundType: FundType;

    constructor(private store: Store, public dialog: MatDialog) {
        this.sortedData = this.dataSource?.data?.slice();
    }

    ngOnInit(): void {
        this.transactionLimit$.subscribe((data) => {
            this.currentTransactionLimit = data.maxLimit - data.currentLimit;
        });
        this.pageLength = this.dataSource?.data?.length;
        this.store.select(getExternalUrlList).subscribe((data) => {
            if (data.prospectus) this.prospectusLink = data.prospectus;
            if (data.fundPrice) this.fundPriceLink = data.fundPrice;
        });
    }

    changeValueEvent(i, element: AsnbFundListing) {
        const amount = this.fundTopUpForm[i].value.amount;
        this.fundTypesMap$.subscribe((data) => {
            if (data) {
                this.store.dispatch(
                    AsnbActions.asnbTopUp({
                        fundName: element.fundLongName,
                        amount: parseInt(amount.replace(/,/g, '')),
                        fundId: element.fundCode,
                    }),
                );
            }
        });

        this.fundTopUpForm.forEach((el, index) => {
            if (index !== i) {
                el.controls.amount.reset();
            }
        });

        this.fundType = element.fundType === 'fixed' ? 'fixed price' : 'variable price';
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;

        this.endIndex = this.dataSource.filteredData.length;
        this.pageLength = this.dataSource.filteredData.length;
        this.noEligibleFunds = false;

        this.initializeForm(this.dataSource.filteredData);
    }

    redirectConfirmation(url: string): void {
        this.dialog.open(DialogAsnbRedirectionComponent, {
            backdropClass: 'asnb-redirection',
            data: {
                url: url,
            },
        });
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.startIndex = 1;
            this.pageLength = this.dataSource?.data?.length;
            this.endIndex =
                this.startIndex < this.pageLength
                    ? Math.min(this.pageSize, this.pageLength)
                    : this.pageLength;
        }, 5000);
    }

    sortData(sort: Sort) {
        const data = this.dataSource?.data?.slice();
        if (!sort?.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data?.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'fundName':
                    return compare(a.fundLongName, b.fundLongName, isAsc);
                case 'amount':
                    return compare(a.fundLongName, b.fundLongName, isAsc);
                case 'action':
                    return compare(a.fundLongName, b.fundLongName, isAsc);
                default:
                    return 0;
            }
        });

        this.dataSource.data = this.sortedData;
    }

    onSelectRow(row) {
        this.highlightedRow = row?.fundLongName;
    }

    buyNow(): void {
        let showSofSowPopUp = false;
        let showSow = false;

        let userRiskStatus: RiskStatus = '';

        this.store.select(getUserRiskStatus).subscribe((data) => {
            userRiskStatus = data;
        });

        const topUpInfo: Partial<AsnbCheckout> = {
            fundType: this.fundType,
            investmentType: investmentType.newFund,
        };

        this.topUpInfo$.subscribe((data) => {
            topUpInfo.amount = data.amount;
            topUpInfo.fundId = data.fundId;
            topUpInfo.fundName = data.fundName;

            if (userRiskStatus !== 'HI') {
                if (data.amount >= 25000) {
                    showSofSowPopUp = true;
                }
            } else {
                showSofSowPopUp = true;
                showSow = true;
            }
        });

        if (showSofSowPopUp) {
            let sourceOfWealthAndFund: CommonDropDown[] = [];
            this.sourceOfWealthAndFund$.subscribe((data) => {
                if (data.length === 0) this.store.dispatch(AsnbActions.loadSofSowList());
                sourceOfWealthAndFund = data;

                if (sourceOfWealthAndFund.length > 0) {
                    this.dialogref(showSow, topUpInfo, sourceOfWealthAndFund);
                }
            });
        } else {
            this.getCheckoutData(topUpInfo);
        }
    }

    getCheckoutData(topUpInfo) {
        this.store
            .select(getCheckout)
            .pipe(first())
            .subscribe((data) => {
                this.store.dispatch(
                    AsnbActions.createOrder({
                        payload: {
                            ...data,
                            ...topUpInfo,
                        },
                    }),
                );
            });
    }

    dialogref(showSow, topUpInfo, sourceOfWealthAndFund: CommonDropDown[]) {
        const dialogRef = this.dialog.open(AsnbSourceOfFundWealthComponent, {
            panelClass: 'source-of-wealth-and-funds-dialog',
            disableClose: true,
            data: {
                showSow,
            },
        });

        dialogRef?.afterClosed().subscribe((result) => {
            if (result) {
                if (result.sof) {
                    topUpInfo.sof = {
                        id: result.sof,
                        value:
                            result.sofOthers ||
                            sourceOfWealthAndFund.find((data) => data.id === result.sof)?.value,
                    };
                }
                if (result.sow) {
                    topUpInfo.sow = {
                        id: result.sow,
                        value:
                            result.sowOthers ||
                            sourceOfWealthAndFund.find((data) => data.id === result.sow)?.value,
                    };
                }
                this.getCheckoutData(topUpInfo);
            }
        });
    }

    initializeForm(data: AsnbFundListing[]) {
        this.fundTopUpForm = [];
        this.setAmountInFormGroup(data);
    }

    setAmountInFormGroup(funds: AsnbFundListing[]) {
        funds.forEach((_, index) => {
            this.fundTopUpForm[index] = new FormGroup({
                amount: new FormControl(''),
            });
        });
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
