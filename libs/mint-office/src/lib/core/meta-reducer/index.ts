import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../../../../apps/wealth-backoffice/src/environments/environment';
import *  as BatchFileSchedulerReducers from '../../mint-office-feature-batch-file-scheduler/+state/batch-file-scheduler.reducer'
import *  as UnitTrustTransactionReducers from '../../mint-office-feature-unit-trust-transactions/+state/unit-trust-transactions.reducer';
import *  as SMSDeliveryLogReducers from '../../mint-office-feature-sms-delivery-log/+state/sms-delivery-log.reducer';

export const storeFeatureKey = 'store';

export interface AppState {
  batchFileScheduler: BatchFileSchedulerReducers.State,
  unitTrustTransactions: UnitTrustTransactionReducers.State,
  smsDeliveryLogs: SMSDeliveryLogReducers.State
}

export const appReducer: ActionReducerMap<AppState> = {
  batchFileScheduler: BatchFileSchedulerReducers.reducer,
  unitTrustTransactions: UnitTrustTransactionReducers.reducer,
  smsDeliveryLogs: SMSDeliveryLogReducers.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
