import { State } from './asnb-settings.reducer';
import * as ASNBSettingsSelector from './asnb-settings.selectors';

const mockState: State = {
    fundSuspensById: {
        1: { fsId: 1 /* other properties */ },
        2: { fsId: 2 /* other properties */ },
    },
    fundSuspensIds: [1, 2],
    status: 'success',
};
describe('AsnbSettings Selectors', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('should return the asnbSettings state', () => {
        const result = ASNBSettingsSelector.getAsnbSettingsState.projector(mockState);
        expect(result).toEqual(mockState);
    });

    it('should return the fundSuspensById map', () => {
        const result = ASNBSettingsSelector.getFundSuspensMap.projector(mockState);
        expect(result).toEqual(mockState.fundSuspensById);
    });

    it('should return the fundSuspensIds mapped to fundSuspensById', () => {
        const result = ASNBSettingsSelector.getFundSuspensList.projector(mockState);
        expect(result).toEqual([
            { fsId: 1 /* other properties */ },
            { fsId: 2 /* other properties */ },
        ]);
    });
});
