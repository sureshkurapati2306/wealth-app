import { FundPerfHistory } from '../../../modules/available-funds/models'


export interface AvailableFundsState {
    fundPerfHistory: FundPerfHistory
}

export const initialState: AvailableFundsState = {
    fundPerfHistory: null
};