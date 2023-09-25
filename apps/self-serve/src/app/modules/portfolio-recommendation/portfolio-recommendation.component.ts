import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Store } from '@ngrx/store';

import * as portfolioRecommendationAction from './+state/portfolio-reco.actions';
import * as portfolioRecommendationSelector from './+state/portfolio-reco.selectors';
import { Observable, Subject, Subscription } from 'rxjs';
import { DashbordService } from '../../core/services/dashbord-service/dashbord.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent, MintDialogService } from '@cimb/mint';

import { DecimalPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';

import * as fromStore from '../../core/state/reducers';
import * as CartActions from '../../core/state/cart/cart.actions';
import { EventService } from '@cimb/core';
import { DialogFundsComponent } from './dialog/dialog-funds/dialog-funds.component';

import { uniqBy, sortBy } from 'lodash-es';
import { FundList } from './models/fund-list.model';
import { Router } from '@angular/router';
import { setEventAndDigitalData, getDayOfWeek } from '@cimb/common';
import { InvestmentStatus, LandingPageStatus } from '../../core/model/landing-page-status.model';
import * as LandingPageActions from '../../../app/core/state/landing-page/landing-page.actions';
import * as LandingPageSelector from '../../../app/core/state/landing-page/landing-page.selectors';
import { takeUntil } from 'rxjs/operators';
import { AnalyticService } from '@cimb/shared/services';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'cimb-portfolio-recommendation',
    templateUrl: './portfolio-recommendation.component.html',
    styleUrls: ['./portfolio-recommendation.component.scss'],
})
export class PortfolioRecommendationComponent implements OnInit, OnDestroy {
    @ViewChild(MatAccordion) accordion: MatAccordion;
    @ViewChild('toolTipEsgFund') toolTipEsgFund: TemplateRef<any>;
    @ViewChild('esgToolTipMsgPortfolio') esgToolTipMsgPortfolio: TemplateRef<any>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    pageTitle = 'Guide Me To Invest';
    isBackButtonEnabled = true;

    showChart = false;

    chartData;

    assetClassList = this.store.select(portfolioRecommendationSelector.selectAssetClassList);

    fundList: Subscription;

    grouped_funds;

    allFunds;

    getRiskProfile: Subscription;

    recommendedList: Record<string, unknown>;

    holdingList: Record<string, unknown>;

    monthFilterInd = '1mnth';

    csId;
    cartObservable: Observable<any>;
    carstSubscription: Subscription;
    fundObj: any;
    cartData: any;

    userObservable: Observable<any>;
    userSubscription: Subscription;
    customerType: any
    userData;
    cimbStaff: any;

    totalFundsCount = 0;
    cartUTAccount = '';

    selectedAccounts = '';

    flowText = 'topup';
    flowCart = '001';

    shariah: string;
    esgFund: string;

    filteredFunds;

    classColor: string;

    cartItems;

    landingPageStatus: LandingPageStatus
    currentCustomerType = 'NTP';
    myHoldingChartValue = [];
    myHoldingChartColor = [];

    myRecommendedChartValue = [];
    myRecommendedChartColor = [];
    component: { customer_name: string; customer_id: string; customer_id_type: string; debit_card_no: number; dashbordData: any; lastSeen: string; story: string; sole_prop: string; invertment_indicator: string; casa_indicator: string; risk_profile: string; customer_mobile_no: string; cimb_staff: string; join_or_ut_account: string; join_and_ut_account: string; cifNumber: string; utAccNo: string; };
    userformData;
    mediaQueryList: MediaQueryList;
    esgtooltipheading = 'ESG Fund'
    esgtoolTipMsg = 'The fund strategy invested in securities with a high sustainability score and would exclude companies with poor records related to ESG. The strategy will contribute to the long-term viability of our environment and way of life. It enable investors to pursue their financial goals while supporting a better future for humanity.'
    constructor(
        private store: Store<fromStore.AppState>,
        private dashboardService: DashbordService,
        private dialog: MatDialog,
        private decimalPipe: DecimalPipe,
        private cartService: CartService,
        private _eventService: EventService,
        private _mintDialogService: MintDialogService,
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private analyticService: AnalyticService,
        public _bottomSheet: MatBottomSheet,
        public mediaMatcher: MediaMatcher
    ) { this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)'); }

    ngOnInit(): void {

        //user reducer
        this.getUser();

        //cart reducer
        this.getCartData();


        this.store.dispatch(new CartActions.ToggleCartFooter(true));

        this.fundList = this.store
            .select(portfolioRecommendationSelector.selectFundList)
            .subscribe((data: any) => {
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                if (data) {
                    let filteredFunds = data.map((item) => {
                        //return item.class_name
                        return {
                            className: item.class_name,
                            color: item.classHexa,
                            recommended: item.recommended,
                        };
                    });
                    const dataByClassName = uniqBy(filteredFunds, 'className');
                    const sortByClassName = sortBy(dataByClassName, 'className');

                    filteredFunds = sortByClassName.map((item: any) => {
                        const filter = data.filter((item1) => item1.class_name === item.className);
                        return {
                            className: item?.className,
                            color: item?.color,
                            fundList: filter.sort((a, b) => {
                                if (a.fund_status === 'I' && b.fund_status !== 'I') return 1;
                                if (a.fund_status !== 'I' && b.fund_status === 'I') return -1;
                                return a.fund_name > b.fund_name ? 1 : -1;
                            }).slice(0, 3),

                            fundsLength: filter.length,
                            recommended: item?.recommended,
                        };
                    });

                    this.allFunds = sortByClassName.map((item: any) => {

                        const filter = data.filter((item1) => item1.class_name === item.className);
                        return {
                            color: item?.color,
                            class_name: item?.className,
                            funds_list: filter.sort((firstVal, secondVal) => {
                                if (firstVal.fund_status === 'I' && secondVal.fund_status !== 'I') return 1;
                                if (firstVal.fund_status !== 'I' && secondVal.fund_status === 'I') return -1;
                                return firstVal.fund_name > secondVal.fund_name ? 1 : -1;
                            }),
                            totalFundsPerAsset: filter.length,
                        };
                    });

                    //fix for showing cart items
                    setTimeout(() => {
                        if (this.grouped_funds) {
                            this.grouped_funds = this.compareArray(this.cartItems, this.grouped_funds);
                        } else {
                            this.grouped_funds = this.compareArray(this.cartItems, filteredFunds);
                        }
                    }, 1000);
                }
            });

        this.loadChartData();
        this.clickToSubmitAAData();


    }

    getUser() {
        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.pipe(takeUntil(this._unsubscribeAll)).subscribe((users) => {
            this.userData = users?.user;
            this.customerType = users.userType;

            this.selectedAccounts = users && users.unitTrustAccount ? users.unitTrustAccount : null;

            this.store.dispatch(portfolioRecommendationAction.PortfolioRecoDataLoading(this.userData));

            this.cimbStaff = this.userData?.cimb_staff;
            this.store.dispatch(new CartActions.GetCartByClientId(this.userData?.customer_id));
        });
    }

    getCartData() {
        this.cartObservable = this.store.select('cartReducer');
        this.carstSubscription = this.cartObservable.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {

            if (data.totalAmount == 0) {
                this.store
                    .select(LandingPageSelector.selectLandingPageStatus)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((result) => {
                        this.landingPageStatus = result;
                    });
                const request: InvestmentStatus = {
                    onboardingId: this.landingPageStatus.onboardingId,
                    investmentStatus: 'N',
                    investmentStartDate: '',
                    investmentEndDate: '',
                };
                this.store.dispatch(
                    LandingPageActions.updateInvestmentStatus({ investmentStatus: request }),
                );
            }

            this.cartItems = data;

            const cdata = data;

            this.cartData = cdata;
            this.csId = cdata.csId;
            this.flowText = cdata.flow_text;
            this.flowCart = cdata.flow;
            this.totalFundsCount = cdata.totalFundsCount;
            this.cartUTAccount = cdata.unitTrustAccount;


        });
    }
    dispatchAfterAddToCart() {
        this._eventService
            .onReceived()?.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
                const { addedToCartAPISuccessfully } = data;
                if (addedToCartAPISuccessfully) {
                    this.store.dispatch(portfolioRecommendationAction.PortfolioRecoDataLoading(this.userData));
                }
            })
    }

    clickToSubmitAAData() {
        this.store.select(LandingPageSelector.selectLandingPageStatusState).pipe(takeUntil(this._unsubscribeAll)).subscribe((result) => {
            this.currentCustomerType = result?.landingPageStatus?.accountStatus === 'Y' || this.customerType === 'ETP' ? 'ETP' : 'NTP';
        });
        const day = getDayOfWeek();
        setEventAndDigitalData(
            {
                wealthEvent: 'wealth:allpage'
            },
            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Unit Trust Module',
                            pageType: 'Content'
                        },
                        pageInfo: {
                            pageName: 'Wealth: UT Guide Me',
                            day: day
                        }
                    },
                    user: {
                        loginStatus: 'logged-in',
                        memberLoginType: 'repeat',
                        customerType: this.currentCustomerType
                    }
                }
            }
        );
    }

    compareArray(array1, array2) {
        const currentFunds = array1.fundList;
        const allFunds = array2;

        const updateGroupFunds = allFunds.map((fund) => {
            const updatedFundList = fund.fundList?.map((itm) => {
                let investmentAmount = null;

                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                const innerFund = currentFunds?.find((item) => {
                    return item.fund_code === itm.fund_code;
                });
                if (innerFund) {
                    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                    investmentAmount = innerFund.totalInvestment;
                }
                return {
                    ...itm,
                    totalInvestment: investmentAmount,
                };
            });

            return {
                ...fund,
                fundList: updatedFundList,
            };
        });
        return updateGroupFunds;


    }

    loadChartData() {
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        this.chartData = this.dashboardService.portfolioChartEmpty;
        this.store
            .select(portfolioRecommendationSelector.selectRecommendedList)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: any) => {
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                if (data) {

                    let recommendedTotalValue = 0.0;

                    this.myRecommendedChartColor = [];

                    this.myRecommendedChartValue = [];

                    for (let i = 0; i < data.length; i++) {

                        const item = data[i];
                        const value = item.y;

                        recommendedTotalValue = recommendedTotalValue + value;

                        this.myRecommendedChartValue.push({
                            name: data[i].name,
                            y: data[i].y,
                            color: item.classHexa
                        });
                    }

                    if (recommendedTotalValue <= 0) {
                        this.myRecommendedChartValue.push({
                            name: '',
                            y: 100.0,
                            color: '#DDDEDE'
                        });
                    }

                }
            });
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        this.store
            .select(portfolioRecommendationSelector.selectHoldingList)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: any) => {
                if (data) {

                    let selectedTotalValue = 0.0;

                    this.myHoldingChartColor = [];

                    this.myHoldingChartValue = [];

                    for (let i = 0; i < data.length; i++) {
                        const item = data[i];
                        const value = item.y;

                        selectedTotalValue = selectedTotalValue + value;

                        this.myHoldingChartValue.push({
                            name: data[i].name,
                            y: data[i].y,
                            color: item.classHexa
                        });

                    }

                    if (selectedTotalValue <= 0) {
                        this.myHoldingChartValue.push({
                            name: '',
                            y: 100.0,
                            color: '#DDDEDE'
                        });
                    }


                }
            });
    }

    dialogLearnMore() {
        this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-learn-more'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '',
                dialogHeading: 'CIMB Focus Funds',
                dialogContent:
                    '<p>CIMB Focus Funds are a list of investments selected each quarter by our internal research team. These funds are selected based on industry views as well as quantitative and qualitative factors including historical performance.</p>',
                dialogButtonCancel: false,
                dialogButtonCancelText: '',
                dialogButtonProceed: false,
                dialogButtonProceedText: '',
            },
        });
    }
    onToggleChange(event) {
        if (event === '1mnth') {
            this.monthFilterInd = '1mnth';
        } else {
            this.monthFilterInd = '3mnth';
        }
    }
    onChange(event) {
        if (event.checked) {
            this.shariah = 'I';
        } else {
            this.shariah = '';
        }
    }
    onEsgFundChange(event) {
        if (event.checked) {
            this.esgFund = 'Y';
        } else {
            this.esgFund = '';
        }
    }
    openESGFundsOnlyBottomSheetForPortfolioWeb() {
        this._bottomSheet.open(this.toolTipEsgFund, {
            panelClass: 'tooltip-action-sheet',
        });
    }
    openESGFundsOnlyBottomSheetForPortfolioMobile(){
        this._bottomSheet.open(this.esgToolTipMsgPortfolio, {
            panelClass: 'tooltip-action-sheet',
        });
    }
    getRoundNumber(num: number): string | null {
        return this.decimalPipe.transform(num, '1.2-2') ?? '0.00';
    }

    onAddItem(event, i, fundHouse) {
        this.userformData = event;
        if (event) {
            if (event.formData.fund_status === 'SOHO' || event.formData.fund_status === 'SO') {
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
            } else {
                this.cartService.callAddToCart({
                    csId: this.csId,
                    unit: event.formData?.unit,
                    amount: parseFloat(event.formData?.investmentAmount.toString()?.replace(/,/g, '')),
                    cartData: this.cartData,
                    flow: '001',
                    i,
                    fundObj: event.formData,
                    screen: 'portfolioRecommendation',
                    utAccount: this.selectedAccounts === null ? 'A80111993' : this.selectedAccounts,
                    clientId: this.userData ? this.userData.customer_id : '',
                    cimbStaff: this?.cimbStaff === 'Y' ? 2 : 1,
                });
                if(this.customerType === 'NTP') {
                this.store.select(LandingPageSelector.selectLandingPageStatus).pipe(takeUntil(this._unsubscribeAll)).subscribe((result) => {
                    this.landingPageStatus = result;
                });
                    const request: InvestmentStatus = {
                        onboardingId: this.landingPageStatus.onboardingId,
                        investmentStatus: 'Y',
                        investmentStartDate: '',
                        investmentEndDate: '',
                    };
                    this.store.dispatch(
                        LandingPageActions.updateInvestmentStatus({ investmentStatus: request }),
                    );
                }
                this._eventService.onSend({ fundHouse: fundHouse, index: i, addedToCart: true });
            }
        }

        return true;
    }

    removeFromCartEvent(fundCode, i): boolean {
        //Set flow as 001 since from serach funds flow will be always topUp
        // const flow = '001';
        const flow = this.cartData ? this.cartData.flow : null;
        //const flow = fundObj.flow;
        this.cartService.removeFromCart(
            { cartData: this.cartData, index: -1, flow: flow },
            fundCode,
        );
        return true;
    }

    onRemoveItem(event, i, fundHouse) {
        // const { fund_name, fund_code } = event?.product;
        const fund_name = event?.product?.fund_name;
        const fund_code = event?.product?.fund_code;
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        const confirmation = this._mintDialogService.open({
            title: 'Are you sure?',
            message: `Do you really want to remove <b>${fund_name}</b> from your cart?`,
            actions: {
                confirm: {
                    label: 'Yes, Remove',
                    click: () => this.removeFromCartEvent(fund_code, i),
                },
            },
        });
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        confirmation.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe((result) => {
            if (result === 'confirmed') {
                this._eventService.onSend({ removedCart: true, index: i, fundHouse: fundHouse });

                //refresh page after delete
                setTimeout(() => {
                    this._changeDetectorRef.markForCheck();
                    this.router.navigateByUrl('/portfolio-recommendation', { skipLocationChange: true });
                }, 1000)

            }
        });
    }
    clearCartAndContinueDataEvent(values, index, fund): boolean {
        if (values) {
            const amount = values.productForm?.value;
            this.cartService.callAddToCart(
                {
                    csId: this.csId,
                    unit: values.unit,
                    amount: parseFloat(amount?.toString()?.replace(/,/g, '')),
                    cartData: this.cartData,
                    flow: '001',
                    index,
                    fundObj: fund,
                    screen: 'portfolioRecommendation',
                    utAccount: this.selectedAccounts,
                    clientId: this.userData ? this.userData.customer_id : '',
                    cimbStaff: this?.cimbStaff === 'Y' ? 2 : 1,
                },
                true
            );


        }

        return true;


    }

    onUpdateItem(event) {
        const fund_code = event?.formData?.fund_code;
        if (event) {
            this.fundObj = event?.formData;
            const investments =
                this?.cartData && this.cartData?.fundList ? [...this.cartData?.fundList] : [];
            const index = investments.findIndex((x) => x.fund_code === fund_code);
            const amount = event?.formData?.investmentAmount ?? 0.0;
            this.cartService.updateCartItem(
                {
                    cartData: this.cartData,
                    index: index,
                    flow: this.cartData && this.cartData.flow ? this.cartData.flow : '',
                    fund_code: fund_code,
                },
                index,
                parseFloat(amount?.toString()?.replace(/,/g, '')),
                parseFloat(amount?.toString()?.replace(/,/g, '')),
            );
        }
        this._eventService.onSend({ updateCart: true });
        return true;
    }

    openFundSelectModal(assetClass, color, preselectedFund) {
        this.allFunds.forEach((funds) => {
            if (funds.class_name === assetClass) {
                this.filteredFunds = funds.funds_list?.filter((item) => {
                    return item.class_name == assetClass;
                });
            }
        });

        this.dialogCart(assetClass, color, this.filteredFunds, preselectedFund);
    }


    dialogCart(assetClass: string, color: string, funds, preselectedFund) {

        const dialogRef = this.dialog.open(DialogFundsComponent, {
            panelClass: ['dialog-fund-list'],
            maxWidth: '1000px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            disableClose: true,
            data: {
                assetClassName: assetClass,
                fundData: funds,
                preselectedFund: preselectedFund,
                color: color
            }
        });
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe((result) => {
            if (result) {
                const selectedFund: FundList[] = result;

                const slicedFunds = selectedFund.reverse().slice(0, 3).reverse();

                const indexOfAssetClass = this.grouped_funds.findIndex(item => {
                    return item.className === assetClass;
                });

                this.grouped_funds[indexOfAssetClass].fundList = slicedFunds;

                preselectedFund = slicedFunds;
                    if (preselectedFund) {
                        preselectedFund?.map((item) => {
                            const totalInvestment = item.totalInvestment;
                            const class_name = item.class_name;
                            const fund_code = item.fund_code;
                            if (
                                totalInvestment !== this.userformData?.formData?.investmentAmount &&
                                class_name === this.userformData?.formData?.class_name &&
                                fund_code === this.userformData?.formData?.fund_code
                            ) {
                                this.dispatchAfterAddToCart();
                          
                            } else {
                                return preselectedFund;
                            }
                        });
                    }
                }
            });
    }

    ngOnDestroy(): void {
        //this.getRiskProfile.unsubscribe();
        this.fundList.unsubscribe();
        this.userSubscription.unsubscribe();
        this.carstSubscription.unsubscribe();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
