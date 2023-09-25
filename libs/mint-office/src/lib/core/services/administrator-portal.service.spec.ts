import { TestBed } from '@angular/core/testing';

import { AdministratorPortalService } from './administrator-portal.service';

describe('AdministratorPortalService', () => {
  let service: AdministratorPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministratorPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
