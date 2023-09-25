import * as fromSmsDeliveryLog from './sms-delivery-log.reducer';
import * as Selectors from './sms-delivery-log.selectors';
import { selectSmsTransactionsState } from './sms-delivery-log.selectors';

const mockState: fromSmsDeliveryLog.State = {
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

describe('SMS Delivery Log Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSmsTransactionsState({
      [fromSmsDeliveryLog.smsDeliveryFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select SMS Purchasing transactions', () => {
    const result = Selectors.selectSmsPurchasingTransactions.projector(mockState);

    expect(result).toEqual([mockState.entities[0]]);
  });

  it('should select SMS Redemption transactions', () => {
    const result = Selectors.selectSmsRedemptionTransactions.projector(mockState);

    expect(result).toEqual([mockState.entities[1]]);
  });

  it('should select SMS Switching transactions', () => {
    const result = Selectors.selectSmsSwitchingTransactions.projector(mockState);

    expect(result).toEqual([mockState.entities[2]]);
  });

  it('should select SMS listing has searched', () => {
    const result = Selectors.selectUTHasSearched.projector(mockState);

    expect(result).toEqual(mockState.hasSearched);
  });

  
  it('should select SMS loading state', () => {
    const result = Selectors.selectLoadSmsLoading.projector(mockState);

    expect(result).toEqual(mockState.status);
  });



});
