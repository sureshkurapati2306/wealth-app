import { TestBed } from '@angular/core/testing';
import { AsnbService } from './asnb.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
    AsnbCreateOrderRequest,
    AsnbRejectCodeMapping,
    AsnbRemoveFavouriteRequest,
    AsnbRemoveFavouriteResponse,
    AsnbRiskStatusApiResponse,
    AsnbTransactionLimit,
    OperationHourResponse,
} from '../models';

import { environment } from '@env/self-serve/environment';
import { Setting } from '@cimb/shared/models';

describe('AsnbService', () => {
    let service: AsnbService;
    let httpClient: HttpClient;
    let subjectSpy: jest.SpyInstance;
    let delinkSubjectSpy: jest.SpyInstance;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AsnbService],
        });
        service = TestBed.inject(AsnbService);
        httpClient = TestBed.inject(HttpClient);
        subjectSpy = jest.spyOn(service['subject'], 'next');
        delinkSubjectSpy = jest.spyOn(service['subjectDelinkedAccount'], 'next');
    });

    afterEach(() => {
        subjectSpy.mockClear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getInvestmentDetails', () => {
        const result = service.getInvestmentDetails();
        expect(result).toBeTruthy();
    });

    it('should call requestOtp', () => {
        const result = service.requestOtp('111111');
        expect(result).toBeTruthy();
    });

    it('should call verifyOtp', () => {
        const result = service.verifyOtp({ otp: '111111', transactionId: '1329flji11jl' });
        expect(result).toBeTruthy();
    });

    it('should call getAccountLinkingStatus success path', (done) => {
        const mockApiResponse = { accountExist: true };

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));

        service.getAccountLinkingStatus().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getAccountLinkingStatus error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getAccountLinkingStatus().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call checkWhitelist', () => {
        const result = service.checkWhitelist();
        expect(result).toBeTruthy();
    });

    it('should call checkWhitelist success path', (done) => {
        const mockApiResponse = {
            validateWhitelisted: true,
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));

        service.checkWhitelist().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call checkWhitelist error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.checkWhitelist().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });
    it('should call getSourceOfWealthAndFunds success path', (done) => {
        const mockApiResponse = [];

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

        service.getSourceOfWealthAndFunds().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getSourceOfWealthAndFunds error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getSourceOfWealthAndFunds().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should send link account event successfully', () => {
        const response = { success: true };
        const postSpy = jest.spyOn(httpClient, 'post').mockReturnValue(of(response));

        service.sendLinkAccountEvent();

        expect(postSpy).toHaveBeenCalledWith(
            `${environment.apiUrl}${environment.asnb}/accounts/account-link`,
            {
                action: 'link',
            },
        );
        expect(subjectSpy).toHaveBeenCalled();
    });

    it('should handle error when sending link account event', () => {
        const errorResponse = new HttpErrorResponse({
            status: 500,
            statusText: 'Internal Server Error',
        });
        const postSpy = subjectSpy.mockReturnValue(throwError(errorResponse));

        service.sendLinkAccountEvent();

        expect(postSpy).not.toHaveBeenCalledWith(
            `${environment.apiUrl}${environment.asnb}/accounts/account-link`,
            {
                action: 'link',
            },
        );
        expect(subjectSpy).not.toHaveBeenCalled(); // Assuming `subject` is a private property
    });

    it('should send delink account event successfully', () => {
        const response = { delink: true };
        const postSpy = jest.spyOn(httpClient, 'post').mockReturnValue(of(response));

        service.sendDelinkAccountEvent();

        expect(postSpy).toHaveBeenCalledWith(
            `${environment.apiUrl}${environment.asnb}/accounts/account-delink`,
            {},
        );
        expect(delinkSubjectSpy).toHaveBeenCalled();
    });

    it('should handle error when sending delink account event', () => {
        const errorResponse = new HttpErrorResponse({
            status: 500,
            statusText: 'Internal Server Error',
        });
        const postSpy = subjectSpy.mockReturnValue(throwError(errorResponse));

        service.sendDelinkAccountEvent();

        expect(postSpy).not.toHaveBeenCalledWith(
            `${environment.apiUrl}${environment.asnb}/accounts/account-delink`,
            {},
        );
        expect(delinkSubjectSpy).not.toHaveBeenCalled(); // Assuming `subject` is a private property
    });

    it('should call getCheckoutBankAccounts', () => {
        const mockApiResponse = {
            stageTableId: 'stageTableId',
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));

        const result = service.getCheckoutBankAccounts(mockApiResponse);
        expect(result).toBeTruthy();
    });

    it('should call getCheckoutBankAccounts error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        const mockParams = { stageTableId: 'stageTableId' };

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getCheckoutBankAccounts(mockParams).subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call getCheckoutPurchaseSummary', () => {
        const result = service.getCheckoutPurchaseSummary();
        expect(result).toBeTruthy();
    });

    it('should call getCheckoutAccountDetails', () => {
        const result = service.getCheckoutAccountDetails();
        expect(result).toBeTruthy();
    });

    it('should call getCheckoutSourceDetails', () => {
        const result = service.getCheckoutSourceDetails();
        expect(result).toBeTruthy();
    });

    it('should call getPastTransaction', () => {
        const result = service.getPastTransaction('fundId1');
        expect(result).toBeTruthy();
    });

    it('should call getASNBFunListOwnAccount', () => {
        const result = service.getASNBFundListOwnAccount({});
        expect(result).toBeTruthy();
    });

    it('should call getUserRiskStatus success path', (done) => {
        const mockApiResponse: AsnbRiskStatusApiResponse = {
            status: 'success',
            code: 200,
            message: 'success',
            data: 'L',
        };

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

        service.getUserRiskStatus().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getUserRiskStatus error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getUserRiskStatus().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call checkAccountLink success path', (done) => {
        const mockApiResponse = {
            status: 'success',
            code: 200,
            message: 'success',
            data: true,
        };

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

        service.checkAccountLink().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call checkAccountLink error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.checkAccountLink().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call getUserAccountStatus success path', (done) => {
        const mockApiResponse = {
            status: 'success',
            code: 200,
            message: 'success',
            data: true,
        };

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

        service.getUserAccountStatus().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getUserAccountStatus error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getUserAccountStatus().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call createOrder success path', (done) => {
        const mockApiRequest: AsnbCreateOrderRequest = {
            guardianDetails: {
                unitHolderId: '1234567890',
                name: 'test',
            },
            amount: 100,
            fundId: 'fundId',
            investmentType: 'TP',
        };

        const mockApiResponse = {
            stageTableId: 'stageTableId',
            amount: 100,
            bankCharge: 1,
            total: 101,
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));

        service.createOrder(mockApiRequest).subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call createOrder error path', (done) => {
        const mockApiRequest: AsnbCreateOrderRequest = {
            guardianDetails: {
                unitHolderId: '1234567890',
                name: 'test',
            },
            amount: 100,
            fundId: 'fundId',
            investmentType: 'TP',
        };

        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.createOrder(mockApiRequest).subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call getASNBFundListLookup', (done) => {
        const mockApiResponse = {
            stageTableId: 'stageTableId',
            amount: 100,
            bankCharge: 1,
            total: 101,
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));

        service.getASNBFundListLookup().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getTransactionLimit success path', (done) => {
        const mockApiResponse: AsnbTransactionLimit = {
            currentLimit: 0,
            maxLimit: 50000,
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));

        service.getTransactionLimit().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getTransactionLimit error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getTransactionLimit().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call createSubscription success path', (done) => {
        const mockRequestObj = {
            stageTableId: '1111',
            otp: '111111',
            bankAccountNumber: '12329732923',
            transactionId: '12329732923',
            bankId: 35,
            acctType: 'SDA',
        };
        const mockApiResponse = {
            result: 'success',
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));

        service.createSubscription(mockRequestObj).subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call createSubscription error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        const mockRequestObj = {
            stageTableId: '1111',
            otp: '111111',
            bankAccountNumber: '12329732923',
            transactionId: '12329732923',
            bankId: 35,
            acctType: 'SDA',
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.createSubscription(mockRequestObj).subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should get ASNB Scheduled Downtime Maintenance on success path', (done) => {
        const mockApiResponse = {
            dataPresent: 'Yes',
            startTime: '10:57:00',
            startDate: '2023-06-08',
            endTime: '14:00:00',
            endDate: '2023-06-08',
        };

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

        service.getASNBScheduledMaintenance().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });
    it('should get ASNB Scheduled Downtime Maintenance on failed path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getASNBScheduledMaintenance().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should get ASNB eligible fund codes on success path', (done) => {
        const mockApiResponse = {
            unitHolderId: '000008492086',
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));

        service.getEligibleFunds(mockApiResponse.unitHolderId).subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should get ASNB eligible fund codes on failed path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        const mockApiResponse = {
            unitHolderId: '000008492086',
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.getEligibleFunds(mockApiResponse.unitHolderId).subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call getOperationHourDetails success path', (done) => {
        const mockApiResponse: OperationHourResponse = {
            startTime: '02:00',
            endTime: '21:00',
        };

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

        service.getOperationHourDetails().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getOperationHourDetails error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));
        service.getOperationHourDetails().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should send account detail on success path', () => {
        const mockApiResponse = {
            name: 'AMMAR',
            membershipNumber: '000013560534',
            value: '',
        };
        const result = service.setMemberAccount(mockApiResponse);

        expect(result).toBeUndefined();
    });
    it('should call getExternalUrlList success path', (done) => {
        const mockApiResponse = [
            { urlCode: '1', urlDesc: 'Link 1' },
            { urlCode: '2', urlDesc: 'Link 2' },
            { urlCode: '3', urlDesc: 'Link 3' },
        ];
        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));
        service.getExternalUrlList().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getExternalUrlList error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });
        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));
        service.getExternalUrlList().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call getIdTypeList success path', (done) => {
        const mockApiResponse = [
            { idType: 'ID1', description: 'ID 1' },
            { idType: 'ID2', description: 'ID 2' },
        ];
        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));
        service.getIdTypeList().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getIdTypeList error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });
        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));
        service.getIdTypeList().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call getRelationshipList success path', (done) => {
        const mockApiResponse = {
            THIRDPARTYRELATIONSHIP: [
                { id: 'R1', value: 'Relationship 1' },
                { id: 'R2', value: 'Relationship 2' },
            ],
        };
        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));
        service.getRelationshipList().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call getRelationshipList error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });
        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));
        service.getRelationshipList().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call validateFavourite success path', (done) => {
        const mockApiRequest = {
            nickname: 'nickname',
            beneAsnbFundCode: 'beneAsnbFundCode',
            beneIdType: 'beneIdType',
            relationship: 'relationship',
            beneAsnbAcctNo: 'beneAsnbAcctNo',
            beneIdNo: 'beneIdNo',
        };
        const mockApiResponse = {
            status: 'OK',
            code: 200,
            message: 'Successful',
            data: [{ stageID: 'stage-id' }],
        };
        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));
        service.validateFavourite(mockApiRequest).subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call validateFavourite error path', (done) => {
        const mockApiRequest = {
            nickname: 'nickname',
            beneAsnbFundCode: 'beneAsnbFundCode',
            beneIdType: 'beneIdType',
            relationship: 'relationship',
            beneAsnbAcctNo: 'beneAsnbAcctNo',
            beneIdNo: 'beneIdNo',
        };
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });
        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));
        service.validateFavourite(mockApiRequest).subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should emit the updated tab index through tabIndex$ observable', (done) => {
        const index = 2;

        service.updateTabIndex(index);

        service.tabIndex$.subscribe((value) => {
            expect(value).toBe(index);
            done();
        });
    });

    it('should emit null through favList$ observable', (done) => {
        service.refreshFavList();

        service.favList$.subscribe((value) => {
            expect(value).toBe(null);
            done();
        });
    });

    it('should call getTransferReasons success path', (done) => {
        const mockApiResponse = [];

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

        service.getTransferReasons().subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call saveFavourite success path', (done) => {
        const mockApiRequest = {
            stageTableId: 'lfdjfldf',
            otp: '111111',
            transactionId: 'jlj34234234',
        };
        const mockApiResponse = {
            status: 'OK',
            code: 200,
            message: 'Successful',
            data: [{ data: {} }],
        };
        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));
        service.saveFavourite(mockApiRequest).subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call saveFavourite error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        const mockApiRequest = {
            stageTableId: 'lfdjfldf',
            otp: '1111',
            transactionId: 'jlj34234234',
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));
        service.saveFavourite(mockApiRequest).subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call getTransferReasons error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getTransferReasons().subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });

    it('should call getAsnbFeatureSettings success path', () => {
        const mockApiResponse: Setting[] = [
            {
                description: 'test',
                enabled: true,
                utSettingId: '001',
                utSettingGroupId: '001',
            },
        ];

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

        service.getAsnbFeatureSettings();
    });

    it('should call getAsnbFeatureSettings error path', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getAsnbFeatureSettings();
    });

    it('should return the correct setting for a given settingId', () => {
        // Mock the asnbSettings observable with the mockSettings
        const mockSettings: Setting[] = [
            {
                description: 'test',
                enabled: true,
                utSettingId: '001',
                utSettingGroupId: '001',
            },
        ];

        service.asnbSettings = of(mockSettings);

        const settingIdToFind = '001';
        service.getAsnbSettings(settingIdToFind).subscribe((setting) => {
            expect(setting?.utSettingId).toBe(settingIdToFind);
        });
    });

    it('should call getErrorCodeMapping success path', (done) => {
        const mockApiResponse: AsnbRejectCodeMapping = {
            rejectCode: '0001',
            descriptionTechnical: 'Technical Error',
            displayMessageEng: 'Display Message Eng',
            displayMessageBm: 'Display Message Bm',
        };

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockApiResponse));

        service.getErrorCodeMapping('0001', true).subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call sendRemoveFavouriteEvent success path', (done) => {
        const mockApiRequest: AsnbRemoveFavouriteRequest = {
            transId: '1234567812345678',
        };

        const mockApiResponse: AsnbRemoveFavouriteResponse = {
            status: 'OK',
            code: 200,
            data: '',
            message: 'User removed as Favourite',
        };

        jest.spyOn(httpClient, 'post').mockReturnValue(of(mockApiResponse));

        service.sendRemoveFavouriteEvent(mockApiRequest).subscribe((response) => {
            expect(response).toEqual(mockApiResponse);
            done();
        });
    });

    it('should call sendRemoveFavouriteEvent error path', (done) => {
        const mockApiRequest: AsnbRemoveFavouriteRequest = {
            transId: '1234567812345678',
        };

        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service.sendRemoveFavouriteEvent(mockApiRequest).subscribe(
            () => {
                done.fail('');
            },
            (error: HttpErrorResponse) => {
                expect(error.error).toBe('Mock 404 error');
                expect(error.status).toBe(404);
                done();
            },
        );
    });
});
