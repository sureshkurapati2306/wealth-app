import { ActionsSubject } from '@ngrx/store';
import { of, throwError } from 'rxjs';

import { AsnbSettingsEffects } from './asnb-settings.effects';
import * as AsnbSettingsActions from './asnb-settings.actions';
import { AsnbSettingsService } from '../../core/services/asnb-settings.service';

describe('AsnbSettingsEffects', () => {
    let actions$: ActionsSubject;
    let asnbSettingsService: AsnbSettingsService;
    let effects: AsnbSettingsEffects;

    beforeEach(() => {
        actions$ = new ActionsSubject();
        asnbSettingsService = {
            getFundSuspensionList: jest.fn(),
        } as any; // Use `as any` to avoid type checking issues
        effects = new AsnbSettingsEffects(actions$, asnbSettingsService);
    });

    it('should dispatch loadFundSuspensionListSuccess action on successful API response', () => {
        const mockData = [
            {
                /* mock data */
            },
        ];
        (asnbSettingsService.getFundSuspensionList as jest.Mock).mockReturnValue(of(mockData));

        actions$.next(AsnbSettingsActions.loadFundSuspensionList());

        effects.loadFundSuspensionList$.subscribe((resultAction) => {
            expect(resultAction).toEqual(
                AsnbSettingsActions.loadFundSuspensionListSuccess({ payload: mockData }),
            );
        });
    });

    it('should dispatch loadFundSuspensionListFailure action on API error', () => {
        const mockError = new Error('API error');
        (asnbSettingsService.getFundSuspensionList as jest.Mock).mockReturnValue(
            throwError(mockError),
        );

        actions$.next(AsnbSettingsActions.loadFundSuspensionList());

        effects.loadFundSuspensionList$.subscribe((resultAction) => {
            expect(resultAction).toEqual(
                AsnbSettingsActions.loadFundSuspensionListFailure({ error: mockError }),
            );
        });
    });
});
