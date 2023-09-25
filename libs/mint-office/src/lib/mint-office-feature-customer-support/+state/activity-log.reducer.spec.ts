import { reducer, initialState, State } from './activity-log.reducer';
import * as Actions from './activity-log.actions';
import { CustomerActivityLog } from '../../core/models/customer-activity.model';

const mockData: CustomerActivityLog[] = [
  {
    "auditId": 733,
    "clientId": "NA",
    "mobileNo": "NA",
    "auditDate": "2022-01-24T00:06:10.000+00:00",
    "otp": "NA",
    "referenceNo": "1006043-01",
    "moduleName": "Risk Profile",
    "eventName": "Risk Profile with Audit",
    "channelName": "Web Browser",
    "statusInd": "S",
    "browserName": "Chrome",
    "osVersion": "Win10",
    "ipAddress": "12.1.2.1",
    "statusRemark": null
  },
  {
      "auditId": 739,
      "clientId": "NA",
      "mobileNo": "NA",
      "auditDate": "2022-01-25T00:03:42.000+00:00",
      "otp": "NA",
      "referenceNo": "NA",
      "moduleName": "Risk Profile",
      "eventName": "Risk Profile with Audit",
      "channelName": "Web Browser",
      "statusInd": "S",
      "browserName": "Chrome",
      "osVersion": "Win10",
      "ipAddress": "12.1.2.1",
      "statusRemark": null
  }
];

const mockState: State = {
  entities: mockData,
  hasSearched: false,
  searchQuery: {
    startDate: null,
    endDate: null,
    modules: [],
    channels: []
  },
  status: 'pending',
  error: ''
};

describe('ActivityLog Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

describe('loadActivityLogs action', () => {
  it('should start to load data from API', () => {
    const action = Actions.loadActivityLogs({
      searchParams: {
        startDate: null,
        endDate: null,
        modules: [],
        channels: []
      }
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('loading');
  });
});

describe('loadActivityLogsSuccess action', () => {
  it('should successfully load data from API', () => {
    const action = Actions.loadActivityLogsSuccess({
      data: mockState.entities
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('success');
    expect(result.entities).toEqual(mockState.entities);

  });
});

describe('loadActivityLogsFailure action', () => {
  it('should failed to load data from API', () => {
    const action = Actions.loadActivityLogsFailure({
      error: 'The error message'
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('error');
    expect(result.error).toEqual('The error message');

  });
});

describe('resetActivityLogs action', () => {
  it('should reset to initial state', () => {
    const action = Actions.resetActivityLogs();

    const result = reducer(initialState, action);

    expect(result.entities).toEqual([]);
    expect(result.status).toEqual('pending');
    expect(result.hasSearched).toBeFalsy();
    expect(result.error).toEqual('');
  });
});