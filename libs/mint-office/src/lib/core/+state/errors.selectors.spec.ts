import { ERRORS_FEATURE_KEY, initialState } from './errors.reducer';
import * as ErrorsSelectors from './errors.selectors';

describe('Errors Selectors', () => {
    it('getErrorsState() should select the feature state', () => {
        const results = ErrorsSelectors.getErrorsState({
            [ERRORS_FEATURE_KEY]: {}
          });

        expect(results).toEqual({});
    });

    it('getErrors() should return the current "error" state', () => {
        const result = ErrorsSelectors.getErrors.projector(initialState);

        expect(result).toBe('');
    });
});
