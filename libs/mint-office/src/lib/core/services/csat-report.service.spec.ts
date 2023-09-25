import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CsatReportService } from './csat-report.service';

describe('CsatReportService', () => {
  let service: CsatReportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CsatReportService,
        { provide: 'environment', useValue: { apiUrl: 'mockApiUrl/' } }
      ]
    });

    service = TestBed.inject(CsatReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update CsatQuestionnaire details', () => {
    const mockCsatQuestionnaireData = { /* ... */ };

    service.updateCsatQuestionnaireDetails(mockCsatQuestionnaireData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('mockApiUrl/wealth/survey-config/1');
    expect(req.request.method).toBe('PUT');
    req.flush({
      "id": 1,
      "title": "Sample Question 2",
      "prompterCoolDownPeriod": 30,
      "dashboardPrompterRequired": false,
      "logoutPrompterRequired": false
  });
  });

  it('should get CsatQuestionnaire details', () => {
    const mockId = '1';

    service.getCsatQuestionnaireDetails(mockId).subscribe(response => {
      expect(response).toBeTruthy();
      // Additional assertions based on the response
    });

    const req = httpMock.expectOne(`mockApiUrl/wealth/survey-config/${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush({
      "id": 1,
      "title": "Sample Question 2",
      "prompterCoolDownPeriod": 30,
      "dashboardPrompterRequired": false,
      "logoutPrompterRequired": false
  });
  });

  it('should get report data', () => {
    const mockStartDate = '2023-01-01';
    const mockEndDate = '2023-01-10';

    service.getReportData(mockStartDate, mockEndDate).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`mockApiUrl/wealth/csa-survey/report?startDate=${mockStartDate}&endDate=${mockEndDate}`);
    expect(req.request.method).toBe('GET');
    req.flush({
      "id": 1,
      "title": "Sample Question 2",
      "prompterCoolDownPeriod": 30,
      "dashboardPrompterRequired": false,
      "logoutPrompterRequired": false
  });
  });

  it('should handle error on HTTP request', () => {
    const mockStartDate = '2023-01-01';
    const mockEndDate = '2023-01-10';

    service.getReportData(mockStartDate, mockEndDate).subscribe(
      () => {
        fail('Expected error, but got success');
      },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`mockApiUrl/wealth/csa-survey/report?startDate=${mockStartDate}&endDate=${mockEndDate}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Mock network error'));
  });
});
