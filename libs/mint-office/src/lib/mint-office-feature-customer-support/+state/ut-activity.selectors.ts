import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUtActivity from './ut-activity.reducer';

export const selectUtActivityState = createFeatureSelector<fromUtActivity.State>(
  fromUtActivity.utActivityFeatureKey
);

export const selectUtActivityRecord = (referenceNo: string) => createSelector(
  selectUtActivityState,
  state => {

    if(state.currentEntity.length) {
      if(state.currentEntity[0].referenceNo === referenceNo) {
        return state.currentEntity
      }
    }

    return null;

  }
);

export const selectSMSDeliveryLogRecord = () => createSelector(
  selectUtActivityState,
  state => {
    if(state.currentSMSDeliveryLog) {
      return state.currentSMSDeliveryLog
    } else {
      return null;
    }
  }
);

export const selectLoadUtActivityLoading = createSelector(
  selectUtActivityState,
  state => {
    return state.status;
  }
);