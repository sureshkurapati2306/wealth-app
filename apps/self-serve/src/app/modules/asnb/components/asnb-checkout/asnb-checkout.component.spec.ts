import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AsnbCheckoutComponent } from './asnb-checkout.component';
import { AsnbService } from '../../services/asnb.service';
import { MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    getCheckout,
    getCheckoutAccountDetails,
    getCheckoutBankAccounts,
    getCheckoutError,
    getCheckoutPurchaseSummary,
    getCheckoutSOWSOF,
    getExternalUrlList,
    getMembership,
    getPurchaseFavouriteDetails,
} from '../../+state/asnb.selectors';
import { asnbFavouriteDetails, checkoutMockData } from '../../mocks/data';
import { User } from 'apps/self-serve/src/app/core/model/user.model';
import { Status } from '../../+state/asnb.reducer';
import {
    AsnbCheckout,
    AsnbCreateSubscriptionRequest,
    AsnbOtp,
    CartAccountDetails,
    CartPurchaseSummary,
    CartSource,
} from '../../models';
import { of } from 'rxjs';
import { createSubscription } from '../../+state/asnb.actions';
import { LogoutDialogService } from '../../services/logout-dialog.service';

describe('AsnbCheckoutComponent', () => {
    let component: AsnbCheckoutComponent;
    let fixture: ComponentFixture<AsnbCheckoutComponent>;
    let storeMock: MockStore;
    let router: Router;
    let asnbServiceMock: Partial<AsnbService>;
    let dialogMock: Partial<MatDialog>;
    let logoutDialogServiceMock: Partial<LogoutDialogService>;

    const mockCheckoutPurchaseSummary: CartPurchaseSummary = {
        name: 'Amanah Saham Bumiputera (ASB)',
        category: 'FIXED PRICE',
        total_bank_charge: 1,
        total_sales_charge: 120,
        total_net_investment_amount: 1000,
        total_amount: 1001,
    };
    const mockCheckoutAccountDetails: CartAccountDetails = {
        name: 'Ar Raudhah Aminuddin',
        asnb_membership_number: '1098 7654 3210',
        membership_id_type: 'NRIC',
        id_number: '8806-23-14-9909',
        relationship: 'Friend/Acquaintance',
        reason: 'Saving',
    };
    const mockCheckoutSOWSOF: CartSource = {
        source_of_funds: 'Monthly income from part time',
        source_of_wealth: 'Savings',
    };
    const mockUser: { user: Partial<User> } = { user: { customer_mobile_no: '0123456789' } };
    const mockCheckoutError: { status: Status; error: string } = { status: 'success', error: '' };
    const mockMembershipDetails = { unitHolderId: '111222333444', name: 'Adam' };
    const mockExternalUrlList = {
        fundPrice: 'https://www.asnb.com.my/dpv2_thedisplay-tv_EN.php',
        prospectus: 'https://www.asnb.com.my/asnbv2_2funds_EN.php#prospektusphs',
    };

    beforeEach(async () => {
        asnbServiceMock = {
            requestOtp: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
            updateTabIndex: jest.fn(),
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

        logoutDialogServiceMock = {
            openDialogAndLogout: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, OverlayModule, HttpClientTestingModule],
            declarations: [AsnbCheckoutComponent],
            providers: [
                provideMockStore(),
                { provide: AsnbService, useValue: asnbServiceMock },
                { provide: MatDialog, useValue: dialogMock },
                { provide: LogoutDialogService, useValue: logoutDialogServiceMock },
            ],
        }).compileComponents();

        router = TestBed.inject(Router);
        storeMock = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbCheckoutComponent);
        component = fixture.componentInstance;
        storeMock.overrideSelector(getCheckoutBankAccounts, [{}]);
        storeMock.overrideSelector(getCheckoutPurchaseSummary, mockCheckoutPurchaseSummary);
        storeMock.overrideSelector(getCheckoutAccountDetails, mockCheckoutAccountDetails);
        storeMock.overrideSelector(getCheckoutSOWSOF, mockCheckoutSOWSOF);
        storeMock.overrideSelector('userReducer', mockUser);
        storeMock.overrideSelector(getCheckoutError, mockCheckoutError);
        storeMock.overrideSelector(getMembership, mockMembershipDetails);
        storeMock.overrideSelector(getPurchaseFavouriteDetails, asnbFavouriteDetails);
        storeMock.overrideSelector(getCheckout, checkoutMockData);
        storeMock.overrideSelector(getExternalUrlList, mockExternalUrlList);

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should set the component properties correctly', () => {
        const checkoutMockData: AsnbCheckout = {
            investmentType: 'TP',
            stageTableId: '',
            guardianDetails: {
                unitHolderId: '',
                name: '',
            },
            favouriteDetails: {
                unitHolderId: '12341234',
                reasonOfTransfer: 'SAV',
                reasonOfTransferValue: 'Savings',
            },
            fundId: '123',
            fundName: 'Fund Name',
            fundType: 'fixed price',
            amount: 500,
            bankCharge: 10,
            total: 510,
            transactionStatus: '000',
            timeStamp: '',
            identificationNumber: 'xxxxxx-xx-9999',
            unitsAlloted: 100,
            navPrice: 1.2345,
            transactionId: '7001234',
            bankAccountNumber: '1234',
            asnbReferenceNo: '45678',
            salesCharge: '',
            salesChargePercentage: '',
            sof: { id: 'SOF', value: 'Source of fund' },
            sow: { id: 'SOW', value: 'Source of wealth' },
        };
        storeMock.overrideSelector(getCheckout, checkoutMockData);

        const mockCheckoutErrorModified = JSON.parse(JSON.stringify(mockCheckoutError));
        mockCheckoutErrorModified.status = 'error';
        storeMock.overrideSelector(getCheckoutError, mockCheckoutErrorModified);

        const handleOTPErrorSpy = jest.spyOn(component, 'handleOTPError');

        component.ngOnInit();
        expect(component.isFavouritePurchase).toBe(true);
        expect(handleOTPErrorSpy).toHaveBeenCalledWith(mockCheckoutErrorModified.error);

        const logoutSpy = jest.spyOn(logoutDialogServiceMock, 'openDialogAndLogout');

        component.verifyAttempt = 3;
        component.ngOnInit();
        expect(handleOTPErrorSpy).toHaveBeenCalledWith(mockCheckoutErrorModified.error);
        expect(logoutSpy).toHaveBeenCalledWith(mockUser.user);
    });

    it('should navigate back on backButtonEvent', () => {
        const navigateSpy = jest.spyOn(router, 'navigate');

        component.currentUrl = '/dashboard;tab=0';

        component.backButtonEvent();

        expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should call requestOtp with empty string', () => {
        component.requestTAC();
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

    it('should handle OTP error if error is INVALID_OTP', () => {
        const handleOTPErrorSpy: jest.SpyInstance = jest.spyOn(component, 'handleOTPError');

        component.handleOTPError('INVALID_OTP');

        expect(handleOTPErrorSpy).toHaveBeenCalledWith('INVALID_OTP');
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

    it('should assign the bank account number when sufficient amount', () => {
        const event = {
            name: 'AIR ASIA SAVER',
            acctType: 'SDA',
            bankId: 35,
            casa_account_no: '7055710396',
            account_status: 'Active',
            casa_account_balance: 92738.19,
            casa_account_format: 'AIR ASIA SAVER 7055710396 (Balance MYR 92738.19)',
            isSufficientAmount: true,
        };
        component.accountSelectedEvent(event);
        expect(component.customerBankAccountInfo.accounts).toEqual(event);
        expect(component.accountSelected).toBe(true);
    });

    it('should open the dialog and reset the account value when insufficient amount', () => {
        const event = {
            name: 'AIR ASIA SAVER',
            acctType: 'SDA',
            bankId: 35,
            casa_account_no: '7055710396',
            account_status: 'Active',
            casa_account_balance: 92738.19,
            casa_account_format: 'AIR ASIA SAVER 7055710396 (Balance MYR 92738.19)',
            isSufficientAmount: false,
        };

        component.childComponent = {
            account: {
                setValue: jest.fn(),
            },
        } as any;

        component.accountSelectedEvent(event);
        expect(component.customerBankAccountInfo.accounts).toEqual(event);
        expect(dialogMock.open).toHaveBeenCalled();

        expect(component.childComponent.account.setValue).toHaveBeenCalled();
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
        const navigateSpy = jest.spyOn(router, 'navigate');
        const updateTabSpy = jest.spyOn(asnbServiceMock, 'updateTabIndex');

        component.isFavouritePurchase = false;
        component.fatcaDeclaratonEvent();
        expect(navigateSpy).toHaveBeenCalledWith(['/asnb-dashboard']);
        expect(updateTabSpy).toHaveBeenCalledTimes(0);

        component.isFavouritePurchase = true;
        component.fatcaDeclaratonEvent();
        expect(navigateSpy).toHaveBeenCalledWith(['/asnb-dashboard']);
        expect(updateTabSpy).toHaveBeenCalledWith(1);
    });

    it('should call confirmAndProceed with successful response', () => {
        component.customerBankAccountInfo.accounts = {
            name: 'BASIC CA WITHOUT FEE',
            acctType: 'CDA',
            bankId: 35,
            casa_account_no: '8007261062',
            account_status: 'Active',
            casa_account_balance: 1999161,
            casa_account_format: 'BASIC CA WITHOUT FEE 8007261062 (Balance MYR 1999161.00)',
            isSufficientAmount: true,
        };
        component.otpTransactionId = '999';
        storeMock.overrideSelector(getCheckout, checkoutMockData);
        const dispatchSpy = jest.spyOn(storeMock, 'dispatch');
        const input = '111111';
        const dispatchPayload: AsnbCreateSubscriptionRequest = {
            stageTableId: checkoutMockData.stageTableId,
            otp: input,
            bankAccountNumber: component.customerBankAccountInfo.accounts.casa_account_no,
            acctType: component.customerBankAccountInfo.accounts.acctType,
            bankId: component.customerBankAccountInfo.accounts.bankId,
            transactionId: component.otpTransactionId,
        };

        component.confirmAndProceed(input);

        expect(dispatchSpy).toHaveBeenCalledWith(createSubscription({ payload: dispatchPayload }));
    });

    it('should call requestOtp with successful response', () => {
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

    it('should call requestOtp with error response', () => {
        const mockOtpResponse: AsnbOtp = {
            transactionId: '123',
            message: 'OTP Sent Unsuccessfully',
        };

        const requestOtpSpy = jest
            .spyOn(asnbServiceMock, 'requestOtp')
            .mockReturnValue(of(mockOtpResponse));

        const handleOTPErrorSpy: jest.SpyInstance = jest.spyOn(component, 'handleOTPError');

        component.requestTAC();

        expect(requestOtpSpy).toHaveBeenCalledWith('');
        expect(handleOTPErrorSpy).toHaveBeenCalledWith(mockOtpResponse.message);
    });

    it('should open a dialog when redirectConfirmation is called', () => {
        component.redirectConfirmation('');

        expect(dialogMock.open).toHaveBeenCalled();
    });
});
