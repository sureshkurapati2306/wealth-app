import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { CsatReportEffects } from './csat-report.effects';
import * as CsatReportActions from './csat-report.actions';
import { CsatReportService } from '../../core/services/csat-report.service';
import { SnackBarService } from '../../core/services/snack-bar.service';

describe('CsatReportEffects', () => {
    let actions$: Observable<any>;
    let effects: CsatReportEffects;
    let csatReportService: CsatReportService;
    let snackBarService: SnackBarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CsatReportEffects,
                provideMockActions(() => actions$),
                {
                    provide: CsatReportService,
                    useValue: {
                        updateCsatQuestionnaireDetails: jest.fn(() => of()),
                        getCsatQuestionnaireDetails: jest.fn(() => of()),
                        getReportData: jest.fn(() => of())
                    }
                },
                {
                    provide: SnackBarService,
                    useValue: {
                        openSnackbar: jest.fn()
                    }
                }
            ]
        });

        effects = TestBed.inject(CsatReportEffects);
        csatReportService = TestBed.inject(CsatReportService);
        snackBarService = TestBed.inject(SnackBarService);
    });

    describe('loadCsatReport$', () => {
        it('should dispatch loadCsatReportSuccess action on successful update', () => {
            const csatReportPayload = {
                "title": "Sample Question 5",
                "prompterCoolDownPeriod": 30,
                "dashboardPrompterRequired": false,
                "logoutPrompterRequired": false
              }
            const action = CsatReportActions.loadCsatReport({ payload: csatReportPayload });

            actions$ = of(action);

            effects.loadCsatReport$.subscribe(() => {
                expect(csatReportService.updateCsatQuestionnaireDetails).toHaveBeenCalled();
                expect(snackBarService.openSnackbar).toHaveBeenCalledWith('You have saved the changes successfully!', 5000, 'success');
            });
        });
    });

    describe('loadCsatQuestionnaireDetails$', () => {
        it('should dispatch loadCsatQuestionnaireDetailsSuccess action on successful retrieval', () => {
            const action = CsatReportActions.loadCsatQuestionnaireDetails({ id: '1' });

            actions$ = of(action);

            effects.loadCsatQuestionnaireDetails$.subscribe(() => {
                expect(csatReportService.getCsatQuestionnaireDetails).toHaveBeenCalled();
            });
        });
    });

    describe('loadReportData$', () => {
        it('should dispatch loadReportDataSuccess action on successful retrieval', () => {
            const action = CsatReportActions.loadReportData({ startDate: '2023-01-01', endDate: '2023-12-31' });

            actions$ = of(action);

            effects.loadReportData$.subscribe(() => {
                expect(csatReportService.getReportData).toHaveBeenCalled();
            });
        });
    });
});
