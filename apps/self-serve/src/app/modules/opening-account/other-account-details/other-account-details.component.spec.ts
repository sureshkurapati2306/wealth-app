import { OverlayContainer } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OtherAccountDetailsComponent } from './other-account-details.component';
import { DialogOtherAccountDetailComponent } from '@cimb/mint';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as AccountOpeningActions from '../../../core/state/account-opening/account.actions';
describe('OtherAccountDetailsComponent', () => {
    let component: OtherAccountDetailsComponent;
    let fixture: ComponentFixture<OtherAccountDetailsComponent>;
    const formBuilder: FormBuilder = new FormBuilder();
    let dialog: MatDialog;
    let overlayContainerElement: HTMLElement;
    let store: MockStore;

    const initialState = {
        countryList: [],
        citizenList: [],
        raceList: [],
        religionList: [],
        martialStatusList: [],
        industryList: [],
        professionList: [],
        errorMessage: 'This field is required',
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OtherAccountDetailsComponent],
            imports: [
                MatDialogModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
            ],
            providers: [
                provideMockStore({ initialState }),
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: FormBuilder, useValue: formBuilder },
                {
                    provide: OverlayContainer,
                    useFactory: () => {
                        overlayContainerElement = document.createElement('div');
                        return {
                            getContainerElement: () => overlayContainerElement,
                        };
                    },
                },
                // {provide: MatDialog, useValue: new dialogMock()},
                // other providers
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
        dialog = TestBed.inject(MatDialog);
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OtherAccountDetailsComponent);
        component = fixture.componentInstance;
        component.otherAccountFormGroup = formBuilder.group({
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

        component.ngOnInit();

        component.toggleGender = [
            { value: 'M', label: 'Male' },
            { value: 'F', label: 'Female' },
        ];
        fixture.detectChanges();
        jest.spyOn(store, 'dispatch');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('OtherAccountDetailsComponent ngOnInit -  clicked', () => {
        expect(component.ngOnInit()).toBeUndefined();
    });

    it('OtherAccountDetailsComponent ngOnInit initial data', () => {
        const spy = jest.spyOn(component, 'initLoadData');
        component.initLoadData();
        expect(spy).toHaveBeenCalledTimes(1);
        component.ngOnInit();
        expect(component.ngOnInit()).toBeUndefined();
    });

    it('OtherAccountDetailsComponent-call checkFieldHasValue', () => {
        const name = component.otherAccountFormGroup.controls['industry'];
        name.setValue('abc');
        expect(component.otherAccountFormGroup).toBeDefined();
        expect(
            Object.values(component.otherAccountFormGroup.controls).some(
                ({ value }) => !!value || value === 0,
            ),
        ).toBeTruthy();
        expect(component.checkFieldHasValue()).toBeTruthy();
    });
    it('OtherAccountDetailsComponent-call checkFieldHasValue false', () => {
        component.otherAccountFormGroup = undefined;
        component.checkFieldHasValue();
        expect(component.otherAccountFormGroup).toBeUndefined();
    });

    it('OtherAccountDetailsComponent - call goToNextPage', () => {
        // Object.defineProperty(sessionStorage, "setItem", { writable: true });
        const spy2 = jest.spyOn(store, 'dispatch');
        const form = component.otherAccountFormGroup;
        const spy1 = jest.spyOn(
            component.otherAccountFormGroup,
            'markAllAsTouched',
        );
        component.otherAccountFormGroup.markAllAsTouched();
        expect(spy1).toHaveBeenCalledTimes(1);

        jest.spyOn(component.btnSubmit, 'emit');
        // jest.spyOn(sessionStorage, 'setItem');
        expect(form.valid).toBeFalsy();
        form.setValue({
            bankAcctNo: '16285729231',
            nationality: 'MY',
            citizen: '0',
            gender: 'M',
            race: 'I',
            religion: 'C',
            maritalStatus: 'S',
            industry: 'Agriculture - Growing of other non-perennial crops',
            profession: 'Armed Forces Occupations ',
        });

        let accountObj = {};
        component.personalContactDetailData
            ? (accountObj = {
                  ...component.personalContactDetailData,
                  ...component.otherAccountFormGroup.value,
              })
            : (accountObj = {
                  ...component.otherAccountFormGroup.value,
              });
        store.dispatch(
            new AccountOpeningActions.GetUserDetailsSessionData(accountObj),
        );
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            new AccountOpeningActions.GetUserDetailsSessionData(accountObj),
        );
        component.goToNextPage();

        expect(form.valid).toBeTruthy();
        // sessionStorage.setItem('accountOpeningValue', JSON.stringify(component.otherAccountFormGroup.value));
        const nativeElement = fixture.nativeElement;
        const button = nativeElement.querySelector('button');
        button.dispatchEvent(new Event('click'));

        fixture.detectChanges();
        expect(component.btnSubmit.emit).toHaveBeenCalledWith({
            otherAccountFormGroup: component.otherAccountFormGroup.value,
            accountDetail: component.userDetailFieldOptionsAPIResponseData,
        });
        expect(component.goToNextPage()).toBeUndefined();
    });
    it('OtherAccountDetailsComponent - call goToNextPage undefined', () => {
        const spy1 = jest.spyOn(
            component.otherAccountFormGroup,
            'markAllAsTouched',
        );
        component.otherAccountFormGroup.markAllAsTouched();
        expect(spy1).toHaveBeenCalledTimes(1);
        component.goToNextPage();
        component.otherAccountFormGroup.reset();
        component.otherAccountFormGroup.patchValue(null);
        fixture.detectChanges();
        expect(component.otherAccountFormGroup.invalid).toBe(true);
    });

    it('OtherAccountDetailsComponent goToPreviousPage -  clicked', () => {
        jest.spyOn(component.previousPage, 'emit');


        // Object.defineProperty(sessionStorage, "setItem", { writable: true });
        const spy2 = jest.spyOn(store, 'dispatch');
        const form = component.otherAccountFormGroup;
        // const spy1 = jest.spyOn(
        //     component.otherAccountFormGroup,
        //     'markAllAsTouched',
        // );
        // component.otherAccountFormGroup.markAllAsTouched();
        // expect(spy1).toHaveBeenCalledTimes(1);

        // jest.spyOn(component.btnSubmit, 'emit');
        // jest.spyOn(sessionStorage, 'setItem');
        // expect(form.valid).toBeFalsy();
        form.setValue({
            bankAcctNo: '16285729231',
            nationality: 'MY',
            citizen: '0',
            gender: 'M',
            race: 'I',
            religion: 'C',
            maritalStatus: 'S',
            industry: 'Agriculture - Growing of other non-perennial crops',
            profession: 'Armed Forces Occupations ',
        });

        let accountObj = {};
        component.personalContactDetailData
            ? (accountObj = {
                  ...component.personalContactDetailData,
                  ...component.otherAccountFormGroup.value,
              })
            : (accountObj = {
                  ...component.otherAccountFormGroup.value,
              });
        store.dispatch(
            new AccountOpeningActions.GetUserDetailsSessionData(accountObj),
        );
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            new AccountOpeningActions.GetUserDetailsSessionData(accountObj),
        );

        component.goToPreviousPage();
        const nativeElement = fixture.nativeElement;
        const button = nativeElement.querySelector('button');
        button.dispatchEvent(new Event('click'));
        // const nativeElement = fixture.nativeElement;
        // const button = nativeElement.querySelector('button');
        // button.dispatchEvent(new Event('click'));

        fixture.detectChanges();

        expect(component.previousPage.emit).toHaveBeenCalledWith(
            component.otherAccountFormGroup.value,
        );
    });

    it('should chk getNationalityName not get value', () => {
        const countryList = [
            {
                countryId: 102,
                countryCode: 'AB',
                countryShortName: 'ADEN',
                countryLongName: 'ADEN',
            },
        ];
        component.otherAccountFormGroup.controls['nationality'].setValue('MY');
        component.getNationalityName();
        const countryArr = countryList.filter(
            (data) =>
                data.countryCode ===
                component.otherAccountFormGroup.controls['nationality'].value,
        );
        expect(countryArr && countryArr[0]).toBeFalsy();
        expect(countryArr[0]?.countryLongName).toEqual(undefined);
        expect(component.getNationalityName());
    });
    it('should chk getNationalityName get value', () => {
        const countryList = [
            {
                countryId: 102,
                countryCode: 'AB',
                countryShortName: 'ADEN',
                countryLongName: 'ADEN',
            },
        ];
        component.otherAccountFormGroup.controls['nationality'].setValue('AB');
        component.getNationalityName();
        const countryArr = countryList.filter(
            (data) =>
                data.countryCode ===
                component.otherAccountFormGroup.controls['nationality'].value,
        );
        expect(countryArr && countryArr[0]).toBeTruthy();
        expect(countryArr[0]?.countryLongName).toEqual('ADEN');
        expect(component.getNationalityName());
    });

    it('should chk getCitizenName get value', () => {
        const citizenList = [
            {
                citizenCode: '1',
                citizenId: 103,
                citizenLongName: 'Permanent Resident',
                citizenShortName: 'Permanent Resident',
                citizenStatus: 'Y',
            },
        ];
        component.otherAccountFormGroup.controls['citizen'].setValue('1');
        component.getCitizenName();
        expect(
            citizenList.filter(
                (data) =>
                    data.citizenCode ===
                    component.otherAccountFormGroup.controls['citizen'].value,
            )[0].citizenLongName,
        ).toEqual('Permanent Resident');
        expect(component.getCitizenName());
    });
    it('should chk getCitizenName not find value', () => {
        const citizenList = [
            {
                citizenCode: '1',
                citizenId: 103,
                citizenLongName: 'Permanent Resident',
                citizenShortName: 'Permanent Resident',
                citizenStatus: 'Y',
            },
        ];
        component.otherAccountFormGroup.controls['citizen'].setValue('2');
        component.getCitizenName();
        expect(
            citizenList.filter(
                (data) =>
                    data.citizenCode ===
                    component.otherAccountFormGroup.controls['citizen'].value,
            )[0]?.citizenLongName,
        ).toBe(undefined);
        expect(
            component.otherAccountFormGroup.controls['citizen'].value === '1',
        ).toBe(false);

        // expect(val).toBe(undefined)
        expect(component.getCitizenName());
    });
    it('should chk getRaceName not get value', () => {
        const raceList = [
            {
                raceCode: 'B',
                raceId: 102,
                raceLongName: 'Bumiputra',
                raceShortName: 'Bumiputra',
            },
        ];
        component.otherAccountFormGroup.controls['race'].setValue('MY');
        component.getRaceName();
        const raceArr = raceList.filter(
            (data) =>
                data.raceCode ===
                component.otherAccountFormGroup.controls['race'].value,
        );
        expect(raceArr && raceArr[0]).toBeFalsy();
        expect(raceArr[0]?.raceLongName).toEqual(undefined);
        expect(component.getRaceName());
    });
    it('should chk getRaceName get value', () => {
        const raceList = [
            {
                raceCode: 'B',
                raceId: 102,
                raceLongName: 'Bumiputra',
                raceShortName: 'Bumiputra',
            },
        ];
        component.otherAccountFormGroup.controls['race'].setValue('B');
        component.getRaceName();
        const raceArr = raceList.filter(
            (data) =>
                data.raceCode ===
                component.otherAccountFormGroup.controls['race'].value,
        );
        expect(raceArr && raceArr[0]).toBeTruthy();
        expect(raceArr[0]?.raceLongName).toEqual('Bumiputra');
        expect(component.getRaceName());
    });
    it('should chk getReligionName not get value', () => {
        const religionList = [
            {
                religionCode: 'B',
                religionId: 102,
                religionLongName: 'Hindu',
                religionShortName: 'Hindu',
            },
        ];
        component.otherAccountFormGroup.controls['religion'].setValue('MY');
        component.getReligionName();
        const religionArr = religionList.filter(
            (data) =>
                data.religionCode ===
                component.otherAccountFormGroup.controls['religion'].value,
        );
        expect(religionArr && religionArr[0]).toBeFalsy();
        // expect(religionArr[0].religionLongName).toEqual(undefined);
        expect(component.getReligionName());
    });
    it('should chk getReligionName get value', () => {
        const religionList = [
            {
                religionCode: 'B',
                religionId: 102,
                religionLongName: 'Hindu',
                religionShortName: 'Hindu',
            },
        ];
        component.otherAccountFormGroup.controls['religion'].setValue('B');
        component.getReligionName();
        const religionArr = religionList.filter(
            (data) =>
                data.religionCode ===
                component.otherAccountFormGroup.controls['religion'].value,
        );
        expect(religionArr && religionArr[0]).toBeTruthy();
        expect(religionArr[0].religionLongName).toEqual('Hindu');
        expect(component.getReligionName());
    });
    it('should chk getMaritalStatus not get value', () => {
        const martialStatusList = [
            {
                maritalCode: 'B',
                maritalId: 102,
                maritalLongName: 'Married',
                maritalShortName: 'Married',
            },
        ];
        component.otherAccountFormGroup.controls['maritalStatus'].setValue(
            'MY',
        );
        component.getMaritalStatus();
        const maritalStatusArr = martialStatusList.filter(
            (data) =>
                data.maritalCode ===
                component.otherAccountFormGroup.controls['maritalStatus'].value,
        );
        expect(maritalStatusArr && maritalStatusArr[0]).toBeFalsy();
        // expect(maritalStatusArr[0].maritalLongName).toEqual(undefined);
        expect(component.getMaritalStatus());
    });
    it('should chk getMaritalStatus get value', () => {
        const martialStatusList = [
            {
                maritalCode: 'B',
                maritalId: 102,
                maritalLongName: 'Married',
                maritalShortName: 'Married',
            },
        ];
        component.otherAccountFormGroup.controls['maritalStatus'].setValue('B');
        component.getMaritalStatus();
        const maritalStatusArr = martialStatusList.filter(
            (data) =>
                data.maritalCode ===
                component.otherAccountFormGroup.controls['maritalStatus'].value,
        );
        expect(maritalStatusArr && maritalStatusArr[0]).toBeTruthy();
        expect(maritalStatusArr[0].maritalLongName).toEqual('Married');
        expect(component.getMaritalStatus());
    });

    // it('call openDialog', () => {
    //     const data = {
    //         dialogHeading: 'Update Nationality',
    //         dialogSubheading: 'Enter your Nationality',
    //         errorMessage: 'This field is required',
    //         dialogPlaceholder: 'Type here',
    //         oterDetailFormControlName: 'nationality',
    //         dropdownFormControlValue: 'countryLongName',
    //         dropdownFormControlId: 'countryCode',
    //         list: component.countryList,
    //         isGroupDropdown: false,
    //         formControlValue:
    //             component.otherAccountFormGroup.controls['nationality'].value,
    //     };
    //     const config = {
    //         panelClass: ['full-width', 'dialog-email'],
    //         maxWidth: '600px',
    //         width: '100%',
    //         autoFocus: false,
    //         data: {
    //             dialogHeading: data.dialogHeading,
    //             dialogSubheading: data.dialogSubheading,
    //             errorMessage: data.errorMessage,
    //             dialogButtonCancel: true,
    //             dialogButtonCancelText: 'Cancel',
    //             dialogButtonProceed: true,
    //             dialogButtonProceedText: 'Update',
    //             oterDetailFormControlName: data.oterDetailFormControlName,
    //             dialogPlaceholder: data.dialogPlaceholder,
    //             dropdownFormControlValue: data.dropdownFormControlValue,
    //             dropdownFormControlId: data.dropdownFormControlId,
    //             isRequired: true,
    //             list: data.list,
    //             isGroupDropdown: data.isGroupDropdown,
    //             formControlValue: data.formControlValue,
    //         },
    //     };
    //     component.openDialog(data);

    //     dialog
    //     .open(DialogOtherAccountDetailComponent, config)
    //     .afterClosed()
    //     .subscribe((result) => {
    //         component.callAfterDialogClose(result);
    //     });
    //     fixture.detectChanges(); // Updates the dialog in the overlay
    //     // expect(component.openDialog).toBeCalledWith(data)
    // });

    it('call callAfterDialogClose with value', () => {
        const result = { religion: 'H' };
        component.callAfterDialogClose(result);
        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        fixture.detectChanges();
        component.otherAccountFormGroup.patchValue(result);
    });
    it('call callAfterDialogClose without value', () => {
        const result = null;
        component.callAfterDialogClose(result);
        expect(result).toBeNull();
        // fixture.detectChanges();
        // component.otherAccountFormGroup.patchValue(result);
    });
    it('call dialogUpdate nationality', () => {
        const type = 'nationality';
        const spy = jest.spyOn(component, 'openDialog').mockReturnValue();
        component.openDialog({
            dialogHeading: 'Update Nationality',
            dialogSubheading: 'Enter your Nationality',
            errorMessage: 'This field is required',
            dialogPlaceholder: 'Type here',
            oterDetailFormControlName: 'nationality',
            dropdownFormControlValue: 'countryLongName',
            dropdownFormControlId: 'countryCode',
            list: component.countryList,
            isGroupDropdown: false,
            formControlValue:
                component.otherAccountFormGroup.controls['nationality'].value,
        });
        expect(spy).toHaveBeenCalledTimes(1);
        component.dialogUpdate(type);
    });
    it('call dialogUpdate citizen', () => {
        const type = 'citizen';
        const spy = jest.spyOn(component, 'openDialog').mockReturnValue();;
        component.openDialog({
            dialogHeading: 'Update Citizen',
            dialogSubheading: 'Enter your Citizen',
            errorMessage: 'This field is required',
            dialogPlaceholder: 'Type here',
            oterDetailFormControlName: 'citizen',
            dropdownFormControlValue: 'citizenLongName',
            dropdownFormControlId: 'citizenCode',
            list: component.citizenList,
            isGroupDropdown: false,
            formControlValue:
                component.otherAccountFormGroup.controls['citizen'].value,
        });
        expect(spy).toHaveBeenCalledTimes(1);
        component.dialogUpdate(type);
    });
    it('call dialogUpdate race', () => {
        const type = 'race';
        const spy = jest.spyOn(component, 'openDialog').mockReturnValue();;
        component.openDialog({
            dialogHeading: 'Update Race',
            dialogSubheading: 'Enter your Race',
            errorMessage: 'This field is required',
            dialogPlaceholder: 'Type here',
            oterDetailFormControlName: 'race',
            dropdownFormControlValue: 'raceLongName',
            dropdownFormControlId: 'raceCode',
            list: component.raceList,
            isGroupDropdown: false,
            formControlValue:
                component.otherAccountFormGroup.controls['race'].value,
        });
        expect(spy).toHaveBeenCalledTimes(1);
        component.dialogUpdate(type);
    });
    it('call dialogUpdate religion', () => {
        const type = 'religion';
        const spy = jest.spyOn(component, 'openDialog').mockReturnValue();;
        component.openDialog({
            dialogHeading: 'Update Religion',
            dialogSubheading: 'Enter your Religion',
            errorMessage: 'This field is required',
            dialogPlaceholder: 'Type here',
            oterDetailFormControlName: 'religion',
            dropdownFormControlValue: 'religionLongName',
            dropdownFormControlId: 'religionCode',
            list: component.religionList,
            isGroupDropdown: false,
            formControlValue:
                component.otherAccountFormGroup.controls['religion'].value,
        });
        expect(spy).toHaveBeenCalledTimes(1);
        component.dialogUpdate(type);
    });
    it('call dialogUpdate maritalStatus', () => {
        const type = 'maritalStatus';
        const spy = jest.spyOn(component, 'openDialog').mockReturnValue();;
        component.openDialog({
            dialogHeading: 'Update Marital Status',
            dialogSubheading: 'Enter your Marital Status',
            errorMessage: 'This field is required',
            dialogPlaceholder: 'Type here',
            oterDetailFormControlName: 'maritalStatus',
            dropdownFormControlValue: 'maritalLongName',
            dropdownFormControlId: 'maritalCode',
            list: component.martialStatusList,
            isGroupDropdown: false,
            formControlValue:
                component.otherAccountFormGroup.controls['maritalStatus'].value,
        });
        expect(spy).toHaveBeenCalledTimes(1);
        component.dialogUpdate(type);
    });
    it('call dialogUpdate dafault', () => {
        const type = 'dafault';
        component.dialogUpdate(type);
    });

    it('call initLoadData initialize form', () => {
        component.otherAccountFormGroup = formBuilder.group({
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
                mobileNumber: '60311234567',
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
            userDetailsSessionData: {
                bankAcctNo: '75285829533',
                citizen: '0',
                gender: 'M',
                industry: 'Agriculture - Growing of paddy',
                maritalStatus: 'S',
                nationality: 'MY',
                profession: 'U002',
                race: 'I',
                religion: 'C',
            },
            userDetailFieldOptionsAPIResponseData: {
                citizenList: [
                    {
                        citizenId: 103,
                        citizenCode: '1',
                        citizenStatus: 'Y',
                        citizenShortName: 'Permanent Resident',
                        citizenLongName: 'Permanent Resident',
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2021-10-11T06:58:07.000+00:00',
                        modifiedDate: '2021-10-11T06:58:07.000+00:00',
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
                raceList: [
                    {
                        raceId: 102,
                        raceCode: 'B',
                        raceShortName: 'Bumiputra',
                        raceLongName: 'Bumiputra',
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2021-10-08T04:27:00.000+00:00',
                        modifiedDate: '2021-10-08T04:27:00.000+00:00',
                    },
                ],
                religionList: [
                    {
                        religionId: 102,
                        religionCode: 'B',
                        religionShortName: 'Buddhist',
                        religionLongName: 'Buddhist',
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2021-10-08T03:03:10.000+00:00',
                        modifiedDate: '2021-10-08T03:03:10.000+00:00',
                    },
                ],
                martialStatusList: [
                    {
                        maritalId: 102,
                        maritalCode: 'D',
                        maritalShortName: 'Divorced',
                        maritalLongName: 'Divorced',
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2021-10-08T02:59:55.000+00:00',
                        modifiedDate: '2021-10-08T02:59:55.000+00:00',
                    },
                ],
                professionList: [
                    {
                        occupationId: 102,
                        occupationCode: 'U00X',
                        occupationShortName: 'OthO/sideLabourForce',
                        occupationLongName: 'Other Outside Labour Force',
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2021-10-08T03:44:25.000+00:00',
                        modifiedDate: '2021-10-08T03:44:25.000+00:00',
                    },
                ],
                industryList: [
                    {
                        employmentId: 102,
                        employmentCode: '01120',
                        employmentShortName: 'Agriculture - Growing of paddy',
                        createdBy: null,
                        modifiedBy: null,
                        createdDate: '2021-10-08T06:42:28.000+00:00',
                        modifiedDate: '2021-10-08T06:42:28.000+00:00',
                    },
                ],
            },
        };

        component.toggleGender = [
            { value: 'M', label: 'Male' },
            { value: 'F', label: 'Female' },
        ];
        component.initLoadData();
        component.callUserDetailsAPIResponseData(
            accountOpeningAction.userDetailsAPIResponseData,
        );
        component.callUserDetailsSessionData(
            accountOpeningAction.userDetailsSessionData,
        );
        component.callUserDetailFieldOptionsAPIResponseData(
            accountOpeningAction.userDetailFieldOptionsAPIResponseData,
        );
    });

    it('call  callUserDetailsAPIResponseData ', () => {
        const userDetailsAPIResponseData = {
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
            mobileNumber: '60311234567',
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
                    account_status: "Active",
                    amount: '223,242.00',
                    balanceType: 'Current',
                    settlementAcctType: 'C',
                },
                {
                    accountNumber: '75285829533',
                    accountType: 'CIMB Saving Account',
                    account_status: "Active",
                    amount: '21,890.00',
                    balanceType: 'Current',
                    settlementAcctType: 'I',
                },
            ],
            state: '14',
            title: '',
        };
        // component.selectSettlementAccount selectSettlementAccount[]=[];
        component.otherAccountOpeningData = userDetailsAPIResponseData;
        component.selectSettlementAccount =
            userDetailsAPIResponseData.settlementAccount;

        component.callUserDetailsAPIResponseData(userDetailsAPIResponseData);
        expect(userDetailsAPIResponseData).toBeTruthy();
        expect(component.otherAccountOpeningData).toEqual(
            userDetailsAPIResponseData,
        );
        expect(component.selectSettlementAccount).toEqual(
            userDetailsAPIResponseData.settlementAccount,
        );
        component.otherAccountFormGroup.patchValue(userDetailsAPIResponseData);
        expect(component.callUserDetailsAPIResponseData).toBeTruthy();
        fixture.detectChanges();
    });
    it('call  callUserDetailsSessionData ', () => {
        const userDetailsSessionData = {
            bankAcctNo: '75285829533',
            citizen: '0',
            gender: 'M',
            industry: 'Agriculture - Growing of paddy',
            maritalStatus: 'S',
            nationality: 'MY',
            profession: 'U002',
            race: 'I',
            religion: 'C',
        };

        component.personalContactDetailData = userDetailsSessionData;
        component.callUserDetailsSessionData(userDetailsSessionData);
        expect(userDetailsSessionData).toBeTruthy();
        expect(component.personalContactDetailData).toEqual(
            userDetailsSessionData,
        );
        component.otherAccountFormGroup.patchValue(userDetailsSessionData);
        expect(component.callUserDetailsSessionData).toBeTruthy();
        fixture.detectChanges();
    });
    it('call  callUserDetailFieldOptionsAPIResponseData', () => {
        const userDetailFieldOptionsAPIResponseData = {
            citizenList: [
                {
                    citizenId: 103,
                    citizenCode: '1',
                    citizenStatus: 'Y',
                    citizenShortName: 'Permanent Resident',
                    citizenLongName: 'Permanent Resident',
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2021-10-11T06:58:07.000+00:00',
                    modifiedDate: '2021-10-11T06:58:07.000+00:00',
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
            raceList: [
                {
                    raceId: 102,
                    raceCode: 'B',
                    raceShortName: 'Bumiputra',
                    raceLongName: 'Bumiputra',
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2021-10-08T04:27:00.000+00:00',
                    modifiedDate: '2021-10-08T04:27:00.000+00:00',
                },
            ],
            religionList: [
                {
                    religionId: 102,
                    religionCode: 'B',
                    religionShortName: 'Buddhist',
                    religionLongName: 'Buddhist',
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2021-10-08T03:03:10.000+00:00',
                    modifiedDate: '2021-10-08T03:03:10.000+00:00',
                },
            ],
            martialStatusList: [
                {
                    maritalId: 102,
                    maritalCode: 'D',
                    maritalShortName: 'Divorced',
                    maritalLongName: 'Divorced',
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2021-10-08T02:59:55.000+00:00',
                    modifiedDate: '2021-10-08T02:59:55.000+00:00',
                },
            ],
            professionList: [
                {
                    occupationId: 102,
                    occupationCode: 'U00X',
                    occupationShortName: 'OthO/sideLabourForce',
                    occupationLongName: 'Other Outside Labour Force',
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2021-10-08T03:44:25.000+00:00',
                    modifiedDate: '2021-10-08T03:44:25.000+00:00',
                },
            ],
            industryList: [
                {
                    employmentId: 102,
                    employmentCode: '01120',
                    employmentShortName: 'Agriculture - Growing of paddy',
                    createdBy: null,
                    modifiedBy: null,
                    createdDate: '2021-10-08T06:42:28.000+00:00',
                    modifiedDate: '2021-10-08T06:42:28.000+00:00',
                },
            ],
        };
        component.callUserDetailFieldOptionsAPIResponseData(
            userDetailFieldOptionsAPIResponseData,
        );
        expect(userDetailFieldOptionsAPIResponseData).toBeTruthy();
        fixture.detectChanges();
        component.citizenList =
            userDetailFieldOptionsAPIResponseData.citizenList;
        expect(component.citizenList).toEqual(
            userDetailFieldOptionsAPIResponseData.citizenList,
        );
        component.countryList =
            userDetailFieldOptionsAPIResponseData.countryList
            // .map((e) => ({
            //     ...e,
            //     countryLongName:
            //         e.countryLongName[0].toUpperCase() +
            //         e.countryLongName.substr(1).toLowerCase(),
            // }));
        expect(component.countryList).toEqual(
            userDetailFieldOptionsAPIResponseData.countryList
            // .map((e) => ({
            //     ...e,
            //     countryLongName:
            //         e.countryLongName[0].toUpperCase() +
            //         e.countryLongName.substr(1).toLowerCase(),
            // })),
        );
        component.raceList = userDetailFieldOptionsAPIResponseData.raceList;
        expect(component.raceList).toEqual(
            userDetailFieldOptionsAPIResponseData.raceList,
        );
        component.religionList =
            userDetailFieldOptionsAPIResponseData.religionList;
        expect(component.religionList).toEqual(
            userDetailFieldOptionsAPIResponseData.religionList,
        );
        component.martialStatusList =
            userDetailFieldOptionsAPIResponseData.martialStatusList;
        expect(component.martialStatusList).toEqual(
            userDetailFieldOptionsAPIResponseData.martialStatusList,
        );
        component.professionList =
            userDetailFieldOptionsAPIResponseData.professionList;
        expect(component.professionList).toEqual(
            userDetailFieldOptionsAPIResponseData.professionList,
        );
        fixture.detectChanges();
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
            component.industryList.push({
                letter: prop,
                names: list[prop],
            });
        }
    });

    it('call loadInitialForm no subscribed data', () => {
        component.initLoadData();
        component.accountDetails$ = store.select('accountOpeningReducer');
        component.accountDetails$.subscribe((accountOpeningAction) => {
            accountOpeningAction = undefined;
            expect(
                accountOpeningAction.userDetailsAPIResponseData,
            ).toBeUndefined();
            expect(
                accountOpeningAction.userDetailFieldOptionsAPIResponseData,
            ).toBeUndefined();
        });
    });
    it('should call clickToSubmitAAData', () => {
        component.customerType = 'NTP'
        component.clickToSubmitAAData();
        expect(component).toBeTruthy();
    });
});
