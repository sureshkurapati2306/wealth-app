import { reducer, initialState, State } from './customer-support.reducer';
import * as Actions from './customer-support.actions';
import { Customer } from '../../core/models/customer.model';

const mockData: Customer[] = [
  {
    "pfId": 1,
    "utAccountNo": "A80111457",
    "accountName": "XXXXXXT MILLIO",
    "jointIndicator": "01",
    "accountStatus": "A",
    "cifNumber": "A80111457",
    "clientIdType": "NEWIC",
    "clientId": "750702105695",
    "authorisedSignatories": ""
  }
];

const mockState: State = {
  entities: mockData,
  currentEntity: null,
  hasSearched: false,
  searchQuery: {
    fullName: '',
    idNumber: '',
    cifNumber: ''
  },
  status: 'pending',
  error: ''
};

describe('CustomerSupport Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

describe('loadCustomerSupports action', () => {
  it('should start to load data from API', () => {
    const action = Actions.loadCustomerSupports({
      searchParams: {
        fullName: 'John'
      }
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('loading');
  });
});

describe('loadCustomerSupportsSuccess action', () => {
  it('should successfully load data from API', () => {
    const action = Actions.loadCustomerSupportsSuccess({
      data: mockState.entities
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('success');
    expect(result.entities).toEqual(mockState.entities);

  });
});

describe('loadCustomerSupportsFailure action', () => {
  it('should failed to load data from API', () => {
    const action = Actions.loadCustomerSupportsFailure({
      error: 'The error message'
    });

    const result = reducer(initialState, action);

    expect(result.status).toEqual('error');
    expect(result.error).toEqual('The error message');

  });
});

describe('loadCustomerDetail action', () => {
  it('should set the currentEntity property to the provided pfId', () => {
    const action = Actions.loadCustomerDetail({
      pfId: 1
    });

    const result = reducer(initialState, action);

    expect(result.currentEntity).toEqual(1);
  });
});

describe('resetCustomerSupportState action', () => {
  it('should reset the state', () => {
    const action = Actions.resetCustomerSupportState();

    const result = reducer(initialState, action);

    expect(result).toEqual(initialState);
  });
});