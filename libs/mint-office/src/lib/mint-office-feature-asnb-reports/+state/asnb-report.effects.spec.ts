import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AsnbReportEffects } from './asnb-report.effects';

describe('AsnbReportEffects', () => {
  let actions$: Observable<any>;
  let effects: AsnbReportEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AsnbReportEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AsnbReportEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
