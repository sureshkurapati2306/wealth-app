import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsnbReviewAddFavouriteComponent } from './asnb-review-add-favourite.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AsnbService } from '../../services/asnb.service';
import { MatDialog } from '@angular/material/dialog';
import {
    AsnbAddFavourite,
    AsnbOtp,
    AsnbSaveFavouriteApiRequest,
    AsnbSaveFavouriteApiResponse,
} from '../../models';
import { asnbAddFavouriteDetails, asnbFavouriteSummary } from '../../mocks/data';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from 'apps/self-serve/src/app/core/services/app.service';
import { updateAddFavouriteState } from '../../+state/asnb.actions';
import { LogoutDialogService } from '../../services/logout-dialog.service';
import { getAddFavouriteDetails } from '../../+state/asnb.selectors';
import { User } from 'apps/self-serve/src/app/core/model/user.model';

describe('AsnbReviewAddFavouriteComponent', () => {
    let component: AsnbReviewAddFavouriteComponent;
    let fixture: ComponentFixture<AsnbReviewAddFavouriteComponent>;
    let mockStore: MockStore;
    let mockRouter: Router;
    let asnbServiceMock: Partial<AsnbService>;
    let dialogMock: Partial<MatDialog>;
    let appServiceMock: Partial<AppService>;
    let logoutDialogServiceMock: Partial<LogoutDialogService>;

    const mockSaveFavouriteResSuccess: AsnbSaveFavouriteApiResponse = {
        error: '',
        status: '',
        message: '',
        data: asnbFavouriteSummary,
        code: 1,
    };
    const mockSaveFavouriteResError: AsnbSaveFavouriteApiResponse = {
        error: 'OK',
        status: '',
        message: 'Some error message',
        data: asnbFavouriteSummary,
        code: 1,
    };
    const mockUser: { user: Partial<User> } = { user: { customer_mobile_no: '0123456789' } };

    beforeEach(async () => {
        asnbServiceMock = {
            requestOtp: jest
                .fn()
                .mockReturnValue(
                    of({ message: 'OTP Successfully', transactionId: 'transactionId123' }),
                ),
            updateTabIndex: jest.fn(),
            saveFavourite: jest.fn(),
        };

        dialogMock = {
            open: jest.fn().mockReturnValue({
                afterClosed: () => {
                    return {
                        subscribe: (callback: any) => callback(),
                    };
                },
            }),
        };

        appServiceMock = {
            showLoadingSpinner: jest.fn(),
            hideLoadingSpinner: jest.fn(),
            getPreviousUrl: jest.fn(),
        };

        logoutDialogServiceMock = {
            openDialogAndLogout: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AsnbReviewAddFavouriteComponent],
            providers: [
                provideMockStore(),
                { provide: AsnbService, useValue: asnbServiceMock },
                { provide: MatDialog, useValue: dialogMock },
                { provide: AppService, useValue: appServiceMock },
                { provide: LogoutDialogService, useValue: logoutDialogServiceMock },
            ],
        }).compileComponents();

        mockStore = TestBed.inject(MockStore);
        mockRouter = TestBed.inject(Router);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbReviewAddFavouriteComponent);
        component = fixture.componentInstance;
        mockStore.overrideSelector(getAddFavouriteDetails, asnbAddFavouriteDetails);
        mockStore.overrideSelector('userReducer', mockUser);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate back on backButtonEvent', () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        component.currentUrl = '/asnb-dashboard/asnb-add-favourit';

        component.backButtonEvent();

        expect(navigateSpy).toHaveBeenCalledWith(['/asnb-dashboard/asnb-add-favourit']);
    });

    it('should call requestOtp with empty string', async () => {
        await component.requestTAC();
        expect(asnbServiceMock.requestOtp).toHaveBeenCalledWith('');
    });

    it('should handle OTP error if error is ALREADY_REQUESTED', () => {
        const handleOTPErrorSpy: jest.SpyInstance = jest.spyOn(component, 'handleOTPError');

        component.handleOTPError('ALREADY_REQUESTED');

        expect(handleOTPErrorSpy).toHaveBeenCalledWith('ALREADY_REQUESTED');
        expect(component.showTacError).toBeTruthy();
        expect(component.tacErrorMessageText).toBe(
            'Already requested TAC, please check your registered mobile for TAC.',
        );
    });

    it('should handle OTP error if error is INVALID_REQUEST', () => {
        const handleOTPErrorSpy: jest.SpyInstance = jest.spyOn(component, 'handleOTPError');

        component.handleOTPError('INVALID_REQUEST');

        expect(handleOTPErrorSpy).toHaveBeenCalledWith('INVALID_REQUEST');
        expect(component.showTacError).toBeTruthy();
        expect(component.tacErrorMessageText).toBe(
            'Your SMS TAC has expired. Please request and submit a new one',
        );
    });

    it('should handle OTP error if error is INVALID_CODE', () => {
        const handleOTPErrorSpy: jest.SpyInstance = jest.spyOn(component, 'handleOTPError');

        component.handleOTPError('INVALID_CODE');

        expect(handleOTPErrorSpy).toHaveBeenCalledWith('INVALID_CODE');
        expect(component.showTacError).toBeTruthy();
        expect(component.tacErrorMessageText).toBe(
            'SMS TAC entered was invalid. Please check and try again.',
        );
    });

    it('should assign the value to fatcaEnabled property', () => {
        const event = true;
        component.fatcaToggleEvent(event);
        expect(component.fatcaEnabled).toEqual(event);
    });

    it('should enable request tag and return true', () => {
        const value = true;
        const result = component.requestTagCanEnableEvent(value);
        expect(component.requestTagCanEnabled).toBe(value);
        expect(result).toBe(true);
    });

    it('should enable request tag and return true', () => {
        const value = false;
        const result = component.requestTagCanEnableEvent(value);
        expect(component.requestTagCanEnabled).toBe(value);
        expect(result).toBe(true);
    });

    it('should set tagEntredCompleted to the given value', () => {
        const value = 'completed';
        component.tagEntredCompletedEvent(value);
        expect(component.tagEntredCompleted).toBe(value);
    });

    it('should set tagEntredCompleted to the given value', () => {
        const value = 'incomplete';
        component.tagEntredCompletedEvent(value);
        expect(component.tagEntredCompleted).toBe(value);
    });

    it('should navigate to "/asnb-dashboard" when fatcaDeclaratonEvent is called', () => {
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        component.fatcaDeclaratonEvent();
        expect(navigateSpy).toHaveBeenCalledWith(['/asnb-dashboard']);
    });

    it('should call confirmAndProceed with successful response', () => {
        component.otpTransactionId = '999';

        const saveFavouriteReq: AsnbSaveFavouriteApiRequest = {
            stageTableId: component.favouriteDetails.stageId,
            otp: '111111',
            transactionId: component.otpTransactionId,
        };

        const saveFavouriteSpy = jest
            .spyOn(asnbServiceMock, 'saveFavourite')
            .mockReturnValue(of(mockSaveFavouriteResSuccess));
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        const dispatchPayload: AsnbAddFavourite = {
            ...component.favouriteDetails,
            nickname: asnbFavouriteSummary.beneClientName,
            membershipNumber: asnbFavouriteSummary.beneAsnbAccountNo.toUpperCase(),
            idType: asnbFavouriteSummary.beneClientIdType,
            idNumber: asnbFavouriteSummary.beneClientId.toUpperCase(),
            relationship: asnbFavouriteSummary.relationship,
            transactionId: asnbFavouriteSummary.transactionId,
            timestamp: asnbFavouriteSummary.date,
        };
        const navigateSpy = jest.spyOn(mockRouter, 'navigate');
        const showLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'showLoadingSpinner');
        const hideLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'hideLoadingSpinner');

        component.confirmAndProceed('111111');
        expect(saveFavouriteSpy).toHaveBeenCalledWith(saveFavouriteReq);
        expect(dispatchSpy).toHaveBeenCalledWith(
            updateAddFavouriteState({ payload: dispatchPayload }),
        );
        expect(navigateSpy).toHaveBeenLastCalledWith(['/asnb-dashboard/add-favourite-summary']);
        expect(showLoadingSpinnerSpy).toHaveBeenCalled();
        expect(hideLoadingSpinnerSpy).toHaveBeenCalled();
    });

    it('should call confirmAndProceed with error response less than 3 attempts', () => {
        component.otpTransactionId = '999';

        const saveFavouriteSpy = jest
            .spyOn(asnbServiceMock, 'saveFavourite')
            .mockReturnValue(of(mockSaveFavouriteResError));
        const handleOTPErrorSpy = jest.spyOn(component, 'handleOTPError');
        const showLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'showLoadingSpinner');
        const hideLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'hideLoadingSpinner');

        component.verifyAttempt = 0;
        component.confirmAndProceed('111111');
        expect(saveFavouriteSpy).toHaveBeenCalled();
        expect(handleOTPErrorSpy).toHaveBeenCalledWith(mockSaveFavouriteResError.message);
        expect(showLoadingSpinnerSpy).toHaveBeenCalled();
        expect(hideLoadingSpinnerSpy).toHaveBeenCalled();
    });

    it('should call confirmAndProceed with error response more than 3 attempts', () => {
        const saveFavouriteSpy = jest
            .spyOn(asnbServiceMock, 'saveFavourite')
            .mockReturnValue(of(mockSaveFavouriteResError));
        const handleOTPErrorSpy = jest.spyOn(component, 'handleOTPError');
        const logoutSpy = jest.spyOn(logoutDialogServiceMock, 'openDialogAndLogout');
        const showLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'showLoadingSpinner');
        const hideLoadingSpinnerSpy = jest.spyOn(appServiceMock, 'hideLoadingSpinner');

        component.verifyAttempt = 2;
        component.confirmAndProceed('111111');
        expect(saveFavouriteSpy).toHaveBeenCalled();
        expect(handleOTPErrorSpy).toHaveBeenCalledWith(mockSaveFavouriteResError.message);
        expect(logoutSpy).toHaveBeenCalledWith(mockUser.user);
        expect(showLoadingSpinnerSpy).toHaveBeenCalled();
        expect(hideLoadingSpinnerSpy).toHaveBeenCalled();
    });

    it('should call requestOtp with successfuly response', () => {
        const mockOtpResponse: AsnbOtp = {
            transactionId: '123',
            message: 'OTP Sent Successfully',
        };

        const requestOtpSpy = jest
            .spyOn(asnbServiceMock, 'requestOtp')
            .mockReturnValue(of(mockOtpResponse));

        component.requestTAC();

        expect(requestOtpSpy).toHaveBeenCalledWith('');
        expect(component.otpTransactionId).toEqual(mockOtpResponse.transactionId);
    });
});
