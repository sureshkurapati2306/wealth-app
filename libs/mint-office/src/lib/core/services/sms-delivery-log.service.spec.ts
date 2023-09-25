import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Environment } from '../models/environment.model';
import { SmsDeliveryLogService } from './sms-delivery-log.service';

const mockData: any[] = [
  {
    
      "id": 0,
      "contactNumber": "01114300869",
      "utAccountNo": "A80120396",
      "clientId": "500211507504",
      "smsContent": "Unit Trust purchase request Ref 7000802 of RM 10,000.00 from account ending 0396 is received for processing on 01 Aug 2022.",
      "category": "01",
      "smsDeliveryStatus": "SMS delivery successful",
      "deliveryDateTime": "2022-08-01T16:36:49"
    
  }
];

describe('UnitTrustTransactionsService', () => {
  let service: SmsDeliveryLogService;
  let httpClient: HttpClient;
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'environment', useValue: environment
        }
      ]
    });
    service = TestBed.inject(SmsDeliveryLogService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call searchRecords() success path', (done) => {

    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockData));

    service.searchRecords({
      status: 'All',
      startDate: new Date(),
      endDate: new Date(),
      utAccNumber: 'abc123',
    }).subscribe(data =>{
      expect(data).toBe(mockData);
      done();
    });

  });

  it('should call searchRecords() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404
    });

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

    service.searchRecords({
      status: 'Processing'
    })
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });

});
