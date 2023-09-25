import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from '@env/self-serve/environment';

import { AvailableFundsService } from './available-funds.service';
import { mockFundHouseResponse, mockfundListResponse } from '../mock/data';

describe('AvailableFundsService', () => {
    let service: AvailableFundsService;
    let httpMock: HttpTestingController;
    let httpRequest;
    const endpoint: string = environment.apiUrl;
    const env: any = environment;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AvailableFundsService],
        });
        service = TestBed.inject(AvailableFundsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it(
        'should create instance of ReviewSubmitService',
        waitForAsync(
            inject([], () => {
                service = TestBed.inject(AvailableFundsService);
                expect(service).toBeTruthy();
            }),
        ),
    );

    describe('getRiskCategories()', () => {
        const mockRiskCategoriesResponse = [
            { id: 1, name: 'DEFENSIVE' },
            { id: 2, name: 'BALANCED' },
        ];
        it('should get list of risk categories from API', () => {
            service.getRiskCategories().subscribe((response) => {
                expect(response).toEqual(mockRiskCategoriesResponse);
            });
            httpRequest = httpMock.expectOne(`${endpoint + env.wealth}/riskprofiles/id-name-details`);
            httpRequest.flush(mockRiskCategoriesResponse);
            expect(service).toBeTruthy();
        });
    });
    describe('getAssetsClasses()', () => {
        const mockAssetClassesResponse = [
            { id: 1, name: 'CASH' },
            { id: 2, name: 'FIXED INCOME' },
        ];
        it('should get list of assets classes from API', () => {
            service.getAssetsClasses().subscribe((response) => {
                expect(response).toEqual(mockAssetClassesResponse);
            });
            httpRequest = httpMock.expectOne(`${endpoint + env.wealth}/assetclasses/details-id-name`);
            httpRequest.flush(mockAssetClassesResponse);
            expect(service).toBeTruthy();
        });
    });
    describe('getFundHouse()', () => {
        it('should get list of fund house from API', () => {
            service.getFundHouse().subscribe((response) => {
                expect(response).toEqual(mockFundHouseResponse);
            });
            httpRequest = httpMock.expectOne(`${endpoint + env.wealth}/fund-manager`);
            httpRequest.flush(mockFundHouseResponse);
            expect(service).toBeTruthy();
        });
    });
    describe('getFundNames()', () => {
        const mockFundNamesResponse = [
            'CIMB-PRINCIPAL EQUITY AGGRESSIVE FUND 1',
            'CIMB-PRINCIPAL BOND FUND',
            'CIMB-PRINCIPAL INCOME PLUS BALANCED FUND',
            'CIMB-PRINCIPAL BALANCED FUND',
        ];
        it('should get list of fund names from API', () => {
            service.getFundNames().subscribe((response) => {
                expect(response).toEqual(mockFundNamesResponse);
            });
            httpRequest = httpMock.expectOne(`${endpoint + env.validate}/cust-support/find-unique-fund-names`);
            httpRequest.flush(mockFundNamesResponse);
            expect(service).toBeTruthy();
        });
    });
    describe('getFundsListByClientId()', () => {
        it('should get list of fund list by client from API', () => {
            const clientId = '750702105695';
            const filters = { recommended: 'Y' };
            const cifNumber = '123456'
            const utAccNo = 'A01114138'

            service.getFundsListByClientId(clientId, cifNumber, utAccNo, filters).subscribe((response) => {
                expect(response).toEqual(mockfundListResponse);
            });
            httpRequest = httpMock.expectOne(
                `${endpoint + env.emanager}/fund/v2/getFundListByClient/${utAccNo}?recommended=Y`,
            );
            httpRequest.flush(mockfundListResponse);
            expect(service).toBeTruthy();
        });
    });
    it('should called getFundPerHistory', () => {
        const mockResponse = {
            "thirtyDaysNavPriceHistory": [
                [
                    "Jun 15",
                    1.9743
                ],
                [
                    "Jun 22",
                    1.8204
                ]
            ],
            "ninetyDaysNavPriceHistory": [
                [
                    "Apr 14",
                    1.98
                ],
                [
                    "Apr 15",
                    1.9746
                ],
                [
                    "Apr 18",
                    1.9693
                ]
            ]
        }
        const fundCode ='HDU03A';
        service.getFundPerHistory(fundCode).subscribe((result) => {
                expect(result).toBeTruthy();
                expect(result[0]).toEqual(mockResponse);
            });

        const req = httpMock.expectOne(environment.apiUrl + environment.gateway + '/wealth/nav-prices/past-fund-price-details/fund-code/' + fundCode );
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);

        httpMock.verify();
    })
});
