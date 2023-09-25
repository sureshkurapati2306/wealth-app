import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@cimb/core';
import { environment } from '@env/self-serve/environment';

import { ClicksService } from './clicks.service';

describe('ClicksService', () => {
    let service: ClicksService;
    let httpMock: HttpTestingController;
    let httpRequest;
    const endpoint: string = environment.apiUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [HttpService, ClicksService],
        });
        service = TestBed.inject(ClicksService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it(
        'should create instance of ClicksService',
        waitForAsync(
            inject([], () => {
                service = TestBed.inject(ClicksService);
                expect(service).toBeTruthy();
            }),
        ),
    );

    describe('getClicksCustomer()', () => {
        const mockFundHouseResponse = {
            cifNumber: 'string',
            customerIDNumber: 'string',
            customerIDType: 'string',
            debitCardNumber: 'string',
        };
        it('should call clicks api to get user details', () => {
            const code = 'CODE';
            service.getClicksCustomer(code).subscribe((response) => {
                expect(response).toEqual(mockFundHouseResponse);
            });
            httpRequest = httpMock.expectOne(
                `${endpoint + environment.wealth}/v2/clicks/loading-tcj?code=${code}`,
            );
            httpRequest.flush(mockFundHouseResponse);
            expect(service).toBeTruthy();
        });
    });

});
