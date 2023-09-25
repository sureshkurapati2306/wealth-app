/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpService } from '@cimb/core';
import { MintDialogService } from '@cimb/mint';
import { environment } from '@env/self-serve/environment';
import { mockQuestions, mockRiskProfileDetails, mockSubmitAnswerResponse } from '../mock/data';
import { AnswerPayload } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { RiskProfileService } from './risk-profile.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class dialogMock {
    open() {
        return {
            afterClosed: () => of({}),
        };
    }
}
describe('RiskProfileService', () => {
    let service: RiskProfileService;
    let httpMock: HttpTestingController;
    let httpRequest;
    const endpointRWS: string = environment.apiUrl + environment.rws;
    const endpointWealth: string = environment.apiUrl + environment.wealth;
    const endpointEmanager: string = environment.apiUrl + environment.emanager;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
            providers: [
                HttpService,
                RiskProfileService,
                MintDialogService,
                { provide: MatDialog, useValue: {} },
                { provide: MatDialog, useClass: dialogMock },
            ],
        });
        service = TestBed.inject(RiskProfileService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it(
        'should create instance of ClicksService',
        waitForAsync(
            inject([], () => {
                service = TestBed.inject(RiskProfileService);
                expect(service).toBeTruthy();
            }),
        ),
    );

    describe('getQuestions()', () => {
        const mockQuestionsResponse = mockQuestions;
        it('should call clicks api to get list of questions', () => {
            service.getQuestions().subscribe((response) => {
                expect(response).toEqual(mockQuestionsResponse);
            });
            httpRequest = httpMock.expectOne(`${endpointRWS}/question/getAllQuestion`);
            httpRequest.flush(mockQuestionsResponse);
            expect(service).toBeTruthy();
        });
    });

    describe('getRiskProfileDetails()', () => {
        const mockRiskProfileDetailsResponse = mockRiskProfileDetails;
        it('should call clicks api to get risk profile details', () => {
            service.getRiskProfileDetails().subscribe((response) => {
                expect(response).toEqual(mockRiskProfileDetailsResponse);
            });
            httpRequest = httpMock.expectOne(`${endpointEmanager}/account/getRiskProfileDetail`);
            httpRequest.flush(mockRiskProfileDetailsResponse);
            expect(service).toBeTruthy();
        });
    });

    describe('addAnswers()', () => {
        const payload: AnswerPayload = {
            computeRiskProfile: {
                cifNumber: '10330000219671',
                rmId: 'BRMGR1',
                custName: 'WEALTH THREE',
                custIdType: 'NTP',
                custIdNo: '950310034403',
                onboardingId: 34,
                custIdIssue: '',
                questionAns: [
                    { questionNumber: '1', multiOptions: 'N', options: [1] },
                    { questionNumber: '2', multiOptions: 'N', options: [3] },
                    { questionNumber: '3', multiOptions: 'N', options: [2] },
                ],
            },
        };
        const mockAnswerResponse = mockSubmitAnswerResponse;
        it('should call clicks api to get risk profile details', () => {
            service.addAnswers(payload).subscribe((response) => {
                expect(response).toEqual(mockAnswerResponse);
            });
            httpRequest = httpMock.expectOne(`${endpointWealth}/rws/computeriskprofile`);
            httpRequest.flush(mockAnswerResponse);
            expect(service).toBeTruthy();
        });
    });

    describe('dialoguePopupRWSMaintenance', () => {
        it('should open dialog', () => {
            expect(service.dialoguePopupRWSMaintenance()).toBeUndefined();
        });
    });
});
