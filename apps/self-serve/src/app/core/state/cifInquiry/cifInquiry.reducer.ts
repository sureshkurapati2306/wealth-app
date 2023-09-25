import * as CifInquiryActions from './cifInquiry.actions';

export interface Store {
    cardNum: any;
    phoneType: any;
    phoneNumber: any;
    cifInquiryCalled: boolean;
}

export const initialState: Store = {
    cardNum: null,
    phoneType: null,
    phoneNumber: null,
    cifInquiryCalled: false,
};

export function cifInquiryReducer(state = initialState, action: CifInquiryActions.Actions) {
    switch (action.type) {
        case CifInquiryActions.GET_CIF_INQUIRY_FROM_API:
            return {
                ...state
            };

        case CifInquiryActions.GET_CIF_INQUIRY_FROM_API_RESPONSE:
            return {
                ...state,
                cardNum: action.cifInquiryData.cardNum,
                phoneType: action.cifInquiryData.phoneType,
                phoneNumber: action.cifInquiryData.phoneNumber,
                cifInquiryCalled: true,
            };

        default:
            return state;
    }
}
