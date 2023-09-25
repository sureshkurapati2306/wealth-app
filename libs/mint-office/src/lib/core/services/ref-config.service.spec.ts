import { TestBed } from '@angular/core/testing';

import { RefConfigService } from './ref-config.service';

describe('RefConfigService', () => {
  let service: RefConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
