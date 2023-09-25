import { Action } from "@ngrx/store";

export const GET_AVAILABLE_FUNDS_DATA = '[AvailableFunds] Get AvailableFund Data';
export const STORE_AVAILABLE_FUNDS_DATA = '[AvailableFunds] Store AvailableFund Data';
export const CALL_AVAILABLE_FUNDS = '[AvailableFunds] Call Available Fund Api';
export const GET_DOCUMENT = '[AvailableFunds] Get download document';
export const STORE_DOCUMENT = '[AvailableFunds] Store download document';
export const FUND_PERF_HISTORY = '[FundPerfo Page] Load fund performance';
export const FUND_PERF_HISTORY_SUCCESS = '[FundPerfo Page] Load fund performance Success';
export const FUND_PERF_HISTORY_FAILURE = '[FundPerfo Page] Load fund performance failure';


export class GetAvailableFund implements Action {
  readonly type = GET_AVAILABLE_FUNDS_DATA;

  constructor(public payload: string) {}
}

export class StoreAvailableFundData implements Action {
  readonly type = STORE_AVAILABLE_FUNDS_DATA;

  constructor(public payload: any) {}
}

//Methods for document download from fund details page
export class GetDocument implements Action {
  readonly type = GET_DOCUMENT;

  constructor(public payload: any) {}
}

export class StoreDocument implements Action {
  readonly type = STORE_DOCUMENT;

  constructor(public payload: any) {}
}

export class FundPerfo implements Action {
  readonly type = FUND_PERF_HISTORY;

  constructor(public payload: any) {}
}

export class FundPerfoSuccess implements Action {
  readonly type = FUND_PERF_HISTORY_SUCCESS;

  constructor(public payload: any) {}
}

export class FundPerfoFailure implements Action {
  readonly type = FUND_PERF_HISTORY_FAILURE;

  constructor(public payload: any) {}
}

export type Actions =

| GetAvailableFund
| StoreAvailableFundData
| GetDocument
| StoreDocument
| FundPerfo
| FundPerfoSuccess
| FundPerfoFailure;

