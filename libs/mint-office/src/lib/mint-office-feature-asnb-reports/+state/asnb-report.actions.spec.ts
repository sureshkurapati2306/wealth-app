import * as fromAsnbReport from './asnb-report.actions';

describe('loadAsnbReports', () => {
  it('should return an action', () => {
    expect(fromAsnbReport.loadAsnbReports().type).toBe('[AsnbReport] Load AsnbReports');
  });
});
