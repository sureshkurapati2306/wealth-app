import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DashboardPopupEffects } from './dashboard-popup.effects';
import * as DashboardPopupActions from './dashboard-popup.actions';
import { DashboardPopupService } from '../../../core/services/dashboard-popup.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { DashboardPopupUpload } from '../../../../lib/core/models/dashboard-popup.model';
import { Environment } from '../../../core/models/environment.model';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('DashboardPopupEffects', () => {
  let effects: DashboardPopupEffects;
  let actions$: Actions;
  let dashboardPopupService: Partial<DashboardPopupService>;
  let snackBarService: Partial<SnackBarService>;

  const mockData: DashboardPopupUpload = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    content: 'Test Content',
    status: true,
    imageContent: 'Test Image Content'
  };
  const apiUrl = '/';

  const environment: Environment = { production: false, apiUrl: apiUrl };

  beforeEach(() => {
    actions$ = of(DashboardPopupActions.loadDashboardPopup({ loadDashboardPopupdata: mockData }));
    dashboardPopupService = {
      updatePopUpDetails: jest.fn(),
      environment: environment,
      getPopUpDetails: jest.fn()
    };
    snackBarService = {
      openSnackbar: jest.fn(),
      dismissSnackbar: jest.fn()
    };
    effects = new DashboardPopupEffects(
      actions$,
      dashboardPopupService as DashboardPopupService,
      snackBarService as SnackBarService
    );
  });

  describe('loadDashboardPopup$', () => {
    it('should dispatch loadDashboardPopupSuccess action on success', () => {
      const response: DashboardPopupUpload[] = [mockData];
      jest.spyOn(dashboardPopupService, 'updatePopUpDetails').mockReturnValue(of(response));

      effects.loadDashboardPopup$.subscribe((action) => {
        expect(action).toEqual(DashboardPopupActions.loadDashboardPopupSuccess({ data: response }));
        expect(snackBarService.openSnackbar).toHaveBeenCalledWith('You have saved the changes successfully!', 5000, 'success');
      });
    });

    it('should dispatch loadDashboardPopupFailure action on error', () => {
      const error = new Error('Test Error');
      jest.spyOn(dashboardPopupService, 'updatePopUpDetails').mockReturnValue(throwError(error));

      effects.loadDashboardPopup$.pipe(
        catchError((err) => {
          expect(err).toEqual(error);
          expect(snackBarService.openSnackbar).toHaveBeenCalledWith('Error Response!!', 5000, 'warning');
          return of(DashboardPopupActions.loadDashboardPopupFailure({ error: err }));
        })
      ).subscribe();
    });
  });
});
