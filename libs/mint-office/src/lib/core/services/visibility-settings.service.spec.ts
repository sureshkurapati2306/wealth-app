import { TestBed } from '@angular/core/testing';

import { VisibilitySettingsService } from './visibility-settings.service';

describe('VisibilitySettingsService', () => {
  let service: VisibilitySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisibilitySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
