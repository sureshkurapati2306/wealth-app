import * as fromRefConfig from './ref-config.actions';

describe('loadRefConfig', () => {
  it('should return an action', () => {
    expect(fromRefConfig.loadRefConfig().type).toBe('[API] Load RefConfig');
  });
});
