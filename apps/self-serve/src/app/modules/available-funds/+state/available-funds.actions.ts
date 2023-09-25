import { Fund } from '@cimb/shared/models';
import { createAction, props } from '@ngrx/store';
import { AssetsClass, FundHouse, RiskCategory } from '../models';

// Load Risk Categories
export const loadRiskCategories = createAction('[AvailableFunds Page] Load Risk Categories');

export const loadRiskCategoriesSuccess = createAction(
    '[AvailableFunds/RiskCategories] Load Risk Categories Success',
    props<{ riskCategories: RiskCategory[] }>(),
);

export const loadRiskCategoriesFailure = createAction(
    '[AvailableFunds/RiskCategories] Load Risk Categories Failure',
    props<{ error: any }>(),
);

// Load Assets Classes
export const loadAssetsClasses = createAction('[AvailableFunds Page] Load Assets Classes');

export const loadAssetsClassesSuccess = createAction(
    '[AvailableFunds/AssetsClasses] Load Assets Classes Success',
    props<{ assetsClasses: AssetsClass[] }>(),
);

export const loadAssetsClassesFailure = createAction(
    '[AvailableFunds/AssetsClasses] Load Assets Classes Failure',
    props<{ error: any }>(),
);

// Load Fund House
export const loadFundHouse = createAction('[AvailableFunds Page] Load Fund House');

export const loadFundHouseSuccess = createAction(
    '[AvailableFunds/FundHouse] Load Fund House Success',
    props<{ fundHouse: FundHouse[] }>(),
);

export const loadFundHouseFailure = createAction(
    '[AvailableFunds/FundHouse] Load Fund House Failure',
    props<{ error: any }>(),
);

export const uploadFundDetail = createAction('[AvailableFunds/FundDetail] Upload Fund Detail');

export const uploadFundDetailSuccess = createAction(
    '[AvailableFunds/FundDetail] Upload Fund Detail Success',
    props<{ fundDetail: Fund }>(),
);

export const uploadFundDetailFailure = createAction(
    '[AvailableFunds/FundDetail] Upload Fund Detail Failure',
    props<{ error: any}>(),
);

export const fundPerHistory = createAction('[Fund Performance] Fund Performance History',

    props<{ fundCode: any }>());

export const fundPerHistorySuccess = createAction(
    '[Fund Performance] Fund Performance History Success',
    props<{ payload: any }>(),
);

export const fundPerHistoryFailure = createAction(
    'Fund Performance] Fund Performance History Success',
    props<{ error: any }>(),
);
