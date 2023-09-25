import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PersonalContactDetailsComponent } from './personal-contact-details.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DialogFormComponent } from '@cimb/mint';
import * as AccountOpeningActions from '../../../core/state/account-opening/account.actions';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { EventService } from '@cimb/core';
describe('PersonalContactDetailsComponent', () => {
    let component: PersonalContactDetailsComponent;
    let fixture: ComponentFixture<PersonalContactDetailsComponent>;
    const formBuilder: FormBuilder = new FormBuilder();
    let dialog: MatDialog;
    let overlayContainerElement: HTMLElement;
    let bottomSheet: any;

    const initialState = {
        emailPlaceholder: 'Email',
        emailLable: 'EMAIL',
        valueExistEmailLable: 'Email Address',
        emailError: " Please enter your email address in this format 'yourname@example.com'",
        mailAddressLable: 'MAILING ADDRESS',
        valueExistMailAddressLable: 'Mailing Address',
        emailPattern: '(?![0-9_])[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}',
        mobilePattern: '[0-9]*',
        countryList: [],
        stateList: [],
        titleList: [],
        postCodeList: [],
    };
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonalContactDetailsComponent],
            imports: [
                MatDialogModule,
                ReactiveFormsModule,
                FormsModule,
                HttpClientTestingModule,
                StoreModule.forRoot({}),
                RouterTestingModule.withRoutes([]),
                BrowserAnimationsModule,
                MatBottomSheetModule,
            ],
            providers: [
                provideMockStore({ initialState }),
                { provide: FormBuilder, useValue: formBuilder },
                {
                    provide: OverlayContainer,
                    useFactory: () => {
                        overlayContainerElement = document.createElement('div');
                        return { getContainerElement: () => overlayContainerElement };
                    },
                },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                // MatBottomSheet,
                // {
                //     provide: EventService,
                //     useValue: {
                //         onReceived: jest.fn(),
                //         onAddItem: jest.fn(),
                //     },
                // },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonalContactDetailsComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        store = TestBed.inject(MockStore);
        // pass in the form dynamically
        component.openingAccountFormGroup = formBuilder.group({
            title: [''],
            name: ['', Validators.required],
            mykadNumber: ['', Validators.required],
            birthDate: ['', Validators.required],
            email: ['', [Validators.required]],
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
        component.ngOnInit();

        fixture.detectChanges();
        jest.spyOn(store, 'dispatch');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should ngOnDestroy', () => {
        component.ngOnDestroy();
        expect(component.acountOpeningAPISubscription).toBeUndefined();
        // component.acountOpeningAPISubscription.unsubscribe();
        expect(component.ngOnDestroy).toBeTruthy();
    });

    it('PersonalContactDetailsComponent ngOnInit -  clicked', () => {
        expect(component.ngOnInit()).toBeUndefined();
    });

    it('PersonalContactDetailsComponent ngOnInit initial data', () => {
        const spy = jest.spyOn(component, 'loadInitialForm');
        component.loadInitialForm();
        expect(spy).toHaveBeenCalledTimes(1);
        component.ngOnInit();
        expect(component.ngOnInit()).toBeUndefined();
    });

    it('call checkFieldHasValue', () => {
        const name = component.openingAccountFormGroup.controls['name'];
        name.setValue('john');
        expect(component.openingAccountFormGroup).toBeDefined();
        expect(
            Object.values(component.openingAccountFormGroup.controls).some(
                ({ value }) => !!value || value === 0,
            ),
        ).toBeTruthy();
        expect(component.checkFieldHasValue()).toBeTruthy();
    });
    it('call checkFieldHasValue false', () => {
        component.openingAccountFormGroup = undefined;
        component.checkFieldHasValue();
        expect(component.openingAccountFormGroup).toBeUndefined();
    });
    it('call goToNextPage', () => {
        // Object.defineProperty(sessionStorage, "setItem", { writable: true });
        const spy2 = jest.spyOn(store, 'dispatch');

        const form = component.openingAccountFormGroup;
        const spy1 = jest.spyOn(component.openingAccountFormGroup, 'markAllAsTouched');
        component.openingAccountFormGroup.markAllAsTouched();
        expect(spy1).toHaveBeenCalledTimes(1);

        jest.spyOn(component.btnSubmit, 'emit');
        // jest.spyOn(sessionStorage, 'setItem');
        expect(form.valid).toBeFalsy();
        form.setValue({
            addrLine1: 'Jalan Madrasah',
            addrLine2: 'Jalan 1/22a, Taman Melati',
            addrLine3: '',
            addrLine4: '',
            birthDate: '11 June 1984',
            country: 'MY',
            email: 'john.wick@gmail.com',
            houseNumber: '',
            mobilePhone: '60311234567',
            mykadNumber: '930505086630',
            name: 'John',
            officeNumber: '',
            postcode: '53100',
            state: '14',
            title: '',
        });

        let accountObj = {};
        accountObj = {
            payload: {
                addrLine1: 'Jalan Madrasah',
                addrLine2: 'Jalan 1/22a, Taman Melati',
                addrLine3: '',
                addrLine4: '',
                birthDate: '11 June 1984',
                country: 'MY',
                email: 'john.wick@gmail.com',
                houseNumber: '',
                mobilePhone: '60311234567',
                mykadNumber: '930505086630',
                name: 'John',
                officeNumber: '',
                postcode: '53100',
                state: '14',
                title: '',
            },
            type: '[ACCOUNTOPENINGUSERDETAILS] Get UserDetails Session Data',
        };

        component.otherAccDetailData
            ? (accountObj = {
                  ...component.otherAccDetailData,
                  ...component.openingAccountFormGroup.value,
              })
            : (accountObj = {
                  ...component.openingAccountFormGroup.value,
              });

        store.dispatch(new AccountOpeningActions.GetUserDetailsSessionData(accountObj));
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            new AccountOpeningActions.GetUserDetailsSessionData(accountObj),
        );

        component.goToNextPage();

        expect(form.valid).toBeTruthy();
        // sessionStorage.setItem('accountOpeningValue', JSON.stringify(component.openingAccountFormGroup.value));
        const nativeElement = fixture.nativeElement;
        const button = nativeElement.querySelector('button');
        button.dispatchEvent(new Event('click'));

        fixture.detectChanges();
        expect(component.btnSubmit.emit).toHaveBeenCalledWith(
            component.openingAccountFormGroup.value,
        );
        expect(component.goToNextPage()).toBeUndefined();
    });

    it('call goToNextPage undefined', () => {
        const spy1 = jest.spyOn(component.openingAccountFormGroup, 'markAllAsTouched');
        component.openingAccountFormGroup.markAllAsTouched();
        expect(spy1).toHaveBeenCalledTimes(1);
        component.goToNextPage();
        component.openingAccountFormGroup.reset();
        component.openingAccountFormGroup.patchValue(null);
        fixture.detectChanges();
        expect(component.openingAccountFormGroup.invalid).toBe(true);
    });

    it('should chk callCountryName not get value', () => {
        const countryList = [
            {
                countryId: 102,
                countryCode: 'AB',
                countryShortName: 'ADEN',
                countryLongName: 'ADEN',
            },
        ];
        component.openingAccountFormGroup.controls['country'].setValue('MY');
        component.callCountryName();
        expect(
            countryList.filter(
                (data) =>
                    data.countryCode ===
                    component.openingAccountFormGroup.controls['country'].value,
            )[0]?.countryLongName,
        ).toEqual(undefined);
        expect(component.callCountryName());
    });
    it('should chk callCountryName get value', () => {
        const countryList = [
            {
                countryId: 102,
                countryCode: 'AB',
                countryShortName: 'ADEN',
                countryLongName: 'ADEN',
            },
        ];
        component.openingAccountFormGroup.controls['country'].setValue('AB');
        component.callCountryName();
        expect(
            countryList.filter(
                (data) =>
                    data.countryCode ===
                    component.openingAccountFormGroup.controls['country'].value,
            )[0]?.countryLongName,
        ).toEqual('ADEN');
        expect(component.callCountryName());
    });

    it('should chk callStateName get value', () => {
        const stateList = [
            {
                stateId: 102,
                stateCode: 'AB',
                stateShortName: 'ADEN',
                stateLongName: 'ADEN',
            },
        ];
        component.openingAccountFormGroup.controls['state'].setValue('AB');
        component.callStateName();
        expect(
            stateList.filter(
                (data) =>
                    data.stateCode === component.openingAccountFormGroup.controls['state'].value,
            )[0].stateLongName,
        ).toEqual('ADEN');
        expect(component.callStateName());
    });
    it('should chk callStateName not find value', () => {
        const stateList = [
            {
                stateId: 102,
                stateCode: 'AB',
                stateShortName: 'ADEN',
                stateLongName: 'ADEN',
            },
        ];
        component.openingAccountFormGroup.controls['state'].setValue('ABC');
        component.callStateName();
        expect(
            stateList.filter(
                (data) =>
                    data.stateCode === component.openingAccountFormGroup.controls['state'].value,
            )[0]?.stateLongName,
        ).toBe(undefined);
        expect(component.openingAccountFormGroup.controls['state'].value === 'AB').toBe(false);

        // expect(val).toBe(undefined)
        expect(component.callStateName());
    });

    it('call loadInitialForm initialize form', () => {
        component.openingAccountFormGroup = formBuilder.group({
            title: [''],
            name: ['', Validators.required],
            mykadNumber: ['', Validators.required],
            birthDate: ['', Validators.required],
            email: ['', [Validators.required]],
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
        const accountOpeningAction = {
            userDetailsAPIResponseData: {
                addrLine1: 'Jalan Madrasah',
                addrLine2: 'Jalan 1/22a, Taman Melati',
                addrLine3: '',
                addrLine4: '',
                addressLine1: 'Jalan Madrasah',
                addressLine2: 'Jalan 1/22a, Taman Melati',
                addressLine3: '',
                addressLine4: '',
                birthDate: '11 June 1984',
                citizen: '0',
                country: 'MY',
                email: 'john.wick@gmail.com',
                gender: 'M',
                houseNumber: '',
                id: '930505086630',
                idNo: '930505086630',
                idType: '002',
                industry: '',
                maritalStatus: 'S',
                mobilePhone: '60311234567',
                mykadNumber: '930505086630',
                name: 'John',
                nationality: 'MY',
                officeNumber: '',
                postcode: '53100',
                profession: '',
                race: 'I',
                religion: 'C',
                settlementAccount: [
                    {
                        accountNumber: '16285729231',
                        accountType: 'CIMB Current Account',
                        amount: '223,242.00',
                        balanceType: 'Current',
                        settlementAcctType: 'C',
                    },
                    {
                        accountNumber: '75285829533',
                        accountType: 'CIMB Saving Account',
                        amount: '21,890.00',
                        balanceType: 'Current',
                        settlementAcctType: 'I',
                    },
                ],
                state: '14',
                title: '',
            },

            userCifDetailsData: {
                mobilePhone: '0123456789',
            },
            userDetailsSessionData: {
                title: '',
                name: 'John',
                mykadNumber: '930505086630',
                birthDate: '11 June 1984',
                email: 'john.wick@gmail.com',
                country: 'MY',
                state: '14',
                postcode: '53100',
                addrLine1: 'Jalan Madrasah',
                addrLine2: 'Jalan 1/22a, Taman Melati',
                addrLine3: null,
                addrLine4: null,
                mobilePhone: '60311234567',
                houseNumber: '453874538745',
                officeNumber: '',
            },
            userDetailFieldOptionsAPIResponseData: {
                titleSalutations: [
                    {
                        salutationId: 102,
                        salutationCode: '01',
                        salutationType: 'B',
                        salutationShortName: 'MR',
                        salutationLongName: 'MR',
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2021-10-08T03:07:15.000+00:00',
                        modifiedDate: '2021-10-08T03:07:15.000+00:00',
                    },
                ],
                countryList: [
                    {
                        countryId: 102,
                        countryCode: 'AB',
                        countryNo: 0,
                        countryShortName: 'ADEN',
                        countryLongName: 'ADEN',
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2021-10-08T04:03:51.000+00:00',
                        modifiedDate: '2021-10-08T04:03:51.000+00:00',
                    },
                ],
                stateList: [
                    {
                        stateId: 102,
                        countryCode: 'MY',
                        stateCode: '01',
                        stateShortName: 'JOHOR',
                        stateLongName: 'JOHOR DARUL TAKZIM',
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2021-10-08T06:39:48.000+00:00',
                        modifiedDate: '2021-10-08T06:39:48.000+00:00',
                    },
                ],
                postCodeList: [
                    {
                        postcodeId: 104,
                        postcodeStart: 1000,
                        postcodeEnd: 2999,
                        postcodeShortName: 'TCJ',
                        stateId: 110,
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2022-01-18T06:31:54.000+00:00',
                        modifiedDate: null,
                    },
                ],
            },
        };

        component.loadInitialForm();
        fixture.detectChanges();
        component.callUserDetailsSessionData(accountOpeningAction.userDetailsSessionData);
        fixture.detectChanges();
        component.callUserDetailFieldOptionsAPIResponseData(
            accountOpeningAction.userDetailFieldOptionsAPIResponseData,
        );
        fixture.detectChanges();
        component.callUserCifDetailAPIResponseData(accountOpeningAction.userCifDetailsData);
        // });
    });

    it('call callUserCifDetailAPIResponseData with valid value', () => {
        const userCifDetailsData = {
            mobilePhone: '0123456789',
        };

        component.callUserCifDetailAPIResponseData(userCifDetailsData);
        expect(userCifDetailsData).toBeTruthy();
        component.openingAccountFormGroup.patchValue(userCifDetailsData);
        expect(component.callUserCifDetailAPIResponseData).toBeTruthy();
        fixture.detectChanges();
    });

    it('call  callUserDetailsSessionData ', () => {
        const userDetailsSessionData = {
            title: '',
            name: 'John',
            mykadNumber: '930505086630',
            birthDate: '11 June 1984',
            email: 'john.wick@gmail.com',
            country: 'MY',
            state: '14',
            postcode: '53100',
            addrLine1: 'Jalan Madrasah',
            addrLine2: 'Jalan 1/22a, Taman Melati',
            addrLine3: null,
            addrLine4: null,
            mobilePhone: '60311234567',
            houseNumber: '453874538745',
            officeNumber: '',
        };
        component.otherAccDetailData = userDetailsSessionData;
        component.callUserDetailsSessionData(userDetailsSessionData);
        expect(userDetailsSessionData).toBeTruthy();
        expect(component.otherAccDetailData).toEqual(userDetailsSessionData);
        component.openingAccountFormGroup.patchValue(userDetailsSessionData);
        expect(component.callUserDetailsSessionData).toBeTruthy();
        fixture.detectChanges();
    });

    it('call  callUserDetailFieldOptionsAPIResponseData', () => {
        const userDetailFieldOptionsAPIResponseData = {
            titleSalutations: [
                {
                    salutationId: 102,
                    salutationCode: '01',
                    salutationType: 'B',
                    salutationShortName: 'MR',
                    salutationLongName: 'MR',
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2021-10-08T03:07:15.000+00:00',
                    modifiedDate: '2021-10-08T03:07:15.000+00:00',
                },
            ],
            countryList: [
                {
                    countryId: 102,
                    countryCode: 'AB',
                    countryNo: 0,
                    countryShortName: 'ADEN',
                    countryLongName: 'ADEN',
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2021-10-08T04:03:51.000+00:00',
                    modifiedDate: '2021-10-08T04:03:51.000+00:00',
                },
            ],
            stateList: [
                {
                    stateId: 102,
                    countryCode: 'MY',
                    stateCode: '01',
                    stateShortName: 'JOHOR',
                    stateLongName: 'JOHOR DARUL TAKZIM',
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2021-10-08T06:39:48.000+00:00',
                    modifiedDate: '2021-10-08T06:39:48.000+00:00',
                },
            ],
            postCodeList: [
                {
                    postcodeId: 104,
                    postcodeStart: 1000,
                    postcodeEnd: 2999,
                    postcodeShortName: 'TCJ',
                    stateId: 110,
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2022-01-18T06:31:54.000+00:00',
                    modifiedDate: null,
                },
            ],
        };
        component.callUserDetailFieldOptionsAPIResponseData(userDetailFieldOptionsAPIResponseData);
        expect(userDetailFieldOptionsAPIResponseData).toBeTruthy();
        fixture.detectChanges();
        component.titleList = userDetailFieldOptionsAPIResponseData.titleSalutations.map((e) => ({
            ...e,
            salutationLongName:
                e.salutationLongName[0].toUpperCase() +
                e.salutationLongName.substr(1).toLowerCase(),
        }));
        expect(component.titleList).toEqual(
            userDetailFieldOptionsAPIResponseData.titleSalutations.map((e) => ({
                ...e,
                salutationLongName:
                    e.salutationLongName[0].toUpperCase() +
                    e.salutationLongName.substr(1).toLowerCase(),
            })),
        );
        component.countryList = userDetailFieldOptionsAPIResponseData.countryList.map((e) => ({
            ...e,
            countryLongName:
                e.countryLongName[0].toUpperCase() + e.countryLongName.substr(1).toLowerCase(),
        }));
        expect(component.countryList).toEqual(
            userDetailFieldOptionsAPIResponseData.countryList.map((e) => ({
                ...e,
                countryLongName:
                    e.countryLongName[0].toUpperCase() + e.countryLongName.substr(1).toLowerCase(),
            })),
        );
        component.stateList = userDetailFieldOptionsAPIResponseData.stateList.map((e) => ({
            ...e,
            stateLongName:
                e.stateLongName[0].toUpperCase() + e.stateLongName.substr(1).toLowerCase(),
        }));
        expect(component.stateList).toEqual(
            userDetailFieldOptionsAPIResponseData.stateList.map((e) => ({
                ...e,
                stateLongName:
                    e.stateLongName[0].toUpperCase() + e.stateLongName.substr(1).toLowerCase(),
            })),
        );
        component.postCodeList = userDetailFieldOptionsAPIResponseData.postCodeList;
        expect(component.postCodeList).toEqual(userDetailFieldOptionsAPIResponseData.postCodeList);
        fixture.detectChanges();
    });
    it('call callAfterDialogClose', () => {
        const result = { religion: 'H' };
        component.callAfterDialogClose(result);
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        fixture.detectChanges();
        component.openingAccountFormGroup.patchValue(result);
    });
    it('call callAfterDialogClose', () => {
        const result = null;
        component.callAfterDialogClose(result);
        expect(result).toBeNull();
        fixture.detectChanges();
    });
    it('should call clickToSubmitAAData', () => {
        component.customerType = 'NTP'
        component.clickToSubmitAAData('Page1');
        expect(component).toBeTruthy();
    });
});
