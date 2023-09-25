import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';

import { AppService } from '../../core/services/app.service';
import { DashbordService } from '../../core/services/dashbord-service/dashbord.service';
import { CartService } from '../../core/services/cart/cart.service';
import { User } from '../../core/model/user.model';
import * as fromStore from '../../core/state/reducers';
import * as UserAction from '../../core/state/user/user.actions';
import * as CartActions from '../../core/state/cart/cart.actions';
import * as DashbordAction from '../../core/state/dashbord/dashboard.actions';
import { environment } from '../../../environments/environment';
import { path } from '../../shared/config';
import { getClicksCustomerInfo } from '../../core/state/clicks/clicks.selectors';
import { ClicksInfo } from '../../core/state/clicks/clicks.models';
import { takeUntil } from 'rxjs/operators';
import { Setting, SettingsUid } from '@cimb/shared/models';
import * as WealthDashboardActions from '../../core/state/wealth-dashboard/wealth-dashboard.actions';
import * as WealthDashboardSelectors from '../../core/state/wealth-dashboard/wealth-dashboard.selectors';
import { EventService } from '@cimb/core';
export class PurchaseDetail {
    transId: string;
    fundName: string;
    transactionDt: string;
    displayFlag: boolean;
}

@Component({
    selector: 'cimb-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    userObservable: Observable<{ user: User }>;
    customerName: string;
    lastUpdated: string;
    userData;
    userJsonData;
    private userSubscription: Subscription;
    dashboardFlow: number;
    totalReturnsGainOrLoss = true;
    totalReturnsAmount = '';
    totalReturnsPercentage = '';
    totalReturnsvalue = '';
    totalReturnsToolTip = '';

    currentInverstmentCurrency = '';
    currentInverstmentAmount = '';
    currentInverstmentvalue = '';
    currentInverstmentToolTip = '';

    totalInvestedCurrency = '';
    totalInvestedAmount = '';
    totalInvestedvalue = '';
    riskProfile = '';
    riskProfileDescription = '';
    riskProfileRedoAllowed = false;
    portfolioWarningMaessage = '';
    portfolioDatalist = [];
    chartsPlotData;
    chartsPlotProcessData;
    portfolioAccount: any[] = [];
    portfolioAccountTemp = [];
    assetClassList = [];
    myHolding = [];
    myRecommended = [];
    selectedAccounts = '';
    myHoldingChartValue = [];
    myHoldingChartColor = [];
    myRecommendedChartValue = [];
    myRecommendedChartColor = [];
    displayPortfolioChart = false;

    //To populate dashboard list
    myHoldings: any;
    myHoldingsAllAccount = [];
    pageNumber = 1;
    myHoldingsDisplayList: any;
    myHoldingsLength: number;

    isCashAssetDisplayed = false;
    isFixedIncomeAssetDisplayed = false;
    isLocalEquityAssetDisplayed = false;
    isRegionalEquityAssetDisplayed = false;
    isGlobalEquityAssetDisplayed = false;
    isAlternativesAssetDisplayed = false;
    pagesArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    totalPages = [];
    extraPage: number;
    pages: number;
    myHoldingsCash = [];
    myHoldingsFixedIncome = [];
    myHoldingsLocalEquity = [];
    myHoldingsRegionalEquity = [];
    myHoldingsGlobalEquity = [];
    myHoldingsAlternatives = [];
    flow = 'Y';
    userStory: string;

    sortingType = 'sortByAlphabetAtoZ';
    solePropIndicator = '';

    fundIndex: number;
    amount: number;
    fundObj: any;
    salesCharge: number;
    salesChargeAmount: number;
    cardNetAmount: number;
    highRisk: boolean;
    newFundObj: any;
    authObservable: Observable<any>;
    private authSubscription: Subscription;
    appToken: string;
    dashboardParams;
    isDashboardDataLoaded: boolean;
    purchaseParams;

    cartObservable: Observable<any>;
    carstSubscription: Subscription;
    cartData: any;
    flowText = null;
    flowCart = null;
    totalFundsCount = 0;
    customerID;
    csId = -1;
    selectedTabIndex = 0;
    cartUTAccount = '';

    purchaseDetailData: any;
    selectedUnittrustAccountNumber: any;
    unitTrustAccountNumberChanged: boolean;

    casaIndicator = 'N';
    cimbStaff = 1;
    joinOrUtAccountIndicator = false;
    joinAndUtAccountIndicator = false;
    cartFlow = '01';
    accountOptions = '1';
    selectedUtAccountObj = null;
    selectedAccountNumber: any;
    transactionProcessingIndicator: string;

    selectedFilteredDate: any;
    purchaseDetailDataFromStore: any;
    filteredArray: any = [];
    userReducer: any;
    riskProfileStatus: string;
    r2Enabled = false;
    clicksInfo: ClicksInfo;
    customerType: string;
    foreignerInd = 'N';
    occupationInd = 'N';

    public eligibleForRedoProfilling: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    selectedTabSubscription: Subscription;

    isTransactionDataLoaded = false;

    // Settings Data
    settingsData: Setting[];

    // Uid For Settings
    addNewInvestmentSettingUid = SettingsUid.ADD_NEW_INVESTMENT_AT_INVESTMENT_DASHBOARD;
    addToCartForTopUpSettingUid = SettingsUid.ADD_TO_CART_AT_INVESTMENT_DASHBOARD_FOR_TOPUP;
    addToCartForRedeemTnx = SettingsUid.REDEEM_TRANSACTION_AT_CART;
    addToCartForSwitchTnx = SettingsUid.SWITCH_TRANSACTION_AT_CART;
    redoRiskProfileSetting = SettingsUid.REDO_RISK_PROFILING_AT_INVESTMENT_DASHBOARD;
    learnMoreSetting = SettingsUid.LEARN_MORE_AT_INVESTMENT_DASHBOARD;
    redeemAtInvestmentDashboardSettingUid:string = SettingsUid.REDEEM_AT_INVESTMENT_DASHBOARD;
    switchStInvestmentDashboardSettingUid =SettingsUid.SWITCH_AT_INVESTMENT_DASHBOARD

    // Booleans for Settings
    addNewInvestmentEnabled = true;
    enableAddToCartForTopup = true;
    enableAddToCartInRedeemTnx = true;
    enableAddToCartInSwitchTnx = true;
    showRedoRiskProfile = true;
    showLearnMore = true;
    enableRedeemAtInvestmentDashboard = true
    enableSwitchAtInvestmentDashboard = true
    amlCheckResult = true;
    previousUrl: any;
    purchaseDataSortUtAcc
    purchaseSUmmeryOneTimeFlag = true;

    constructor(
        private appService: AppService,
        private router: Router,
        private dashbordService: DashbordService,
        private store: Store<fromStore.AppState>,
        private cartService: CartService,
        private route: ActivatedRoute,
        private _eventService: EventService
    ) { }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
        this.selectedTabSubscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.store.select(getClicksCustomerInfo).subscribe((info) => {
            this.amlCheckResult = info['amlCheckResult'] ? true : false;
        });
        this.r2Enabled = environment.r2Enabled;
        this.store.dispatch(WealthDashboardActions.settingsData());
        const tab = this.route.snapshot.paramMap.get('tab');
        this.selectedTabIndex = tab ? parseInt(tab) : 0;

        this.selectedTabSubscription = this.dashbordService.setDashboardTab$.subscribe(index => {
            this.selectedTabIndex = index;
        })

        this.isDashboardDataLoaded = false;
        this.userObservable = this.store.select('userReducer');
        this.store.select(getClicksCustomerInfo).subscribe((info) => {
            this.clicksInfo = info;
            this.customerType = this.clicksInfo.customerType;
        });
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.userReducer = users;
            this.userData = users.user;
        });

        this.authObservable = this.store.select('authReducer');
        this.authSubscription = this.authObservable.subscribe((data) => {
            this.appToken = data;
        });
        if (this.userData) {
            //this.dashboardFlow = this.userData.dashbordData;
            this.userStory = this.userData.story;
            this.customerID = this.userData.customer_id;
            const customerIdType = this.userReducer?.customerIdType ?? null;
            const riskProfile = this.userReducer?.riskProfile ?? null;
            const params = this.userData.customer_id
                + '/' + this.userData.cifNumber
                + '/' + customerIdType
                + '/' + riskProfile;


            //this.cimbStaff = this.userData.cimb_staff;
            //this.solePropIndicator = this.userData.sole_prop;
            if (this.userData.invertment_indicator === 'Y') {
                this.dashboardFlow = 2;
            }
            // else if (this.userData.casa_indicator === 'Y') {
            //   this.dashboardFlow = 3;
            // }
            else {
                this.dashboardFlow = 1;
            }

            this.riskProfileStatus = this.userReducer?.riskProfileStatus ?? null;
            if (this.riskProfileStatus === 'Expired') {
                this.riskProfileRedoAllowed = true;
            } else {
                this.riskProfileRedoAllowed = false;
            }
            if (this.userData.join_or_ut_account === 'Y') {
                this.joinOrUtAccountIndicator = true;
            } else {
                this.joinOrUtAccountIndicator = false;
            }

            //this.customerName = this.userData.customer_name;
            this.dashboardParams = params;
            this.purchaseParams = this.userData.customer_id;

            if (this.appToken) {
                //From Store
                // if (!dataLoaded && this.myHoldingsDisplayList && this.myHoldingsDisplayList.length <= 1) {

                this.callDashboardApi();
                this.store.dispatch(new CartActions.GetCartByClientId(this.customerID));
                //Transaction history
                this.store.dispatch(new DashbordAction.GetPurchaseDetail(this.purchaseParams));
                // }
            }
        }
        this.cartObservable = this.store.select('cartReducer');

        this.carstSubscription = this.cartObservable.subscribe((data) => {

            this.cartData = data;
            this.csId = data.csId;
            this.flowText = data.flow_text;
            this.flowCart = data.flow;
            this.totalFundsCount = data.totalFundsCount;
            this.cartUTAccount = data.unitTrustAccount;
        });


        this.totalReturnsvalue = this.dashbordService.totalReturnsvalue;
        this.totalReturnsToolTip = this.dashbordService.totalReturnsToolTip;

        this.currentInverstmentCurrency = this.dashbordService.currentInverstmentCurrency;
        this.currentInverstmentvalue = this.dashbordService.currentInverstmentvalue;
        this.currentInverstmentToolTip = this.dashbordService.currentInverstmentToolTip;

        this.totalInvestedCurrency = this.dashbordService.totalInvestedCurrency;
        this.totalInvestedvalue = this.dashbordService.totalInvestedvalue;

        this.store.select('dashbordReducers').subscribe((data) => {
            const dashboardData = data.dashboardData;
            const purchaseDetailData = data.purchaseDetailData;
            if (dashboardData) {
                this.updateDashbordData(dashboardData, data.cartUTAccount);
            }
            if (purchaseDetailData) {
                this.purchaseDetailDataFromStore = purchaseDetailData;
                this.updatePurchaseDetailData(purchaseDetailData);
            }

            this.isTransactionDataLoaded = true;
        });

        this.store.select('cartReducer').subscribe((data) => {
            this.cartFlow = data.flow;
            this.updateFlowList(this.cartFlow);
        });

        // redo risk profilling check
        this.checkRedoProfiling();
        this.getNdSetSettings();
        this.previousUrl = this.appService.getPreviousUrl();

        this._eventService.onReceivedUtAcc()?.subscribe(data => {
            this.purchaseDataSortUtAcc = data?.utAccountNo
        })
    }
    txHistoryPurchaseSummery() {
        if (this.purchaseDataSortUtAcc) {
            this.selectedAccounts = this.purchaseDataSortUtAcc;
            this.accountListChangeEvent(this.purchaseDataSortUtAcc);
        }
        this.purchaseSUmmeryOneTimeFlag = false;
    }

    getNdSetSettings(): void {
        this.store.select(WealthDashboardSelectors.settingsDataSuccess).subscribe((resp) => {
            if (resp) {
                this.settingsData = resp;
                if (this.settingsData) {
                    this.settingsData.forEach((settingData: Setting) => {

                        const isEnabled = settingData.enabled;
                        const settingUid = settingData.utSettingId;

                        if (settingUid === this.addNewInvestmentSettingUid) {
                            this.addNewInvestmentEnabled = isEnabled;
                        }

                        if (settingUid === this.addToCartForTopUpSettingUid) {
                            this.enableAddToCartForTopup = isEnabled;
                        }

                        if (settingUid === this.addToCartForRedeemTnx) {
                            this.enableAddToCartInRedeemTnx = isEnabled;
                        }

                        if (settingUid === this.addToCartForSwitchTnx) {
                            this.enableAddToCartInSwitchTnx = isEnabled;
                        }

                        if (settingUid === this.redoRiskProfileSetting) {
                            this.showRedoRiskProfile = isEnabled;
                        }

                        if (settingUid === this.learnMoreSetting) {
                            this.showLearnMore = isEnabled;
                        }
                        if (settingUid === this.redeemAtInvestmentDashboardSettingUid) {
                            this.enableRedeemAtInvestmentDashboard = isEnabled;
                        }
                        if (settingUid === this.switchStInvestmentDashboardSettingUid) {
                            this.enableSwitchAtInvestmentDashboard = isEnabled;
                        }

                    })
                }
            }
        })
    }

    checkRedoProfiling() {
        let dashboard$: Observable<any> = null;
        let user$: Observable<any> = null;

        dashboard$ = this.store.select('dashbordReducers');
        user$ = this.store.select('userReducer', 'user');

        combineLatest([dashboard$, user$])
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((responses) => {
                const [ dashboard, user] = responses;
                const { casa_indicator, sole_prop } = user;
                const { occupationInd, foreignerInd } = dashboard;

                if (casa_indicator === 'Y' && sole_prop === 'Y'
                    && occupationInd === 'Y' && foreignerInd === 'Y') {
                        this.eligibleForRedoProfilling = false
                        return this.eligibleForRedoProfilling;
                }
                this.eligibleForRedoProfilling = true
                return this.eligibleForRedoProfilling;
            });
    }

    updateFlowList(flow): boolean {
        if (flow === '001') {
            this.accountOptions = '1';
        } else if (flow === '002') {
            this.accountOptions = '2';
        } else if (flow === '003') {
            this.accountOptions = '3';
        } else {
            this.accountOptions = '1';
        }
        return true;
    }

    callDashboardApi(): boolean {
        this.myHoldings = [];
        this.myHoldingsDisplayList = [];
        this.isDashboardDataLoaded = false;
        this.store.dispatch(new DashbordAction.StoreDashboardApiResponse(null));
        setTimeout(() => {
            this.store.dispatch(new DashbordAction.CallDashboardApi(this.dashboardParams));
        }, 60);

        return true;
    }

    selectedTabChange(tabIndex): boolean {
        this.selectedTabIndex = tabIndex;
        return true;
    }

    dateFilteredPurchaseDetailDataEvent(event) {
        const resultArray = [];
        const filteredArray = [];
        for (let i = 0; i < this.purchaseDetailDataFromStore.length; i++) {
            resultArray.push(this.purchaseDetailDataFromStore[i]);
        }

        this.selectedFilteredDate = JSON.parse(JSON.stringify(event));
        this.selectedFilteredDate.filter((data) => {
            for (let x = 0; x < resultArray.length; x++) {
                if (resultArray[x]['transactionDatetime'] == data.transactionDatetime) {
                    filteredArray.push(data);
                }
            }
            this.updatePurchaseDetailDataChanges(filteredArray);
        });
    }

    updatePurchaseDetailDataChanges(purchaseDetailDataChanges) {
        if (purchaseDetailDataChanges) {
            this.purchaseDetailData = JSON.parse(JSON.stringify(purchaseDetailDataChanges));
            this.populateDisplayFlagForPurchaseDetail();
        }
    }

    updatePurchaseDetailData(purchaseDetailData): boolean {
        //this.purchaseDetailData = purchaseDetailData.slice(0,5)
        this.purchaseDetailData = JSON.parse(JSON.stringify(purchaseDetailData));
        //this.purchaseDetailData = this.getData()
        this.populateDisplayFlagForPurchaseDetail();
        return true;
    }

    populateDisplayFlagForPurchaseDetail(): boolean {
        const tempPurchaseDetailList: any = [];

        let purchaseArray: PurchaseDetail[];
        const purchaseMap: Map<string, PurchaseDetail[]> = new Map<string, PurchaseDetail[]>();

        //Iterate over the purchase detail and get the list of funds assigend to repective transaction date row
        for (let i = 0; i < this.purchaseDetailData.length; i++) {
            purchaseArray = [];
            if (
                purchaseMap.size == 0 ||
                !purchaseMap.has(this.purchaseDetailData[i].transactionDt)
            ) {
                purchaseArray.push(this.purchaseDetailData[i]);
                purchaseMap.set(this.purchaseDetailData[i].transactionDt, purchaseArray);
            } else {
                purchaseMap.forEach((value: PurchaseDetail[], key: string) => {
                    if (key == this.purchaseDetailData[i].transactionDt) {
                        value.push(this.purchaseDetailData[i]);
                    }
                });
            }
        }

        //Iterate over the map tp set display flag for first element in the
        //list in order to show only one header

        purchaseMap.forEach((value: PurchaseDetail[], key: string) => {
            for (let i = 0; i < value.length; i++) {
                if (key != undefined) {
                    if (key == value[i].transactionDt) {
                        if (i == 0) {
                            value[i].displayFlag = true;
                        } else {
                            value[i].displayFlag = false;
                        }
                        tempPurchaseDetailList.push(value[i]);
                    }
                }
            }
        });

        //sort by latest date
        for (let i = 0; i < tempPurchaseDetailList.length; i++) {
            tempPurchaseDetailList.sort(
                (a, b) =>
                    new Date(b.transactionStatusDate).getTime() -
                    new Date(a.transactionStatusDate).getTime(),
            );
        }

        this.purchaseDetailData = tempPurchaseDetailList;
        return true;
    }

    updateDashbordData(accountDetailData, cartUTAccount): boolean {
        this.myHoldings = [];
        this.myHoldingsDisplayList = [];
        this.isDashboardDataLoaded = true;

        //WJ-3860 - Sole prop customer inline error message is not being displayed on Investment dashboard
        this.solePropIndicator = accountDetailData.soleprop_ind;
        this.store.dispatch(new UserAction.UpdateUserSoleProp(this.solePropIndicator))

        if (accountDetailData) {
            this.assetClassList = [];
                this.store.dispatch(
                    new UserAction.UpdateCIMBStaffIndicator(accountDetailData.staff_ind),
                );
                let assetClass = accountDetailData.asset_class;
                const holding = accountDetailData.holding;
                const recommended = accountDetailData.recommended;
                const colorList = [
                    {
                        classHexa: '#B3BE66',
                    },
                    {
                        classHexa: '#567DCC',
                    },
                    {
                        classHexa: '#5CD3CD',
                    },
                    {
                        classHexa: '#955CD6',
                    },
                    {
                        classHexa: '#D45DBA',
                    },
                    {
                        classHexa: '#4FA14F',
                    },
                ];

                this.riskProfile = accountDetailData.risk_profile;

                // this.portfolioDatalist = assetClass;
                this.currentInverstmentAmount = accountDetailData.current_investment;
                this.totalInvestedAmount = accountDetailData.total_invested;
                this.customerName = accountDetailData.name;
                this.lastUpdated = accountDetailData.last_update_date;
                if (this.customerName) {
                    this.store.dispatch(new UserAction.UpdateUserName(this.customerName));
                }
                this.portfolioWarningMaessage = accountDetailData.deviation_msg;
                //this.portfolioAccount = accountDetailData.ut_account;
                this.totalReturnsPercentage = accountDetailData.total_percentage + '%';
                this.totalReturnsGainOrLoss = !accountDetailData.total_percentage.includes('-');
                this.totalReturnsAmount = accountDetailData.total_return;

                //this.riskProfile = accountDetailData.risk_profile;
                this.riskProfileDescription = accountDetailData.risk_description;

                this.portfolioWarningMaessage = accountDetailData.deviation_msg;

                const accountList = [...accountDetailData.ut_account];
                if (accountList && accountList.length >= 1) {
                    let accountNo: string = null;
                    let listItemSelected = null;

                    for (let m = 0; m < accountList.length; m++) {
                        const listItem = { ...accountList[m] };

                        if (cartUTAccount && cartUTAccount === listItem.ut_account_no) {
                            listItemSelected = listItem;
                            accountNo = listItem.ut_account_no;
                            listItem.default_ind = 'Y';
                            accountList[m] = listItem;
                        } else {
                            if (cartUTAccount) {
                                listItem.default_ind = 'N';
                                accountList[m] = listItem;
                            }
                            if (listItem.default_ind === 'Y') {
                                listItemSelected = listItem;
                                accountNo = listItem.ut_account_no;
                            }
                        }
                    }

                    if (accountNo === null && accountList.length >= 1) {
                        accountNo =
                            accountList[0] && accountList[0].ut_account_no
                                ? accountList[0].ut_account_no
                                : null;
                        listItemSelected = accountList[0] ? accountList[0] : null;
                    }
                    this.portfolioAccount = accountList;
                    this.selectedUtAccountObj = listItemSelected;
                    this.selectedAccountChangeUtIndicator(listItemSelected);
                    if (this.purchaseSUmmeryOneTimeFlag && this.previousUrl && this.previousUrl === '/purchase-summary') {
                        this.txHistoryPurchaseSummery();
                    } else {
                        this.selectedAccounts = accountNo;
                    }

                    this.store.dispatch(new UserAction.SelectedUnitTrustAccount(accountNo));
                    this.store.dispatch(new UserAction.StoreUnitTrustAccountList(accountList));
                }

                if (this.dashboardFlow !== 1) {
                    this.totalReturnsAmount = '0.00';
                    this.totalReturnsPercentage = '0.00%';
                    this.currentInverstmentAmount = '0.00';
                    this.totalInvestedAmount = '0.00';
                    this.totalReturnsGainOrLoss = false;
                }
                this.myRecommendedChartColor = [];
                this.myHoldingChartColor = [];
                /* Removed now reading from api*/
                // if (colorList) {
                //     for (let j = 0; j < colorList.length; j++) {
                //         const value = colorList[j];

                //         this.myRecommendedChartColor.push(value.classHexa);
                //     }
                // }
                let holdingTotalValue = 0.0;
                if (holding) {
                    for (let j = 0; j < holding.length; j++) {
                        const item = holding[j];
                        const value = item.y;
                        holdingTotalValue = holdingTotalValue + value;
                        this.myHoldingChartColor.push(item.classHexa);
                    }
                }

                let recommendedTotalValue = 0.0;
                if (recommended) {
                    for (let k = 0; k < recommended.length; k++) {
                        const item = recommended[k];
                        const value = item.y;
                        recommendedTotalValue = recommendedTotalValue + value;
                        this.myRecommendedChartColor.push(item.classHexa);
                    }
                }

                this.chartsPlotProcessData = this.dashbordService.portfolioChartEmpty;
                if (this.dashboardFlow !== 1) {
                    //holding
                    this.chartsPlotProcessData.series[0].data = [{ name: '', y: 100.0 }];
                    this.chartsPlotProcessData.series[0].colors = ['#DDDEDE'];

                    //recommended
                    this.chartsPlotProcessData.series[1].data = recommended;
                    this.chartsPlotProcessData.series[1].colors = this.myRecommendedChartColor;
                } else {
                    //holding
                    if (holdingTotalValue <= 0) {
                        this.chartsPlotProcessData.series[0].data = [{ name: '', y: 100.0 }];
                        this.chartsPlotProcessData.series[0].colors = ['#DDDEDE'];
                    } else {
                        this.chartsPlotProcessData.series[0].data = holding;
                        this.chartsPlotProcessData.series[0].colors = this.myHoldingChartColor;
                    }

                    //recommended
                    if (recommendedTotalValue <= 0) {
                        this.chartsPlotProcessData.series[1].data = [{ name: '', y: 100.0 }];
                        this.chartsPlotProcessData.series[1].colors = ['#DDDEDE'];
                    } else {
                        this.chartsPlotProcessData.series[1].data = recommended;
                        this.chartsPlotProcessData.series[1].colors = this.myRecommendedChartColor;
                    }
                }

                if (recommendedTotalValue <= 0 && holdingTotalValue <= 0) {
                    assetClass = [
                        {
                            holding: '0.0',
                            asset_class_name: 'CASH / MONEY MARKET',
                            classHexa: '#B3BE66',
                            class_seq: 1,
                            recommended: '0.0',
                        },
                        {
                            holding: '0.0',
                            asset_class_name: 'FIXED INCOME FUND',
                            classHexa: '#567DCC',
                            class_seq: 2,
                            recommended: '0.0',
                        },
                        {
                            holding: '0.0',
                            asset_class_name: 'LOCAL EQUITY',
                            classHexa: '#5CD3CD',
                            class_seq: 3,
                            recommended: '0.0',
                        },
                        {
                            holding: '0.0',
                            asset_class_name: 'REGIONAL EQUITY',
                            classHexa: '#955CD6',
                            class_seq: 4,
                            recommended: '0.0',
                        },
                        {
                            holding: '0.0',
                            asset_class_name: 'GLOBAL EQUITY',
                            classHexa: '#D45DBA',
                            class_seq: 5,
                            recommended: '0.0',
                        },
                        {
                            holding: '0.0',
                            asset_class_name: 'ALTERNATIVE',
                            classHexa: '#4FA14F',
                            class_seq: 6,
                            recommended: '0.0',
                        },
                    ];
                }

                if (assetClass) {
                    for (let i = 0; i < assetClass.length; i++) {
                        const value = assetClass[i];
                        const name = value.asset_class_name;
                        let holdings = value.holding;
                        if (this.dashboardFlow !== 1) {
                            holdings = '0.0';
                        }
                        this.assetClassList.push({
                            ...value,
                            name: name,
                            description1: holdings + '%',
                            description2: value.recommended + '%',
                        });
                    }
                }
                this.portfolioDatalist = this.assetClassList;
                this.chartsPlotData = this.chartsPlotProcessData;
                this.displayPortfolioChart = true;

                this.myHoldings =
                    accountDetailData.fund_list
                        ? [...accountDetailData.fund_list.slice()]
                        : [];
                this.myHoldingsAllAccount =
                    accountDetailData.fund_list
                        ? [...accountDetailData.fund_list.slice()]
                        : [];

                //if(value && value.index && value.index >= 0){
                // this.store.dispatch(
                //   new DashbordAction.addDisplayFlagDashboardApiResponse(accountDetailData, true)
                // );

                // this.myHoldings = this.getDummy();
                // if(this.myHoldings != undefined) {
                //
                // }
                if (this.myHoldings) {
                    //List of Asset class and funds------
                    //List of Asset class and funds------
                    //this.solePropIndicator = this.dashbordService.soleprop_ind;
                    //this.myHoldings = this.dashbordService.fund_list;
                    //split and set the fundTotal value in myHoldings

                    //this.splitFundTotalValue(this.myHoldings);
                    //this.myHoldingsDisplayList = this.dashbordService.fund_list;
                    this.filterFundListByAccountNumber();

                    this.myHoldingsDisplayList = this.myHoldings;
                    this.myHoldingsLength = this.myHoldings.length;

                    //Set display order for asset class for sorting
                    //this.setDisplayOrderForAssetClass();
                    //Clear alll the lists to populate new list

                    this.clearAssetClassArray(
                        this.myHoldings,
                        this.myHoldingsCash,
                        this.myHoldingsFixedIncome,
                        this.myHoldingsLocalEquity,
                        this.myHoldingsRegionalEquity,
                        this.myHoldingsGlobalEquity,
                        this.myHoldingsAlternatives,
                    );
                    this.changeAssetClassFlag(this.myHoldings);

                    this.sortInAlphabeticalOrderAtoZ(this.myHoldings);

                    this.myHoldings = this.groupAssetClassToMyHoldings(
                        this.myHoldings,
                        this.myHoldingsCash,
                        this.myHoldingsFixedIncome,
                        this.myHoldingsLocalEquity,
                        this.myHoldingsRegionalEquity,
                        this.myHoldingsGlobalEquity,
                        this.myHoldingsAlternatives,
                    );
                    this.displayFlagPopulationForFunds(
                        this.myHoldings,
                        this.isCashAssetDisplayed,
                        this.isFixedIncomeAssetDisplayed,
                        this.isLocalEquityAssetDisplayed,
                        this.isRegionalEquityAssetDisplayed,
                        this.isGlobalEquityAssetDisplayed,
                        this.isAlternativesAssetDisplayed,
                    );
                    this.myHoldingsLength = this.myHoldings.length;

                    this.pages = Math.floor(this.myHoldingsLength / 10);
                    this.extraPage = this.myHoldingsLength % 10;
                    if (this.extraPage !== 0 && this.extraPage <= 9) {
                        this.extraPage = 1;
                    }
                    this.pages = this.pages + this.extraPage;

                    for (let i = 1; i <= this.pages; i++) {
                        this.totalPages.push(i);
                    }

                    this.myHoldingsDisplayList = this.myHoldings;
                    // if (this.pageNumber === 1) {
                    //   this.myHoldingsDisplayList = this.myHoldings.slice(0, 10);
                    // }
                }
                if (!accountDetailData?.casa_account || (accountDetailData?.casa_account && accountDetailData?.casa_account.length < 1)) {
                    this.casaIndicator = 'Y';
                } else {
                    this.casaIndicator = 'N';
                }
                this.foreignerInd = accountDetailData.foreignerInd ? accountDetailData.foreignerInd : 'N';
                this.occupationInd = accountDetailData.occupationInd ? accountDetailData.occupationInd : 'N';
                this.store.dispatch(
                    new CartActions.StoreSchedulerMsg(accountDetailData.scheduler_msg),
                );
                this.store.dispatch(
                    new UserAction.StoreForeignerInd(this.foreignerInd),
                );
                this.store.dispatch(
                    new UserAction.StoreOccupationInd(this.occupationInd),
                );
        }
        return true;
    }

    filterFundListByAccountNumber() {
        const FundDetailsfilterdByAccNo: any = [];

        if (this.selectedUnittrustAccountNumber == undefined) {
            this.selectedAccountNumber = this.selectedAccounts;
        } else {
            this.selectedAccountNumber = this.selectedUnittrustAccountNumber;
        }

        for (let i = 0; i < this.myHoldingsAllAccount.length; i++) {
            if (this.myHoldingsAllAccount[i].ut_account_no == this.selectedAccountNumber) {
                FundDetailsfilterdByAccNo.push(this.myHoldingsAllAccount[i]);
            }
        }
        //Check for transaction processing indicator if any to show respective pages
        for (let i = 0; i < this.portfolioAccount.length; i++) {
            if (this.portfolioAccount[i].ut_account_no == this.selectedAccountNumber) {
                this.transactionProcessingIndicator = this.portfolioAccount[i].processing_indicator;
            }
        }

        this.myHoldings = [];
        this.myHoldings = FundDetailsfilterdByAccNo;
        this.isCashAssetDisplayed = false;
        this.isFixedIncomeAssetDisplayed = false;
        this.isLocalEquityAssetDisplayed = false;
        this.isRegionalEquityAssetDisplayed = false;
        this.isGlobalEquityAssetDisplayed = false;
        this.isAlternativesAssetDisplayed = false;
        this.displayFlagPopulationForFunds(
            this.myHoldings,
            this.isCashAssetDisplayed,
            this.isFixedIncomeAssetDisplayed,
            this.isLocalEquityAssetDisplayed,
            this.isRegionalEquityAssetDisplayed,
            this.isGlobalEquityAssetDisplayed,
            this.isAlternativesAssetDisplayed,
        );

        this.myHoldingsDisplayList = this.myHoldings;
        // }
        this.myHoldingsLength = this.myHoldings.length;
    }

    riskRedoClickEvent(): boolean {
        this.router.navigate([path.RISK_PROFILE_QUESTIONS]);
        this.appService.learn_more = false;
        return true;
    }
    learnMoreClickEvent(): boolean {
        this.router.navigate([path.RISK_PROFILE_RESULTS]);
        this.appService.learn_more = true;
        return true;
    }

    wealthDashboardClickEvent() {
        this.router.navigate(['/wealthdashboard']);
    }

    //Split and set fund total value
    splitFundTotalValue(myHoldings) {
        this.myHoldings = myHoldings;
        if (null != this.myHoldings) {
            for (let i = 0; i < this.myHoldings.length; i++) {
                const object = this.myHoldings[i];
                // const fundTotal = object.total_return;
                // const fundTotalReturnType = fundTotal(0, 1);
                // const fundTotalReturnValue = fundTotal.slice(1, fundTotal.length);
                const fundTotalReturnType = this.myHoldings[i].total_return_type;
                const fundTotalReturnValue = this.myHoldings[i].total_return_value;
                this.myHoldings[i].fundTotalReturnType = {
                    ...object,
                    fundTotalReturnType,
                    fundTotalReturnValue,
                };
                //this.myHoldings[i].fundTotalReturnValue = fundTotalReturnValue;
            }
        }
        return myHoldings;
    }

    //Group Asset class based on Equity type

    groupMyHoldindsToAssetClassType() {
        for (let i = 0; i < this.myHoldings.length; i++) {
            //Cash Asset
            if (this.myHoldings[i].class_seq == 1) {
                this.myHoldingsCash.push(this.myHoldings[i]);
            } //Fixed Income Asset
            else if (this.myHoldings[i].class_seq == 2) {
                this.myHoldingsFixedIncome.push(this.myHoldings[i]);
            } //Local Equity Asset
            else if (this.myHoldings[i].class_seq == 3) {
                this.myHoldingsLocalEquity.push(this.myHoldings[i]);
            } //Regional Equity Asset
            else if (this.myHoldings[i].class_seq == 4) {
                this.myHoldingsRegionalEquity.push(this.myHoldings[i]);
            } //Global Equity Asset
            else if (this.myHoldings[i].class_seq == 5) {
                this.myHoldingsGlobalEquity.push(this.myHoldings[i]);
            } //Alternatives Asset
            else if (this.myHoldings[i].class_seq == 6) {
                this.myHoldingsAlternatives.push(this.myHoldings[i]);
            }
        }
    }

    //Group the sorted Asset class to My Holdings Again
    groupAssetClassToMyHoldings(
        myHoldings,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives,
    ) {
        this.myHoldings = [];
        this.myHoldingsCash = myHoldingsCash;
        this.myHoldingsFixedIncome = myHoldingsFixedIncome;
        this.myHoldingsLocalEquity = myHoldingsLocalEquity;
        this.myHoldingsRegionalEquity = myHoldingsRegionalEquity;
        this.myHoldingsGlobalEquity = myHoldingsGlobalEquity;
        this.myHoldingsAlternatives = myHoldingsAlternatives;

        if (null !== this.myHoldingsCash)
            for (let i = 0; i < this.myHoldingsCash.length; i++) {
                this.myHoldings.push(this.myHoldingsCash[i]);
            }
        if (null !== this.myHoldingsFixedIncome)
            for (let i = 0; i < this.myHoldingsFixedIncome.length; i++) {
                this.myHoldings.push(this.myHoldingsFixedIncome[i]);
            }
        if (null !== this.myHoldingsLocalEquity)
            for (let i = 0; i < this.myHoldingsLocalEquity.length; i++) {
                this.myHoldings.push(this.myHoldingsLocalEquity[i]);
            }
        if (null !== this.myHoldingsRegionalEquity)
            for (let i = 0; i < this.myHoldingsRegionalEquity.length; i++) {
                this.myHoldings.push(this.myHoldingsRegionalEquity[i]);
            }
        if (null !== this.myHoldingsGlobalEquity)
            for (let i = 0; i < this.myHoldingsGlobalEquity.length; i++) {
                this.myHoldings.push(this.myHoldingsGlobalEquity[i]);
            }
        if (null !== this.myHoldingsAlternatives)
            for (let i = 0; i < this.myHoldingsAlternatives.length; i++) {
                this.myHoldings.push(this.myHoldingsAlternatives[i]);
            }

        myHoldings = this.myHoldings;
        return myHoldings;
    }

    //default sorting of funds in alphabetical order A to Z:::
    sortInAlphabeticalOrderAtoZ(myHoldings): boolean {
        this.myHoldings = myHoldings;
        this.groupMyHoldindsToAssetClassType()

        for (let i = 0; i < this.myHoldingsCash.length; i++) {
            this.myHoldingsCash.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
        }
        for (let i = 0; i < this.myHoldingsFixedIncome.length; i++) {
            this.myHoldingsFixedIncome.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
        }

        for (let i = 0; i < this.myHoldingsLocalEquity.length; i++) {
            this.myHoldingsLocalEquity.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
        }

        for (let i = 0; i < this.myHoldingsRegionalEquity.length; i++) {
            this.myHoldingsRegionalEquity.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
        }
        for (let i = 0; i < this.myHoldingsGlobalEquity.length; i++) {
            this.myHoldingsGlobalEquity.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
        }
        for (let i = 0; i < this.myHoldingsAlternatives.length; i++) {
            this.myHoldingsAlternatives.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
        }

        this.myHoldings = [];
        for (let i = 0; i < this.myHoldingsCash.length; i++) {
            this.myHoldings.push(this.myHoldingsCash[i]);
        }
        for (let i = 0; i < this.myHoldingsFixedIncome.length; i++) {
            this.myHoldings.push(this.myHoldingsFixedIncome[i]);
        }
        for (let i = 0; i < this.myHoldingsLocalEquity.length; i++) {
            this.myHoldings.push(this.myHoldingsLocalEquity[i]);
        }
        for (let i = 0; i < this.myHoldingsRegionalEquity.length; i++) {
            this.myHoldings.push(this.myHoldingsRegionalEquity[i]);
        }
        for (let i = 0; i < this.myHoldingsGlobalEquity.length; i++) {
            this.myHoldings.push(this.myHoldingsGlobalEquity[i]);
        }
        for (let i = 0; i < this.myHoldingsAlternatives.length; i++) {
            this.myHoldings.push(this.myHoldingsAlternatives[i]);
        }

        return true;
    }

    //sorting of funds in alphabetical order Z to A
    sortInAlphabeticalOrderZtoA(myHoldings): boolean {
        this.myHoldings = myHoldings;
        for (let i = 0; i < this.myHoldings.length; i++) {
            //Cash Asset
            if (this.myHoldings[i].class_seq == 1) {
                this.myHoldingsCash.push(this.myHoldings[i]);
                this.myHoldingsCash.sort((a, b) => b.fund_name.localeCompare(a.fund_name));
            } //Fixed Income Asset
            else if (this.myHoldings[i].class_seq == 2) {
                this.myHoldingsFixedIncome.push(this.myHoldings[i]);
                this.myHoldingsFixedIncome.sort((a, b) => b.fund_name.localeCompare(a.fund_name));
            } //Local Equity Asset
            else if (this.myHoldings[i].class_seq == 3) {
                this.myHoldingsLocalEquity.push(this.myHoldings[i]);
                this.myHoldingsLocalEquity.sort((a, b) => b.fund_name.localeCompare(a.fund_name));
            } //Regional Equity Asset
            else if (this.myHoldings[i].class_seq == 4) {
                this.myHoldingsRegionalEquity.push(this.myHoldings[i]);
                this.myHoldingsRegionalEquity.sort((a, b) =>
                    b.fund_name.localeCompare(a.fund_name),
                );
            } //Global Equity Asset
            else if (this.myHoldings[i].class_seq == 5) {
                this.myHoldingsGlobalEquity.push(this.myHoldings[i]);
                this.myHoldingsGlobalEquity.sort((a, b) => b.fund_name.localeCompare(a.fund_name));
            } //Alternatives Asset
            else if (this.myHoldings[i].class_seq == 6) {
                this.myHoldingsAlternatives.push(this.myHoldings[i]);
                this.myHoldingsAlternatives.sort((a, b) => b.fund_name.localeCompare(a.fund_name));
            }
        }
        return true;
    }

    //Sorting funds by return percentage - high to low
    sortByReturnPercentageHighToLow(myHoldings): boolean {
        this.myHoldings = myHoldings;
        for (let i = 0; i < this.myHoldings.length; i++) {
            //Cash Asset
            if (this.myHoldings[i].class_seq == 1) {
                this.myHoldingsCash.push(this.myHoldings[i]);
                this.myHoldingsCash.sort(
                    (a, b) => b.total_percentage_value - a.total_percentage_value,
                );
            } //Fixed Income Asset
            else if (this.myHoldings[i].class_seq == 2) {
                this.myHoldingsFixedIncome.push(this.myHoldings[i]);
                this.myHoldingsFixedIncome.sort(
                    (a, b) => b.total_percentage_value - a.total_percentage_value,
                );
            } //Local Equity Asset
            else if (this.myHoldings[i].class_seq == 3) {
                this.myHoldingsLocalEquity.push(this.myHoldings[i]);
                this.myHoldingsLocalEquity.sort(
                    (a, b) => b.total_percentage_value - a.total_percentage_value,
                );
            } //Regional Equity Asset
            else if (this.myHoldings[i].class_seq == 4) {
                this.myHoldingsRegionalEquity.push(this.myHoldings[i]);
                this.myHoldingsRegionalEquity.sort(
                    (a, b) => b.total_percentage_value - a.total_percentage_value,
                );
            } //Global Equity Asset
            else if (this.myHoldings[i].class_seq == 5) {
                this.myHoldingsGlobalEquity.push(this.myHoldings[i]);
                this.myHoldingsGlobalEquity.sort(
                    (a, b) => b.total_percentage_value - a.total_percentage_value,
                );
            } //Alternatives Asset
            else if (this.myHoldings[i].class_seq == 6) {
                this.myHoldingsAlternatives.push(this.myHoldings[i]);
                this.myHoldingsAlternatives.sort(
                    (a, b) => b.total_percentage_value - a.total_percentage_value,
                );
            }
        }

        // for(let i=0;i< this.myHoldingsCash.length ; i++) {
        //   this.myHoldingsCash.sort((a, b) =>
        //   b.total_percentage_value - (a.total_percentage_value)
        //   );
        // }
        // for(let i=0;i< this.myHoldingsFixedIncome.length ; i++) {
        //   this.myHoldingsFixedIncome.sort((a, b) =>
        //   b.total_percentage_value - (a.total_percentage_value)
        //   );
        // }

        // for(let i=0;i< this.myHoldingsLocalEquity.length ; i++) {
        //   this.myHoldingsLocalEquity.sort((a, b) =>
        //   b.total_percentage_value - (a.total_percentage_value)
        //   );
        // }

        // for(let i=0;i< this.myHoldingsRegionalEquity.length ; i++) {
        //   this.myHoldingsRegionalEquity.sort((a, b) =>
        //   b.total_percentage_value - (a.total_percentage_value)
        //   );
        // }
        // for(let i=0;i< this.myHoldingsGlobalEquity.length ; i++) {
        //   this.myHoldingsGlobalEquity.sort((a, b) =>
        //   b.total_percentage_value - (a.total_percentage_value)
        //   );
        // }
        // for(let i=0;i< this.myHoldingsAlternatives.length ; i++) {
        //   this.myHoldingsAlternatives.sort((a, b) =>
        //   b.total_percentage_value - (a.total_percentage_value)
        //   );
        // }

        // this.myHoldings = [];
        // for(let i=0;i< this.myHoldingsCash.length ; i++) {
        //   this.myHoldings.push(this.myHoldingsCash[i])
        // }
        // for(let i=0;i< this.myHoldingsFixedIncome.length ; i++) {
        //   this.myHoldings.push(this.myHoldingsFixedIncome[i])
        // }
        // for(let i=0;i< this.myHoldingsLocalEquity.length ; i++) {
        //    this.myHoldings.push(this.myHoldingsLocalEquity[i])
        // }
        // for(let i=0;i< this.myHoldingsRegionalEquity.length ; i++) {
        //   this.myHoldings.push(this.myHoldingsRegionalEquity[i])
        // }
        // for(let i=0;i< this.myHoldingsGlobalEquity.length ; i++) {
        //   this.myHoldings.push(this.myHoldingsGlobalEquity[i])
        // }
        // for(let i=0;i< this.myHoldingsAlternatives.length ; i++) {
        //   this.myHoldings.push(this.myHoldingsAlternatives[i])
        // }

        return true;
    }

    //Sorting funds by return percentage - low to high
    sortByReturnPercentageLowToHigh(myHoldings): boolean {
        this.myHoldings = myHoldings;
        for (let i = 0; i < this.myHoldings.length; i++) {
            //Cash Asset
            if (this.myHoldings[i].class_seq == 1) {
                this.myHoldingsCash.push(this.myHoldings[i]);
                this.myHoldingsCash.sort(
                    (a, b) => a.total_percentage_value - b.total_percentage_value,
                );
            } //Fixed Income Asset
            else if (this.myHoldings[i].class_seq == 2) {
                this.myHoldingsFixedIncome.push(this.myHoldings[i]);
                this.myHoldingsFixedIncome.sort(
                    (a, b) => a.total_percentage_value - b.total_percentage_value,
                );
            } //Local Equity Asset
            else if (this.myHoldings[i].class_seq == 3) {
                this.myHoldingsLocalEquity.push(this.myHoldings[i]);
                this.myHoldingsLocalEquity.sort(
                    (a, b) => a.total_percentage_value - b.total_percentage_value,
                );
            } //Regional Equity Asset
            else if (this.myHoldings[i].class_seq == 4) {
                this.myHoldingsRegionalEquity.push(this.myHoldings[i]);
                this.myHoldingsRegionalEquity.sort(
                    (a, b) => a.total_percentage_value - b.total_percentage_value,
                );
            } //Global Equity Asset
            else if (this.myHoldings[i].class_seq == 5) {
                this.myHoldingsGlobalEquity.push(this.myHoldings[i]);
                this.myHoldingsGlobalEquity.sort(
                    (a, b) => a.total_percentage_value - b.total_percentage_value,
                );
            } //Alternatives Asset
            else if (this.myHoldings[i].class_seq == 6) {
                this.myHoldingsAlternatives.push(this.myHoldings[i]);
                this.myHoldingsAlternatives.sort(
                    (a, b) => a.total_percentage_value - b.total_percentage_value,
                );
            }
        }
        return true;
    }

    //Sorting funds by Return Value - high to low
    sortByReturnValueHighToLow(myHoldings): boolean {
        this.myHoldings = myHoldings;
        this.removeCommasFromFundTotalValue(this.myHoldings);
        for (let i = 0; i < this.myHoldings.length; i++) {
            //Cash Asset
            if (this.myHoldings[i].class_seq == 1) {
                this.myHoldingsCash.push(this.myHoldings[i]);
                this.myHoldingsCash.sort((a, b) => b.total_return - a.total_return);
            } //Fixed Income Asset
            else if (this.myHoldings[i].class_seq == 2) {
                this.myHoldingsFixedIncome.push(this.myHoldings[i]);
                this.myHoldingsFixedIncome.sort((a, b) => b.total_return - a.total_return);
            } //Local Equity Asset
            else if (this.myHoldings[i].class_seq == 3) {
                this.myHoldingsLocalEquity.push(this.myHoldings[i]);
                this.myHoldingsLocalEquity.sort((a, b) => b.total_return - a.total_return);
            } //Regional Equity Asset
            else if (this.myHoldings[i].class_seq == 4) {
                this.myHoldingsRegionalEquity.push(this.myHoldings[i]);
                this.myHoldingsRegionalEquity.sort((a, b) => b.total_return - a.total_return);
            } //Global Equity Asset
            else if (this.myHoldings[i].class_seq == 5) {
                this.myHoldingsGlobalEquity.push(this.myHoldings[i]);
                this.myHoldingsGlobalEquity.sort((a, b) => b.total_return - a.total_return);
            } //Alternatives Asset
            else if (this.myHoldings[i].class_seq == 6) {
                this.myHoldingsAlternatives.push(this.myHoldings[i]);
                this.myHoldingsAlternatives.sort((a, b) => b.total_return - a.total_return);
            }
        }
        return true;
    }

    //Remove commas form the fund total for sorting
    removeCommasFromFundTotalValue(myHoldings) {
        this.myHoldings = myHoldings;
        for (let i = 0; i < this.myHoldings.length; i++) {
            const fundTotalWithoutCommas = this.myHoldings[i].total_return.replace(/,/g, '');
            this.myHoldings[i].total_return = fundTotalWithoutCommas;
        }
        return myHoldings;
    }

    //   addCommas(myHoldings) {
    //   // format number
    //   for(let i=0;i<myHoldings.length ; i++) {
    //     if (myHoldings[i]) {
    //       myHoldings[i].total_return =myHoldings[i].total_return.replace(/\D/g, "")
    //         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    //       }
    //   }
    // }

    //Remove percentage from total percentage

    //Add commas back after sorting
    // addCommasToFundTotalValue() {
    //   for(let i=0;i<this.myHoldings.length;i++) {
    //     const fundTotalWithCommas = this.myHoldings[i].total_return;
    //     this.myHoldings[i].total_return = Number(fundTotalWithCommas).toLocaleString;
    //   }
    // }

    //Sorting funds by Return Value - low to high
    sortByReturnValueLowToHigh(myHoldings): boolean {
        this.myHoldings = myHoldings;
        this.removeCommasFromFundTotalValue(this.myHoldings);
        for (let i = 0; i < this.myHoldings.length; i++) {
            //Cash Asset
            if (this.myHoldings[i].class_seq == 1) {
                this.myHoldingsCash.push(this.myHoldings[i]);
                this.myHoldingsCash.sort((a, b) => a.total_return - b.total_return);
            } //Fixed Income Asset
            else if (this.myHoldings[i].class_seq == 2) {
                this.myHoldingsFixedIncome.push(this.myHoldings[i]);
                this.myHoldingsFixedIncome.sort((a, b) => a.total_return - b.total_return);
            } //Local Equity Asset
            else if (this.myHoldings[i].class_seq == 3) {
                this.myHoldingsLocalEquity.push(this.myHoldings[i]);
                this.myHoldingsLocalEquity.sort((a, b) => a.total_return - b.total_return);
            } //Regional Equity Asset
            else if (this.myHoldings[i].class_seq == 4) {
                this.myHoldingsRegionalEquity.push(this.myHoldings[i]);
                this.myHoldingsRegionalEquity.sort((a, b) => a.total_return - b.total_return);
            } //Global Equity Asset
            else if (this.myHoldings[i].class_seq == 5) {
                this.myHoldingsGlobalEquity.push(this.myHoldings[i]);
                this.myHoldingsGlobalEquity.sort((a, b) => a.total_return - b.total_return);
            } //Alternatives Asset
            else if (this.myHoldings[i].class_seq == 6) {
                this.myHoldingsAlternatives.push(this.myHoldings[i]);
                this.myHoldingsAlternatives.sort((a, b) => a.total_return - b.total_return);
            }
        }
        return true;
    }
    //Set the displayFlag as true for first fund in Asset class level
    displayFlagPopulationForFunds(
        myHoldings,
        isCashAssetDisplayed,
        isFixedIncomeAssetDisplayed,
        isLocalEquityAssetDisplayed,
        isRegionalEquityAssetDisplayed,
        isGlobalEquityAssetDisplayed,
        isAlternativesAssetDisplayed,
    ): boolean {
        this.isCashAssetDisplayed = isCashAssetDisplayed;
        this.isFixedIncomeAssetDisplayed = isFixedIncomeAssetDisplayed;
        this.isLocalEquityAssetDisplayed = isLocalEquityAssetDisplayed;
        this.isRegionalEquityAssetDisplayed = isRegionalEquityAssetDisplayed;
        this.isGlobalEquityAssetDisplayed = isGlobalEquityAssetDisplayed;
        this.isAlternativesAssetDisplayed = isAlternativesAssetDisplayed;
        this.myHoldings = myHoldings;
        this.myHoldings = JSON.parse(JSON.stringify(myHoldings));

        this.groupMyHoldindsToAssetClassType()

        return true;
    }

    sortingValueChanged(
        sortingType,
        myHoldings,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives,
    ) {
        this.sortingType = sortingType;
        //this.myHoldings = myHoldings;
        this.myHoldingsCash = myHoldingsCash;
        this.myHoldingsFixedIncome = myHoldingsFixedIncome;
        this.myHoldingsLocalEquity = myHoldingsLocalEquity;
        this.myHoldingsRegionalEquity = myHoldingsRegionalEquity;
        this.myHoldingsGlobalEquity = myHoldingsGlobalEquity;
        this.myHoldingsAlternatives = myHoldingsAlternatives;
        if (this.sortingType == 'sortByAlphabetAtoZ') {
            this.clearAssetClassArray(
                this.myHoldings,
                this.myHoldingsCash,
                this.myHoldingsFixedIncome,
                this.myHoldingsLocalEquity,
                this.myHoldingsRegionalEquity,
                this.myHoldingsGlobalEquity,
                this.myHoldingsAlternatives,
            );
            this.sortInAlphabeticalOrderAtoZ(this.myHoldings);
        } else if (this.sortingType == 'sortByAlphabetZtoA') {
            this.clearAssetClassArray(
                this.myHoldings,
                this.myHoldingsCash,
                this.myHoldingsFixedIncome,
                this.myHoldingsLocalEquity,
                this.myHoldingsRegionalEquity,
                this.myHoldingsGlobalEquity,
                this.myHoldingsAlternatives,
            );
            this.sortInAlphabeticalOrderZtoA(this.myHoldings);
            //  this.myHoldingsDisplayList = this.myHoldings.slice(0, 10);
        } else if (this.sortingType == 'sortByReturnPercentageHighToLow') {
            this.clearAssetClassArray(
                this.myHoldings,
                this.myHoldingsCash,
                this.myHoldingsFixedIncome,
                this.myHoldingsLocalEquity,
                this.myHoldingsRegionalEquity,
                this.myHoldingsGlobalEquity,
                this.myHoldingsAlternatives,
            );
            this.sortByReturnPercentageHighToLow(this.myHoldings);
            //this.myHoldingsDisplayList = this.myHoldings.slice(0, 10);
        } else if (this.sortingType == 'sortByReturnPercentageLowToHigh') {
            this.clearAssetClassArray(
                this.myHoldings,
                this.myHoldingsCash,
                this.myHoldingsFixedIncome,
                this.myHoldingsLocalEquity,
                this.myHoldingsRegionalEquity,
                this.myHoldingsGlobalEquity,
                this.myHoldingsAlternatives,
            );
            this.sortByReturnPercentageLowToHigh(this.myHoldings);
            //this.myHoldingsDisplayList = this.myHoldings.slice(0, 10);
        } else if (this.sortingType == 'sortByReturnValueHighToLow') {
            this.clearAssetClassArray(
                this.myHoldings,
                this.myHoldingsCash,
                this.myHoldingsFixedIncome,
                this.myHoldingsLocalEquity,
                this.myHoldingsRegionalEquity,
                this.myHoldingsGlobalEquity,
                this.myHoldingsAlternatives,
            );
            this.sortByReturnValueHighToLow(this.myHoldings);
            //this.myHoldingsDisplayList = this.myHoldings.slice(0, 10);
        } else if (this.sortingType == 'sortByReturnValueLowToHigh') {
            this.clearAssetClassArray(
                this.myHoldings,
                this.myHoldingsCash,
                this.myHoldingsFixedIncome,
                this.myHoldingsLocalEquity,
                this.myHoldingsRegionalEquity,
                this.myHoldingsGlobalEquity,
                this.myHoldingsAlternatives,
            );
            this.sortByReturnValueLowToHigh(this.myHoldings);
            //this.myHoldingsDisplayList = this.myHoldings.slice(0, 10);
        }

        this.groupAssetClassToMyHoldings(
            this.myHoldings,
            this.myHoldingsCash,
            this.myHoldingsFixedIncome,
            this.myHoldingsLocalEquity,
            this.myHoldingsRegionalEquity,
            this.myHoldingsGlobalEquity,
            this.myHoldingsAlternatives,
        );
        this.changeDisplayFlagOnSorting(
            this.myHoldings,
            this.myHoldingsCash,
            this.myHoldingsFixedIncome,
            this.myHoldingsLocalEquity,
            this.myHoldingsRegionalEquity,
            this.myHoldingsGlobalEquity,
            this.myHoldingsAlternatives,
        );
        this.changeAssetClassFlag(this.myHoldings);
        this.displayFlagPopulationForFunds(
            this.myHoldings,
            this.isCashAssetDisplayed,
            this.isFixedIncomeAssetDisplayed,
            this.isLocalEquityAssetDisplayed,
            this.isRegionalEquityAssetDisplayed,
            this.isGlobalEquityAssetDisplayed,
            this.isAlternativesAssetDisplayed,
        );

        this.myHoldingsDisplayList = this.myHoldings;

        return this.myHoldings;
    }

    changeAssetClassFlag(myHoldings) {
        this.isCashAssetDisplayed = false;
        this.isFixedIncomeAssetDisplayed = false;
        this.isLocalEquityAssetDisplayed = false;
        this.isRegionalEquityAssetDisplayed = false;
        this.isGlobalEquityAssetDisplayed = false;
        this.isAlternativesAssetDisplayed = false;
        return myHoldings;
    }

    //Clear the asset class array once the sorting is done again
    clearAssetClassArray(
        myHoldings,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives,
    ) {
        this.myHoldingsCash = myHoldingsCash;
        this.myHoldingsFixedIncome = myHoldingsFixedIncome;
        this.myHoldingsLocalEquity = myHoldingsLocalEquity;
        this.myHoldingsRegionalEquity = myHoldingsRegionalEquity;
        this.myHoldingsGlobalEquity = myHoldingsGlobalEquity;
        this.myHoldingsAlternatives = myHoldingsAlternatives;
        this.myHoldingsCash = [];
        this.myHoldingsFixedIncome = [];
        this.myHoldingsLocalEquity = [];
        this.myHoldingsRegionalEquity = [];
        this.myHoldingsGlobalEquity = [];
        this.myHoldingsAlternatives = [];
        return myHoldings;
    }

    changeDisplayFlagOnSorting(
        myHoldings,
        myHoldingsCash,
        myHoldingsFixedIncome,
        myHoldingsLocalEquity,
        myHoldingsRegionalEquity,
        myHoldingsGlobalEquity,
        myHoldingsAlternatives,
    ): boolean {
        this.myHoldingsCash = myHoldingsCash;
        this.myHoldingsFixedIncome = myHoldingsFixedIncome;
        this.myHoldingsLocalEquity = myHoldingsLocalEquity;
        this.myHoldingsRegionalEquity = myHoldingsRegionalEquity;
        this.myHoldingsGlobalEquity = myHoldingsGlobalEquity;
        this.myHoldingsAlternatives = myHoldingsAlternatives;

        this.myHoldings = [];

        // cash
        if (null !== myHoldingsCash)
            for (let i = 0; i < this.myHoldingsCash.length; i++) {
                if (i == 0) {
                    this.myHoldingsCash[i].displayFlag = true;
                } else {
                    this.myHoldingsCash[i].displayFlag = false;
                }
                this.myHoldings.push(this.myHoldingsCash[i]);
            } //Fixed Income
        if (null !== this.myHoldingsFixedIncome)
            for (let i = 0; i < this.myHoldingsFixedIncome.length; i++) {
                if (i == 0) {
                    this.myHoldingsFixedIncome[i].displayFlag = true;
                } else {
                    this.myHoldingsFixedIncome[i].displayFlag = false;
                }
                this.myHoldings.push(this.myHoldingsFixedIncome[i]);
            } //Local Equity
        if (null !== this.myHoldingsLocalEquity)
            for (let i = 0; i < this.myHoldingsLocalEquity.length; i++) {
                if (i == 0) {
                    this.myHoldingsLocalEquity[i].displayFlag = true;
                } else {
                    this.myHoldingsLocalEquity[i].displayFlag = false;
                }
                this.myHoldings.push(this.myHoldingsLocalEquity[i]);
            } //Regional Equity
        if (null !== this.myHoldingsRegionalEquity)
            for (let i = 0; i < this.myHoldingsRegionalEquity.length; i++) {
                if (i == 0) {
                    this.myHoldingsRegionalEquity[i].displayFlag = true;
                } else {
                    this.myHoldingsRegionalEquity[i].displayFlag = false;
                }
                this.myHoldings.push(this.myHoldingsRegionalEquity[i]);
            } //Global Equity
        if (null !== this.myHoldingsGlobalEquity)
            for (let i = 0; i < this.myHoldingsGlobalEquity.length; i++) {
                if (i == 0) {
                    this.myHoldingsGlobalEquity[i].displayFlag = true;
                } else {
                    this.myHoldingsGlobalEquity[i].displayFlag = false;
                }
                this.myHoldings.push(this.myHoldingsGlobalEquity[i]);
            } //Alternatives
        if (null !== this.myHoldingsAlternatives)
            for (let i = 0; i < this.myHoldingsAlternatives.length; i++) {
                if (i == 0) {
                    this.myHoldingsAlternatives[i].displayFlag = true;
                } else {
                    this.myHoldingsAlternatives[i].displayFlag = false;
                }
                this.myHoldings.push(this.myHoldingsAlternatives[i]);
            }
        return true;
    }

    addToCartEvent(values): boolean {



        const flow = values.flow;
        const index = parseFloat(values.index);
        const fundCode = values ? values.fund_code : null;

        const fundObj = this.myHoldingsDisplayList.find((obj) => {
            return obj.fund_code === fundCode;
        });
        const unit = values?.unit?.toString().replace(/,/g, '');
        const amount = values?.amount?.toString().replace(/,/g, '');
        this.cartService.callAddToCart(
            {
                csId: this.csId,
                unit: values?.unit?.toString().replace(/,/g, ''),
                amount: values?.amount?.toString().replace(/,/g, ''),
                cartData: this.cartData,
                flow: values.flow,
                index,
                fundObj: fundObj,
                screen: 'dashboard',
                utAccount: this.selectedAccounts,
                clientId: this.userData ? this.userData.customer_id : '',
                cimbStaff: this.userData ? this.userData.cimb_staff : '',
                toFundCode: values?.to_fund_code
            },
            false,
        );


        if (this.myHoldingsDisplayList) {
            const fundObj = { ...this.myHoldingsDisplayList[index] };
            let cart_list = null;
            if (flow === '001') {
                const topup = {
                    cart_net_amount: 0,
                    cart_redem_amount: amount,
                    cart_sales_charges: 0,
                    cart_sales_percentage: 0,
                    cart_switch_in_amount: 0,
                    cart_switch_out_amount: 0,
                    cart_switch_sales_charges: 0,
                    cart_switch_sales_percentage: 0,
                    to_fund_code: null,
                    cart_total_investment: amount,
                    cart_total_redem: unit,
                    cart_total_switch_in: 0,
                    cart_total_switch_out: 0,
                    cart_txn_type: '01',
                };
                cart_list = [topup];
                fundObj.cart_list = [topup];
            } else if (flow === '002') {
                const redeem = {
                    cart_net_amount: 0,
                    cart_redem_amount: amount,
                    cart_sales_charges: 0,
                    cart_sales_percentage: 0,
                    cart_switch_in_amount: 0,
                    cart_switch_out_amount: 0,
                    cart_switch_sales_charges: 0,
                    cart_switch_sales_percentage: 0,
                    to_fund_code: null,
                    cart_total_investment: amount,
                    cart_total_redem: unit,
                    cart_total_switch_in: 0,
                    cart_total_switch_out: 0,
                    cart_txn_type: '02',
                };
                cart_list = [redeem];
                fundObj.cart_list = [redeem];
            } else if (flow === '003') {
                const switchObj = {
                    cart_net_amount: 0,
                    cart_redem_amount: 0,
                    cart_sales_charges: 0,
                    cart_sales_percentage: 0,
                    cart_switch_in_amount: 0,
                    cart_switch_out_amount: amount,
                    cart_switch_sales_charges: 0,
                    cart_switch_sales_percentage: 0,
                    to_fund_code: values?.to_fund_code,
                    cart_total_investment: amount,
                    cart_total_redem: 0,
                    cart_total_switch_in: 0,
                    cart_total_switch_out: unit,
                    cart_txn_type: '03',
                };
                cart_list = [switchObj];
                fundObj.cart_list = [switchObj];
            }
            const fund_code = fundObj.fund_code;
            const myHoldingsIndex = this.myHoldingsAllAccount
                .map((e) => e.fund_code)
                .indexOf(fund_code);

            this.myHoldingsDisplayList[index] = fundObj;
            this.myHoldingsAllAccount[myHoldingsIndex] = {
                ...this.myHoldingsAllAccount[myHoldingsIndex],
                cart_list,
            };
        }
        //this.callDashboardApi();

        return true;
    }

    removeFromCartEvent(values): boolean {
        const flow = this.cartData ? this.cartData.flow : null;
        const index = parseFloat(values.index);
        const fund_code = values.fund_code;

        this.cartService.removeFromCart(
            { cartData: this.cartData, index: -1, flow: flow },
            fund_code,
        );

        if (this.myHoldingsDisplayList) {
            const fundObj = { ...this.myHoldingsDisplayList[index] };
            const cart_list = [];
            fundObj.cart_list = [];
            const fund_code_fundObj = fundObj.fund_code;
            const myHoldingsIndex = this.myHoldingsAllAccount
                .map((e) => e.fund_code)
                .indexOf(fund_code_fundObj);

            this.myHoldingsDisplayList[index] = fundObj;
            this.myHoldingsAllAccount[myHoldingsIndex] = {
                ...this.myHoldingsAllAccount[myHoldingsIndex],
                cart_list,
            };
        }
        return true;
    }

    updateAmountItem(value): boolean {
        if (value) {
            const investments =
                this?.cartData && this.cartData?.fundList ? [...this.cartData?.fundList] : [];
            const index = investments.findIndex((x) => x.fund_code === value.fund_code);

            this.cartService.updateCartItem(
                {
                    cartData: this.cartData,
                    index: index,
                    flow: this.cartData && this.cartData.flow ? this.cartData.flow : '',
                    fund_code: value.fund_code,
                    toFundCode: value?.to_fund_code
                },
                index,
                parseFloat(value?.amount?.toString()?.replace(/,/g, '')),
                parseFloat(value?.unit?.toString()?.replace(/,/g, '')),
            );
        }
        return true;
    }

    accountListChangeEvent(value): boolean {
        if (value) {
            this.selectedAccounts = value;
            const accountList = [...this.portfolioAccount];
            let listItem;
            let listItemSelected = null;
            this.portfolioAccountTemp = [];
            if (accountList && accountList.length >= 1) {
                for (let m = 0; m < accountList.length; m++) {
                    listItem = { ...accountList[m] };
                    if (listItem.ut_account_no === value) {
                        listItemSelected = listItem;
                        listItem.default_ind = 'Y';
                    } else {
                        listItem.default_ind = 'N';
                    }
                    this.portfolioAccountTemp.push(listItem);
                }
                this.selectedUtAccountObj = listItemSelected;
                this.selectedAccountChangeUtIndicator(listItemSelected);
                this.portfolioAccount = this.portfolioAccountTemp;
                this.store.dispatch(new DashbordAction.UpdateCartUTAccount(value));
                this.store.dispatch(new UserAction.SelectedUnitTrustAccount(value));
            }
        }

        return true;
    }

    navigateEventRisk(route): boolean {
        const page = route && route.page ? route.page : '';
        if (page === path.RISK_PROFILE_RESULTS) {
            this.learnMoreClickEvent();
        } else if (page === path.RISK_PROFILE_QUESTIONS) {
            this.riskRedoClickEvent();
        }
        return true;
    }

    clearCartAndContinueDataEvent(values): boolean {
        if (values) {
            const flow = values.flow;
            const index = parseFloat(values.index);
            const fundObj = {
                ...this.myHoldingsDisplayList[index],
            };

            this.cartService.callAddToCart(
                {
                    csId: this.csId,
                    unit: values.unit,
                    amount: values.amount,
                    cartData: this.cartData,
                    flow: values.flow,
                    index,
                    fundObj: fundObj,
                    screen: 'dashboard',
                    utAccount: this.selectedAccounts,
                    clientId: this.userData ? this.userData.customer_id : '',
                    cimbStaff: this.userData ? this.userData.cimb_staff : '',
                    toFundCode: values?.to_fund_code
                },
                true,
            );
            if (this.myHoldingsDisplayList) {
                const fundObj = { ...this.myHoldingsDisplayList[index] };
                if (flow === '001') {
                    const topup = {
                        cart_net_amount: 0,
                        cart_redem_amount: values.amount,
                        cart_sales_charges: 0,
                        cart_sales_percentage: 0,
                        cart_switch_in_amount: 0,
                        cart_switch_out_amount: 0,
                        cart_switch_sales_charges: 0,
                        cart_switch_sales_percentage: 0,
                        cart_total_investment: values.amount,
                        cart_total_redem: values.unit,
                        cart_total_switch_in: 0,
                        cart_total_switch_out: 0,
                        cart_txn_type: '01',
                    };
                    fundObj.cart_list = [topup];
                } else if (flow === '002') {
                    const redeem = {
                        cart_net_amount: 0,
                        cart_redem_amount: values.amount,
                        cart_sales_charges: 0,
                        cart_sales_percentage: 0,
                        cart_switch_in_amount: 0,
                        cart_switch_out_amount: 0,
                        cart_switch_sales_charges: 0,
                        cart_switch_sales_percentage: 0,
                        cart_total_investment: values.amount,
                        cart_total_redem: values.unit,
                        cart_total_switch_in: 0,
                        cart_total_switch_out: 0,
                        cart_txn_type: '02',
                    };
                    fundObj.cart_list = [redeem];
                }
                this.myHoldingsDisplayList[index] = fundObj;
            }
        }

        return true;
    }

    clearAllCart(values): boolean {
        if (values) {
            this.selectedAccountChange(values);
            this.store.dispatch(new CartActions.DeleteCart(this.customerID));
            this.store.dispatch(new CartActions.ClearCart(true));
        }

        return true;
    }

    selectedAccountChange(value) {
        this.unitTrustAccountNumberChanged = true;
        this.selectedUnittrustAccountNumber = value;
        this.filterFundListByAccountNumber();
        //Set value unitTrustAccountNumberChanged in myHoldings to fire onChanges
        this.myHoldings.unitTrustAccountNumberChanged = true;
        //Set pageNumber to 1 when accunt is changed
        this.pageNumber = 1;

        this.sortingValueChanged(
            this.sortingType,
            this.myHoldings,
            this.myHoldingsCash,
            this.myHoldingsFixedIncome,
            this.myHoldingsLocalEquity,
            this.myHoldingsRegionalEquity,
            this.myHoldingsGlobalEquity,
            this.myHoldingsAlternatives,
        )

        this.myHoldings.unitTrustAccountNumberChanged = true;

        this.myHoldingsDisplayList.unitTrustAccountNumberChanged = true;

        this.selectedAccounts = value;
        this.store.dispatch(new UserAction.SelectedUnitTrustAccount(value));
        this.accountOptions = '3';
        setTimeout(() => {
            if (this.cartFlow === '01') {
                this.accountOptions = '1';
            } else if (this.cartFlow === '02') {
                this.accountOptions = '2';
            } else if (this.cartFlow === '03') {
                this.accountOptions = '3';
            } else {
                this.accountOptions = '1';
            }
        });
    }

    selectedAccountChangeUtIndicator(value): boolean {
        this.joinAndUtAccountIndicator = false;
        this.joinOrUtAccountIndicator = false;

        this.checkJointorUTAccountIndicator(value);

        //TODO need to confirm OR and Sole prop need to remove from ngonit once added here
        // if (
        //   this.userData.sole_prop === 'P' ||
        //   this.userData.casa_indicator === 'Y'
        // ) {
        //   this.riskProfileRedoAllowed = false;
        // } else {
        //   this.riskProfileRedoAllowed = true;
        // }

        return true;
    }

    checkJointorUTAccountIndicator(val) {
        if (val && val.ut_joint_indicator === '01') {
            if (val.ut_account_type === 'A') {
                //Join AND
                this.joinAndUtAccountIndicator = true;
            } else {
                this.joinAndUtAccountIndicator = false;
            }
        } else if (val && val.ut_joint_indicator === '02') {
            if (val.ut_account_type === 'A') {
                //Join AND
                this.joinAndUtAccountIndicator = true;
            } else {
                this.joinAndUtAccountIndicator = false;
                //Join OR
                if (val.ut_account_type === 'P') {
                    this.joinOrUtAccountIndicator = true;
                } else {
                    this.joinOrUtAccountIndicator = false;
                }
            }
        }
    }

    updateDashboardRedeemAmount(event) {
        if (event) {


            const fundList =
                this?.cartData && this.cartData?.fundList ? [...this.cartData?.fundList] : [];

            const funIndex = fundList.findIndex((x) => x.fund_code === event.fund_code);

            const amount = event?.amount?.toString()?.replace(/,/g, '') ?? "0.00";
            const unit = event?.unit?.toString()?.replace(/,/g, '') ?? "0.00";
            this.cartService.updateCartItem(
                {
                    cartData: this.cartData,
                    index: funIndex,
                    flow: this.cartData && this.cartData.flow ? this.cartData.flow : '',
                },
                funIndex,
                parseFloat(amount),
                parseFloat(unit),


            );
        }
    }
}
