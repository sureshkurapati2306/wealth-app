import { Fund } from '@cimb/shared/models';
import { Action } from '@ngrx/store';
import {
    mockAssetsClassesResponse,
    mockFundDetailData,
    mockFundHouseResponse,
    mockfundListResponse,
    mockFundPerHistory
} from '../mock/data';
import { AssetsClass, FundHouse, FundList, FundPerfHistory } from '../models';

import * as AvailableFundsActions from './available-funds.actions';
import { reducer } from './available-funds.reducer';
import { initialState } from './available-funds.state';

describe('AvailableFunds Reducer', () => {
    describe('[AvailableFunds/RiskCategories] Load Risk Categories Success', () => {
        const riskCategories = [
            { id: 1, name: 'risk 1' },
            { id: 2, name: 'risk 2' },
        ];

        it('should loadRiskCategoriesSuccess return the list of riskCategories', () => {
            const action = AvailableFundsActions.loadRiskCategoriesSuccess({
                riskCategories,
            });

            const result = reducer(initialState, action);

            expect(result.riskCategories).toBe(riskCategories);
        });

        it('should set the riskCategories property in state', () => {
            const action = AvailableFundsActions.loadRiskCategoriesSuccess({
                riskCategories,
            });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                riskCategories: action.riskCategories,
            });
        });
    });

    describe('[AvailableFunds/AssetsClasses] Load Assets Classes Success', () => {
        const assetsClasses: AssetsClass[] = mockAssetsClassesResponse;

        it('should loadAssetsClassesSuccess return the list of riskCategories', () => {
            const action = AvailableFundsActions.loadAssetsClassesSuccess({
                assetsClasses,
            });

            const result = reducer(initialState, action);

            expect(result.assetsClasses).toBe(assetsClasses);
        });

        it('should set the assetsclasses property in state', () => {
            const action = AvailableFundsActions.loadAssetsClassesSuccess({
                assetsClasses,
            });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                assetsClasses: action.assetsClasses,
            });
        });
    });

    describe('[[AvailableFunds/FundHouse] Load Fund House Success', () => {
        const fundHouse: FundHouse[] = mockFundHouseResponse;

        it('should loadFundHouseSuccess return the list of riskCategories', () => {
            const action = AvailableFundsActions.loadFundHouseSuccess({
                fundHouse,
            });

            const result = reducer(initialState, action);

            expect(result.fundHouse).toBe(fundHouse);
        });

        it('should set the fundHouse property in state', () => {
            const action = AvailableFundsActions.loadFundHouseSuccess({
                fundHouse,
            });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                fundHouse: action.fundHouse,
            });
        });
    });

    describe('[[AvailableFunds/UploadFundDetailSuccess] Load upload fund detail success ', () => {
        const fundDetail: Fund = mockFundDetailData;

        it('should upload fund details return the list of UploadFundDetailSuccess', () => {
            const action = AvailableFundsActions.uploadFundDetailSuccess({
                fundDetail,
            });

            const result = reducer(initialState, action);

            expect(result.fundDetail).toBe(fundDetail);
        });

        it('should set the upload fund details property in state', () => {
            const action = AvailableFundsActions.uploadFundDetailSuccess({
                fundDetail,
            });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                fundDetail: action.fundDetail,
            });
        });
    });

    describe('[Fund Performance] Fund Performance History success ', () => {
        const fundPerfHistory: FundPerfHistory[] = mockFundPerHistory;

        it('should Fund Performance History return the list of fundPerHistorySuccess', () => {
            const action = AvailableFundsActions.fundPerHistorySuccess({
                payload: mockFundPerHistory
            });

            const result = reducer(initialState, action);

            expect(result.fundPerfHistory).toBe(fundPerfHistory);
        });

        it('should set the Fund Performance History property in state', () => {
            const action = AvailableFundsActions.fundPerHistorySuccess({
                payload: mockFundPerHistory
            });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                fundPerfHistory: action.payload,
            });
        });
    });

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as Action;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
