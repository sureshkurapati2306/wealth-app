import { TestBed } from '@angular/core/testing';

import { CsatSurveyService } from './csat-survey.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CsatSurveyService', () => {
  let service: CsatSurveyService;
  let httpMock: HttpTestingController;

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsatSurveyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should retrieve CSAT survey', () => {
    const mockResponse = { /* Mock response data */ };

    service.getCSATSurvey().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(request => request.url.includes('/csa-survey?surveyConfigId=1'));
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });

  it('should submit CSAT survey', () => {
    const mockPayload = {
      surveyConfigId: 1,
      platform: "SSP",
      rating: 3,
      comment: 'testing rating'
    }
    const mockResponse = {
      headers: {},
      body: null,
      statusCode: "CREATED",
      statusCodeValue: 201
    };

    service.submitCSATSurvey(mockPayload).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(request => request.url.includes('/csa-survey'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockPayload);
    request.flush(mockResponse);
  });
});
