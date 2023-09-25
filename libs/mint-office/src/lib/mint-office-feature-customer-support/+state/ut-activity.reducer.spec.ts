import { reducer, initialState, State } from './ut-activity.reducer';
import * as Actions from './ut-activity.actions';
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

describe('UtActivity Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

describe('loadUtActivity action', () => {
  it('should start to load data from API', () => {
    const action = Actions.loadUtActivity({
      referenceNo: 'ABC'
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('loading');
  });
});

describe('loadUtActivitySuccess action', () => {
  it('should successfully load data from API', () => {
    const action = Actions.loadUtActivitySuccess({
      data: mockState.currentEntity
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('success');
    expect(result.currentEntity).toEqual(mockState.currentEntity);

  });
});

describe('loadUtActivityFailure action', () => {
  it('should failed to load data from API', () => {
    const action = Actions.loadUtActivityFailure({
      error: 'The error message'
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('error');
    expect(result.error).toEqual('The error message');

  });
});