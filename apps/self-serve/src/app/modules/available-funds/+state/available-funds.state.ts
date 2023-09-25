import { Fund } from '@cimb/shared/models';
import { AssetsClass, FundHouse, RiskCategory, FundPerfHistory } from '../models';

export interface AvailableFundsState {
    riskCategories: RiskCategory[];
    assetsClasses: AssetsClass[];
    fundHouse: FundHouse[];
    fundDetail: Fund;
    fundPerfHistory: FundPerfHistory;
}

export const initialState: AvailableFundsState = {
    riskCategories: null,
    assetsClasses: null,
    fundHouse: null,
    fundDetail: null,
    fundPerfHistory: null
};

