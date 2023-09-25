import {
  GET_AVAILABLE_FUNDS_DATA,
  GetAvailableFund,
  STORE_AVAILABLE_FUNDS_DATA,
  StoreAvailableFundData,
  GetDocument,
  GET_DOCUMENT,
  StoreDocument,
  STORE_DOCUMENT,
  FUND_PERF_HISTORY,
  FUND_PERF_HISTORY_SUCCESS,
  FUND_PERF_HISTORY_FAILURE,
  FundPerfo,
  FundPerfoSuccess,
  FundPerfoFailure


} from './availableFunds.action';

describe('GetAvailableFund' , ()=> {
  it('should create an action GetDashboard', () => {
    const payload = '';
    const action = new GetAvailableFund(payload);

    expect({ ...action }).toEqual({
      type: GET_AVAILABLE_FUNDS_DATA,
      payload,
    });
  });

  it('should create an action StoreDashboardApiResponse', () => {
    const payload = '';
    const action = new StoreAvailableFundData(payload);

    expect({ ...action }).toEqual({
      type: STORE_AVAILABLE_FUNDS_DATA,
       payload,
    });
  });
  it('should create an action getDocument', () => {
    const payload = '';
    const action = new GetDocument(payload);

    expect({ ...action }).toEqual({
      type: GET_DOCUMENT,
      payload,
    });
  });

  it('should create an action storeDocument', () => {
    const payload = '';
    const action = new StoreDocument(payload);

    expect({ ...action }).toEqual({
      type: STORE_DOCUMENT,
       payload,
    });
  });

  it('should create an action fundPerfo', () => {
    const payload = '';
    const action = new FundPerfo(payload);

    expect({ ...action }).toEqual({
      type: FUND_PERF_HISTORY,
      payload,
    });
  });

  it('should create an action fundPerfoSuccess', () => {
    const payload = '';
    const action = new FundPerfoSuccess(payload);

    expect({ ...action }).toEqual({
      type: FUND_PERF_HISTORY_SUCCESS,
      payload,
    });
  });

  it('should create an action fundPerfoFailure', () => {
    const payload = '';
    const action = new FundPerfoFailure(payload);

    expect({ ...action }).toEqual({
      type: FUND_PERF_HISTORY_FAILURE,
      payload,
    });
  });

})


