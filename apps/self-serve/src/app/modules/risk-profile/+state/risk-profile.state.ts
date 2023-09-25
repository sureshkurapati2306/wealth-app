import { Questions, Results, RiskProfileDetails } from '../models';

export interface RiskProfileState {
    questions: Questions[];
    details: RiskProfileDetails[];
    results: Results;
}

export const initialState: RiskProfileState = {
    questions: null,
    details: null,
    results: null,
};
