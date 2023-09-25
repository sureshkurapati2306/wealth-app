/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { loadRiskProfileQuestions, submitAnswer } from '../../+state/risk-profile.actions';
import { getQuestions } from '../../+state/risk-profile.selectors';
import { Answers, Questions } from '../../models';
import * as fromStore from '../../../../core/state/reducers';
import * as moment from 'moment';
import { MediaMatcher } from '@angular/cdk/layout';
import { validateAge, setEventAndDigitalData, getDayOfWeek } from '@cimb/common';
import * as LandingPageSelector from 'apps/self-serve/src/app/core/state/landing-page/landing-page.selectors';
import { LandingPageStatus } from 'apps/self-serve/src/app/core/model/landing-page-status.model';
import * as LandingPageActions from 'apps/self-serve/src/app//core/state/landing-page/landing-page.actions';
import { getClicksCustomerInfo } from 'apps/self-serve/src/app/core/state/clicks/clicks.selectors';

@Component({
    selector: 'cimb-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit, OnDestroy {
    answerPayload: Answers;
    questionsForm: FormGroup;
    questions: Observable<Questions[]>;
    mediaQueryList: MediaQueryList;
    landingPageStatus: LandingPageStatus;
    userType: string;
    userObservable: Observable<any>;
    userSubscription: Subscription;
    customerType: any;
    loadingSpinner$ = false

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    get formArray(): AbstractControl {
        return this.questionsForm.get('questionAns');
    }

    constructor(
        private fb: FormBuilder,
        private store: Store<fromStore.AppState>,
        mediaMatcher: MediaMatcher
    ) {
        this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
    }

    ngOnInit(): void {
        const age = validateAge(moment('02-05-1980', 'MM-DD-YYYY'));
        this.store.dispatch(loadRiskProfileQuestions());
        this.questions = this.store.select(getQuestions);
        this.getClicksInfo();
        this.generateForm(age);
        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.customerType = users.userType;
        });
        this.clickToSubmitAAData('wealth:UT RP Input1', 'Wealth: Risk Profile Input 1');
    }

    generateForm(age) {
        this.questionsForm = this.fb.group({
            questionAns: this.fb.array([
                this.fb.group({
                    questionNumber: ['1'],
                    multiOptions: ['N'],
                    options: [[], Validators.required],
                }),
                this.fb.group({
                    questionNumber: ['2'],
                    multiOptions: ['N'],
                    options: [[], Validators.required],
                }),
                this.fb.group({
                    questionNumber: ['3'],
                    multiOptions: ['N'],
                    options: [[], Validators.required],
                }),
                this.fb.group({
                    questionNumber: ['4'],
                    multiOptions: ['N'],
                    options: [[], Validators.required],
                }),
                // age calculation
                // manually calculate use `validateAge` function by passing year
                this.fb.group({
                    questionNumber: ['5'],
                    multiOptions: ['N'],
                    options: [age, Validators.required],
                }),
                this.fb.group({
                    questionNumber: ['6'],
                    multiOptions: ['N'],
                    options: [[], Validators.required],
                }),
                this.fb.group({
                    questionNumber: ['7'],
                    multiOptions: ['N'],
                    options: [[], Validators.required],
                }),
                this.fb.group({
                    questionNumber: ['8'],
                    multiOptions: ['N'],
                    options: [[], Validators.required],
                }),
                this.fb.group({
                    questionNumber: ['9'],
                    multiOptions: ['N'],
                    options: [[], Validators.required],
                }),
                this.fb.group({
                    questionNumber: ['10'],
                    multiOptions: ['N'],
                    options: [[], Validators.required],
                }),
            ]),
        });
    }

    clickToSubmitAAData(wEvent, pageName) {
        const day = getDayOfWeek();
        setEventAndDigitalData(
            {
                wealthEvent: wEvent,
            },
            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Risk Profile Module',
                            pageType: 'Input',
                        },
                        pageInfo: {
                            pageName: pageName,
                            day: day,
                        },
                    },
                    user: {
                        loginStatus: 'logged-in',
                        memberLoginType: 'repeat',
                        customerType: this.customerType,
                    },
                    sales: {
                        type: 'Unit Trust Risk Profiling',
                    },
                },
            },
        );
    }

    getClicksInfo() {
        let user$: Observable<any> = null;
        let onboardingId$: Observable<any> = null;

        user$ = this.store.select('userReducer');
        onboardingId$ = this.store.select(LandingPageSelector.selectLandingPageStatus);

        combineLatest([user$, onboardingId$])
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((responses) => {
                const [userInfo, id] = responses;
                const {customer_id_type, customer_name } = userInfo.user;
                const { onboardingId } = id;
                this.userType = userInfo.userType;
                /* istanbul ignore else */
                if (this.userType === 'NTP') {
                    this.landingPageStatus = { ...id };
                }
                this.answerPayload = {
                    cifNumber: '',
                    custIdNo: '',
                    custIdType: customer_id_type,
                    custName: customer_name,
                    custIdIssue: '',
                    rmId: 'BRMGR1',
                    onboardingId: this.userType === 'NTP' ? onboardingId : 0,
                };
            });
    }

    onSubmit(): void {
        this.store.select(getClicksCustomerInfo).pipe(takeUntil(this._unsubscribeAll)).subscribe((info) => {
            if (info.ipAddress) {
                const payload = {
                    computeRiskProfile: {
                        ...this.answerPayload,
                        ...this.questionsForm.value,
                    }
                };
                this.store.dispatch(submitAnswer({ payload }));
            }
        });

        /* istanbul ignore else */
        if (this.userType === 'NTP') {
            this.landingPageStatus.rwsStatus = 'Y';
            this.store.dispatch(
                LandingPageActions.updateLandingPageStatusSuccess({
                    landingPageStatus: this.landingPageStatus,
                }),
            );
        }
        this.loadingSpinner$ = true;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
        this.userSubscription.unsubscribe();
    }
}
