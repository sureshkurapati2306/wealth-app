import * as fromWealthDashboard from './wealth-dashboard.actions';

describe('loadAccountSummary', () => {
  it('should return an action', () => {
    expect(fromWealthDashboard.loadAccountSummary({
      data: {
        "bankId":"",
        "branchId":"",
        "govIssueIdentType":"New IC"
      }
    }).type).toBe('[API] Load Account Summary');
  });

  it('should return an action', () => {
    expect(fromWealthDashboard.riskProfileEnquiry({
      data: {
        "custName": "CEFRR ESOTVU EUM LPLCUU",
        "custIdType": "",
        "custIdIssue": ""
    }
    }).type).toBe('[API] Load Risk Profile Enquiry Data');
  });
  
});
