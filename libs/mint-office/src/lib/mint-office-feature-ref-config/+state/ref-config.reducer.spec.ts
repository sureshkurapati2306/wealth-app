import { reducer, initialState, State } from './ref-config.reducer';
import * as Actions from './ref-config.actions';

const mockState: State = {
  entities: [
    {
      "processingStatusDate": null,
      "rejectedName": null,
      "rejectedDate": null,
      "rejectedRemark": null,
      "cifNumber": null,
      "accountStatus": null,
      "jointIndicator": null,
      "mobileNo": null,
      "indicativeCharges": null,
      "fileStatusDate": null,
      "fileStatus": null,
      "transactionStatusDate": "2021-12-22T09:51:09.000+00:00",
      "transactionStatus": "Cancelled",
      "transactionUnit": 100.200000,
      "paymentTo": "",
      "contactNo": "0122176370",
      "fdAccountNo": "",
      "einvestsmart": "0",
      "staffIndicator": "2",
      "userId": "",
      "payableAmount": 0.00,
      "taxAmount": 0.00,
      "taxRate": 0.000000,
      "taxCode": "",
      "taxId": 0,
      "netInvestment": 4.96,
      "totalInvestment": 5.00,
      "chargesAmount": 0.01,
      "chargesPercentage": 0.007520,
      "chargeId": 10,
      "utAccountNo": "A80111457",
      "toFundName": "",
      "toFundCode": "",
      "fundName": "CIMB-PRINCIPAL STRATEGIC INCOME BOND FUND",
      "fundCode": "CBT39D",
      "settlementAccount": "8001041503",
      "icNumber": "750702105695",
      "seqNo": 1,
      "clientId": "750702105695",
      "clientName": "XXXXXXT MILLIO",
      "transactionType": "01",
      "transactionDatetime": "2021-12-22T09:51:09.000+00:00",
      "referenceNo": "1-1",
      "transId": 1,
      "auditId": 2,
      "auditDate": "2021-12-16T09:30:42.000+00:00",
      "otp": "NA",
      "moduleName": "Logout",
      "eventName": "Logout And Audit",
      "channelName": "Web Browser",
      "statusInd": "S",
      "browserName": "Chrome",
      "osVersion": "Win10",
      "ipAddress": "12.1.2.1",
      "statusRemark": null,
      "riskRatingInd": "",
      "documentInd": ""
    },
    {
      "processingStatusDate": null,
      "rejectedName": null,
      "rejectedDate": null,
      "rejectedRemark": null,
      "cifNumber": null,
      "accountStatus": null,
      "jointIndicator": null,
      "mobileNo": null,
      "indicativeCharges": null,
      "fileStatusDate": null,
      "fileStatus": null,
      "transactionStatusDate": "2021-12-22T09:51:09.000+00:00",
      "transactionStatus": "Processing",
      "transactionUnit": 100.200000,
      "paymentTo": "",
      "contactNo": "0122176370",
      "fdAccountNo": "",
      "einvestsmart": "0",
      "staffIndicator": "2",
      "userId": "",
      "payableAmount": 0.00,
      "taxAmount": 0.00,
      "taxRate": 0.000000,
      "taxCode": "",
      "taxId": 0,
      "netInvestment": 4.96,
      "totalInvestment": 5.00,
      "chargesAmount": 0.01,
      "chargesPercentage": 0.007520,
      "chargeId": 10,
      "utAccountNo": "A80111457",
      "toFundName": "",
      "toFundCode": "",
      "fundName": "CIMB-PRINCIPAL STRATEGIC INCOME BOND FUND",
      "fundCode": "CBT39D",
      "settlementAccount": "8001041503",
      "icNumber": "750702105695",
      "seqNo": 1,
      "clientId": "750702105695",
      "clientName": "XXXXXXT MILLIO",
      "transactionType": "02",
      "transactionDatetime": "2021-12-22T09:51:09.000+00:00",
      "referenceNo": "1-1",
      "transId": 2,
      "auditId": 1,
      "auditDate": "2021-12-16T03:57:11.000+00:00",
      "otp": "NA",
      "moduleName": "Logout",
      "eventName": "Logout And Audit",
      "channelName": "Web Browser",
      "statusInd": "S",
      "browserName": "Chrome",
      "osVersion": "Win10",
      "ipAddress": "12.1.2.1",
      "statusRemark": null,
      "riskRatingInd": "",
      "documentInd": ""
    },
    {
      "processingStatusDate": null,
      "rejectedName": null,
      "rejectedDate": null,
      "rejectedRemark": null,
      "cifNumber": null,
      "accountStatus": null,
      "jointIndicator": null,
      "mobileNo": null,
      "indicativeCharges": null,
      "fileStatusDate": null,
      "fileStatus": null,
      "transactionStatusDate": "2021-12-22T09:51:09.000+00:00",
      "transactionStatus": "Successful",
      "transactionUnit": 100.200000,
      "paymentTo": "",
      "contactNo": "0122176370",
      "fdAccountNo": "",
      "einvestsmart": "0",
      "staffIndicator": "2",
      "userId": "",
      "payableAmount": 0.00,
      "taxAmount": 0.00,
      "taxRate": 0.000000,
      "taxCode": "",
      "taxId": 0,
      "netInvestment": 4.96,
      "totalInvestment": 5.00,
      "chargesAmount": 0.01,
      "chargesPercentage": 0.007520,
      "chargeId": 10,
      "utAccountNo": "A80111457",
      "toFundName": "",
      "toFundCode": "",
      "fundName": "CIMB-PRINCIPAL STRATEGIC INCOME BOND FUND",
      "fundCode": "CBT39D",
      "settlementAccount": "8001041503",
      "icNumber": "750702105695",
      "seqNo": 1,
      "clientId": "750702105695",
      "clientName": "XXXXXXT MILLIO",
      "transactionType": "03",
      "transactionDatetime": "2021-12-22T09:51:09.000+00:00",
      "referenceNo": "1-1",
      "transId": 3,
      "auditId": 1,
      "auditDate": "2021-12-16T03:57:11.000+00:00",
      "otp": "NA",
      "moduleName": "Logout",
      "eventName": "Logout And Audit",
      "channelName": "Web Browser",
      "statusInd": "S",
      "browserName": "Chrome",
      "osVersion": "Win10",
      "ipAddress": "12.1.2.1",
      "statusRemark": null,
      "riskRatingInd": "",
      "documentInd": ""
    }
  ],
  currentEntity: 1,
  error: '',
  selectedItem: undefined
};

describe('UnitTrustTransactions Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});


describe('loadUnitTrustTransactionsSuccess action', () => {
  it('should successfully load data from API', () => {
    const action = Actions.loadRefConfigSuccess({
      data: mockState.entities
    });

    const result = reducer(initialState, action);
    expect(result.entities).toEqual(mockState.entities);

  });
});

describe('loadUnitTrustTransactionsFailure action', () => {
  it('should failed to load data from API', () => {
    const action = Actions.loadUnitTrustTransactionsFailure({
      error: 'The error message'
    });

    const result = reducer(initialState, action);
    expect(result.error).toEqual('The error message');

  });
});

describe('loadUnitTrustTransactionDetail action', () => {
  it('should set the currentEntity property to the provided transId', () => {
    const action = Actions.loadUnitTrustTransactionDetail({
      transId: 1
    });

    const result = reducer(initialState, action);

    expect(result.currentEntity).toEqual(1);
  });
});

