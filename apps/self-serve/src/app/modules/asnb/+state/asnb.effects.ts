import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import {
    catchError,
    map,
    mergeMap,
    switchMap,
    takeUntil,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { AsnbService } from '../services/asnb.service';
import * as AsnbActions from './asnb.actions';
import * as CartActions from '../../../core/state/cart/cart.actions';
import { AppService } from '../../../core/services/app.service';
import { Router } from '@angular/router';

import * as fromStore from '../../../core/state/reducers';
import { AsnbCreateOrderRequest, AsnbSofSow, CommonDropDown } from '../models';
import {
    getCheckout,
    getEligibleFunds,
    getSofSowList,
    getOperationHourDetails,
    getExternalUrlList,
    getIdTypeList,
    getRelationshipList,
    getTransferReasonList,
    getASNBFundDetailsCondition,
} from './asnb.selectors';
import * as moment from 'moment';

import * as WealthDashboardActions from '../../../core/state/wealth-dashboard/wealth-dashboard.actions';

type ActionObservable<T extends Action> = Observable<T>;

@Injectable()
export class AsnbEffects {
    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AsnbActions.init),
            map(() => {
                // Your custom service 'load' logic goes here. For now just return a success action...
                return AsnbActions.loadAsnbSuccess({ asnb: [] });
            }),
        ),
    );

    //bank account
    loadCheckoutBankAccounts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadCheckoutBankAccount),
            withLatestFrom(
                this.store.select((state: any) => {
                    return state?.asnb?.checkout?.stageTableId;
                }),
            ),
            switchMap((stageTableId: any) => {
                return this.asnbService
                    .getCheckoutBankAccounts({ stageTableId: stageTableId[1] })
                    .pipe(
                        map((data: any) => {
                            return AsnbActions.loadCheckoutBankAccountSuccess({
                                checkoutBankAccount:
                                    data.accounts?.length > 0 ? data.accounts : data,
                            });
                        }),
                        catchError((error) =>
                            of(AsnbActions.loadCheckoutBankAccountFailure({ error })),
                        ),
                    );
            }),
        );
    });

    //cart purchase summary
    loadCheckoutPurchaseSummary$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadCheckoutPurchaseSummary),
            switchMap(() => {
                return this.asnbService.getCheckoutPurchaseSummary().pipe(
                    map((data: any) => {
                        return AsnbActions.loadCheckoutPurchaseSummarySuccess({
                            checkoutPurchaseSummary: data,
                        });
                    }),
                    catchError((error) =>
                        of(AsnbActions.loadCheckoutPurchaseSummaryFailure({ error })),
                    ),
                );
            }),
        );
    });

    //account details
    loadCheckoutAccountDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadCheckoutAccountDetails),
            switchMap(() => {
                return this.asnbService.getCheckoutAccountDetails().pipe(
                    map((data: any) => {
                        return AsnbActions.loadCheckoutAccountDetailsSuccess({
                            checkoutUserData: data,
                        });
                    }),
                    catchError((error) =>
                        of(AsnbActions.loadCheckoutAccountDetailsFailure({ error })),
                    ),
                );
            }),
        );
    });

    //Cart source details
    loadCheckoutSource$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadCheckoutSource),
            switchMap(() => {
                return this.asnbService.getCheckoutSourceDetails().pipe(
                    map((data: any) => {
                        return AsnbActions.loadCheckoutSourceSuccess({ checkoutSOWSOF: data });
                    }),
                    catchError((error) => of(AsnbActions.loadCheckoutSourceFailure({ error }))),
                );
            }),
        );
    });

    loadPastTxn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AsnbActions.loadPastTransaction),
            fetch({
                run: (action) => {
                    return this.asnbService.getPastTransaction(action.options).pipe(
                        map((response) => {
                            return AsnbActions.loadPastTransactionSuccess({
                                payload: { response, options: action.options },
                            });
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadPastTransactionFailure({ error });
                },
            }),
        ),
    );

    loadAsnbFundDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadAsnbFundDetails),
            withLatestFrom(this.store.select(getASNBFundDetailsCondition)),
            switchMap(([action, state]) => {
                if (state.fundTypesMap) {
                    return this.asnbService.getASNBFundListOwnAccount(action.options).pipe(
                        map((response: any) =>
                            AsnbActions.loadAsnbFundDetailsSuccess({
                                payload: {
                                    lookupRes: null, // Set lookupRes to null since it's already present in the store
                                    fundRes: response,
                                    allFunds: state.allFunds,
                                },
                            }),
                        ),
                        catchError((error) =>
                            of(AsnbActions.loadAsnbFundDetailsFailure({ error })),
                        ),
                    );
                } else {
                    return forkJoin([
                        this.asnbService.getASNBFundListLookup(),
                        this.asnbService.getASNBFundListOwnAccount(action.options),
                    ]).pipe(
                        map(([lookupRes, fundRes]) => {
                            return AsnbActions.loadAsnbFundDetailsSuccess({
                                payload: {
                                    lookupRes,
                                    fundRes,
                                    allFunds: lookupRes,
                                },
                            });
                        }),
                        catchError((error) => {
                            return of(AsnbActions.loadAsnbFundDetailsFailure({ error }));
                        }),
                    );
                }
            }),
        );
    });

    loadAsnbMinorFundDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AsnbActions.loadAsnbMinorFundDetails),
            fetch({
                run: (action) => {
                    return this.asnbService.getASNBFundListOwnAccount(action.options).pipe(
                        map((response: any) => {
                            return AsnbActions.loadAsnbMinorFundDetailsSuccess({
                                payload: {
                                    lookupRes: null, // Set lookupRes to null since it's already present in the store
                                    fundRes: response,
                                },
                            });
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadAsnbFundDetailsFailure({ error });
                },
            }),
        ),
    );

    loadUserRiskStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AsnbActions.loadUserRiskStatus),
            fetch({
                run: () => {
                    return this.asnbService.getUserRiskStatus().pipe(
                        map((response: any) => {
                            return AsnbActions.loadUserRiskStatusSuccess({
                                payload: response,
                            });
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadUserRiskStatusFailure({ error });
                },
            }),
        ),
    );

    createOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AsnbActions.createOrder),
            withLatestFrom(this.store),
            fetch({
                run: (action) => {
                    const {
                        guardianDetails,
                        minorDetails,
                        favouriteDetails,
                        amount,
                        fundId,
                        sof,
                        sow,
                        investmentType,
                    } = action.payload;

                    const formatCreateOrderRequest: AsnbCreateOrderRequest = {
                        guardianDetails,
                        amount,
                        fundId,
                        investmentType,
                    };

                    if (minorDetails && !favouriteDetails) {
                        formatCreateOrderRequest.minorDetails = minorDetails;
                    }

                    if (favouriteDetails) {
                        formatCreateOrderRequest.favouriteDetails = (({
                            reasonOfTransferValue,
                            ...newFavDetails
                        }) => newFavDetails)(favouriteDetails);
                    }

                    if (sof) {
                        formatCreateOrderRequest.sof = sof.id === 'OTH' ? sof.value : sof.id;
                    }

                    if (sow) {
                        formatCreateOrderRequest.sow = sow.id === 'OTH' ? sow.value : sow.id;
                    }

                    this.appService.showLoadingSpinner();
                    return this.asnbService.createOrder(formatCreateOrderRequest).pipe(
                        map((response) => {
                            return AsnbActions.createOrderSuccess({
                                payload: {
                                    ...action.payload,
                                    ...response,
                                },
                            });
                        }),
                        tap(() => {
                            this.appService.hideLoadingSpinner();
                            this.router.navigate(['/asnb-dashboard/asnb-checkout']);
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.createOrderFailure({ error });
                },
            }),
        ),
    );

    createSubsciption$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AsnbActions.createSubscription),
            withLatestFrom(this.store.select(getCheckout)),
            fetch({
                run: (action, state) => {
                    this.appService.showLoadingSpinner();
                    return this.asnbService.createSubscription(action.payload).pipe(
                        map((response) => {
                            if (response.error) {
                                //Scroll to otp section in checkout paage
                                const element = document.getElementById('view-prospectus');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                                return AsnbActions.loadCheckoutOTPFailure({ otpError: response });
                            }
                            this.store.dispatch(
                                AsnbActions.createSubscriptionSuccess({
                                    payload: {
                                        ...state,
                                        ...action.payload,
                                        ...response.data,
                                        amount:
                                            state.fundType === 'fixed price'
                                                ? state.amount
                                                : response.data.netInvestment,
                                        total:
                                            state.fundType === 'fixed price'
                                                ? state.total
                                                : response.data.totalInvestment,
                                        salesChargePercentage: response.data.feePct,
                                    },
                                }),
                            );

                            // update asnb last update time
                            this.store.dispatch(
                                WealthDashboardActions.updateLastUpdateTime({
                                    timestamp: response.data.timeStamp,
                                }),
                            );

                            return new CartActions.StoreTransaction({
                                referenceNumber: response.data.transactionId,
                                transactionType: state.minorDetails
                                    ? 'Purchase for other'
                                    : 'Purchase',
                                dateTime: response.data.timeStamp,
                                fundName: state.fundName,
                                transactionStatusName:
                                    response.data.transactionStatus === '000'
                                        ? 'Successful'
                                        : 'Unsuccessful',
                                payableAmount: state.total,
                                transactionCode: '01',
                                transactionDt: moment(response.data.timeStamp)
                                    .utcOffset('+0800')
                                    .format('DD MMM YYYY'),
                                transactionTmSs: moment(response.data.timeStamp)
                                    .utcOffset('+0800')
                                    .format('hh:mm A'),
                                purchaseType: 'ASNB',
                            });
                        }),
                        tap((res: any) => {
                            this.appService.hideLoadingSpinner();
                            if (!res.otpError) {
                                this.router.navigate(['/asnb-dashboard/purchase-summary']);
                            }
                        }),
                    );
                },
                onError: (_, error) => {
                    this.store.dispatch(AsnbActions.createSubscriptionFailure({ error }));
                },
            }),
        ),
    );

    loadTransactionLimit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AsnbActions.loadTransactionLimit),
            fetch({
                run: () => {
                    return this.asnbService.getTransactionLimit().pipe(
                        map((response) => {
                            return AsnbActions.loadTransactionLimitSuccess({
                                payload: response,
                            });
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadTransactionLimitFailure({ error });
                },
            }),
        ),
    );

    fetchDashboardInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                AsnbActions.fetchDashboardInfoOwnAccount,
                AsnbActions.fetchDashboardInfoMinorAccount,
                AsnbActions.updateDashboardInfoOwnAccount,
                AsnbActions.updateDashboardInfoMinorAccount,
                AsnbActions.updateDashboardInfoFavouriteList,
            ),
            mergeMap((action) => {
                this.appService.showLoadingSpinner();

                const actionObservables: ActionObservable<Action>[] = [];

                if (
                    action.type === AsnbActions.fetchDashboardInfoOwnAccount.type ||
                    action.type === AsnbActions.updateDashboardInfoOwnAccount.type
                ) {
                    actionObservables.push(
                        this.actions$.pipe(
                            ofType(AsnbActions.loadAsnbFundDetailsSuccess),
                            takeUntil(
                                this.actions$.pipe(ofType(AsnbActions.fetchDashboardInfoSuccess)),
                            ),
                        ),
                    );
                } else if (
                    action.type === AsnbActions.fetchDashboardInfoMinorAccount.type ||
                    action.type === AsnbActions.updateDashboardInfoMinorAccount.type
                ) {
                    actionObservables.push(
                        this.actions$.pipe(
                            ofType(AsnbActions.loadAsnbMinorFundDetailsSuccess),
                            takeUntil(
                                this.actions$.pipe(ofType(AsnbActions.fetchDashboardInfoSuccess)),
                            ),
                        ),
                    );
                } else if (action.type === AsnbActions.updateDashboardInfoFavouriteList.type) {
                    actionObservables.push(
                        this.actions$.pipe(
                            ofType(AsnbActions.loadFavouriteListSuccess),
                            takeUntil(
                                this.actions$.pipe(ofType(AsnbActions.fetchDashboardInfoSuccess)),
                            ),
                        ),
                    );
                }

                if (
                    action.type === AsnbActions.fetchDashboardInfoOwnAccount.type ||
                    action.type === AsnbActions.fetchDashboardInfoMinorAccount.type
                ) {
                    actionObservables.push(
                        ...[
                            this.actions$.pipe(
                                ofType(AsnbActions.loadUserRiskStatusSuccess),
                                takeUntil(
                                    this.actions$.pipe(
                                        ofType(AsnbActions.fetchDashboardInfoSuccess),
                                    ),
                                ),
                            ),
                            this.actions$.pipe(
                                ofType(AsnbActions.loadTransactionLimitSuccess),
                                takeUntil(
                                    this.actions$.pipe(
                                        ofType(AsnbActions.fetchDashboardInfoSuccess),
                                    ),
                                ),
                            ),
                            this.actions$.pipe(
                                ofType(AsnbActions.loadScheduledMaintenanceSuccess),
                                takeUntil(
                                    this.actions$.pipe(
                                        ofType(AsnbActions.fetchDashboardInfoSuccess),
                                    ),
                                ),
                            ),
                            this.actions$.pipe(
                                ofType(AsnbActions.loadFavouriteListSuccess),
                                takeUntil(
                                    this.actions$.pipe(
                                        ofType(AsnbActions.fetchDashboardInfoSuccess),
                                    ),
                                ),
                            ),
                        ],
                    );
                }

                return combineLatest(actionObservables).pipe(
                    map(() => {
                        // Hide the loading spinner
                        this.appService.hideLoadingSpinner();
                        return AsnbActions.fetchDashboardInfoSuccess();
                    }),
                );
            }),
        );
    });

    //Scheduled Maintenance
    fetchScheduledMaintenance$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadScheduledMaintenance),
            fetch({
                run: () => {
                    return this.asnbService.getASNBScheduledMaintenance().pipe(
                        map((response) => {
                            return AsnbActions.loadScheduledMaintenanceSuccess({
                                payload: response,
                            });
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadScheduledMaintenanceFailure({ error });
                },
            }),
        );
    });

    loadSofSowList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadSofSowList),
            withLatestFrom(this.store.select(getSofSowList)),
            switchMap(() => {
                return this.asnbService.getSourceOfWealthAndFunds().pipe(
                    map((data) => {
                        const payload: AsnbSofSow[] = data.SOURCEOFFUND.map((item) => ({
                            id: item.paramValue,
                            value: item.paramText,
                        }));
                        return AsnbActions.loadSofSowListSuccess({ payload });
                    }),
                    catchError((error) => of(AsnbActions.loadSofSowListFailure({ error }))),
                );
            }),
        );
    });

    //Eligible Funds
    fetchElibleFunds$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadEligibleFunds),
            withLatestFrom(this.store.select(getEligibleFunds)),
            fetch({
                run: (action) => {
                    this.appService.showLoadingSpinner();
                    return this.asnbService.getEligibleFunds(action.payload).pipe(
                        map((response) => {
                            return AsnbActions.loadEligibleFundsSuccess({
                                payload: response,
                            });
                        }),
                        tap(() => {
                            this.appService.hideLoadingSpinner();
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadEligibleFundsFailure({ error });
                },
            }),
        );
    });

    loadOperationHourDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadOperationHourDetails),
            withLatestFrom(this.store.select(getOperationHourDetails)),
            fetch({
                run: () => {
                    return this.asnbService.getOperationHourDetails().pipe(
                        map((response: any) => {
                            return AsnbActions.loadOperationHourDetailsSuccess({
                                payload: response,
                            });
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadOperationHourDetailsFailure({ error });
                },
            }),
        );
    });

    loadExternalUrlList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadExternalUrlList),
            withLatestFrom(this.store.select(getExternalUrlList)),
            fetch({
                run: () => {
                    return this.asnbService.getExternalUrlList().pipe(
                        map((response) => {
                            const payload = response.reduce((acc, item) => {
                                if (item.urlCode === '1')
                                    return { ...acc, fundPrice: item.urlDesc };
                                else if (item.urlCode === '2')
                                    return { ...acc, prospectus: item.urlDesc };
                                else return acc;
                            }, {});
                            return AsnbActions.loadExternalUrlListSuccess({ payload });
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadExternalUrlListFailure({ error });
                },
            }),
        );
    });

    loadIdTypeList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadIdTypeList),
            withLatestFrom(this.store.select(getIdTypeList)),
            fetch({
                run: () => {
                    return this.asnbService.getIdTypeList().pipe(
                        map((response) => {
                            const payload = response.map((item) => ({
                                id: item.idType,
                                value: item.description,
                            }));
                            return AsnbActions.loadIdTypeListSuccess({ payload });
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadIdTypeListFailure({ error });
                },
            }),
        );
    });

    loadRelationshipList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadRelationshipList),
            withLatestFrom(this.store.select(getRelationshipList)),
            fetch({
                run: () => {
                    return this.asnbService.getRelationshipList().pipe(
                        map((response) => {
                            const payload = response.THIRDPARTYRELATIONSHIP.map((item) => ({
                                id: item.paramText,
                                value: item.paramText,
                            }));
                            return AsnbActions.loadRelationshipListSuccess({ payload });
                        }),
                    );
                },
                onError: (_, error) => {
                    return AsnbActions.loadRelationshipListFailure({ error });
                },
            }),
        );
    });

    loadTransferReasonList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbActions.loadTransferReasonList),
            withLatestFrom(this.store.select(getTransferReasonList)),
            switchMap(() => {
                return this.asnbService.getTransferReasons().pipe(
                    map((data) => {
                        const payload: CommonDropDown[] = data.REASONFORTRANSFER.map((item) => ({
                            id: item.paramValue,
                            value: item.paramText,
                        }));
                        return AsnbActions.loadTransferReasonListSuccess({ payload });
                    }),
                    catchError((error) => of(AsnbActions.loadTransferReasonListFailure({ error }))),
                );
            }),
        );
    });

    constructor(
        private store: Store<fromStore.AppState>,
        private readonly actions$: Actions,
        private asnbService: AsnbService,
        private appService: AppService,
        private router: Router,
    ) {}
}
