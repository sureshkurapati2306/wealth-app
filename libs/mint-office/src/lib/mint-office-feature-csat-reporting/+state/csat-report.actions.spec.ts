import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { CsatReportEffects } from './csat-report.effects';
import { CsatReportService } from '../../core/services/csat-report.service';
import * as fromActions from './csat-report.actions';
import { of } from 'rxjs';

describe('CsatReportEffects', () => {
  let effects: CsatReportEffects;
  let actions$: any;
  let csatReportService: any;

  const mockCsatQuestionnaire = {
    title: 'Sample Question 2',
    prompterCoolDownPeriod: 30,
    dashboardPrompterRequired: false,
    logoutPrompterRequired: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CsatReportEffects,
        provideMockActions(() => actions$),
        {
          provide: CsatReportService,
          useValue: {
            updateCsatQuestionnaireDetails: jest.fn(),
            getCsatQuestionnaireDetails: jest.fn(),
            getReportData: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.inject(CsatReportEffects);
    actions$ = of(fromActions.loadCsatReport({ payload: mockCsatQuestionnaire }));
    csatReportService = TestBed.inject(CsatReportService);
  });

  it('should dispatch loadCsatQuestionnaireDetailsSuccess on success', () => {
    csatReportService.getCsatQuestionnaireDetails.mockReturnValue(of(mockCsatQuestionnaire));

    effects.loadCsatReport$.subscribe(() => {
      expect(csatReportService.getCsatQuestionnaireDetails).toHaveBeenCalled();
    });
  });

  it('should dispatch loadCsatReportSuccess on success', () => {
    csatReportService.updateCsatQuestionnaireDetails.mockReturnValue(of([]));

    effects.loadCsatReport$.subscribe(() => {
      expect(csatReportService.updateCsatQuestionnaireDetails).toHaveBeenCalled();
    });
  });

  it('should dispatch loadReportDataSuccess on success', () => {
    csatReportService.getReportData.mockReturnValue(of([]));

    effects.loadReportData$.subscribe(() => {
      expect(csatReportService.getReportData).toHaveBeenCalled();
    });
  });
});
