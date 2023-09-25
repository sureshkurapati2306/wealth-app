import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import { ToggleGender } from '../../../core/model/personalDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as fromStore from '../../../core/state/reducers';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { DialogOtherAccountDetailComponent } from '@cimb/mint';
import * as AccountOpeningActions from '../../../core/state/account-opening/account.actions';
import { setEventAndDigitalData, getDayOfWeek } from '@cimb/common';
import * as CartActions from '../../../core/state/cart/cart.actions';

@Component({
    selector: 'cimb-other-account-details',
    templateUrl: './other-account-details.component.html',
    styleUrls: ['./other-account-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherAccountDetailsComponent implements OnInit, OnDestroy {
    @Output() btnSubmit = new EventEmitter<any>();
    @Output() previousPage = new EventEmitter<any>();

    otherAccountFormGroup: FormGroup;
    toggleGender: ToggleGender[];
    selectSettlementAccount: any[];
    acountOpeningAPISubscription: Subscription;
    userDetailFieldOptionsAPIResponseData: any;
    accountDetails$: Observable<any>;
    countryList: any[] = [];
    citizenList: any[] = [];
    raceList: any[] = [];
    religionList: any[] = [];
    martialStatusList: any[] = [];
    industryList: any[] = [];
    professionList: any[] = [];
    otherAccountOpeningData;
    personalContactDetailData;
    errorMessage = 'This field is required';
    userObservable: Observable<any>;
    userSubscription: Subscription;
    customerType: any;
    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private store: Store<fromStore.AppState>,
        private cd: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.initLoadData();
        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.customerType = users.userType;
        });
        this.store.dispatch(new CartActions.ToggleCartIconHeader(true));
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    initLoadData() {
        this.accountDetails$ = this.store.select('accountOpeningReducer');
        this.otherAccountFormGroup = this.formBuilder.group({
            bankAcctNo: ['', [Validators.required]],
            nationality: ['', Validators.required],
            citizen: ['', Validators.required],
            gender: ['', Validators.required],
            race: ['', Validators.required],
            religion: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            industry: ['', Validators.required],
            profession: ['', Validators.required],
        });

        this.toggleGender = [
            { value: 'M', label: 'Male' },
            { value: 'F', label: 'Female' },
        ];

        this.acountOpeningAPISubscription = this.accountDetails$.subscribe(
            (accountOpeningAction) => {
                this.callUserDetailsAPIResponseData(
                    accountOpeningAction.userDetailsAPIResponseData,
                );
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
                this.callUserDetailsSessionData(accountOpeningAction.userDetailsSessionData);
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
                this.callUserDetailFieldOptionsAPIResponseData(
                    accountOpeningAction.userDetailFieldOptionsAPIResponseData,
                );
            },
        );
    }

    callUserDetailsAPIResponseData(userDetailsAPIResponseData) {
        if (userDetailsAPIResponseData) {
            this.otherAccountOpeningData = userDetailsAPIResponseData;
            this.otherAccountFormGroup.patchValue(userDetailsAPIResponseData);
            this.selectSettlementAccount = userDetailsAPIResponseData.settlementAccount.filter(item =>
                item.account_status === 'Active' || item.account_status === 'New Today');
        }
    }
    callUserDetailsSessionData(userDetailsSessionData) {
        if (userDetailsSessionData) {
            this.personalContactDetailData = userDetailsSessionData;
            this.otherAccountFormGroup.patchValue(userDetailsSessionData);
        }
    }
    callUserDetailFieldOptionsAPIResponseData(userDetailFieldOptionsAPIResponseData) {
        if (userDetailFieldOptionsAPIResponseData) {
            this.userDetailFieldOptionsAPIResponseData = userDetailFieldOptionsAPIResponseData;
            this.countryList = userDetailFieldOptionsAPIResponseData.countryList;
            this.citizenList = userDetailFieldOptionsAPIResponseData.citizenList;
            this.raceList = userDetailFieldOptionsAPIResponseData.raceList;
            this.religionList = userDetailFieldOptionsAPIResponseData.religionList;
            this.martialStatusList = userDetailFieldOptionsAPIResponseData.martialStatusList;
            this.professionList = userDetailFieldOptionsAPIResponseData.professionList;
            const industryArr = userDetailFieldOptionsAPIResponseData.industryList;
            let list = industryArr.map((e) => ({
                letter: e.employmentShortName.split('-')[0].trim(),
                names: e.employmentShortName,
            }));
            list = list.reduce(function (r, a) {
                r[a['letter']] = r[a['letter']] || [];
                r[a['letter']].push(a.names);
                return r;
            }, Object.create(null));

            for (const prop in list) {
                this.industryList.push({
                    letter: prop,
                    names: list[prop],
                });
            }
        }
    }

    getNationalityName() {
        if (this.otherAccountFormGroup.controls['nationality'].value === 'MYS') {
            this.otherAccountFormGroup.controls['nationality'].setValue('MY');
        }

        const countryArr = this.countryList.filter(
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            (country) =>
                country['countryCode'] === this.otherAccountFormGroup.controls['nationality'].value,
        );
        if (countryArr && countryArr[0]) {
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            return countryArr[0]['countryLongName'];
        }
    }

    getCitizenName() {
        const citizenArr = this.citizenList.filter(
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            (citizen) =>
                citizen['citizenCode'] === this.otherAccountFormGroup.controls['citizen'].value,
        );
        if (citizenArr && citizenArr[0]) {
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            return citizenArr[0]['citizenLongName'];
        }
    }

    getRaceName() {
        const raceArr = this.raceList.filter(
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            (race) => race['raceCode'] === this.otherAccountFormGroup.controls['race'].value,
        );
        if (raceArr && raceArr[0]) {
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            return raceArr[0]['raceLongName'];
        }
    }

    getReligionName() {
        const religionArr = this.religionList.filter(
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            (religion) =>
                religion['religionCode'] === this.otherAccountFormGroup.controls['religion'].value,
        );
        if (religionArr && religionArr[0]) {
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            return religionArr[0]['religionLongName'];
        }
    }

    getMaritalStatus() {
        const maritalArr = this.martialStatusList.filter(
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            (martialStatus) =>
                martialStatus['maritalCode'] ===
                this.otherAccountFormGroup.controls['maritalStatus'].value,
        );
        if (maritalArr && maritalArr[0]) {
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
            return maritalArr[0]['maritalLongName'];
        }
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    openDialog(data) {
        const dialogRef = this.dialog.open(DialogOtherAccountDetailComponent, {
            panelClass: ['full-width', 'dialog-email'],
            maxWidth: '600px',
            width: '100%',
            autoFocus: false,
            data: {
                dialogHeading: data.dialogHeading,
                dialogSubheading: data.dialogSubheading,
                errorMessage: data.errorMessage,
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Cancel',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Update',
                oterDetailFormControlName: data.oterDetailFormControlName,
                dialogPlaceholder: data.dialogPlaceholder,
                dropdownFormControlValue: data.dropdownFormControlName,
                dropdownFormControlId: data.dropdownFormControlId,
                isRequired: true,
                list: data.list,
                isGroupDropdown: data.isGroupDropdown,
                formControlValue: data.formControlValue,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.callAfterDialogClose(result);
        });
    }

    callAfterDialogClose(result) {
        if (result !== null && result !== undefined) {
            this.otherAccountFormGroup.patchValue(result);
        }
    }

    dialogUpdate(type) {
        if (type === 'nationality') {
            this.openDialog({
                dialogHeading: 'Update Nationality',
                dialogSubheading: 'Enter your Nationality',
                dropdownFormControlValue: 'countryLongName',
                errorMessage: 'This field is required',
                dialogPlaceholder: 'Type here',
                oterDetailFormControlName: 'nationality',
                dropdownFormControlId: 'countryCode',
                list: this.countryList,
                isGroupDropdown: false,
                formControlValue: this.otherAccountFormGroup.controls['nationality'].value,
            });
        }
    }
    checkFieldHasValue() {
        if (this.otherAccountFormGroup) {
            return Object.values(this.otherAccountFormGroup.controls).some(
                ({ value }) => !!value || value === 0,
            );
        }
    }

    goToPreviousPage(): boolean {
        let accountObj = {};
        this.personalContactDetailData
            ? (accountObj = {
                ...this.personalContactDetailData,
                ...this.otherAccountFormGroup.value,
            })
            : (accountObj = {
                ...this.otherAccountFormGroup.value,
            });
        this.store.dispatch(new AccountOpeningActions.GetUserDetailsSessionData(accountObj));
        this.previousPage.emit(this.otherAccountFormGroup.value);
        return true;
    }
    goToNextPage() {
        window.scrollTo(0, 0);
        this.otherAccountFormGroup.markAllAsTouched();

        if (this.otherAccountFormGroup.valid) {
            let accountObj = {};
            this.personalContactDetailData
                ? (accountObj = {
                    ...this.personalContactDetailData,
                    ...this.otherAccountFormGroup.value,
                })
                : (accountObj = {
                    ...this.otherAccountFormGroup.value,
                });
            this.store.dispatch(new AccountOpeningActions.GetUserDetailsSessionData(accountObj));
            this.btnSubmit.emit({
                otherAccountFormGroup: accountObj,
                accountDetail: this.userDetailFieldOptionsAPIResponseData,
            });
        }
        this.clickToSubmitAAData();
    }

    checkFormValidity(): boolean {
        this.otherAccountFormGroup.valueChanges.subscribe((changeValue) => {
            this.cd.markForCheck();
        });

        if (this.otherAccountFormGroup.status === 'VALID') {
            return true;
        }

        return false;
    }

    clickToSubmitAAData() {
        const day = getDayOfWeek();
        setEventAndDigitalData(
            {
                wealthEvent: 'wealth:acc-opening-3',
            },
            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Unit Trust Module',
                            pageType: 'Checkout',
                            subCategory1: 'UT NTP Landing Options',
                        },
                        pageInfo: {
                            pageName: 'Wealth: UT Account Opening 3',
                            day: day,
                        },
                    },
                    user: {
                        loginStatus: 'logged-in',
                        memberLoginType: 'repeat',
                        customerType: this.customerType
                    },
                    sales: {
                        type: 'Unit Trust Account Opening',
                    },
                },
            },
        );
    }
}
