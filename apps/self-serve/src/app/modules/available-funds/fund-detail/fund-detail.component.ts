import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/state/reducers';
import * as AvailableFundsAction from '../../../core/state/availableFunds/availableFunds.action';
import { AppService } from '../../../core/services/app.service';
import { DialogAlertComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-alert/dialog-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { getFundDetail } from '../+state/available-funds.selectors';
import { CartList, Fund } from '@cimb/shared/models';
import { environment } from '../../../../environments/environment';

import { CartService } from '../../../core/services/cart/cart.service';
import * as CartActions from '../../../core/state/cart/cart.actions';

import * as availableFundsSelector from '../+state/available-funds.selectors'
import {
    fundPerHistory
} from '../+state/available-funds.actions';
import { FundPerfHistory } from '../../../modules/available-funds/models/fund-performance-history.model'
import * as LandingPageSelector from '../../../core/state/landing-page/landing-page.selectors'
import { Store as UserState } from '../../../core/state/user/user.reducer';
import { Store as CartState } from '../../../core/state/cart/cart.reducer';
import { AnalyticService } from '@cimb/shared/services';
import * as WealthDashboardActions from '../../../core/state/wealth-dashboard/wealth-dashboard.actions'
import { InvestmentStatus, LandingPageStatus } from '../../../core/model/landing-page-status.model';
import * as LandingPageActions from '../../../core/state/landing-page/landing-page.actions';


export class DocumentDownloadParams {
    msUrl: any;
    documentName: any;
}

export class Documents {
    name: string;
    url: string;
}

@Component({
    selector: 'cimb-fund-detail',
    templateUrl: './fund-detail.component.html',
    styleUrls: ['./fund-detail.component.scss'],
})
export class FundDetailComponent implements OnInit, OnDestroy {
    selectedFundId = '';
    selectedFund: Fund;
    assetType;
    salesCharge;
    compliance = 'No';
    disclaimer =
        'Disclaimer: © 2020 Morningstar. All Rights Reserved. The information, data, analyses and opinions (“Information”) contained herein: (1) include the proprietary information of Morningstar and its content providers; (2) may not be copied or redistributed except as specifically authorised; (3) do not constitute investment advice; (4) are provided solely for informational purposes; (5) are not warranted to be complete, accurate or timely; and (6) may be drawn from fund data published on various dates. Morningstar is not responsible for any trading decisions, damages or other losses related to the Information or its use. Please verify all of the Information before using it and don’t make any investment decision except upon the advice of a professional financial adviser. Past performance is no guarantee of future results. The value and income derived from investments may go down as well as up.';
    price = '';
    past1Mnth: any = '';
    past3Mnth: any = '';

    pageTitle = '';
    label = '';
    isFundHoliday = false;
    isBackButtonEnabled = true;
    state$: Observable<any>;
    getDocumentDownloadObservable: Observable<any>;
    getDocumentDownloadSubscription: Subscription;

    documentDownloadParams: DocumentDownloadParams;
    response: any;
    currentUrl: string;
    show: boolean;
    showLoader: any;
    getDocumentResponse: any;
    docName: any;
    documentDownloaded: boolean;
    isDialogPopUpOpened: boolean;

    fundDetailSub: Subscription;
    documentNames: Array<Documents> = [];
    r2Enabled = false;
    fundPerList: any;

    fundPerforHistorySubs : Subscription;
    funPerforHistory$: Observable<any>;
    funPerforHistorySub: Subscription;
    cartObservable: Observable<any>;
    carstSubscription: Subscription;
    totalFundsCount = 0;

    userObservable :Observable<any>;
    userSubscription : Subscription;
    userData: UserState;
    selectedAccounts = '';
    cartAmount = 0;
    cartUTAccount ;
    cartData: CartState;
    csId ;
    flowText;
    flowCart;
    solePropIndicator;
    currentHolding;


    pastFundPerfHistory: FundPerfHistory;
    openedFromLandingPage  = false;

    storeSubscription: Subscription;
    userType;
    cimbStaff;
    landingPageStatus: LandingPageStatus;
    showProgressBar = false
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private store: Store<fromStore.AppState>,
        private dialog: MatDialog,
        private appService: AppService,
        private cartService: CartService,
        private analyticService: AnalyticService
    ) {
        this.currentUrl = this.appService.getPreviousUrl();
    }

    ngOnInit() {
        this.store.dispatch(WealthDashboardActions.settingsData());
        this.r2Enabled = environment.r2Enabled;

        this.fundDetailSub = this.store
            .select(getFundDetail)
            .subscribe((fundDetailData: Fund) => {
                this.selectedFundId = fundDetailData['fund_code'];
                this.selectedFund = fundDetailData;

                if (this.selectedFund != undefined) {
                    this.populateFundData();
                }

                //Populate document names
                this.populateFundDocumentNames();

            });

        this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
            this.openedFromLandingPage = result.searchFundsFromLandingPage;
        })

        this.userObservable = this.store.select('userReducer');

        this.userSubscription = this.userObservable.subscribe((users) => {
            this.userData = users;
            if (users && users.userType === 'NTP') {
                this.selectedAccounts = 'A80111993';
            } else {
                this.selectedAccounts = users && users.unitTrustAccount ? users.unitTrustAccount : null;
            }
            if(this.userData) {
                this.solePropIndicator = this.userData.user.sole_prop;
                this.userType = this.userData.userType;
                this.store.dispatch(new CartActions.GetCartByClientId(this.userData.user.customer_id));
            }
        });
        
        //To get the selected account from Investment dashboard
        this.cartObservable = this.store.select('cartReducer');

        this.carstSubscription = this.cartObservable.subscribe((data) => {

            this.cartData = data;
            this.csId = data.csId;
            this.flowText = data.flow_text;
            this.flowCart = data.flow;
            this.totalFundsCount = data.totalFundsCount;

            if (this.userData && this.userData.userType === 'NTP') {
                this.cartUTAccount = 'A80111993';
            } else {
                this.cartUTAccount = data.unitTrustAccount;
            }

            if(data.fundList != null) {

                const cartFundList = data.fundList.find(fund => {
                    return fund.fund_name.toUpperCase() === this.selectedFund.fund_name.toUpperCase();
                });
                
                if(cartFundList) {
                    //update cart_list data after any cart transaction
                    
                    this.cartAmount = cartFundList.card_amount

                    let existingCartList = {};

                    if(this.selectedFund?.cart_list?.length) {
                        existingCartList = this.selectedFund.cart_list[0];
                    }
                    //convert 001 to 01, 002 to 02 and 003 to 03
                    const flow = cartFundList.flow.slice(1, 3);

                    const updatedCartList = [{
                        ...existingCartList as CartList,
                        cart_net_amount: cartFundList.card_net_amount,
                        cart_redem_amount: cartFundList.card_redemption_amount,
                        cart_sales_charges: cartFundList.card_sale_charge,
                        cart_sales_percentage: cartFundList.totalSalesCharges,
                        cart_switch_in_amount: cartFundList.switchInAmount,
                        cart_switch_out_amount: cartFundList.switchOutAmount,
                        cart_switch_sales_charges: cartFundList.switchSalesCharges,
                        cart_switch_sales_percentage: cartFundList.switch_sales_percentage,
                        to_fund_code: cartFundList.toFundCode,
                        cart_total_investment: cartFundList.totalInvestment,
                        cart_total_redem: cartFundList.totalRedem,
                        cart_total_switch_in: cartFundList.totalSwitchIn,
                        cart_total_switch_out: cartFundList.totalSwitchOut,
                        cart_txn_type: flow,
                    }];

                    //assign new cart_ilst data to fund object
                    this.selectedFund = {
                        ...this.selectedFund,
                        cart_list: updatedCartList
                    };
                    
                }
            }

        });

        this.store.dispatch(new CartActions.ToggleCartFooter(true));

        const updatedSelectedFund = {
            ...this.selectedFund,
            units_held_number: this.selectedFund?.unit_held ? parseFloat(this.selectedFund.unit_held.toString().replace(/,/g, '')) : 0.00
        }

        this.selectedFund = updatedSelectedFund;
        this.store.select(LandingPageSelector.selectLandingPageStatus).subscribe((result) => {
            this.landingPageStatus = result;
            if(this.userData.userType === 'NTP' && this.landingPageStatus.landingStatus === 'Y') {
                this.showProgressBar = true
            }
        });
    }

    fundPerfHistory() {
        this.store.dispatch(fundPerHistory({ fundCode: this.selectedFund.fund_code }));
        this.store.select(availableFundsSelector.getFundPerHistory)
            .subscribe((result) => {
                if (result) {
                    this.pastFundPerfHistory = result;
                    this.past1Mnth = this.pastFundPerfHistory['thirtyDaysNavPriceHistory'];
                    this.past3Mnth = this.pastFundPerfHistory['ninetyDaysNavPriceHistory'];
                }
            });
    }

    populateFundDocumentNames() {
        if (
            this.selectedFund != undefined &&
            this.selectedFund.fund_document != undefined &&
            this.selectedFund.fund_document.length > 0
        ) {

            for (let i = 0; i < this.selectedFund.fund_document.length; i++) {
                const document = new Documents();
                document.name = this.selectedFund.fund_document[i].documentName;
                document.url = this.selectedFund.fund_document[i].msUrl;
                this.documentNames.push(document)
            }
        }
    }

    ngOnDestroy(): void {
        this.fundDetailSub?.unsubscribe();
        this.userSubscription?.unsubscribe();
        this.carstSubscription?.unsubscribe();
        // this.funPerforHistorySub.unsubscribe();
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    populateFundData() {
        this.setFundValues(this.selectedFund, this.selectedFundId);
    }

    setFundValues(selectedFund, selectedFundId): boolean {
        this.selectedFund = selectedFund;
        this.selectedFundId = selectedFundId;

        this.assetType = this.selectedFund.asset_class;
        this.salesCharge = this.selectedFund.sales_charge;

        if (this.selectedFund.syariah_complaint === 'C') {
            this.compliance = 'Yes';
        }

        this.price = this.selectedFund.nav_price;
        this.fundPerfHistory();
        this.pageTitle = this.selectedFund.fund_name;
        if ((<any>this.selectedFund).class_name === undefined) {
            this.label = this.selectedFund.asset_class;
        } else {
            this.label = (<any>this.selectedFund).class_name;
        }

        if (this.selectedFund.fund_status === 'I') {
            this.isFundHoliday = true;
        }
        return true;
    }

    documentDownload(documentName): boolean {
        this.documentDownloaded = false;
        this.showLoader = true;
        const documentDownloadParams = new DocumentDownloadParams();
        this.docName = documentName;

        if (documentName != undefined) {
            //Iterate over the fund document in selected fund to see which fund document is downloaded

            if (
                this.selectedFund != undefined &&
                this.selectedFund.fund_document != undefined &&
                this.selectedFund.fund_document.length > 0
            ) {
                for (let i = 0; i < this.selectedFund.fund_document.length; i++) {
                    if (this.docName == this.selectedFund.fund_document[i].documentName) {
                        documentDownloadParams.msUrl = this.selectedFund.fund_document[i].msUrl;
                        documentDownloadParams.documentName =
                            this.selectedFund.fund_document[i].documentName;
                    }
                }
            }
        }

        //Call API for document download
        //Call document download API
        this.store.dispatch(new AvailableFundsAction.StoreDocument(null));
        this.isDialogPopUpOpened = false;
        this.getDocumentDownloadObservable = this.store.select('availableFundsReducer');
        this.getDocumentDownloadSubscription = this.getDocumentDownloadObservable.subscribe(
            (data) => {
                this.show = true;

                if (
                    data != undefined &&
                    data.downloadedDocument != undefined &&
                    data.downloadedDocument.status == '404' &&
                    !this.isDialogPopUpOpened
                ) {
                    this.isDialogPopUpOpened = true;
                    this.dialog.open(DialogAlertComponent, {
                        panelClass: ['custom-dialog', 'dialog-inverse-button'],
                        maxWidth: '600px',
                        autoFocus: false,
                        backdropClass: 'backdrop-modal',
                        data: {
                            dialogImage: '<em class="icon-warning">',
                            dialogHeading: 'Download Failed',
                            dialogContent:
                                '<p>Sorry this file appears to be missing. Please try again later or reach out <br/> to our customer support.</p>',
                            dialogButtonProceed: true,
                            dialogButtonProceedText: 'Okay',
                        },
                    });
                }

                if (data != undefined && data.downloadedDocument != undefined) {
                    if (data.downloadedDocument.status == undefined) {
                        this.showLoader = false;
                        if (
                            documentDownloadParams.documentName == this.docName &&
                            !this.documentDownloaded
                        ) {
                            this.documentDownloaded = true;
                            this.downloadDocument(data, documentName);
                        }
                    } else {
                        documentName = '';
                        this.showLoader = false;
                    }
                }
            },
        );

        this.store.dispatch(new AvailableFundsAction.GetDocument(documentDownloadParams));
        return true;
    }

    downloadDocument(data, documentName): boolean {
        if (data != undefined && data.downloadedDocument != undefined && documentName != '') {
            const response = data.downloadedDocument;
            const a = document.createElement('a');
            const file = new Blob([response], { type: 'application/pdf' });

            const url = URL.createObjectURL(file);
            //window.open(url);
            a.href = url;
            a.download = documentName + '.pdf';
            a.click();
            URL.revokeObjectURL(url);
            a.remove();
        }

        return true;
    }

    backButtonEvent() {
        if (this.currentUrl === '/dashboard;tab=0') {
            this.currentUrl = '/dashboard';
        }
        this.router.navigate([this.currentUrl]);
    }
    addToCartEvent(values, switchCart = false): boolean  {

        const fundStatus: string = this.selectedFund.fund_status;
        const flow: string = values.flow;
        if((fundStatus === "SO" || fundStatus === "SOHO") && flow !== '002' && flow !== '003'){
            this.dialog.open(DialogAlertComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                backdropClass: 'backdrop-modal',
                autoFocus: false,
                data: {
                  dialogImage: '<em class="icon-danger"></em>',
                  dialogHeading: 'Unable to Transact',
                  dialogContent:
                    '<p>We are sorry to inform you that only redeem is allowed for this fund at the moment.</p>',
                  dialogButtonCancelText: 'Okay',
                  dialogButtonCancel: false,
                  dialogButtonProceed: true,
                  dialogButtonProceedText: 'Okay',
                },
              });
            this.analyticService.loadPopUpAnalytics('Unable to Transact');
        } else if(fundStatus === "HO" || (flow === '002' && fundStatus === "BO")) {
           this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
              dialogImage: '<em class="icon-danger"></em>',
              dialogHeading: 'Unable to Transact',
              dialogContent:
                '<p>We are sorry to inform you that this fund is no longer eligible for purchase.</p>',
              dialogButtonCancel: false,
              dialogButtonCancelText: 'Okay',
              dialogButtonProceed: true,
              dialogButtonProceedText: 'Okay',
            },
          });
          this.analyticService.loadPopUpAnalytics('Unable to Transact');
        } else {

            const index = parseFloat(values.index);
            const unit = values?.unit?.toString().replace(/,/g, '');
            const amount = values?.amount?.toString().replace(/,/g, '');
            if (this.userData && this.userData.userType === 'NTP') {
                this.cimbStaff = '2';
            } else {
                this.cimbStaff = this.userData ? this.userData.user.cimb_staff : ''
            }
            this.cartService.callAddToCart(
                {
                    csId: this.csId,
                    unit: unit,
                    amount: amount,
                    cartData: this.cartData,
                    flow: values.flow,
                    index,
                    fundObj: this.selectedFund,
                    screen: 'fundDetail',
                    utAccount: this.selectedAccounts,
                    clientId: this.userData ? this.userData.user.customer_id : '',
                    cimbStaff: this.cimbStaff,
                    toFundCode: values?.to_fund_code
                },
                switchCart,
            );
            if(this.userData && this.userData.userType === 'NTP') {
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

        }
        return true;
    }

    clearCartAndContinueDataEvent(values) {
        this.addToCartEvent(values, true);
    }

    removeFromCartEvent(values) {
        const fund_code = values.fund_code;
        const flow = this.cartData ? this.cartData.flow : null;


        this.cartService.removeFromCart(
            { index: -1, flow: flow ,cartData: this.cartData, },
            fund_code,
        );

    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    updateAmountItem(value) {
        if (value) {

            const fundList =
                this?.cartData && this.cartData?.fundList ? [...this.cartData?.fundList] : [];

            const funIndex = fundList.findIndex((x) => x.fund_code === value.fund_code);
            this.cartService.updateCartItem(
                {
                    index: funIndex,
                    flow: this.cartData && this.cartData.flow ? this.cartData.flow : '',
                    fund_code: value.fund_code,
                    cartData: this.cartData,
                    toFundCode: value?.to_fund_code
                },
                funIndex,
                parseFloat(value?.amount?.toString()?.replace(/,/g, '')),
                parseFloat(value?.unit?.toString()?.replace(/,/g, '')),


            );
        }

    }
    startInvestmentEvent() {
        this.router.navigate(['/landing-page']);

    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    updateAmountItemForRedeem(value) {

        if (value) {


            const fundList =
                this?.cartData && this.cartData?.fundList ? [...this.cartData?.fundList] : [];

            const funIndex = fundList.findIndex((x) => x.fund_code === value.fund_code);

            const amount = value?.amount?.toString()?.replace(/,/g, '') ?? "0.00";
            const unit = value?.unit?.toString()?.replace(/,/g, '') ?? "0.00";
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
