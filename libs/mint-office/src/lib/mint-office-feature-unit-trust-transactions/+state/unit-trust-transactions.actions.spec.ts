import * as fromUnitTrustTransactions from './unit-trust-transactions.actions';

describe('loadUnitTrustTransactions', () => {
  it('should return an action', () => {
    expect(fromUnitTrustTransactions.loadUnitTrustTransactions({
      searchParams: {}
    }).type).toBe('[API] Load UnitTrustTransactions');
  });
});
