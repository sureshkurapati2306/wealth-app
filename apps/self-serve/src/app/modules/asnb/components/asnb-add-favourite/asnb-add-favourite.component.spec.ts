import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbAddFavouriteComponent } from './asnb-add-favourite.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AsnbService } from '../../services/asnb.service';
import { Router } from '@angular/router';
import {
    clearAddFavouriteState,
    loadIdTypeList,
    loadRelationshipList,
} from '../../+state/asnb.actions';
import { MatDialog } from '@angular/material/dialog';
import { AsnbFundListing, AsnbIdType, AsnbRelationship } from '../../models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    getAllFundsListing,
    getIdTypeList,
    getRelationshipList,
} from '../../+state/asnb.selectors';
import { AppService } from 'apps/self-serve/src/app/core/services/app.service';
import { of } from 'rxjs';

describe('AsnbAddFavouriteComponent', () => {
    let component: AsnbAddFavouriteComponent;
    let fixture: ComponentFixture<AsnbAddFavouriteComponent>;
    let mockStore: MockStore;
    let asnbServiceMock: Partial<AsnbService>;
    let routerMock: Partial<Router>;
    let appServiceMock: Partial<AppService>;
    let dialogMock: Partial<MatDialog>;

    beforeEach(async () => {
        asnbServiceMock = {
            validateFavourite: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
            updateTabIndex: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
        };
        appServiceMock = {
            showLoadingSpinner: jest.fn(),
            hideLoadingSpinner: jest.fn(),
        };
        routerMock = { navigate: jest.fn() };
        dialogMock = { open: jest.fn() };
        await TestBed.configureTestingModule({
            declarations: [AsnbAddFavouriteComponent],
            providers: [
                FormBuilder,
                provideMockStore(),
                { provide: AsnbService, useValue: asnbServiceMock },
                { provide: AppService, useValue: appServiceMock },
                { provide: Router, useValue: routerMock },
                { provide: MatDialog, useValue: dialogMock },
            ],
            imports: [ReactiveFormsModule, HttpClientTestingModule],
        }).compileComponents();
        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbAddFavouriteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should update fundList with correct value on ngOnInit', () => {
        const allFundsMockData: AsnbFundListing[] = [
            {
                amount: 1,
                fundCode: 'ASB',
                fundId: '1',
                fundShortName: 'ASB',
                fundLongName: 'Amanah Saham Bumiputera',
                fundStatus: 'ACTIVE',
                fundType: 'fixed',
            },
        ];
        mockStore.overrideSelector(getAllFundsListing, allFundsMockData);
        component.ngOnInit();
        expect(component.fundList).toStrictEqual([{ id: 'ASB', value: 'Amanah Saham Bumiputera' }]);
    });

    it('should update idTypeList with correct value on ngOnInit', () => {
        const idTypeListMockData: AsnbIdType[] = [];
        mockStore.overrideSelector(getIdTypeList, idTypeListMockData);
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        component.ngOnInit();
        expect(dispatchSpy).toBeCalledWith(loadIdTypeList());
        expect(component.idTypeList).toStrictEqual(idTypeListMockData);
    });

    it('should update relationshipList with correct value on ngOnInit', () => {
        const relationshipListMockData: AsnbRelationship[] = [];
        mockStore.overrideSelector(getRelationshipList, relationshipListMockData);
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        component.ngOnInit();
        expect(dispatchSpy).toBeCalledWith(loadRelationshipList());
        expect(component.idTypeList).toStrictEqual(relationshipListMockData);
    });

    it('should call replaceInvalidCharacter with regexType as number', () => {
        const fieldName = 'beneAsnbAcctNo';
        const inputValue = '345524aa';
        const membershipNumberControl = component.addFavouriteForm.get(fieldName);

        const inputEvent = new Event('input');
        const inputElement = document.createElement('input');
        inputElement.value = inputValue;
        Object.defineProperty(inputEvent, 'target', { writable: false, value: inputElement });

        component.replaceInvalidCharacter(inputEvent, fieldName, 'number');
        expect(membershipNumberControl.value).toEqual('345524');
    });

    it('should call replaceInvalidCharacter with regexType as alphanumeric', () => {
        const fieldName = 'nickname';
        const inputValue = '345524aa@@';
        const nicknameControl = component.addFavouriteForm.get(fieldName);

        const inputEvent = new Event('input');
        const inputElement = document.createElement('input');
        inputElement.value = inputValue;
        Object.defineProperty(inputEvent, 'target', { writable: false, value: inputElement });

        component.replaceInvalidCharacter(inputEvent, fieldName, 'alphanumeric');
        expect(nicknameControl.value).toEqual('345524aa');
    });

    it('should call formatNricField', () => {
        const inputValue = '9999990099';
        const idNumberControl = component.addFavouriteForm.get('beneIdNo');

        const inputEvent = new Event('input');
        const inputElement = document.createElement('input');
        inputElement.value = inputValue;
        Object.defineProperty(inputEvent, 'target', { writable: false, value: inputElement });

        component.formatNricField(inputEvent);
        expect(idNumberControl.value).toEqual('999999-00-99');
    });

    it('should call onIdTypeSelect', () => {
        component.addFavouriteForm.get('beneIdType').setValue('1');
        const selectedItem = { id: '3', value: 'NRIC' };
        component.onIdTypeSelect(selectedItem);
        const idNumberControl = component.addFavouriteForm.get('beneIdNo');
        expect(idNumberControl.value).toEqual('');
        expect(idNumberControl.touched).toBeFalsy();
    });

    it('should call onDropdownClickWithoutSelection', () => {
        const fieldName = 'beneAsnbFundCode';
        component.onDropdownClickWithoutSelection(fieldName);
        const fundCodeControl = component.addFavouriteForm.get(fieldName);
        expect(fundCodeControl.touched).toBeTruthy();
    });

    it('should call onDropdownSelect', () => {
        const fieldName = 'beneAsnbFundCode';
        component.onDropdownSelect({ id: 'Fund1', value: 'Fund 1' }, fieldName);
        const fundCodeControl = component.addFavouriteForm.get(fieldName);
        expect(fundCodeControl.value).toEqual('Fund1');
    });

    it('should call isFieldInvalid with required error', () => {
        const fieldName = 'nickname';
        const nicknameControl = component.addFavouriteForm.get(fieldName);
        nicknameControl.setErrors({ required: true });
        nicknameControl.markAsTouched();
        const result = component.isFieldInvalid(fieldName);
        expect(result).toEqual('This field is required');
    });

    it('should call isFieldInvalid with maxLength error', () => {
        const fieldName = 'nickname';
        const nicknameControl = component.addFavouriteForm.get(fieldName);
        nicknameControl.setErrors({ maxlength: 'Characters exceeded the maximum length' });
        const result = component.isFieldInvalid(fieldName);
        expect(result).toEqual('Nickname is invalid');
    });

    it('should call isFieldInvalid with error from API', () => {
        const fieldName = 'nickname';
        const nicknameControl = component.addFavouriteForm.get(fieldName);
        nicknameControl.setErrors({ invalidFromApi: 'Nickname is invalid' });
        const result = component.isFieldInvalid(fieldName);
        expect(result).toEqual('Nickname is invalid');
    });

    it('should call onRedirectBack', () => {
        const mockAsnbServiceSpy = jest.spyOn(asnbServiceMock, 'updateTabIndex');
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        component.onRedirectBack();
        expect(dispatchSpy).toHaveBeenCalledWith(clearAddFavouriteState());
        expect(mockAsnbServiceSpy).toHaveBeenCalledWith(1);
    });

    it('should handle onProceed correctly for success scenario', () => {
        const showLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'showLoadingSpinner');
        const hideLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'hideLoadingSpinner');

        const validateFavouriteMockResponse = {
            status: 'Success',
            code: 200,
            message: 'Success',
            data: [{ stageID: 'mock-stage-id' }],
        };
        jest.spyOn(asnbServiceMock, 'validateFavourite').mockReturnValue(
            of(validateFavouriteMockResponse),
        );
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        const routerNavigateSpy = jest.spyOn(routerMock, 'navigate');

        component.onProceed();

        expect(showLoadingSpinnerSpy).toHaveBeenCalled();
        expect(asnbServiceMock.validateFavourite).toHaveBeenCalled();
        expect(dispatchSpy).toHaveBeenCalled();
        expect(routerNavigateSpy).toHaveBeenCalledWith(['/asnb-dashboard/review-favourite']);
        expect(hideLoadingSpinnerSpy).toHaveBeenCalled();
    });

    it('should handle onProceed correctly when adding duplicate favourite', () => {
        const showLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'showLoadingSpinner');
        const hideLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'hideLoadingSpinner');

        const validateFavouriteMockResponse = {
            status: 'Error',
            code: 200,
            message: 'Error',
            data: [{ rejectCode: null, rejectReason: 'Duplicate favourite', field: null }],
        };
        jest.spyOn(asnbServiceMock, 'validateFavourite').mockReturnValue(
            of(validateFavouriteMockResponse),
        );

        component.onProceed();

        expect(showLoadingSpinnerSpy).toHaveBeenCalled();
        expect(asnbServiceMock.validateFavourite).toHaveBeenCalled();
        expect(dialogMock.open).toHaveBeenCalled();
        expect(hideLoadingSpinnerSpy).toHaveBeenCalled();
    });

    it('should handle onProceed correctly when error is not related to any of the fields', () => {
        const showLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'showLoadingSpinner');
        const hideLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'hideLoadingSpinner');

        const validateFavouriteMockResponse = {
            status: 'Error',
            code: 200,
            message: 'Error',
            data: [{ rejectCode: '009', rejectReason: 'Unknown error', field: 'other' }],
        };
        jest.spyOn(asnbServiceMock, 'validateFavourite').mockReturnValue(
            of(validateFavouriteMockResponse),
        );

        component.onProceed();

        expect(showLoadingSpinnerSpy).toHaveBeenCalled();
        expect(asnbServiceMock.validateFavourite).toHaveBeenCalled();
        expect(dialogMock.open).toHaveBeenCalled();
        expect(hideLoadingSpinnerSpy).toHaveBeenCalled();
    });
});
