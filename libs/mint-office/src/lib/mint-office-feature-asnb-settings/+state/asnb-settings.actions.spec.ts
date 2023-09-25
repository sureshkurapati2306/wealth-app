import * as fromAsnbSettings from './asnb-settings.actions';

describe('loadAsnbSettingss', () => {
    it('should return an action', () => {
        expect(fromAsnbSettings.loadAsnbSettingss().type).toBe('[AsnbSettings] Load AsnbSettingss');
    });

    it('should create a loadFundSuspensionList action', () => {
        const action = fromAsnbSettings.loadFundSuspensionList();
        expect(action.type).toEqual('[Asnb/API] Load Fund Suspension List');
    });

    it('should create a loadFundSuspensionListSuccess action', () => {
        const payload = [];
        const action = fromAsnbSettings.loadFundSuspensionListSuccess({ payload });
        expect(action.type).toEqual('[Asnb/API] Load Fund Suspension List Success');
        expect(action.payload).toEqual(payload);
    });

    it('should create a loadFundSuspensionListFailure action', () => {
        const error = new Error('Failed to load ASNB fund details');
        const action = fromAsnbSettings.loadFundSuspensionListFailure({ error });
        expect(action.type).toEqual('[Asnb/API] Load Fund Suspension List Failure');
        expect(action.error).toEqual(error);
    });
});
