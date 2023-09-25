import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild,
    TemplateRef,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '@cimb/mint';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import * as fromStore from '../../../core/state/reducers';
import * as AccountOpeningActions from '../../../core/state/account-opening/account.actions';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { getDayOfWeek, getTimeOfDay, setEventAndDigitalData } from '@cimb/common';
import * as CartActions from '../../../core/state/cart/cart.actions';
import { ClicksInfo } from '../../../core/state/clicks/clicks.models';
import { AppService } from '../../../core/services/app.service';
@Component({
    selector: 'cimb-personal-account',
    templateUrl: './personal-contact-details.component.html',
    styleUrls: ['./personal-contact-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalContactDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('toolTip') toolTip: TemplateRef<any>;
    @Output() btnSubmit = new EventEmitter<any>();

    emailPlaceholder = 'Email';
    emailLable = 'EMAIL';
    valueExistEmailLable = 'Email Address';
    emailError = " Please enter your email address in this format 'yourname@example.com'";
    emailRequiredError = 'Please enter email address.';
    emailMaxLength = 'Maximum allowed length is 50.';
    mailAddressLable = 'MAILING ADDRESS';
    valueExistMailAddressLable = 'Mailing Address';
    emailPattern = '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$';
    mobilePattern = /^[0-9]\d*$/;
    cifInquiryDetails$: Observable<any>;
    cifInquiryAPISubscription: Subscription;
    userPhoneNumber$: Observable<any>;
    acountOpeningAPISubscription: Subscription;
    accountOpeningPersonalData;
    otherAccDetailData;
    openingAccountFormGroup: FormGroup;
    countryList = [];
    stateList = [];
    titleList = [];
    postCodeList = [];
    isDisabled: true;
    userObservable: Observable<any>;
    userSubscription: Subscription;
    customerType: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    clicksData: ClicksInfo;

    constructor(
        public dialog: MatDialog,
        public formBuilder: FormBuilder,
        private store: Store<fromStore.AppState>,
        private cd: ChangeDetectorRef,
        public _bottomSheet: MatBottomSheet,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.appService.showLoadingSpinner();
        this.loadInitialForm();
        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.customerType = users.userType;
        });
        this.clickToSubmitAAData('Page1');
        this.store.dispatch(new CartActions.ToggleCartIconHeader(true));
    }

    ngOnDestroy(): void {
        if (this.acountOpeningAPISubscription) {
            this.acountOpeningAPISubscription.unsubscribe();
        }
        if (this.cifInquiryAPISubscription) {
            this.cifInquiryAPISubscription.unsubscribe();
        }
        this.userSubscription.unsubscribe();
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    checkFieldHasValue() {
        if (this.openingAccountFormGroup) {
            return Object.values(this.openingAccountFormGroup.controls).some(
                ({ value }) => !!value || value === 0,
            );
        }
    }

    checkFormValidity(): boolean {
        this.openingAccountFormGroup.valueChanges.subscribe(() => {
            this.cd.markForCheck();
        });

        if (this.openingAccountFormGroup.status === 'VALID') {
            return true;
        }

        return false;
    }
    goToNextPage() {
        window.scrollTo(0,0);
        this.openingAccountFormGroup.markAllAsTouched();
        if (this.openingAccountFormGroup.valid) {
            let accountObj = {};
            if (this.otherAccDetailData) {
                accountObj = {
                    ...this.otherAccDetailData,
                    ...this.openingAccountFormGroup.value,
                }
            } else {
                accountObj = {
                    ...this.openingAccountFormGroup.value,
                }
            }
            this.store.dispatch(new AccountOpeningActions.GetUserDetailsSessionData(accountObj));
            this.btnSubmit.emit(accountObj);
        }
        this.clickToSubmitAAData('Page2');
    }

    loadInitialForm() {
        this.openingAccountFormGroup = this.formBuilder.group({
            title: [''],
            name: ['', Validators.required],
            mykadNumber: ['', Validators.required],
            birthDate: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(50)]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            postcode: ['', [Validators.required, Validators.maxLength(10)]],
            addrLine1: ['', [Validators.required]],
            addrLine2: ['', [Validators.required]],
            addrLine3: ['', []],
            addrLine4: ['', []],
            mobilePhone: ['', Validators.required],
            houseNumber: ['', []],
            officeNumber: ['', []],
        });

        this.store.select('clicks').subscribe((clicksData) => {
            this.clicksData = clicksData;
        });

        this.store.select('accountOpeningReducer').subscribe((accountOpeningAction) => {
            this.callUserDetailFieldOptionsAPIResponseData(
                accountOpeningAction['userDetailFieldOptionsAPIResponseData'],
            );
            this.callUserDetailsAPIResponseData(accountOpeningAction.userDetailsAPIResponseData);

            this.callUserDetailsSessionData(accountOpeningAction.userDetailsSessionData);
        });

        this.store.select('cifInquiryReducer').subscribe((cifInquiryData) => {
            this.callUserCifDetailAPIResponseData(cifInquiryData.phoneNumber);
        });
    }

    callUserCifDetailAPIResponseData(userPhoneNumberData) {
        if (userPhoneNumberData) {
            this.userPhoneNumber$ = userPhoneNumberData;
            this.openingAccountFormGroup.get('mobilePhone').patchValue(this.userPhoneNumber$);
        }
    }

    callUserDetailsAPIResponseData(userDetailsAPIResponseData) {
        if (userDetailsAPIResponseData) {
            this.accountOpeningPersonalData = userDetailsAPIResponseData;
            this.openingAccountFormGroup.patchValue(userDetailsAPIResponseData);
            this.appService.hideLoadingSpinner();
        }
    }
    callUserDetailsSessionData(userDetailsSessionData) {
        if (userDetailsSessionData) {
            this.otherAccDetailData = userDetailsSessionData;
            this.openingAccountFormGroup.patchValue(userDetailsSessionData);
        }
    }

    callUserDetailFieldOptionsAPIResponseData(userDetailFieldOptionsAPIResponseData) {
        if (userDetailFieldOptionsAPIResponseData) {
            this.titleList = userDetailFieldOptionsAPIResponseData.titleSalutations;

            this.countryList = userDetailFieldOptionsAPIResponseData.countryList;

            this.stateList = userDetailFieldOptionsAPIResponseData.stateList;

            this.postCodeList = userDetailFieldOptionsAPIResponseData.postCodeList;
        }
    }

    callCountryName() {
        /* istanbul ignore next */
        return this.countryList.filter(
            (data) => data.countryCode === this.openingAccountFormGroup.controls['country'].value,
        )[0]?.countryLongName;
    }
    callStateName() {
        /* istanbul ignore next */
        return this.stateList.filter(
            (data) => data.stateCode === this.openingAccountFormGroup.controls['state'].value,
        )[0]?.stateLongName;
    }

    /* istanbul ignore next */
    dialogUpdateAddress() {
        const dialogRef = this.dialog.open(DialogFormComponent, {
            panelClass: ['full-width', 'dialog-mailing-address'],
            maxWidth: '600px',
            width: '100%',
            height: 'auto',
            autoFocus: false,
            disableClose: true,
            data: {
                dialogHeading: 'Update Address',
                dialogSubheading: 'Enter the mailing address you would like to use',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Cancel',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Update',
                isAddressDialog: true,

                addrLine1: this.openingAccountFormGroup.controls['addrLine1'].value,
                addrLine2: this.openingAccountFormGroup.controls['addrLine2'].value,
                addrLine3: this.openingAccountFormGroup.controls['addrLine3'].value,
                addrLine4: this.openingAccountFormGroup.controls['addrLine4'].value,
                postcode: this.openingAccountFormGroup.controls['postcode'].value,
                state: this.openingAccountFormGroup.controls['state'].value,
                country: this.openingAccountFormGroup.controls['country'].value,
                countryList: this.countryList,
                stateList: this.stateList,
                postCodeList: this.postCodeList,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.callAfterDialogClose(result);
        });
    }

    /* istanbul ignore next */
    dialogUpdateEmail() {
        const dialogRef = this.dialog.open(DialogFormComponent, {
            panelClass: ['full-width', 'dialog-mailing-address'],
            maxWidth: '600px',
            width: '100%',
            autoFocus: false,
            data: {
                dialogHeading: 'Update Email Address',
                dialogSubheading: 'Enter the email address you’d like to use',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Cancel',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Update',
                isEmailDialog: true,
                dialogEmail: this.openingAccountFormGroup.controls['email'].value.trim(),
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.callAfterDialogClose(result);
        });
    }

    callAfterDialogClose(result) {
        if (result != null && result != undefined) {
            this.openingAccountFormGroup.patchValue(result);
        }
    }

    /* istanbul ignore next */
    openTooltipBottomSheet() {
        this._bottomSheet.open(this.toolTip, {
            panelClass: 'tooltip-action-sheet',
        });
    }

    /* istanbul ignore next */
    checkValidation(controls: AbstractControl) {

        if(controls.touched && controls.invalid && controls.dirty) {
            if (controls.value === '') {
                return this.emailRequiredError;
            }

            if (controls.invalid) {
                return this.emailError;
            }

            if (controls.value.length > 50) {
                return this.emailMaxLength;
            }
        }
    }

    clickToSubmitAAData(option) {
        const day = getDayOfWeek();
        const currTime = getTimeOfDay();
        if (option == 'Page1') {
            setEventAndDigitalData(
                {
                    wealthEvent: 'wealth:acc-opening-1',
                },
                {
                    wealthDigitalData: {
                        page: {
                            category: {
                                primaryCategory: 'Unit Trust Module',
                                pageType: 'Input',
                                subCategory1: 'UT NTP Landing Options',
                            },
                            pageInfo: {
                                pageName: 'Wealth: UT Account Opening 1',
                                day: day,
                            },
                        },
                        user: {
                            loginStatus: 'logged-in',
                            memberLoginType: 'repeat',
                            customerType:this.customerType
                        },
                        sales: {
                            type: 'Unit Trust Account Opening',
                            saleStartTime: currTime,
                        },
                    },
                },
            );
        } else if (option == 'Page2') {
            setEventAndDigitalData(
                {
                    wealthEvent: 'wealth:acc-opening-2',
                },
                {
                    wealthDigitalData: {
                        page: {
                            category: {
                                primaryCategory: 'Unit Trust Module',
                                pageType: 'Input',
                                subCategory1: 'UT NTP Landing Options',
                            },
                            pageInfo: {
                                pageName: 'Wealth: UT Account Opening 2',
                                day: day,
                            },
                        },
                        user: {
                            loginStatus: 'logged-in',
                            memberLoginType: 'repeat',
                            customerType:this.customerType
                        },
                        sales: {
                            type: 'Unit Trust Account Opening',
                        },
                    },
                },
            );
        }
    }
}
