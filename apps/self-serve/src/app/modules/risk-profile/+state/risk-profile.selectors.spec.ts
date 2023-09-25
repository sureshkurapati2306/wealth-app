import * as Selectors from './risk-profile.selectors';
import { initialState } from './risk-profile.state';

describe('RiskProfileQuestions Selectors', () => {
    it('should getQuestions', () => {
        const result = Selectors.getQuestions.projector(initialState);

        expect(result).toBeNull();
    });

    it('should getRiskProfileDetails', () => {
        const result = Selectors.getRiskProfileDetails.projector(initialState);

        expect(result).toBeNull();
    });

    it('should getRiskProfileResults', () => {
        const result = Selectors.getRiskProfileResults.projector(initialState);

        expect(result).toBeNull();
    });
});
