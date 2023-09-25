import { reducer, initialState, State } from './sms-delivery-log.reducer';
import * as Actions from './sms-delivery-log.actions';

const mockState: State = {
  entities: [
    {
      "id": 0,
      "contactNumber": "01114300869",
      "utAccountNo": "A80120396",
      "clientId": "500211507504",
      "smsContent": "Unit Trust purchase request Ref 7000802 of RM 10,000.00 from account ending 0396 is received for processing on 01 Aug 2022.",
      "category": "01",
      "smsDeliveryStatus": "SMS delivery successful",
      "deliveryDateTime": "2022-08-01T16:36:49"
    },
    {
      "id": 0,
      "contactNumber": "01160939796",
      "utAccountNo": "A80111431",
      "clientId": "880318145905",
      "smsContent": "Unit Trust purchase request Ref 7000803 of RM 2.00 from account ending 1431 is received for processing on 02 Aug 2022.",
      "category": "01",
      "smsDeliveryStatus": "SMS delivery successful",
      "deliveryDateTime": "2022-08-02T14:42:06"
    },
    {
      "id": 0,
      "contactNumber": "01160939796",
      "utAccountNo": "A80111431",
      "clientId": "880318145905",
      "smsContent": "Unit Trust redemption request Ref 7000804 of 1,050.00 units from account ending 1431 is received for processing on 02 Aug 2022.",
      "category": "02",
      "smsDeliveryStatus": "SMS delivery successful",
      "deliveryDateTime": "2022-08-02T14:55:19"
    }
  ],
  currentEntity: 1,
  hasSearched: false,
  searchQuery: {
    status: 'All'
  },
  status: 'pending',
  error: '',
  selectedEntity: null
};

describe('SMS delivery log Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

describe('loadSmsTransactions action', () => {
  it('should start to load data from API', () => {
    const action = Actions.loadSmsTransactions({
      searchParams: {
        status: 'All'
      }
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('loading');
  });
});

describe('loadSmsTransactionsSuccess action', () => {
  it('should successfully load data from API', () => {
    const action = Actions.loadSmsTransactionsSuccess({
      data: mockState.entities
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('success');
    expect(result.entities).toEqual(mockState.entities);

  });
});

describe('loadSmsTransactionsFailure action', () => {
  it('should failed to load data from API', () => {
    const action = Actions.loadSmsTransactionsFailure({
      error: 'The error message'
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('error');
    expect(result.error).toEqual('The error message');

  });
});

describe('resetSMS delivery log action', () => {
  it('should reset the state', () => {
    const action = Actions.resetSmsDelivery();

    const result = reducer(initialState, action);

    expect(result).toEqual(initialState);
  });
});
