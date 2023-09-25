import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../../core/state/reducers';

import * as CartActions from '../../core/state/cart/cart.actions';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAlertComponent, MintSnackbarComponent } from '@cimb/mint';
import { AppService } from '../../core/services/app.service';
import { PostTransaction } from '../../core/model/post.transaction.model';
import { map } from 'rxjs/operators';
import * as LandingPageSelector from 'apps/self-serve/src/app/core/state/landing-page/landing-page.selectors';
import { FinalStatus, LandingPageStatus } from '../../core/model/landing-page-status.model';
import * as LandingPageActions from 'apps/self-serve/src/app//core/state/landing-page/landing-page.actions';
import { ClicksInfo } from '../../core/state/clicks/clicks.models';
import { getClicksCustomerInfo } from '../../core/state/clicks/clicks.selectors';
import * as CifAction from '../../core/state/cifInquiry/cifInquiry.actions';
import { getDayOfWeek, setEventAndDigitalData, getTimeOfDay } from '@cimb/common';
import { AnalyticService } from '@cimb/shared/services';
import { CartDetails } from '../../core/model/cart_info.models';
import { MatDialog } from '@angular/material/dialog';
import * as LogoutAction from '../../../app/core/state/logout/logout.action';
import { BankAccount } from '../../core/model/customerDetail.model';
import { EventService } from '@cimb/core';
import * as AccountOpeningActions from '../../core/state/account-opening/account.actions';
import * as ClicksActions from '../../core/state/clicks/clicks.actions';

@Component({
    selector: 'cimb-review-purchase',
    templateUrl: './review-purchase.component.html',
    styleUrls: ['./review-purchase.component.scss'],
})
export class ReviewPurchaseComponent implements OnInit, OnDestroy {
    pageTitle = 'Checkout';

    investments: any;
    cartDetails: CartDetails[] = [];

    totalFund: number;
    totalSalesCharge: number;
    totalNetInvestmentAmount: number;
    totalAmount: number;

    phoneNumber = '+60 xxxxx0000';

    pagwTitle = 'Review and Complete Purchase';
    cardTitle = 'Summary';

    cardAccountTitle = 'Select Payment Account';
    cardAccountSelectionPlaceholder = '';

    cardTtileSelectedInvestment = 'Selected Investment';

    isBackButtonEnabled = true;

    cartData: any;
    cartObservable: Observable<any>;
    cartSubscription: Subscription;
    totalAmountVal = '0.00';
    totalFundsCountVal = 0;
    highRiskCount = 0;
    unitTrustAccount = '';

    hasRedeemOption = false;

    transactionSuccessStatus = true;

    accountLists: BankAccount[];

    accountSelectObj;
    accountSelectNumber = '';

    switchInHigherFundRiskAck: string
    topUpHigherFundRiskAck: string;
    userData: any;
    userObj: any;
    userObservable: Observable<any>;
    userSubscription: Subscription;

    accountOpeningObserble$: Observable<any>;
    accountOpeningSubscription: Subscription;

    dashboardObservable: Observable<any>;
    dashboardSubscription: Subscription;
    customerName: '';
    flow = 'topup';
    totalRedemptionUnits = 0;
    totalRedemptionAmount = 0;
    totalSwitchOutUnits = 0;
    totalSwitchInUnits = 0;
    customerMobileNumber = null;
    verifyResponse = null;
    verifyResponseMessage = null;
    verifyResponseReferenceNumber = null;

    postAllTransactionResponse = null;
    postAllTransactionSuccessStatus = false;

    otpResponse = null;
    otpResponseMessage = null;
    currentCustomerType = 'ETP';
    tagErrorShow = false;

    postParamObj;
    postParamList = [];

    callPostAPI = false;
    callingApi;
    flowConst = '';

    canEnableConfirmButton = false;
    enableConfirmButton = true;
    casa_account_balance = 0.0;

    externalErrorMsg = '';
    isExternalError = false;

    customer_id = null;

    selectedAccountIndex = -1;
    cimbStaffs = 'N';
    joinAndUtAccountIndicator = false;
    joinOrUtAccountIndicator = false;
    currentUrl: string;
    factaEnabled = true;
    activeCasa = true;
    tagEntredCompleted = false;
    requestTagCanEnabled = false;
    disableConfirmButtonComponent = false;
    tagErrorMessageText = '';
    requestParams: any;
    accountSelected = false;
    jointIndicatorValue = '';
    userType: string;
    clicksInfo: ClicksInfo;
    cifInquiryApiCall = false;
    cifInquiryReducerObservable: Observable<any>;
    cifInquiryReducerSubscription: Subscription;
    enableRequestNumber = false;
    customerType = '';
    ipAddress = '';
    cartSummaryId: 0;
    verifyAttempt = 0;

    noProgressStep: boolean;

    schedulerMsg = '';
    ackButtonValue: string;
    clicksInfoData: any;
    constructor(
        private router: Router,
        private store: Store<fromStore.AppState>,
        public datepipe: DatePipe,
        private snackbar: MatSnackBar,
        private appService: AppService,
        private analyticService: AnalyticService,
        public dialog: MatDialog,
        private _eventService: EventService,
    ) {
        this.currentUrl = this.appService.getPreviousUrl();
    }

    ngOnInit(): void {
        this.loadData();
        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.store.dispatch(new CartActions.ToggleCartIconHeader(false));
        if (this.flow === '001') {
            const pageName = 'Wealth: UT Purchase Checkout';
            const type = 'Unit Trust Purchase';
            this.loadPurchaseAdobeAnalytics(pageName, type);
        } else if (this.flow === '002') {
            const pageName = 'Wealth: UT Redeem Checkout';
            const type = 'Unit Trust Redemption';
            this.loadPurchaseAdobeAnalytics(pageName, type);
        } else if (this.flow === '003') {
            const pageName = 'Wealth: UT Switch Checkout';
            const type = 'Unit Trust Switching';
            this.loadPurchaseAdobeAnalytics(pageName, type);
        }
    }

    loadPurchaseAdobeAnalytics(pageName, type) {
        this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
            this.currentCustomerType = result?.landingPageStatus?.accountStatus === 'Y' || this.customerType === 'ETP' ? 'ETP' : 'NTP';
        });
        const day = getDayOfWeek();
        const dayTime = getTimeOfDay();
        setEventAndDigitalData(
            {
                wealthEvent: 'wealth:checkout'
            },
            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Unit Trust Module',
                            pageType: 'Checkout'
                        },
                        pageInfo: {
                            pageName: pageName,
                            day: day
                        }
                    },
                    user: {
                        loginStatus: 'logged-in',
                        customerType: this.currentCustomerType
                    },
                    sales: {
                        saleStartTime: dayTime,
                        type: type
                    },
                    product: this.cartDetails,
                    cart: {
                        quantity: this.totalFundsCountVal
                    }
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.callingApi = null;
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
        if (this.dashboardSubscription) {
            this.dashboardSubscription.unsubscribe();
        }
        if (this.accountOpeningSubscription) {
            this.accountOpeningSubscription.unsubscribe();
        }
        if (this.cifInquiryReducerSubscription) {
            this.cifInquiryReducerSubscription.unsubscribe();
        }
    }

    loadData(): boolean {
        this.canEnableConfirmButton = false;
        this.accountSelected = false;
        this.cartObservable = this.store.select('cartReducer');
        this.cartSubscription = this.cartObservable.subscribe((data) => {
            this.cartData = data;
            this.updateData(data);
        });
        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.userType = users.userType;
            this.customerType = users.userType;
            this.loadUserData(users);
            this.checkIfNTP(this.userType);
        });

        this.dashboardObservable = this.store.select('dashbordReducers');
        this.dashboardSubscription = this.dashboardObservable.subscribe((data) => {
            if (data && data.casa_account) {
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                this.accountLists = [...data.casa_account];
            }
        });

        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        const accountOpeningObserble$ = this.store.select('accountOpeningReducer');
        this.accountOpeningSubscription = accountOpeningObserble$
            .pipe(
                map((res) => {
                    if (res && res.userDetailsAPIResponseData) {
                        this.accountLists = [...res.userDetailsAPIResponseData.bankAccounts];
                    }
                }),
            )
            .subscribe();
        /* istanbul ignore next */ //Used to Ignore the Next line in spect. Dont remove this line.
        if (this.accountLists?.length === 0) {
            this.store.select('clicks').subscribe((clicksData) => {
                this.clicksInfoData = clicksData;
            });
            this.store.dispatch(
                new AccountOpeningActions.GetUserDetailsApi(this.clicksInfoData.cifNumber),
            );
        }
        this.store.select(getClicksCustomerInfo).subscribe((info) => {
            this.clicksInfo = info;
            this.ipAddress = info.ipAddress;
        });
        return true;
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    loadUserData(users): boolean {
        if (users) {
            this.userData = users;
            this.userObj = this.userData.user;
            //this.unitTrustAccount = this.userData.unitTrustAccount;
            // this.customerName = this.userData.user.customer_name;
            this.customerName = this.userData.customer_name;
            this.cimbStaffs = this.userObj.cimb_staff;
            this.customer_id =
                this.userData && this.userObj.customer_id
                    ? this.userObj.customer_id.toString()
                    : '';
            this.customerMobileNumber = this.userData?.user?.customer_mobile_no
                ? this.userData?.user?.customer_mobile_no
                : null;

            this.cifInquiryReducerObservable = this.store.select('cifInquiryReducer');
            this.cifInquiryReducerSubscription = this.userObservable.subscribe((info) => {
                if (info && info.phoneNumber) {
                    this.enableRequestNumber = true;
                    this.customerMobileNumber = info.phoneNumber;
                }
            });
            //this.customerMobileNumber = null;
            //TODO remove 6 from mobile number temp fix need fix one api can handle
            if (this.customerMobileNumber) {
                const firstChar = this.customerMobileNumber?.toString()?.substring(0, 1) ?? null;
                this.enableRequestNumber = true;
                if (firstChar && firstChar === '6') {
                    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                    this.customerMobileNumber = this.customerMobileNumber?.toString()?.substring(1);
                }
            } else {
                this.enableRequestNumber = false;
                if (!this.cifInquiryApiCall) {
                    this.store.select(getClicksCustomerInfo).subscribe((info) => {
                        this.clicksInfo = info;
                        this.callCifInquiryApi();
                    });
                    this.cifInquiryApiCall = true;
                }
            }
            if (this.userObj.join_or_ut_account === 'Y') {
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                this.joinOrUtAccountIndicator = true;
            } else {
                this.joinOrUtAccountIndicator = false;
            }
            if (this.userObj.join_and_ut_account === 'Y') {
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                this.joinAndUtAccountIndicator = true;
            } else {
                this.joinAndUtAccountIndicator = false;
            }
        }

        return true;
    }

    updateData(data): boolean {
        if (data) {
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
            this.unitTrustAccount = data.unitTrustAccount ? data.unitTrustAccount : null;
            this.totalAmountVal = data.totalAmount.toString();
            this.totalFundsCountVal = data.totalFundsCount;
            this.highRiskCount = data.higherRiskFundCategory;

            this.investments = data.fundList;
            this.cartSummaryId = data.cartSummaryId;
            this.totalFund = data.totalFundsCount;
            this.totalAmount = data.totalAmount;
            this.totalSalesCharge = data.totalSalesCharges;
            this.totalNetInvestmentAmount = data.totalNetInvestmentAmount;
            this.flow = data.flow;
            this.schedulerMsg = data.scheduler_msg;

            const len = this.investments ? this.investments.length : -1;
            if (this.investments && len >= 1) {
                for (let i = 0; i < len; i++) {
                    const postParamObj = this.investments[i];
                    this.cartDetails[i] = {
                        productName: this.flow === '003' ? postParamObj.to_fund_name : postParamObj.fund_name, fundShariah: '', fundClass: '', fundCategory: this.flow === '003' ? postParamObj.to_fund_risk_name : postParamObj.risk_name,
                        productID: this.flow === '003' ? postParamObj.toFundCode : postParamObj.fund_code, totalValue: '',
                        category: 'Unit Trust', price: ''
                    }
                }
            }
            this.hasRedeemOption = data.flow_text === 'redeem' ? true : false;
            this.totalRedemptionUnits = data.total_redemption_units;
            this.totalRedemptionAmount = data.total_redemption_amount;

            this.totalSwitchOutUnits = data.total_switch_out_units;
            this.totalSwitchInUnits = data.total_switch_in_units;

            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
            this.selectedAccountIndex =
                data.selectedCasaAccountIndex ? data.selectedCasaAccountIndex : -1;
            this.cardTtileSelectedInvestment =
                this.totalFund >= 1 ? 'Selected Investment(s)' : 'Selected Investment';
            if (this.flow === '002') {
                this.cardAccountTitle = 'Select Settlement Account';
                this.pagwTitle = 'Review and Complete Redemption';
                this.cardAccountSelectionPlaceholder = 'Select Settlement Account';
                this.factaEnabled = false;
            } else if (this.flow === '003') {
                this.cardAccountTitle = null;
                this.pagwTitle = 'Review and Complete Switch';
                this.cardAccountSelectionPlaceholder = 'Select Payment Account';
                this.factaEnabled = true;
            } else {
                this.factaEnabled = true;
                this.cardAccountSelectionPlaceholder = 'Select Payment Account';
            }

            //Get OTP call
            this.otpResponse = data.otpResponse;
            this.otpResponseMessage = data.otpResponseMessage;
            if (this.callingApi === 'otp') {
                if (
                    this.otpResponseMessage &&
                    this.otpResponseMessage !== 'OTP Sent Successfully'
                ) {
                    if (
                        this.otpResponseMessage &&
                        this.otpResponseMessage === 'ALREADY_REQUESTED'
                    ) {
                        this.snackbar.openFromComponent(MintSnackbarComponent, {
                            duration: 10000,
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                            data: {
                                message:
                                    'Already requested TAC, please check your registered mobile for TAC.',
                                snackType: 'danger',
                            },
                        });
                        this.checkConfirmAndProceedState();
                    } else if (this.otpResponseMessage !== null) {
                        this.snackbar.openFromComponent(MintSnackbarComponent, {
                            duration: 10000,
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                            data: {
                                message: 'There seems to be a slight issue. Please try again.',
                                snackType: 'danger',
                            },
                        });
                        this.analyticService.loadPopUpAnalytics(
                            'There seems to be a slight issue. Please try again.'
                        );
                    }
                }
            }

            //Verify call
            this.verifyResponse = data.verifyResponse;
            this.verifyResponseMessage = data.verifyResponseMessage;
            this.verifyResponseReferenceNumber = data.verifyResponseReferenceNumber;
            if (this.callingApi === 'verify') {
                if (this.verifyAttempt > 2 && this.verifyResponse &&
                    (this.verifyResponse === 'INVALID_CODE' ||
                        this.verifyResponse === 'WRONG_CODE_THROTTLED')) {
                    const dialogtooManyAttempt = this.dialog.open(DialogAlertComponent, {
                        panelClass: 'dialog-transaction-issue',
                        width: '600px',
                        maxWidth: '600px',
                        autoFocus: false,
                        backdropClass: 'backdrop-modal',
                        disableClose: true,
                        data: {
                            dialogImage: '<em class="icon-danger">',
                            dialogHeading: 'You are now logged out.',
                            dialogContent: '<p>Too many failed attempts.</p>',
                            dialogButtonCancel: false,
                            dialogButtonProceed: true,
                            dialogButtonProceedText: 'Okay',
                        },
                    });
                    dialogtooManyAttempt.afterClosed().subscribe(() => {
                        this.store.dispatch(new LogoutAction.LogoutTransaction());
                        this.router.navigate(['/Logout']);
                    });
                } else if (
                    this.verifyResponse &&
                    this.verifyResponse === 'INVALID_REQUEST'
                ) {
                    this.tagErrorShow = true;
                    this.tagErrorMessageText =
                        'Your SMS TAC number has expired. Please request and submit a new one.';
                    this.analyticService.loadPopUpAnalytics('Your SMS TAC number has expired. Please request and submit a new one.');
                } else if (
                    this.verifyResponse &&
                    (this.verifyResponse === 'INVALID_CODE' ||
                        this.verifyResponse === 'WRONG_CODE_THROTTLED')
                ) {
                    this.tagErrorShow = true;
                    this.tagErrorMessageText =
                        'SMS TAC number entered was invalid. Please check and try again.';
                    this.analyticService.loadPopUpAnalytics('SMS TAC number entered was invalid. Please check and try again.');

                } else {
                    this.postAllTransactionResponse = data.postAllTransactionResponse;
                    this.postAllTransactionSuccessStatus = data.transactionSuccessStatus;

                    if (this.postAllTransactionResponse && this.postAllTransactionSuccessStatus) {
                        const response = JSON.parse(this.postAllTransactionResponse);

                        this.store.dispatch(
                            new CartActions.UpdateCartPurchaseStatus(
                                this.customerName,
                                this.accountSelectNumber,
                                'Ref ' + response.referenceNumber,
                                response.transactionSuccessStatus,
                                response.transactionStatus,
                                response.transactionStatusName,
                                response.transactionStatusText,
                                response.transactionDate,
                                response.transactionWorkingDays,
                            ),
                        );
                        this.tagErrorShow = false;
                        this.tagErrorMessageText = '';
                        this.callingApi = '';
                        if (this.userType === 'NTP') {
                            this.updateLandingPageFinalStatus();
                        }
                        this.router.navigate(['/purchase-summary']);
                    } else {
                        if (this.postAllTransactionResponse !== null) {
                            const resp = JSON.parse(this.postAllTransactionResponse);
                            if ((resp.error.businessErrorCode === "50007" || resp.error.businessErrorCode === "50008" || resp.error.businessErrorCode === "50009") && resp.error.error === "BUSINESS_ERROR") {
                                const dialogUnavailbleFund = this.dialog.open(DialogAlertComponent, {
                                    panelClass: 'dialog-transaction-issue',
                                    width: '600px',
                                    maxWidth: '600px',
                                    autoFocus: false,
                                    backdropClass: 'backdrop-modal',
                                    disableClose: true,
                                    data: {
                                        dialogImage: '<em class="icon-danger">',
                                        dialogHeading: 'Unable to Proceed',
                                        dialogContent: `<p>We're sorry, the fund you've selected is not available right now. Please 
                                        <strong>remove or replace</strong> with another fund to proceed.</p>`,
                                        dialogButtonCancel: false,
                                        dialogButtonProceed: true,
                                        dialogButtonProceedText: 'Back to My Cart',
                                    },
                                });
                                dialogUnavailbleFund.afterClosed().subscribe((result) => {
                                    if (result === 'Back to My Cart') {
                                        this.router.navigate(['/cart']);
                                    }
                                });
                                this.analyticService.loadPopUpAnalytics('Unable to Proceed');
                            }else{
                                this.snackbar.openFromComponent(MintSnackbarComponent, {
                                    duration: 10000,
                                    horizontalPosition: 'center',
                                    verticalPosition: 'top',
                                    data: {
                                        message: 'There seems to be a slight issue. Please try again.',
                                        snackType: 'danger',
                                    },
                                });
                                this.analyticService.loadPopUpAnalytics(
                                    'There seems to be a slight issue. Please try again.'
                                );
                            }
                        }
                    }
                }
            }
        }
        return true;
    }

    changeTagError(tagErrorVisibility: boolean) {
        this.tagErrorShow = tagErrorVisibility;
    }

    requestTAC(): void {
        if (this.customerMobileNumber) {
            this.customerMobileNumber.toString();
            this.callingApi = 'otp';
            const otp = {
                otp: {
                    "mobileNumber": ""
                }
            }
            this.store.dispatch(new CartActions.RequestOtpApi(otp));
        }
    }

    updateLandingPageFinalStatus() {
        let landingPageStatus: LandingPageStatus;
        this.store.select(LandingPageSelector.selectLandingPageStatus).subscribe((result) => {
            landingPageStatus = result;
        });
        const request: FinalStatus = {
            onboardingId: landingPageStatus.onboardingId,
            finalStatus: "Y",
            finalStartDate: "",
            finalEndDate: ""
        };
        this.store.dispatch(LandingPageActions.updateFinalStatus({ finalStatus: request }));
        this.store.dispatch(ClicksActions.updateNTPtoETP({ customerType: 'ETP' }));
    }

    confirmAndProceed(event): boolean {
        this._eventService.onSendUtAcc({ utAccountNo: this.unitTrustAccount});
        if (event) {
            this.callPostAPI = true;
            this.verifyOTP(event);
        }
        return true;
    }

    accountSelectedEvent(event): boolean {
        this.accountSelectObj = event;
        this.accountSelectNumber = event.accountNumber;
        this.casa_account_balance = event.casa_account_balance;
        const index = event.index;
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        this.activeCasa = event && event.account_status ? (event.account_status === 'A' || event.account_status === "Active") : false;
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        this.joinAndUtAccountIndicator =
            event && event.joint_indicator ? event.joint_indicator === 'J' && event.signingCondition === 'JoinAnd' : false;
        this.jointIndicatorValue = event.joint_indicator;

        this.store.dispatch(new CartActions.SelectedCasaAccountIndex(index));
        this.checkConfirmAndProceedState();

        return true;
    }
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    checkConfirmAndProceedState(): void {
        this.externalErrorMsg = null;
        if (!this.activeCasa) {
            this.enableConfirmButton = true;
            this.canEnableConfirmButton = false;
            this.isExternalError = true;
            this.accountSelected = false;
        } else if (this.joinAndUtAccountIndicator) {
            this.enableConfirmButton = true;
            this.canEnableConfirmButton = false;
            this.isExternalError = true;
            this.accountSelected = false;
            // this.externalErrorMsg = "This is a joint account. You will need all the joint account holders to transact/agree when using this account. Contact us for further assistance.";
        } else {
            if ((this.casa_account_balance >= this.totalAmount) || (this.casa_account_balance < this.totalAmount && this.flow === '002')) {
                this.enableConfirmButton = false;
                this.canEnableConfirmButton = true;
                this.isExternalError = false;
                this.externalErrorMsg = '';
                this.accountSelected = true;
                if (this.requestTagCanEnabled && this.tagEntredCompleted) {
                    this.enableConfirmButton = false;
                    this.canEnableConfirmButton = true;
                    this.disableConfirmButtonComponent = true;
                }
            } else {
                this.enableConfirmButton = true;
                this.canEnableConfirmButton = false;
                this.isExternalError = true;
                this.accountSelected = false;
                this.externalErrorMsg = 'You have insufficient funds in the account selected.';
            }
        }
    }
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    tagEntredCompletedEvent(value): void {
        this.tagEntredCompleted = value;
    }

    requestTagCanEnableEvent(value): boolean {
        this.requestTagCanEnabled = value;

        return true;
    }
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    verifyOTP(otp): void {
        if (this.customerMobileNumber && otp) {
            this.verifyAttempt += 1;
            this.callingApi = 'verify';
        }
        const transactionDate =
            this.datepipe.transform(Date.now(), 'yyyy-MM-dd').toString() +
            ' ' +
            this.datepipe.transform(Date.now(), 'hh:mm:ss').toString().toLowerCase();

        const len = this.investments ? this.investments.length : -1;
        let totalInvestment = 0.00;
        if (this.investments && len >= 1) {
            let postParamObj;
            let newPostObj: PostTransaction;
            totalInvestment = 0.00;
            if (this.flow === '001') {
                this.flowConst = '01';
            } else if (this.flow === '002') {
                this.flowConst = '02';
            } else if (this.flow === '003') {
                this.flowConst = '03';
            }
            const userObj = this.userObj;
            let transactionUnit = 0;
            this.postParamList = [];
            for (let i = 0; i < len; i++) {
                postParamObj = this.investments[i];
                totalInvestment = 0.00;
                transactionUnit = 0;
                if (this.flow === '001') {
                    totalInvestment = postParamObj?.card_amount ? postParamObj.card_amount : 0.00;
                    this.topUpHigherFundRiskAck = postParamObj.fund_risk_rating === 'Y' ? 'YES' : 'N/A';
                } else if (this.flow === '002') {
                    totalInvestment = postParamObj?.totalRedemAmount ? postParamObj.totalRedemAmount : 0.00;
                    transactionUnit = postParamObj.card_redemption_units ? postParamObj.card_redemption_units : 0
                } else if (this.flow === '003') {
                    totalInvestment = postParamObj?.switchOutAmount ? postParamObj.switchOutAmount : 0.00;
                    transactionUnit = postParamObj.totalSwitchOut ? postParamObj.totalSwitchOut : 0
                    this.switchInHigherFundRiskAck = postParamObj.to_fund_risk_rating === 'Y' ? 'Yes' : 'No';
                    this.flowConst = '03';
                }
                newPostObj = {
                    transactionDatetime: transactionDate,
                    clientName: userObj?.customer_name || '',
                    clientId: '',
                    icNumber: userObj?.customer_id?.toString() || '',
                    settlementAccount: this.accountSelectNumber
                        ? this.accountSelectNumber.toString()
                        : '',
                    fundCode: postParamObj.fund_code ? postParamObj.fund_code : '',
                    fundName: postParamObj.fund_name ? postParamObj.fund_name : '',
                    toFundCode: postParamObj.toFundCode ? postParamObj.toFundCode : '',
                    toFundName: postParamObj.to_fund_name ? postParamObj.to_fund_name : '',
                    utAccountNo: this.unitTrustAccount,
                    chargeId: postParamObj.charge_id ? postParamObj.charge_id : 0,
                    chargesPercentage: postParamObj.totalSalesPercentage
                        ? postParamObj.totalSalesPercentage
                        : 0,
                    chargesAmount: postParamObj.totalSalesCharges
                        ? postParamObj.totalSalesCharges
                        : 0,
                    totalInvestment: totalInvestment,
                    netInvestment: postParamObj.card_net_amount ? postParamObj.card_net_amount : 0,
                    taxId: postParamObj.tax_id ? postParamObj.tax_id : 0,
                    taxCode: postParamObj.tax_code ? postParamObj.tax_code : 0,
                    taxRate: postParamObj.tax_rate ? postParamObj.tax_rate : 0,
                    taxAmount: postParamObj.tax_amount ? postParamObj.tax_amount : 0,
                    payableAmount: postParamObj.card_amount,
                    userId: userObj?.customer_id?.toString() || '',
                    staffIndicator:
                        this.userObj && this.userObj.cimb_staff ? this.userObj.cimb_staff : 0,
                    einvestsmart: '',
                    fdAccountNo: this.accountSelectNumber
                        ? this.accountSelectNumber.toString()
                        : '',
                    contactNo: '',
                    paymentTo: '',
                    transactionUnit: transactionUnit,
                    seqNo: i + 1,
                    transactionStatus: 'Transaction Pending',
                    indicativeCharges: postParamObj.card_redemption_amount
                        ? postParamObj.card_redemption_amount
                        : 0,
                    transactionType: this.flowConst,
                    mobileNo: '',
                    clientIdType: 'NEWIC',
                    cifNumber: '',
                    joinIndicator: this.jointIndicatorValue,
                    totalSalesPercentage: postParamObj.totalSalesPercentage
                        ? postParamObj.totalSalesPercentage
                        : 0,
                    totalSalesCharges: postParamObj.totalSalesCharges
                        ? postParamObj.totalSalesCharges
                        : 0,
                    risk_profile_ind: postParamObj.fund_risk_rating ? postParamObj.fund_risk_rating : 'N',
                    document_ind: postParamObj.documentIndicator ? "Y" : 'N',
                    cartDetailId: postParamObj.cartDetailId ? postParamObj.cartDetailId : 0,
                    higherFundRiskAck: (postParamObj.flow === '001' ? this.topUpHigherFundRiskAck : null) || (postParamObj.flow === '003' ? this.switchInHigherFundRiskAck : null),
                    
                };

                this.postParamList.push(newPostObj);
            }

            this.requestParams = {
                transactions: this.postParamList,
                cartSummaryId: this.cartSummaryId,
                otp: {
                    value: otp
                }
            };
        }
        if (this.requestParams) {
            const param = JSON.stringify(this.requestParams);
            this.callPostAPI = false;
            this.store.dispatch(new CartActions.PostAllTransaction(param, this.customer_id));

        }
    }
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    fatcaDeclaratonEvent(): void {
        this.router.navigate(['/dashboard']);
    }

    backButtonEvent() {
        if (this.currentUrl === '/dashboard;tab=0') {
            this.currentUrl = '/dashboard';
        }
        this.router.navigate([this.currentUrl]);
    }

    // ngOnDestroy() {
    //     this.destroyed$.next(true);
    //     this.destroyed$.complete();
    // }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    callCifInquiryApi() {
        this.store.dispatch(new CifAction.GetCifInquiryParam());
    }

    checkIfNTP(userType: string) {
        if (userType === "NTP") {
            this.noProgressStep = true;
        } else {
            this.noProgressStep = false;
        }
    }
}
