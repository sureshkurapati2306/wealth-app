import { Action } from '@ngrx/store';

export const GET_CIF_INQUIRY_FROM_API = '[CIF INQUIRY] Get CIF Inquiry From API';
export const GET_CIF_INQUIRY_FROM_API_RESPONSE = '[CIF INQUIRY] Get CIF Inquiry From API Response';
//export const GET_CIF_INQUIRY_FROM_API_FAILURE = '[CIF INQUIRY] Get CIF Inquiry From API Failure';

export class GetCifInquiryParam implements Action {
    readonly type = GET_CIF_INQUIRY_FROM_API;
}

export class GetCifInquiryResponse implements Action {
    readonly type = GET_CIF_INQUIRY_FROM_API_RESPONSE;

    constructor(public cifInquiryData: any) {}
}

export type Actions = GetCifInquiryParam | GetCifInquiryResponse;
