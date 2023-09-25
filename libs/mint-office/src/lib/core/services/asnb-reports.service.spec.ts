import { TestBed } from '@angular/core/testing';

import { AsnbReportsService } from './asnb-reports.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AsnbReportsService', () => {
    let service: AsnbReportsService;
    let httpClient: HttpClient;

    const mockEnvironment = {
        apiUrl: 'https://example.com/', // Provide the mock API URL here
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AsnbReportsService, { provide: 'environment', useValue: mockEnvironment }],
        });
        service = TestBed.inject(AsnbReportsService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make an HTTP GET request to the asnb report API', (done) => {
        const mockResponse = []; // Provide your mock response here

        jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

        service.getReport('path/to/url').subscribe((response) => {
            expect(response).toEqual(mockResponse);
            done();
        });
    });

    it('should call getReport()and handle error', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service.getReport('path/to/url').subscribe(
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
