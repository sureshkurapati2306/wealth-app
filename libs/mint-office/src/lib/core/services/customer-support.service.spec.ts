import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Environment } from '../models/environment.model';

import { CustomerSupportService } from './customer-support.service';

const mockData: Customer[] = [];

describe('CustomerSupportService', () => {
  let service: CustomerSupportService;
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
    service = TestBed.inject(CustomerSupportService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call searchRecords() success path', (done) => {

    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockData));

    service.searchRecords({
      idNumber: 'abcabc123',
      fullName: 'John',
      cifNumber: 'abcabc'
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
      fullName: 'John',
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
