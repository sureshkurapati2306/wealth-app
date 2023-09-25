import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { UTAccountOpeningAuditPrototype } from '@cimb/shared/models';
import { ClicksInfo } from '../../core/state/clicks/clicks.models';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import * as AccountOpeningActions from '../../core/state/account-opening/account.actions';
import * as fromStore from '../../core/state/reducers';
import * as UserAction from '../../core/state/user/user.actions';
import * as CartActions from '../../core/state/cart/cart.actions';
import { path } from '../../shared/config/path';
import { getRiskProfileResults } from '../risk-profile/+state/risk-profile.selectors';
import * as LandingPageActions from '../../core/state/landing-page/landing-page.actions';
import * as LandingPageSelector from '../../core/state/landing-page/landing-page.selectors';
import { AccountStatus } from '../../core/model/landing-page-status.model';

@Component({
    selector: 'cimb-opening-account',
    templateUrl: './opening-account.component.html',
    styleUrls: ['./opening-account.component.scss'],
})
export class OpeningAccountComponent implements OnInit, OnDestroy {
    pageTitle = 'Unit Trust Account';
    private userSubscription: Subscription;
    clicksObservable$: Observable<ClicksInfo>;
    clicksSubscription: Subscription;
    clicksInfoData: ClicksInfo;
    isBackButtonEnabled = true;
    acountOpeningAPIObservable: Observable<any>;
    accountOpeningPostObject: any;
    utAccOpeningPostObject: any;
    step1 = false;
    step2 = false;
    step3 = false;
    personalData;
    odFieldsList;
    riskProfile: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    utAccountNo: any;
    utAccountSub: Subscription;
    customerType: string;
    riskProfileFirst

    constructor(
        private store: Store<fromStore.AppState>,
        public router: Router,
        public dialog: MatDialog,
        private route: ActivatedRoute,
    ) {
        this.step1 = true;
    }

    ngOnInit(): void {
        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.store.dispatch(new CartActions.ToggleCartIconHeader(true));

        const clicksDataFromResolver = this.route.snapshot.data['clicksData'];

        this.clicksInfoData = clicksDataFromResolver;

        this.enablePersonalDetails();
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    enablePersonalDetails() {
        const accOpeningObservable$ = this.store.select('accountOpeningReducer');
        const userObservable$ = this.store.select('userReducer');
        this.store.select(getRiskProfileResults).pipe(takeUntil(this._unsubscribeAll)).subscribe((riskProfileResult) => {
            if (riskProfileResult) {
                this.riskProfileFirst = riskProfileResult.data.riskProfile;
            }
        });

        combineLatest([accOpeningObservable$, userObservable$])
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(([acountOpeningAPIObservable, userReducer]) => {
                if (
                    acountOpeningAPIObservable &&
                    acountOpeningAPIObservable.userDetailsAPIResponseData
                ) {
                    this.accountOpeningPostObject =
                        acountOpeningAPIObservable.userDetailsAPIResponseData;
                }
                this.customerType = userReducer.userType;
                if (this.riskProfileFirst) {
                    this.riskProfile = this.riskProfileFirst;
                } else {
                    this.riskProfile = userReducer.user.risk_profile;
                }
            });
    }

    goToStepOne() {
        this.step2 = false;
        this.step3 = false;
        this.step1 = true;
        this.accountOpeningPostObject = { ...this.accountOpeningPostObject, ...this.personalData };
    }

    goToStepTwo() {
        this.step2 = true;
        this.step3 = false;
        this.step1 = false;
    }

    goToSteps($event) {
        if ($event === 'otherDetails') {
            this.goToStepTwo();
        }
        if ($event === 'personalDetails') {
            this.goToStepOne();
        }
    }

    step1Submited(eventData) {
        this.personalData = eventData;
        this.step1 = false;
        this.step2 = true;
        this.accountOpeningPostObject = { ...this.accountOpeningPostObject, ...this.personalData };
    }

    step2Submited(event) {
        this.odFieldsList = event.accountDetail;
        this.accountOpeningPostObject = {
            ...this.accountOpeningPostObject,
            ...event.otherAccountFormGroup,
        };
        this.step2 = false;
        this.step3 = true;
    }

    populateIndustryCode(industryList, industryCode): boolean {
        if (industryList) {
            for (let i = 0; i < industryList.length; i++) {
                if (industryCode == industryList[i].employmentShortName) {
                    if (this.utAccOpeningPostObject) {
                        this.utAccOpeningPostObject.industry = industryList[i].employmentCode;
                    }
                }
            }
            return true;
        }
    }

    populateProfessionCode(professionList, professionCode): boolean {
        if (professionList) {
            for (let i = 0; i < professionList.length; i++) {
                if (professionCode == professionList[i].occupationLongName) {
                    if (this.utAccOpeningPostObject) {
                        this.utAccOpeningPostObject.profession = professionList[i].occupationCode;
                    }
                }
            }
            return true;
        }
    }

    populateStateCode(stateList, stateCode) {
        if (stateList) {
            for (let i = 0; i < stateList.length; i++) {
                if (stateCode.toUpperCase() == stateList[i].stateLongName) {
                    if (this.utAccOpeningPostObject) {
                        this.utAccOpeningPostObject.state = stateList[i].stateCode;
                    }
                }
            }
            return true;
        }
    }

    populateSettlementAccount(settlementList, bankAcctNo) {
        if (settlementList) {
            for (let i = 0; i < settlementList.length; i++) {
                const settlement = settlementList[i];

                // Check if the settlement object and this.utAccOpeningPostObject are defined
                if (settlement && this.utAccOpeningPostObject) {
                    if (bankAcctNo == settlement.accountNumber) {
                        this.utAccOpeningPostObject.settlementAcctType =
                            settlement.settlementAcctType || '';
                        this.utAccOpeningPostObject.signingCondition =
                            settlement.signingCondition || '';
                    }
                }
            }
            return true;
        }
    }

    populateRiskProfileCategory(riskProfileCategory: string) {
        if (riskProfileCategory) {
            this.utAccOpeningPostObject.riskProfile = riskProfileCategory;
        }
        return true;
    }

    bindFieldCodes() {
        if (this.accountOpeningPostObject) {
            this.utAccOpeningPostObject = JSON.parse(JSON.stringify(this.accountOpeningPostObject));
        }

        if (this.odFieldsList) {
            this.populateIndustryCode(
                this.odFieldsList.industryList,
                this.utAccOpeningPostObject.industry,
            );
            this.populateStateCode(this.odFieldsList.stateList, this.utAccOpeningPostObject.state);
            this.populateSettlementAccount(
                this.accountOpeningPostObject.settlementAccount,
                this.utAccOpeningPostObject.bankAcctNo,
            );
            this.populateProfessionCode(
                this.odFieldsList.professionList,
                this.utAccOpeningPostObject.profession,
            );

            this.populateRiskProfileCategory(this.riskProfile);
        }
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    step3Submited() {
        this.bindFieldCodes();
        const payload = new UTAccountOpeningAuditPrototype(this.utAccOpeningPostObject);
        payload.postObject.utAccount.idNo1 = '';
        payload.postObject.utAccount.mobilePhone = '';
        payload.postObject.utAccount.sibsCifNo = '';

        this.store.dispatch(
            new AccountOpeningActions.PostAccountOpeningAuditApi(payload.postObject),
        );
        this.store.select('accountOpeningReducer')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                if (data.accountOpeningAuditAPIResponse) {
                    let landingPage: any;
                    this.store.select(LandingPageSelector.selectLandingPageStatus).subscribe((result) => {
                        landingPage = result;
                    });
                    const request: AccountStatus = {
                        onboardingId: landingPage.onboardingId,
                        accountStatus: 'Y',
                        accountStartDate: '',
                        accountEndDate: '',
                    };
                    this.store.dispatch(LandingPageActions.updateAccountStatus({ accountStatus: request }));

                    this.store.dispatch(
                        new UserAction.SelectedUnitTrustAccount(
                            data.accountOpeningAuditAPIResponse['accountNo'],
                        ),
                    );

                    this.store.dispatch(
                        new CartActions.UpdateCartUTAccount(
                            data.accountOpeningAuditAPIResponse['accountNo'],
                        ),
                    );

                    // comment for now if no dependencies will remove later
                    // this.store.dispatch(
                    //     new CartActions.UpdateUTAccountNoCartAPI(
                    //         this.clicksInfoData.customerIDNumber,
                    //         data.accountOpeningAuditAPIResponse['accountNo'],
                    //     ),
                    // );

                    this.router.navigate([path.CART_COMPONENTS]);
                }
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
