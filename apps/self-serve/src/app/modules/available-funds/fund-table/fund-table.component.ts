import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '@cimb/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FundList } from '../models';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DecimalPipe } from '@angular/common';
import { MintDialogService } from '@cimb/mint';
import { setEventAndDigitalData, getDayOfWeek } from '@cimb/common';
import { AnalyticService } from '@cimb/shared/services';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';
import { Fund } from '@cimb/shared/models';
import { uploadFundDetailSuccess } from 'apps/self-serve/src/app/modules/available-funds/+state/available-funds.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-alert/dialog-alert.component';
import * as LandingPageSelector from '../../../core/state/landing-page/landing-page.selectors';

@Component({
    selector: 'cimb-fund-table',
    templateUrl: './fund-table.component.html',
    styleUrls: ['./fund-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundTableComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() fundList: FundList[];
    @Input() cartUTAccount;
    @Input() selectedAccounts;
    @Input() staff: string;
    @Input() hideAmountField: boolean;
    @Input() customerType: string;
    @Input() cartData: any = null;
    @Output() addItem: EventEmitter<any> = new EventEmitter();
    @Output() removeItem: EventEmitter<any> = new EventEmitter();
    @Output() updateItem: EventEmitter<any> = new EventEmitter();
    @Output() clearAndAddNewToCart: EventEmitter<any> = new EventEmitter();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('toolTipNav') toolTipNav: TemplateRef<any>;
    @ViewChild('toolTipFundHoliday') toolTipFundHoliday: TemplateRef<any>;
    tableDetails?: MatTableDataSource<AbstractControl>;
    currentCustomerType = 'NTP';
    displayedColumns = [
        'fundName',
        'className',
        'navPrice',
        'perFirstMonth',
        'perThirdMonth',
        'amount',
    ];

    productArray = this.fb.array([]);
    productForm = this.fb.group({
        productsArray: this.productArray,
    });

    @Input() currentPageNumber = 1;

    pageSize = 10;

    pageSizes = [10, 20, 30, 40, 50];

    pageEvent: PageEvent;

    startIndex = 1;

    pageLength: number;

    endIndex: number;

    rangeLabel;

    isAmountEnteredValid: boolean;
    isFocus = false;
    isItemAddedInCart = false;
    
    get productsArray(): FormArray {
        const value = this.productForm.get('productsArray');
        if(value instanceof FormArray) {
            return value;
        }
    }

    highlightedRow = '';
    cartDataEmptyFlag = true;

    constructor(
        private fb: FormBuilder,
        private _eventService: EventService,
        private router: Router,
        public _bottomSheet: MatBottomSheet,
        private decimalPipe: DecimalPipe,
        private analyticService: AnalyticService,
        private store: Store<fromStore.AppState>,
        private mintDialogService: MintDialogService,
        private dialog: MatDialog
    ) {}

    ngOnChanges() {
        if(!this.isItemAddedInCart) {
            this.productArray.clear();
            this.formBuilder(this.fundList);
            this.initialization();
            this.updateInvestmentAmountValue(this.fundList);
        }
        this.startIndex = 1;
          this.pageLength = this.fundList?.length;
          this.endIndex =
              this.startIndex < this.pageLength
                  ? Math.min(this.pageSize, this.pageLength)
                  : this.pageLength;
    }

    updateInvestmentAmountValue(fundList) {
        this.fundList = fundList;
        if (this.fundList != undefined && this.fundList != null) {
            for (let i = 0; i < this.fundList.length; i++) {
                if (
                    this.productsArray.at(i).get('investmentAmount').value != '0.00' &&
                    this.productsArray.at(i).get('investmentAmount').value != null
                ) {
                    const investmentAmount = this.productsArray
                        .at(i)
                        .get('investmentAmount')
                        .value.toString();
                    const amount = this.getRoundNumber(investmentAmount);
                    if (this.cartData?.fundList?.length > 0) {
                        this.productsArray.at(i).get('investmentAmount').setValue(amount);
                    } else {
                        this.productsArray.at(i).get('investmentAmount').reset();
                    }
                }
            }
        }
    }

    ngAfterViewInit(): void {
        this.initialization();
        this.startIndex = 1;
        //this.paginator._intl.itemsPerPageLabel = 'Funds per page :';
        this.pageLength = this.tableDetails?.data?.length;
        this.endIndex =
            this.startIndex < this.pageLength
                ? Math.min(this.pageSize, this.pageLength)
                : this.pageLength;
    }

    onRemovedItem(value, index) {
        this.removeItem.emit({ value, index });
        return this._eventService
            .onReceived()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((event) => {
                const { index, removedCart } = event;
                if (removedCart) {
                    this.productsArray.at(index).patchValue({
                        hasValue: false,
                        isAmountRemoved: false,
                        isAmountEdited: false,
                        investmentAmount: '',
                    });
                    this.highlightedRow = '';
                }
            });
    }

    onAddItem(value, index) {
        if(value.value.fund_status === 'SOHO' || value.value.fund_status === 'SO'){
            this.dialog.open(DialogAlertComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                  dialogImage: '<em class="icon-danger"></em>',
                  dialogHeading: 'Unable to Transact',
                  dialogContent:
                    '<p>We are sorry to inform you that only redeem is allowed for this fund at the moment.</p>',
                  dialogButtonCancel: false,
                  dialogButtonCancelText: 'Okay',
                  dialogButtonProceed: true,
                  dialogButtonProceedText: 'Okay',
                },
              });
              this.analyticService.loadPopUpAnalytics('Unable to Transact');
        }else{
            this.isItemAddedInCart = true;
            if (this.customerType !== 'NTP' && this.cartUTAccount && this.selectedAccounts !== this.cartUTAccount) {
                this.dialogCart({
                    value,
                    index
                });

                //this.dialogCart(index,this.productsArray.at(index).get('investmentAmount'));
            } else {

                if(this.cartData.flow !== '001' && this.cartData.fundList.length) {
                    //there are other items in cart not belonging to the same flow, show confirmation dialog
                    this.pendingOtherTransactinCart(this.cartData.flow, {
                        value,
                        index
                    });
                } else {
                    this.addItem.emit({ value, index });
                }

                return this._eventService
                    .onReceived()
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((event) => {
                        const { index, addedToCart } = event;
                        if (addedToCart) {
                            this.productsArray.at(index).patchValue({
                                hasValue: true,
                                isAmountRemoved: true,
                                isAmountEdited: false,
                            });
                        }
                    });
            }
        }
    }

    dialogCart(values) {
        const dialogRef = this.mintDialogService.showPendingTransactionInOtherAccountDialog(this.cartUTAccount);
        //Calling dialog Cart
        dialogRef.afterClosed().subscribe((result) => {
            this.onDialogRefClose(result, values)
        });
    }

    pendingOtherTransactinCart(previousFlow, values) {
        const dialogRef = this.mintDialogService.showPendingOtherTransactionInCartDialog(previousFlow, '001');
        //Calling dialog Cart
        dialogRef.afterClosed().subscribe((result) => {
            this.onDialogRefClose(result, values)
        });
    }

    onDialogRefClose(result, values) {
        if (result === 'Yes, clear cart and continue') {
            this.clearAndAddNewToCart.emit(values);
        }
    }

    updateFundList(values) {
        this.productArray.clear();
        const fundObj = {
            ...this.fundList[values.index],
        };
        for (let i = 0; i < this.fundList.length; i++) {
            if (fundObj.fund_code === this.fundList[i].fund_code) {
                this.fundList[i].cart_total_investment = Number(
                    values.productForm.value.replace(/,/g, ''),
                );
            } else {
                this.fundList[i].cart_total_investment = null;
            }
        }
        this.formBuilder(this.fundList);
        this.initialization();
        this.updateInvestmentAmountValue(this.fundList);
    }

    onInput(value, index) {
        const inputHasValue = this.productsArray.at(index).get('hasValue').value;

        if (inputHasValue) {
            this.productsArray
                .at(index)
                .patchValue({ hasValue: true, isAmountRemoved: false, isAmountEdited: true });

            // enbale this code if remove buttom should when user clear the input
            // if (value.length === 0) {
            //     this.productsArray
            //         .at(index)
            //         .patchValue({ hasValue: true, isAmountRemoved: true, isAmountEdited: false });
            // }
        }
    }

    onUpdateCart(obj, index) {
        this.updateItem.emit({ obj, index });

        return this._eventService
            .onReceived()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((event) => {
                const { index, updateCart } = event;
                if (updateCart) {
                    this.productsArray.at(index).patchValue({
                        hasValue: true,
                        isAmountRemoved: true,
                        isAmountEdited: false,
                    });
                }
            });
    }

    formBuilder(fundList) {
        fundList.forEach((product: FundList) => {
            const cartList =  product?.cart_list && product?.cart_list[0];
            const cartTxnType = cartList && cartList?.cart_txn_type ? cartList?.cart_txn_type : null;
            this.productArray.push(
                this.fb.group({
                    ...product,
                    hasValue: cartTxnType && cartTxnType === '01' &&  product.cart_total_investment ? true : false,
                    isAmountEdited: [false],
                    isAmountRemoved: cartTxnType && cartTxnType === '01' &&  product.cart_total_investment ? true : false,
                    investmentAmount: [
                        {
                            value: cartTxnType && cartTxnType === '01' ? product.cart_total_investment : null,
                            disabled: product.fund_status === 'I',
                        },
                        [
                            Validators.required,
                            // Validators.min(
                            //     product.current_holding === 'Y'
                            //         ? product.minimum_subsequent_subscription_amount
                            //         : product.minimum_initial_subscription_amount,
                            // ),
                            // Validators.max(
                            //     product.current_holding === 'Y'
                            //         ? product.maximum_subsequent_subscription_amount
                            //         : product.maximum_initial_subscription_amount,
                            // ),
                            amountMinExceed(
                                product.current_holding === 'Y'
                                    ? product.minimum_subsequent_subscription_amount
                                    : product.minimum_initial_subscription_amount,
                            ),

                            amountMaxExceed(
                                product.current_holding === 'Y'
                                    ? product.maximum_subsequent_subscription_amount
                                    : product.maximum_initial_subscription_amount,
                            ),
                        ],
                    ],
                    currentHoldingFlag:
                        product.current_holding === 'Y'
                            ? this.getRoundNumber(
                                Number(product.minimum_subsequent_subscription_amount),
                            )
                            : this.getRoundNumber(
                                Number(product.minimum_initial_subscription_amount),
                            ),
                    minAmount:
                        product.current_holding === 'Y'
                            ? product.minimum_subsequent_subscription_amount_str
                            : product.minimum_initial_subscription_amount_str,
                    maxAmount:
                        product.current_holding === 'Y'
                            ? product.maximum_subsequent_subscription_amount_str
                            : product.maximum_initial_subscription_amount_str,
                }),
            );
        });
    }

    initialization(): void {
        this.tableDetails = new MatTableDataSource();
        if(!this.sort) {
            this.productArray.controls.sort((a, b): any => {
                return a.value.fund_name > b.value.fund_name ? 1 : -1;
            })
        }
        this.tableDetails.data = this.productArray.controls;
        this.tableDetails.paginator = this.paginator;
        this.tableDetails.sort = this.sort;

        this.tableDetails.sortingDataAccessor = (item: AbstractControl, property) => {
            switch (property) {
                case 'fundName':
                    return item.value.fund_name;
                case 'className':
                    return item.value.class_name;
                case 'navPrice':
                    return +item.value.nav_price;
                case 'perFirstMonth':
                    return +item.value.one_month;
                case 'perThirdMonth':
                    return +item.value.three_month;
                default:
                    return item.value[property];
            }
        };

        const filterPredicate = this.tableDetails.filterPredicate;
        this.tableDetails.filterPredicate = (data: AbstractControl, filter) => {
            return filterPredicate.call(this.tableDetails, data.value, filter);
        };
    }

    ngOnInit(): void {

          /* istanbul ignore else */
        if (this.hideAmountField) {
            this.displayedColumns = [
                'fundName',
                'className',
                'navPrice',
                'perFirstMonth',
                'perThirdMonth',
            ];
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // TODO: We need an api to call by fund code
    showDetailPage(fund: Fund) {
        let fundToRoute;
        for (let i = 0; i < this.fundList.length; i++) {
            if (fund.fund_code == this.fundList[i].fund_code) {
                fundToRoute = this.fundList[i];
            }
        }
        
        this.loadAnalytisFundDetails(fundToRoute);

        this.store.dispatch(uploadFundDetailSuccess({ fundDetail: JSON.parse(JSON.stringify(fundToRoute)) }));
        this.router.navigate(['available-funds/fund-detail']);
    }
    loadAnalytisFundDetails(fundToRoute){
        const day = getDayOfWeek();
        this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
            this.currentCustomerType = result?.landingPageStatus?.accountStatus === 'Y' || this.customerType === 'ETP' ? 'ETP' : 'NTP';
        });
        setEventAndDigitalData(
          {
            wealthEvent: 'wealth:funddetail'
          },
          {
            wealthDigitalData: {
              page: {
                category: {
                  primaryCategory: 'Unit Trust Module',
                  subCategory1:'UT Funds Pricing Listing',
                  pageType: 'Content'
                },
                pageInfo: {
                  pageName:'Wealth: UT Fund Details',
                  day: day
                }
              },
              user: {
                loginStatus: 'logged-in',
                customerType: this.currentCustomerType
            },
            product: {
                category: 'Unit Trust',
                fundCategory: fundToRoute.risk_name,
                productName: fundToRoute.fund_name,
                ID: fundToRoute.fund_code
                }
            }
          }
        );
    }
    onPageSizeChange(event) {
        this.pageSize = event.value;
        this.currentPageNumber = 1;
        this.initialization();
    }

    openNavBottomSheet() {
        this._bottomSheet.open(this.toolTipNav, {
            panelClass: 'tooltip-action-sheet',
        });
    }

    openFundHolidayBottomSheet() {
        this._bottomSheet.open(this.toolTipFundHoliday, {
            panelClass: 'tooltip-action-sheet',
        });
    }

    onKeyDown(index) {
        const indexElement = this.productsArray.at(index).get('investmentAmount');
        this.isAmountEnteredValid = this.amountEnteredValid(indexElement);
    }

    amountEnteredValid(indexElement) {
        if (
            indexElement.value == '0.00' ||
            indexElement.value == '0.0' ||
            indexElement.value == '0.' ||
            indexElement.value == '0' ||
            indexElement.value == '' ||
            indexElement.value == '.00' ||
            indexElement.value == '00' ||
            indexElement.value == '000'
        ) {
            return true;
        }
    }

    onAmountEnter(index, event): boolean {
        const indexElement = this.productsArray.at(index).get('investmentAmount');
        const pattern = /[a-zA-Z&_-]/;
        if (indexElement.value.match(pattern) || indexElement.value.includes('NaN')) {
            indexElement.setValue('0.00');
        }
        this.applyNumberFormatting(indexElement, event, index);
        return true;
    }

    applyNumberFormatting(indexElement, event, index): boolean {
        const inputHasValue = this.productsArray.at(index).get('hasValue').value;

        if (inputHasValue) {
            this.productsArray
                .at(index)
                .patchValue({ hasValue: true, isAmountRemoved: false, isAmountEdited: true });
        }

        if (this.isAmountEnteredValid && (event.keyCode === 8 || event.keyCode === 46)) {
            indexElement.setValue('0.00');
            return false;
        }

        if (!isNaN(parseFloat(indexElement.value))) {
            if (indexElement.dirty) {
                indexElement.markAllAsTouched();
            }
            if (parseFloat(indexElement.value) != 0) {
                if (
                    indexElement.value.length > 4 &&
                    parseFloat(indexElement.value.substring(0, 5)) === 0
                ) {
                    if (!isNaN(parseFloat(indexElement.value.slice(-2)))) {
                        indexElement.setValue(indexElement.value.slice(-2));
                    }
                }

                if (indexElement.value) {
                    indexElement.setValue(indexElement.value.replaceAll(',', ''));
                    indexElement.setValue(indexElement.value.replaceAll('.', ''));
                }
                this.callThousandCommaSeperatorAndTwoDecimal(indexElement);
            } else {
                indexElement.setValue('0.00');
            }
        }

        return true;
    }

    getRoundNumber(num: number): string | null {
        return this.decimalPipe.transform(num, '1.2-2') ?? '0.00';
    }

    ValidateMinAmount(minAmount: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value) {
                const val = control.value.replaceAll(',', '');
                if (!(parseFloat(val) >= minAmount)) {
                    return { invalidMinAmount: true };
                }
            }
            return null;
        };
    }

    callThousandCommaSeperatorAndTwoDecimal(indexElement) {
        if (indexElement.value && indexElement.value.length >= 6) {
            const last2 = indexElement.value.slice(-2);
            indexElement.setValue(
                indexElement.value
                    .slice(0, -2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                '.' +
                last2,
            );
        } else {
            if (parseFloat(indexElement.value) > 0) {
                const val = (indexElement.value / 100).toString();
                indexElement.setValue(parseFloat(val).toFixed(2).toString());
            } else {
                indexElement.setValue(null);
            }
        }
    }

    onFocus(index) {
        const indexElement = this.productsArray.at(index).get('investmentAmount');
        if (!indexElement.value) {
            indexElement.setValue('0.00');
        }
        this.isFocus = true;
    }

    onFocusOut(index) {
        const indexElement = this.productsArray.at(index).get('investmentAmount');
        if (parseFloat(indexElement.value) === 0) {
            this.productsArray.at(index).get('investmentAmount').reset();
        }
        if (indexElement.value) {
            if (parseFloat(indexElement.value) === 0) {
                indexElement.setValue(null);
                this.isFocus = false;
            } else {
                this.isFocus = true;
            }
        } else {
            this.isFocus = false;
        }
    }

    acceptNumbersOnly(event) {
        const regex = new RegExp('^[0-9]*$');
        const str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(str)) {
            return true;
        }
        return false;
    }

    onSelectRow(row) {
        this.highlightedRow = row?.value?.fund_name;
    }

    onPaginateChange(event: PageEvent) {

        if(event.pageSize != this.pageSize) {
            //changing to a different page size
            this.pageSize = event.pageSize;
            this.currentPageNumber = 0;

            setTimeout(() => {
                this.onPaginateChange({
                    length: event.length,
                    pageIndex: this.currentPageNumber,
                    pageSize: event.pageSize,
                    previousPageIndex: event.previousPageIndex
                });
            }, 100);

            return;

        } else {
            this.currentPageNumber = event.pageIndex;
        }

        this.pageLength = event.length;
        this.getRangeLabel(event.pageIndex, event.pageSize, event.length);
        this.startIndex = this.startIndex + 1;
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }

    getRangeLabel(page, pageSize, length) {
        if (length === 0 || pageSize === 0) {
            return '0 of ' + length;
        }
        this.pageLength = Math.max(length, 0);
        this.startIndex = page * pageSize;

        // If the start index exceeds the list length, do not try and fix the end index to the end.
        this.endIndex =
            this.startIndex < this.pageLength
                ? Math.min(this.startIndex + pageSize, this.pageLength)
                : this.startIndex + pageSize;
        return this.startIndex + 1 + ' - ' + this.endIndex + ' of ' + this.pageLength;
    }
}

function amountMinExceed(min: number): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control && control.value) {
            const value = parseFloat(control.value.toString()?.replace(/,/g, ''));
            if (value && min && value < min) {
                return { min: true };
            }
        }
    };
}

function amountMaxExceed(max: number): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control && control.value) {
            const value = parseFloat(control.value.toString()?.replace(/,/g, ''));
            if (value && max && value > max) {
                return { max: true };
            }
        }
    };
}
