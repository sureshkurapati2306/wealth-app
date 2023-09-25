import * as fromUtActivity from './ut-activity.actions';

describe('loadUtActivity', () => {
  it('should return an action', () => {
    expect(fromUtActivity.loadUtActivity({
      referenceNo: 'ABC'
    }).type).toBe('[API] Load UtActivity');
  });
});
