import * as fromUtActivity from './ut-activity.reducer';
import { State } from './ut-activity.reducer';
import * as Selectors from './ut-activity.selectors';
import { selectUtActivityState } from './ut-activity.selectors';
import { UnitTrustActivity } from '../../core/models/customer-activity.model';

const mockData: UnitTrustActivity[] = [{
  "referenceNo": "7000030-01",
  "utAccountNo": "A80091526",
  "fundName": "AMITTIKAL",
  "chargesAmount": 5.00,
  "totalInvestment": 500.00,
  "toFundName": "",
  "transactionUnit": 1000.500000
}];

const mockState: State = {
  referenceNo: null,
  currentEntity: mockData,
  status: 'pending',
  error: ''
};

describe('UtActivity Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUtActivityState({
      [fromUtActivity.utActivityFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select UT activity record', () => {
    const result = Selectors.selectUtActivityRecord('7000030-01').projector(mockState);

    expect(result).toEqual(mockState.currentEntity);
  });

  it('should select UT activity record invalid referenceNo', () => {
    const result = Selectors.selectUtActivityRecord('xxx').projector(mockState);

    expect(result).toBeNull();
  });

  it('should select UT activity record blank state', () => {
    const result = Selectors.selectUtActivityRecord('xxx').projector({
      ...mockState,
      currentEntity: []
    });

    expect(result).toBeNull();
  });

  it('should select UT activity loading state', () => {
    const result = Selectors.selectLoadUtActivityLoading.projector(mockState);

    expect(result).toEqual(mockState.status);
  });

});
