import * as fromAsnbReport from './asnb-report.reducer';
import { selectAsnbReportState } from './asnb-report.selectors';

describe('AsnbReport Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAsnbReportState({
      [fromAsnbReport.asnbReportFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
