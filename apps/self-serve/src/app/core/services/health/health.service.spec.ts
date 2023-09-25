import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@cimb/core';
import { environment } from '@env/self-serve/environment';

import { HealthService } from './health.service';

describe('HealthService', () => {
    let service: HealthService;
    let httpMock: HttpTestingController;
    let httpRequest;
    const endpoint: string = environment.apiUrl;
    const env: any = environment;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [HttpService, HealthService],
        });
        service = TestBed.inject(HealthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it(
        'should create instance of HealthService',
        waitForAsync(
            inject([], () => {
                service = TestBed.inject(HealthService);
                expect(service).toBeTruthy();
            }),
        ),
    );

    describe('getHealthService()', () => {
        const mockVersionResponse = [{ 'key-1': 'version-1' }];
        it('should get health check before begin', () => {
            service.get().subscribe((response) => {
                expect(response).toEqual(mockVersionResponse);
            });
            httpRequest = httpMock.expectOne(`${endpoint+env.wealth}/health/version`);
            httpRequest.flush(mockVersionResponse);
            expect(service).toBeTruthy();
            expect(service.healthCheck$).toBeTruthy();
        });
    });
});
