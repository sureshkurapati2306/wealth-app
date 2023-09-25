import { initialState, Store, cifInquiryReducer } from './cifInquiry.reducer';
import * as CifInquiryActions from './cifInquiry.actions';

const mockReturnData = {
    cardNum: '123456',
    phoneType: 'Mobile Phone',
    phoneNumber: '0123456789',
    cifInquiryCalled: true,
};

describe('CifInquiry Reducer ', () => {
    it('should return the previous state', () => {
        const action = {} as any;

        const result = cifInquiryReducer(initialState, action);

        expect(result).toBe(initialState);
    });

    it('should call GetCifInquiryParam', () => {
        const action = new CifInquiryActions.GetCifInquiryParam();

        const result = cifInquiryReducer(initialState, action);

        expect(result.cardNum).toBe(initialState.cardNum);
        expect(result.phoneNumber).toBe(initialState.phoneNumber);
        expect(result.phoneType).toBe(initialState.phoneType);
    });

    it('should call GetCifInquiryResponse', () => {
        const action = new CifInquiryActions.GetCifInquiryResponse(mockReturnData);

        const result = cifInquiryReducer(initialState, action);

        expect(result).toEqual(mockReturnData);
    });
});
