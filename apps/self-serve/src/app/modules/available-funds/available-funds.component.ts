import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/state/reducers';
import * as CartActions from '../../core/state/cart/cart.actions';
import { CartService } from '../../core/services/cart/cart.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppService } from '../../core/services/app.service';
import {
    getAssetsClasses,
    getFundHouse,
    getRiskCategories,
} from './+state/available-funds.selectors';
import {
    loadAssetsClasses,
    loadFundHouse,
    loadRiskCategories,
} from './+state/available-funds.actions';
import { AssetsClass, FundHouse, FundList, RiskCategory } from './models';
import { AvailableFundsService } from './services/available-funds.service';
import { takeUntil } from 'rxjs/operators';
import { MintDialogService } from '@cimb/mint';
import { EventService } from '@cimb/core';
import { merge } from 'lodash-es';
import { MatTabGroup } from '@angular/material/tabs';
import { fundSort, setEventAndDigitalData, getDayOfWeek } from '@cimb/common';
import * as LandingPageSelector from '../../core/state/landing-page/landing-page.selectors';
import * as LandingPageActions from '../../core/state/landing-page/landing-page.actions';
import { MatDialog } from '@angular/material/dialog';
import { LandingPageStatus, InvestmentStatus } from '../../core/model/landing-page-status.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
    selector: 'cimb-available-funds',
    templateUrl: './available-funds.component.html',
    styleUrls: ['./available-funds.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableFundsComponent implements OnInit, OnDestroy {
    @ViewChild('tabGroup') tabGroup: MatTabGroup;
    @ViewChild('toolTipEsgFund') toolTipEsgFund: TemplateRef<any>;
    selectedIndex = 0;
    tabClickCount = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    fundHouse: Observable<FundHouse[]>;
    assetsClasses: Observable<AssetsClass[]>;
    riskCategories: Observable<RiskCategory[]>;
    fundNames: string[];
    fundName: string;
    currentCustomerType = 'NTP';
    fundList: FundList[];

    selectedValue: any;
    allFunds = [];
    fundObj: any;
    cartData: any;
    cartObservable: Observable<any>;
    carstSubscription: Subscription;
    csId;
    flowText = 'topup';
    flowCart = '001';
    totalFundsCount = 0;
    userObservable: Observable<any>;
    userSubscription: Subscription;
    userData;
    selectedAccounts = '';
    availableFundsParams;
    cimbStaff: any;
    currentUrl;

    isMobile: boolean;
    formSelection: any;

    value;
    selectedRisk;

    riskSelected: boolean;
    fundHouseSelected: boolean;
    assetClassSelected: boolean;
    isDisabled = true;
    showSelectInvestmentFooter = false;

    longText =
        'CIMB Focus Funds are a list of investments selected each quarter by our internal research team. These funds are selected based on industry views as well as quantitative and qualitative factors including historical performance. ';

    showText = 'View more';

    firstCount = 80;

    last_index = 80;

    counter = 80;

    cartUTAccount = '';
    customerType = '';
    openedFromLandingPage = false;
    enableFundTabs = true;

    searchForm: FormGroup = this.fb.group({
        riskControl: [null],
        fundHouseControl: [null],
        assetsClassesControl: [null],
        syariahCompliant: [null],
        esgFund: [null],
    });

    currentPageNumber: number;
    landingPageStatus: LandingPageStatus;

    progressStepEnabled: boolean;
    constructor(
        private dialog: MatDialog,
        private router: Router,
        private fb: FormBuilder,
        private store: Store<fromStore.AppState>,
        private cartService: CartService,
        private appService: AppService,
        private _availableFundsService: AvailableFundsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _mintDialogService: MintDialogService,
        private _eventService: EventService,
        public _bottomSheet: MatBottomSheet,
    ) {
        this.currentUrl = this.appService.getPreviousUrl();
    }

    onFundsByClientId() {
        this.appService.showLoadingSpinner();
        this._availableFundsService.fundsListByClientId$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((fundList: FundList[]) => {
                this.enableSearchResults(fundList);
                this.fundList = fundList.sort((a, b) => {
                    if (a.fund_status === 'I' && b.fund_status !== 'I') return 1;
                    if (a.fund_status !== 'I' && b.fund_status === 'I') return -1;
                    return a.fund_name > b.fund_name ? 1 : -1;
                });
                this.appService.hideLoadingSpinner();
                this._changeDetectorRef.markForCheck();
            });
    }

    getFundNames() {
        this._availableFundsService.getFundNames$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((fundNames: string[]) => {
                this.fundNames = fundNames;
            });
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    onClearFilter(checkBox) {
        if(checkBox) {
            this.searchForm.controls[checkBox].reset();
        }else {
            const filters = {
                recommended: this.selectedIndex === 0 ? 'Y' : '',
            };
            const { customer_id, cifNumber } = this.userData;
            this.getAvailableFundList(customer_id, cifNumber, this.selectedAccounts, filters);
            this.searchForm.reset();
        }
        this.riskSelected = false;
        this.fundHouseSelected = false;
        this.assetClassSelected = false;
        this.isDisabled = true;
        // this._eventService.onSend('clear');
    }

    ngOnInit() {
        this.riskCategories = this.store.select(getRiskCategories);
        this.store.dispatch(loadRiskCategories());

        this.assetsClasses = this.store.select(getAssetsClasses);
        this.store.dispatch(loadAssetsClasses());

        this.fundHouse = this.store.select(getFundHouse);
        this.store.dispatch(loadFundHouse());

        this.onFundsByClientId();

        this.getFundNames();

        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.userData = users.user;
            this.selectedAccounts = users && users.unitTrustAccount ? users.unitTrustAccount : null;
        });

        this.cartObservable = this.store.select('cartReducer');
        this.carstSubscription = this.cartObservable.subscribe((data) => {
            if (this.customerType === 'NTP' && data.totalAmount == 0) {
                this.store
                    .select(LandingPageSelector.selectLandingPageStatus)
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

            this.cartData = data;
            this.csId = data.csId;
            this.flowText = data.flow_text;
            this.flowCart = data.flow;
            this.totalFundsCount = data.totalFundsCount;
            this.cartUTAccount = data.unitTrustAccount;
        });
        this.store.dispatch(new CartActions.ToggleCartFooter(true));

        //Get the customer id
        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.customerType = users.userType;
            this.userData = users.user;
            this.checkUserType(this.customerType);
        });

        if (this.userData) {
            this.availableFundsParams = this.userData.customer_id;
            this.cimbStaff = this.userData.cimb_staff;
        }

        this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
            this.openedFromLandingPage = result.searchFundsFromLandingPage;
        });

        this.showSelectInvestmentFooter = window.innerWidth < 992;

        const tabViewName = 'CIMB Focus Funds';
        this.loadAdobeAnalytics(tabViewName);
    }

    checkUserType(customerType: string): boolean {
        if (customerType === 'NTP') {
            this.progressStepEnabled = true;
            return this.progressStepEnabled;
        } else {
            this.progressStepEnabled = false;
            return this.progressStepEnabled;
        }
    }

    clearCartAndContinueDataEvent(values): boolean {
        this.onAddItem(values, true);        
        return true;
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    onSelectedFilters(formSelection) {
        this.formSelection = formSelection;
        this.isMobile = true;
        const recommended = {
            recommended: this.tabGroup?.selectedIndex === 0 ? 'Y' : '',
        };
        const filterConfig = merge({}, formSelection, recommended);
        const { sort, ...filters } = filterConfig;

        const { customer_id, cifNumber } = this.userData;
        this.getAvailableFundList(customer_id, cifNumber, this.selectedAccounts, filters, sort);
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    onApplyFilters() {
        this.isDisabled = false;
        this.currentPageNumber = 1;
        const filters = this.getFilters(this.selectedIndex);
        this.loadAnalytisSearchFunds(filters);
        const { customer_id, cifNumber } = this.userData;
        this.getAvailableFundList(customer_id, cifNumber, this.selectedAccounts, filters);
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    onOptionSelected(fundName) {
        this.fundName = fundName;
        const filters = this.getFilters(this.selectedIndex);
        if (fundName != undefined) {
            this.loadAnalytisSearchFunds(filters);
        }
        const { customer_id, cifNumber } = this.userData;
        this.getAvailableFundList(customer_id, cifNumber, this.selectedAccounts, filters);
    }
    loadAnalytisSearchFunds(filters) {
        const day = getDayOfWeek();
        setEventAndDigitalData(
            {
                wealthEvent: 'wealth:UT Search Funds',
            },
            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Unit Trust Module',
                            subCategory1: 'UT Funds Pricing Listing',
                            pageType: 'Listing',
                        },
                        pageInfo: {
                            pageName: 'Wealth: UT Funds Listing',
                            onsiteSearchTerm:
                                filters.fundName != undefined ? filters.fundName : '',
                            day: day,
                        },
                    },
                    user: {
                        loginStatus: 'logged-in',
                        memberLoginType: 'repeat',
                        customerType: this.customerType,
                    },
                    product: {
                        fundCategory: filters.riskCategory,
                        fundClass: filters.assetClass,
                        fundShariah: filters.syariahCompliant === 'I' ? 'Islamic' : 'N/A',
                        fundEsg: filters.esgFund === 'Y'? 'Islamic' :'N/A',
                        fundHouse: filters.fundHouse
                    },
                },
            },
        );
    }
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    getAvailableFundList(
        custimerId: string,
        cifNumber: string,
        selectedAccounts: string,
        filters?: any,
        sort?: string,
    ) {
        if (filters.recommended === 'Y') {
            const tempFilter = filters
            tempFilter.recommended = '';
            const recommendedFunds = [];
            this._availableFundsService
                .getFundsListByClientId(custimerId, cifNumber, selectedAccounts, tempFilter)
                .subscribe((fundList) => {
                    this.enableSearchResults(fundList);
                    for (const funds of fundList) {
                        if (funds.recommend_fund == 'Y') {
                            recommendedFunds.push(funds);
                        }
                    }
                    if (!sort) {
                        this.fundList = recommendedFunds;
                    } else {
                        this.fundList = fundSort(recommendedFunds, sort);
                    }
                });
        } else {
            this._availableFundsService
                .getFundsListByClientId(custimerId, cifNumber, selectedAccounts, filters)
                .subscribe((fundList) => {
                    this.enableSearchResults(fundList);
                    !sort ? (this.fundList = fundList) : (this.fundList = fundSort(fundList, sort));
                });
        }
    }

    enableSearchResults(fundList: FundList[]) {
        if (fundList && fundList.length) {
            this.enableFundTabs = true;
        } else {
            this.enableFundTabs = false;
        }
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    getFilters(index: number) {
        const { riskControl, fundHouseControl, assetsClassesControl, syariahCompliant, esgFund } =
            this.searchForm.value;
        const filters = {
            recommended: index === 0 ? 'Y' : '',
            riskCategory: riskControl?.toString(),
            fundHouse: fundHouseControl?.toString(),
            assetClass: assetsClassesControl?.toString(),
            syariahCompliant: syariahCompliant ? 'I' : '',
            esgFund: esgFund? 'Y' : '',
            fundName: this.fundName,
        };

        return filters;
    }

    changeSyariah(e, syariahCompliantCheckBox: string) {
        if(!e.checked) {
         this.onClearFilter(syariahCompliantCheckBox);
        }
    }

    changeEsgFund(e, esgFundCheckBox: string) {
        if(!e.checked) {
            this.onClearFilter(esgFundCheckBox);
        }
    }

    openESGFundsOnlyBottomSheet() {
        this._bottomSheet.open(this.toolTipEsgFund, {
            panelClass: 'tooltip-action-sheet',
        });
    }
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    onTabChanged(index) {
        this.tabClickCount++;
        this.selectedIndex = index;

        if (this.tabClickCount == 1 && this.selectedIndex == 1) {
            const tabViewName = 'All Funds';
            this.loadAdobeAnalytics(tabViewName);
        }
        if (!this.isMobile) {
            const filters = this.getFilters(index);
            const { customer_id, cifNumber } = this.userData;
            this.getAvailableFundList(customer_id, cifNumber, this.selectedAccounts, filters);
        } else {
            this.onSelectedFilters(this.formSelection);
        }

        // this.searchForm.reset();
        // this._eventService.onSend('clear');
        // this.riskSelected = false;
        // this.fundHouseSelected = false;
        // this.assetClassSelected = false;
    }
    loadAdobeAnalytics(tabViewName) {
        const tbView = tabViewName === 'CIMB Focus Funds' ? 'wealth:allpage' : 'wealth:tab-view';
        this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
            this.currentCustomerType = result.landingPageStatus.accountStatus === 'Y' || this.customerType === 'ETP' ? 'ETP' : 'NTP';
        });

        const day = getDayOfWeek();
        setEventAndDigitalData(
            {
                wealthEvent: tbView,
            },
            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Unit Trust Module',
                            subCategory1: tabViewName,
                            pageType: 'Listing',
                        },
                        pageInfo: {
                            pageName: 'Wealth: UT Available Funds',
                            day: day,
                        },
                    },
                    user: {
                        loginStatus: 'logged-in',
                        memberLoginType: 'repeat',
                        customerType: this.currentCustomerType,
                    },
                    button: {
                        buttonName: tabViewName,
                    },
                },
            },
        );
    }
    /*
     NOTE: Configure remove cart modal setting here
     Please find more info in mint-dialog.service.ts
     */
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    onRemovedItem(event): void {
        const { fund_name, fund_code } = event.value.value;
        const index = event.index;
        const confirmation = this._mintDialogService.open({
            title: 'Are you sure?',
            message: `Do you really want to remove <b>${fund_name}</b> from your cart?`,
            actions: {
                confirm: {
                    label: 'Yes, Remove',
                    click: () => this.removeFromCartEvent(index, fund_code),
                },
            },
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._eventService.onSend({ index, removedCart: true });
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    /*
    NOTE: REFACTORING NEEDED FOR ADD TO CART
    */
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    onAddItem(event, switchCart = false) {
        const value = event.value.value;

        if (value) {
            this.fundObj = value;
            this.cartService.callAddToCart(
                {
                    csId: this.csId,
                    unit: value.unit,
                    amount: parseFloat(value.investmentAmount.toString()?.replace(/,/g, '')),
                    cartData: this.cartData,
                    flow: '001',
                    fundObj: this.fundObj,
                    screen: 'availableFund',
                    utAccount: this.selectedAccounts === null ? 'A80111993': this.selectedAccounts,
                    clientId: this.userData ? this.userData.customer_id : '',
                    cimbStaff: this?.cimbStaff === 'Y' ? 2 : 1,
                },
                switchCart,
            );
        }

        if (this.customerType === 'NTP') {
            this.store.select(LandingPageSelector.selectLandingPageStatus).subscribe((result) => {
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

        this._eventService.onSend({ index: event.index, addedToCart: true });
        return true;
    }

    /*
    NOTE: REFACTORING NEEDED FOR REMOVE CART
    */
    removeFromCartEvent(index, fundCode): boolean {
        const fund_code = fundCode;
        //Set flow as 001 since from serach funds flow will be always topUp
        const flow = '001';
        //const flow = fundObj.flow;
        this.cartService.removeFromCart(
            { cartData: this.cartData, index: -1, flow: flow },
            fund_code,
        );
        return true;
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    onUpdateItem(event) {
        const value = event?.obj?.value;
        const fund_code = value?.fund_code;
        if (value) {
            this.fundObj = value;
            const investments =
                this?.cartData && this.cartData?.fundList ? [...this.cartData?.fundList] : [];
            const index = investments.findIndex((x) => x.fund_code === fund_code);
            const amount = value?.investmentAmount ?? 0.0;
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
        this._eventService.onSend({ index: event.index, updateCart: true });
        return true;
    }

    backButtonEvent() {
        if (this.currentUrl === '/dashboard;tab=0') {
            this.currentUrl = '/dashboard';
        }
        this.router.navigate([this.currentUrl]);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onRiskSelected(opt: boolean) {
        this.riskSelected = opt;
    }

    onFundHouseSelected(opt: boolean) {
        this.fundHouseSelected = opt;
    }

    onAssetClassSelected(opt: boolean) {
        this.assetClassSelected = opt;
    }

    toggle() {
        if (this.counter < 101) {
            this.counter = this.longText.length;
            this.showText = 'View less';
        } else {
            this.counter = this.last_index;
            this.showText = 'View more';
        }
    }

    startInvestmentEvent() {
        this.router.navigate(['/landing-page']);
    }
}
