import {
    GET_CIF_INQUIRY_FROM_API,
    GET_CIF_INQUIRY_FROM_API_RESPONSE,
    GetCifInquiryParam,
    GetCifInquiryResponse,
} from './cifInquiry.actions';

describe('cifInquiry actions', () => {
    it('should request GetCifInquiryParam with arguments', () => {
        const action = new GetCifInquiryParam();

        expect({ ...action }).toEqual({
            type: GET_CIF_INQUIRY_FROM_API
        });
    });

    it('should request GetCifInquiryParam with no arguments', () => {
        const action = new GetCifInquiryParam();

        expect({ ...action }).toEqual({
            type: GET_CIF_INQUIRY_FROM_API
        });
    });

    it('should get a response when called GetCifInquiryResponse', () => {
        const cifInquiryData: any = {
            cardNum: '5196038000000649',
            phoneType: 'Mobile Phone',
            phoneNumber: '0123456789',
        };

        const action = new GetCifInquiryResponse(cifInquiryData);

        expect({ ...action }).toEqual({
            type: GET_CIF_INQUIRY_FROM_API_RESPONSE,
            cifInquiryData,
        });
    });

    it('should get a null response when called GetCifInquiryResponse', () => {
        const cifInquiryData: any = {
            cardNum: null,
            phoneType: null,
            phoneNumber: null,
        };

        const action = new GetCifInquiryResponse(cifInquiryData);

        expect({ ...action }).toEqual({
            type: GET_CIF_INQUIRY_FROM_API_RESPONSE,
            cifInquiryData,
        });
    });
});
