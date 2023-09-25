import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WhitelistingUserService } from './whitelisting-user.service';
import { Environment } from '../models/environment.model';
import { WhitelistingTable } from '../../core/models/user-whitelisting.models'

describe('WhitelistingUserService', () => {
  let service: WhitelistingUserService;
  let httpMock: HttpTestingController;
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WhitelistingUserService,
        {
          provide: 'environment', useValue: environment
        }
      ],
    });

    service = TestBed.inject(WhitelistingUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request and return whitelisting table data', () => {
    const search = 'test';
    const pageIndex = 1;

    const mockResponse: WhitelistingTable = {
      "content": [
        {
          "id": 81,
          "startDate": "2023-03-27T16:00:00.000+00:00",
          "endDate": "2023-03-27T16:00:00.000+00:00",
          "name": "MMNNOO",
          "idType": "5",
          "idNo": "B567821",
          "productId": "PRS",
          "privilege": "No",
          "lastUpdated": null
        },
        {
          "id": 82,
          "startDate": "2023-03-27T16:00:00.000+00:00",
          "endDate": "2023-03-27T16:00:00.000+00:00",
          "name": "MMNNOO",
          "idType": "5",
          "idNo": "B567821",
          "productId": "PRS",
          "privilege": "No",
          "lastUpdated": null
        }
      ],
      "pageable": {
        "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
        },
        "pageNumber": 0,
        "pageSize": 20,
        "offset": 0,
        "paged": true,
        "unpaged": false
      },
      "totalPages": 1,
      "totalElements": 20,
      "last": true,
      "first": true,
      "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
      },
      "numberOfElements": 20,
      "size": 20,
      "number": 0,
      "empty": false
    };

    service.getWhitelistingListUser(search, pageIndex).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}wealth/whitelisted-users?pageIndex=${pageIndex}&search=${search}`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should delete whitelisting user', () => {
    const id = 1;

    service.deleteWhitelistingUser(id).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}wealth/whitelisted-users?id=${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should upload white listing CSV file', () => {
    const file = new File(['file-content'], 'test.csv', { type: 'text/csv' });

    service.uploadWhiteListingCsvFile(file).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}wealth/whitelisted-users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Accept')).toBe('*/*');
    req.flush({});
  });
});
