
import * as AvailableFundsAction from './availableFunds.action';

export const AVAILABLEFUNDS_FEATURE_KEY = 'availableFunds';

export interface Store {
  availableFundsData : any;
  values : any;
  dataLoaded: boolean;
  availableFundsParams : string;
  fundPerformanceHistory: any[],
}

const initialState: Store = {
  availableFundsData : '',
  values : '',
  dataLoaded: false,
  availableFundsParams : '',
  fundPerformanceHistory: []
}
export function availableFundsReducer(
  state = initialState,
  action: AvailableFundsAction.Actions
) {
  switch (action.type) {
    case AvailableFundsAction.GET_AVAILABLE_FUNDS_DATA:
      return {
        ...state,
        availableFundsParams : action.payload
      }
      case AvailableFundsAction.STORE_AVAILABLE_FUNDS_DATA: {
        let availableFund : any = '';
        const availableFundsData = [...action.payload];

        for(let i=0;i<availableFundsData.length; i++) {

          availableFund = {
            ...availableFundsData[i],

          };
          availableFundsData[i] = availableFund
        }

        return {
          ...state,
          availableFundsData: availableFundsData,
          dataLoaded: true
        };
      }

      case AvailableFundsAction.GET_DOCUMENT:
      return {
        ...state,
        documentDownloadParams : action.payload
      }
      case AvailableFundsAction.STORE_DOCUMENT: {
        const downloadedDocument = action.payload;

        return {
          ...state,
          downloadedDocument: downloadedDocument,
        };
      }
      case AvailableFundsAction.FUND_PERF_HISTORY_SUCCESS:
      return {
        ...state,
        fundPerformanceHistory : action.payload
      }
    }
}
