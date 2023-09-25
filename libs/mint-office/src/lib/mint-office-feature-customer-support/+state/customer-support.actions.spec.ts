import * as fromCustomerSupport from './customer-support.actions';

describe('loadCustomerSupports', () => {
  it('should return an action', () => {
    expect(fromCustomerSupport.loadCustomerSupports({
      searchParams: {}
    }).type).toBe('[API] Load CustomerSupports');
  });
});
