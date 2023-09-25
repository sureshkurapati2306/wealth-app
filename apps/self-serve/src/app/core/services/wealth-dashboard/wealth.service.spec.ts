import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccountSummary, RiskProfile } from '@cimb/shared/models';
import { of, throwError } from 'rxjs';
import { WealthService } from './wealth.service';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

const accountSummaryMockData: AccountSummary = {
    totalAsset: 31231.1,
    totalLiability: 54353.09,
    totalDeposits: 2500,
    totalInvestments: 2500,
    totalLoans: 2500,
    totalCredits: 2500,
    cifNumber: '10110000120648',
    assetsPct: 55.2,
    liabilitiesPct: 44.8,
    myInvestmentPct: 4.4,
    myDepositPct: 95.6,
    myLoansPct: 96.8,
    myCreditCardsPct: 3.2,
    customerName: 'John Doe',
    lastUpdated: '2022-03-17T11:31:19.627852',
    utInvestmentsStatus: 'Success',
    tdaStatus: 'Success',
    sibsStatus: 'Success',
    cardLinkStatus: 'Success',
    islamicCreditCardStatus: 'Success',
    asnbInquiryCode: null,
    asnbInquiryStatus: '',
    assetLiabilities: [
        {
            alcName: 'My Saving Account',
            alDesc: 'SA PASSBOOK',
            alcSeq: 2,
            alCode: 'SDA',
            alCategory: 'Assets',
            accountNumber: '0000000007023039873',
            cardNumber: null,
            amount: 3416.91,
            currencyCode: 'MYR',
            investmentLastUpdated: null,
            nextPaymentDueDate: null,
        },
        {
            alcName: 'My Deposit',
            alDesc: 'CA FLEXI',
            alcSeq: 2,
            alCode: 'CDA',
            alCategory: 'Assets',
            accountNumber: '0000000008004321188',
            cardNumber: null,
            amount: 54817.11,
            currencyCode: 'MYR',
            investmentLastUpdated: '2022-03-17T05:01:38',
            nextPaymentDueDate: null,
        },
        {
            alcName: 'My Loans/Financing',
            alDesc: 'BIZ FLEXI',
            alcSeq: 1,
            alCode: 'ILA',
            alCategory: 'Liabilities',
            accountNumber: '0000000008004321188',
            cardNumber: null,
            amount: 74275.77,
            currencyCode: 'MYR',
            investmentLastUpdated: '2022-03-17T05:01:38',
            nextPaymentDueDate: '2020-06-01',
        },
        {
            alcName: 'My Credit Cards',
            alDesc: 'CIMB Cash Rebate Platinum MasterCard',
            alcSeq: 2,
            alCode: 'CCA',
            alCategory: 'Liabilities',
            accountNumber: null,
            cardNumber: '5521154096000983',
            amount: 2460.0,
            currencyCode: null,
            investmentLastUpdated: '2022-03-17T05:01:38',
            nextPaymentDueDate: null,
        },
    ],
};

const riskrofileMockData: RiskProfile = {
    riskProfileStatus: 'VALID',
    rpResults: '-',
    riskProfile: 'Balanced',
    rpTnC: '-',
    riskProfileDescription:
        'BALANCED - You are concerned about the effect of erosion of real value of wealth caused by inflation on wealth accumulation and seek to establish security',
    expectedReturn: 6.047999999999999,
    standardDeviation: '10.368553989683456',
    lastUpdatedDate: '26-Sep-2019',
    expiryDate: '26-Dec-2027',
    rmManagerName: 'ADMIN',
    rmManagerId: 'ADMIN1',
    recommendedProducts: [
        {
            fundName: 'CIMB-PRINCIPAL US FUTURE GOALS FUND',
            fundCode: 'CBT45A',
            currency: 'MYR',
            fundRiskProfile: 'Growth',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 5,
            riskProfile: '4',
        },
        {
            fundName: 'Issuer Date Test289',
            fundCode: 'IssuerDateTest289',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Amanah Saham Nasional Equity 2',
            fundCode: 'ASNE2',
            currency: 'MYR',
            fundRiskProfile: 'Aggressive',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '5',
        },
        {
            fundName: 'CIMB-PRINCIPAL BALANCED FUND',
            fundCode: 'CBT03A',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 4,
            riskProfile: '3',
        },
        {
            fundName:
                'SP SIMEKL-9 - Non-Principal Protected Autocallable Equity Linked Structured Product #',
            fundCode: '11440',
            currency: 'MYR',
            fundRiskProfile: 'Aggressive',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '5',
        },
        {
            fundName: 'General Investment Account-i 3 MONTH',
            fundCode: 'GIMGIA0001_MYR_3',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'General Investment Account-i 6 MONTH',
            fundCode: 'GIMGIA0001_MYR_6',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Amanah Saham Nasional Equity 3',
            fundCode: 'ASNE03',
            currency: 'MYR',
            fundRiskProfile: 'Aggressive',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '5',
        },
        {
            fundName: 'TERM INVESTMENT ACCOUNT-I 1 MONTH',
            fundCode: 'TIACCI0001_MYR_1',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'TERM INVESTMENT ACCOUNT-I 2 MONTHS',
            fundCode: 'TIACCI0001_MYR_2',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'TERM INVESTMENT ACCOUNT-I 3 MONTHS',
            fundCode: 'TIACCI0001_MYR_3',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'N',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Affin Hwang Select SGD Income Fund (SGD Class)',
            fundCode: 'HDU37D',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
        {
            fundName: 'PBB NIT-1 SECURITIES (2)',
            fundCode: 'PBB002',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Amanah Saham Nasional  Sara 1',
            fundCode: 'ASNS1',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'Amanah Saham Nasional Sara 2',
            fundCode: 'ASNS2',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'TestTIA123',
            fundCode: 'TestTIA123_MYR_2',
            currency: 'MYR',
            fundRiskProfile: '',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '',
        },
        {
            fundName: 'GCIFXRUSH01',
            fundCode: 'v',
            currency: 'MYR',
            fundRiskProfile: 'Defensive',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '1',
        },
        {
            fundName: 'GCIFXRUSH02',
            fundCode: 'GCIFXRUSH02',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'TestProductLay123',
            fundCode: 'TestProductLay123',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
        {
            fundName: 'DCITestlay678',
            fundCode: 'DCITestlay678',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
        {
            fundName: 'TestGCI123',
            fundCode: 'TestGCI123',
            currency: 'MYR',
            fundRiskProfile: 'Balanced',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '3',
        },
        {
            fundName: 'DCITest789',
            fundCode: 'DCITest789',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
        {
            fundName: 'AlternativeTest234',
            fundCode: 'AlternativeTest234',
            currency: 'MYR',
            fundRiskProfile: 'Conservative',
            fundCategory: 'Takaful',
            recommendedAsset: 'Y',
            riskRating: 0,
            riskProfile: '2',
        },
    ],
};

describe('WealthService', () => {
    let service: WealthService;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
            providers: [{ provide: MatDialog, useValue: {} }],
        });
        service = TestBed.inject(WealthService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getAccountSummary() success path', (done) => {
        jest.spyOn(httpClient, 'post').mockReturnValue(of(accountSummaryMockData));

        service
            .getAccountSummary({
                bankId: '',
                branchId: '',
                govIssueIdentType: 'New IC',
            })
            .subscribe((data) => {
                expect(data).toBe(accountSummaryMockData);
                done();
            });
    });

    it('should call getAccountSummary() error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

        service
            .getAccountSummary({
                bankId: '',
                branchId: '',
                govIssueIdentType: 'New IC',
            })
            .subscribe(
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

    it('should call getRiskProfileEnquiry success path', (done) => {
        jest.spyOn(httpClient, 'get').mockReturnValue(of(riskrofileMockData));

        service
            .getRiskProfileEnquiry({
                custName: 'CEFRR ESOTVU EUM LPLCUU',
                custIdType: '',
                custIdIssue: '',
            })
            .subscribe((data) => {
                expect(data).toBe(riskrofileMockData);
                done();
            });
    });

    it('should call getRiskProfileEnquiry error path', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Mock 404 error',
            status: 404,
        });

        jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

        service
            .getRiskProfileEnquiry({
                custName: 'CEFRR ESOTVU EUM LPLCUU',
                custIdType: '',
                custIdIssue: '',
            })
            .subscribe(
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
