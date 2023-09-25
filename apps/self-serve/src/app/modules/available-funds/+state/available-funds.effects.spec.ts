import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { Observable, of } from 'rxjs';
import { mockAssetsClassesResponse, mockFundHouseResponse, mockRiskCategories } from '../mock/data';
import { AvailableFundsService } from '../services/available-funds.service';
import * as AvailableFundsActions from './available-funds.actions';
import { hot } from 'jasmine-marbles';

import { AvailableFundsEffects } from './available-funds.effects';

describe('AvailableFundsEffects', () => {
    let actions: Observable<Action>;
    let effects: AvailableFundsEffects;
    let service: AvailableFundsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot(), HttpClientTestingModule],
            providers: [
                AvailableFundsEffects,
                provideMockActions(() => actions),
                provideMockStore(),
                {
                    provide: AvailableFundsService,
                    useValue: {
                        getRiskCategories: jest.fn(),
                        getAssetsClasses: jest.fn(),
                        getFundHouse: jest.fn(),
                    },
                },
            ],
        });

        service = TestBed.inject(AvailableFundsService);
        effects = TestBed.inject<AvailableFundsEffects>(AvailableFundsEffects);
    });

    describe('AvailableFundsEffects', () => {
        it('should work', async () => {
            expect(effects).toBeTruthy();
        });
    });

    describe('loadRiskCategories$', () => {
        it('Should load risk category list', () => {
            const action = AvailableFundsActions.loadRiskCategories();
            const riskCategories = mockRiskCategories;

            jest.spyOn(service, 'getRiskCategories').mockReturnValue(of(riskCategories));
            actions = hot('a', { a: action });

            effects.loadRiskCategories$.subscribe((result) => {
                expect(result).toEqual(
                    AvailableFundsActions.loadRiskCategoriesSuccess({ riskCategories }),
                );
            });
        });

        it('Should load risk category list failed', () => {
            const action = AvailableFundsActions.loadRiskCategories();
            const error: any = 'ERROR_MESSAGE';
            actions = hot('a', { a: action });

            effects.loadRiskCategories$.subscribe((result) => {
                expect(result).toEqual(AvailableFundsActions.loadRiskCategoriesFailure(error));
            });
        });
    });
    describe('loadAssetsClasses$', () => {
        it('Should load assets class list', () => {
            const action = AvailableFundsActions.loadAssetsClasses();
            const assetsClasses = mockAssetsClassesResponse;

            jest.spyOn(service, 'getAssetsClasses').mockReturnValue(of(assetsClasses));
            actions = hot('a', { a: action });

            effects.loadAssetsClasses$.subscribe((result) => {
                expect(result).toEqual(
                    AvailableFundsActions.loadAssetsClassesSuccess({ assetsClasses }),
                );
            });
        });

        it('Should load assets class list failed', () => {
            const action = AvailableFundsActions.loadAssetsClasses();
            const error: any = 'ERROR_MESSAGE';
            actions = hot('a', { a: action });

            effects.loadAssetsClasses$.subscribe((result) => {
                expect(result).toEqual(AvailableFundsActions.loadAssetsClassesFailure(error));
            });
        });
    });
    describe('loadFundHouse$', () => {
        it('Should load fund house list', () => {
            const action = AvailableFundsActions.loadFundHouse();
            const fundHouse = mockFundHouseResponse;

            jest.spyOn(service, 'getFundHouse').mockReturnValue(of(fundHouse));
            actions = hot('a', { a: action });

            effects.loadFundHouse$.subscribe((result) => {
                expect(result).toEqual(AvailableFundsActions.loadFundHouseSuccess({ fundHouse }));
            });
        });

        it('Should load fund house list failed', () => {
            const action = AvailableFundsActions.loadFundHouse();
            const error: any = 'ERROR_MESSAGE';
            actions = hot('a', { a: action });

            effects.loadFundHouse$.subscribe((result) => {
                expect(result).toEqual(AvailableFundsActions.loadFundHouseFailure(error));
            });
        });
    });
});
