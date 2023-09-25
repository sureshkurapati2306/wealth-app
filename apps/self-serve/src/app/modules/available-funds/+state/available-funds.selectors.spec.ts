import * as Selectors from './available-funds.selectors';
import { AvailableFundsState, initialState } from './available-funds.state';

describe('AvailableFundsState Selectors', () => {

    it('should getRiskCategories', () => {
      const result = Selectors.getRiskCategories.projector(initialState);
  
      expect(result).toBeNull();
    });

    it('should getAssetsClasses', () => {
        const result = Selectors.getAssetsClasses.projector(initialState);
    
        expect(result).toBeNull();
      });

      it('should getFundHouse', () => {
        const result = Selectors.getFundHouse.projector(initialState);
    
        expect(result).toBeNull();
      });

      it('should getFundPerHistory', () => {
        const result = Selectors.getFundPerHistory.projector(initialState);
    
        expect(result).toBeNull();
      });  

});
