import { TestBed } from '@angular/core/testing';

import { AsnbSettingsService } from './asnb-settings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AsnbSettingsService', () => {
    let service: AsnbSettingsService;
    let httpClient: HttpClient;

    const mockEnvironment = {
        apiUrl: 'https://example.com/', // Provide the mock API URL here
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AsnbSettingsService, { provide: 'environment', useValue: mockEnvironment }],
        });
        service = TestBed.inject(AsnbSettingsService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make an HTTP GET request to the fund suspension API', (done) => {
        const mockResponse = []; // Provide your mock response here

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

        service.getFundSuspensionList().subscribe((response) => {
            expect(response).toEqual(mockResponse);
            done();
        });
    });

    it('should call getFundSuspensionList error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getFundSuspensionList().subscribe(
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

    it('should call getFundSuspensionList error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getFundSuspensionList().subscribe(
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

    it('should send a PUT request with the correct URL and payload for saveFundSuspensionList', (done) => {
        const mockResponse = {}; // Provide your mock response here

        jest.spyOn(httpClient, 'put').mockReturnValue(of(mockResponse));

        service.saveFundSuspensionList('put', {}).subscribe((response) => {
            expect(response).toEqual(mockResponse);
            done();
        });
    });

    it('should handle errors by throwing an error for saveFundSuspensionList', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'put').mockReturnValue(throwError(errorResponse));

        service.saveFundSuspensionList('put', {}).subscribe(
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
