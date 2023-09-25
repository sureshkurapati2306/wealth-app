import { ListUser } from '../../core/models/administrator-portal.models';
import {
    administratorPortalAdapter,
    AdministratorPortalPartialState,
    initialState,
} from './administrator-portal.reducer';
import * as AdministratorPortalSelectors from './administrator-portal.selectors';

describe('AdministratorPortal Selectors', () => {
    const ERROR_MSG = 'No Error Available';

    let state: AdministratorPortalPartialState;

    beforeEach(() => {
        state = {
            administratorPortal: administratorPortalAdapter.setAll(
                {
                    ...initialState,
                    selectedId: 'PRODUCT-BBB',
                    error: ERROR_MSG,
                    loaded: true,
                },
            ),
        };
    });

    describe('AdministratorPortal Selectors', () => {
        it('getAdministratorPortalLoaded() should return the current "loaded" status', () => {
            const result = AdministratorPortalSelectors.getAdministratorPortalLoaded(state);

            expect(result).toBe(true);
        });

        it('getAdministratorPortalError() should return the current "error" state', () => {
            const result = AdministratorPortalSelectors.getAdministratorPortalError(state);

            expect(result).toBe(ERROR_MSG);
        });
    });
});
