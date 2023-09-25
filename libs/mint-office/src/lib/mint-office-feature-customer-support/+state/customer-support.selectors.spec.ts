import * as fromCustomerSupport from './customer-support.reducer';
import { State } from './customer-support.reducer';
import * as Selectors from './customer-support.selectors';
import { selectCustomerSupportState } from './customer-support.selectors';

const mockState: State = {
  entities: [
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
  ],
  currentEntity: 1,
  hasSearched: false,
  searchQuery: {
    fullName: '',
    idNumber: '',
    cifNumber: ''
  },
  status: 'pending',
  error: ''
};

describe('CustomerSupport Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCustomerSupportState({
      [fromCustomerSupport.customerSupportFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select CS listing records', () => {
    const result = Selectors.selectCSRecords.projector(mockState);

    expect(result).toEqual(mockState.entities);
  });

  it('should select CS loading state', () => {
    const result = Selectors.selectLoadCSLoading.projector(mockState);

    expect(result).toEqual(mockState.status);
  });

  it('should select CS listing has searched', () => {
    const result = Selectors.selectCSHasSearched.projector(mockState);

    expect(result).toEqual(mockState.hasSearched);
  });

  it('should select CS listing search query', () => {
    const result = Selectors.selectCSSearchQuery.projector(mockState);

    expect(result).toEqual(mockState.searchQuery);
  });

  it('should select a single CS detail', () => {
    const result = Selectors.selectCustomerDetail.projector(mockState);

    expect(result).toEqual(mockState.entities[0]);
  });

});
