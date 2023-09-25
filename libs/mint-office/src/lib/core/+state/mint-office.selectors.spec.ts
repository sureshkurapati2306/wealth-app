import * as fromMintOffice from './mint-office.reducer';
import * as Selectors from './mint-office.selectors';
import { selectMintOfficeState } from './mint-office.selectors';

describe('MintOffice Selectors', () => {
  
  it('should select the feature state', () => {
    const result = selectMintOfficeState({
      [fromMintOffice.mintOfficeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select the footer class name', () => {
    const result = Selectors.getCimbFooterClassName.projector(fromMintOffice.initialState);

    expect(result).toEqual('');
  });

});
