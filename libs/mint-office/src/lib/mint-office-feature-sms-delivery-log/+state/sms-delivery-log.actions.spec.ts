import * as fromSmsTransactions from './sms-delivery-log.actions';

describe('loadSmsTransactions', () => {
  it('should return an action', () => {
    expect(fromSmsTransactions.loadSmsTransactions({
      searchParams: {}
    }).type).toBe('[API] Load smsTransactions');
  });
});
