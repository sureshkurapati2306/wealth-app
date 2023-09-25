import { TestBed } from '@angular/core/testing';
import * as PortfolioReducer from './portfolio-reco.reducer';
import * as PortfolioRecoSelectors from './portfolio-reco.selectors';
import { StoreModule } from '@ngrx/store';



const mockData: any = {
    holding_list : [
        {
            "name": "CASH",
            "classHexa": "#B3BE66",
            "y": 0
          },
          {
            "name": "FIXED INCOME",
            "classHexa": "#567DCC",
            "y": 0
          },
          {
            "name": "LOCAL EQUITY",
            "classHexa": "#5CD3CD",
            "y": 0
          },
          {
            "name": "REGIONAL EQUITY",
            "classHexa": "#955CD6",
            "y": 0
          },
          {
            "name": "GLOBAL EQUITY",
            "classHexa": "#D45DBA",
            "y": 0
          },
          {
            "name": "ALTERNATIVE",
            "classHexa": "#4FA14F",
            "y": 0
          }
    ],
    recommended_list: [
        {
            "name": "CASH",
            "classHexa": "#B3BE66",
            "y": 15
          },
          {
            "name": "FIXED INCOME",
            "classHexa": "#567DCC",
            "y": 50
          },
          {
            "name": "LOCAL EQUITY",
            "classHexa": "#5CD3CD",
            "y": 16
          },
          {
            "name": "REGIONAL EQUITY",
            "classHexa": "#955CD6",
            "y": 9
          },
          {
            "name": "GLOBAL EQUITY",
            "classHexa": "#D45DBA",
            "y": 9
          },
          {
            "name": "ALTERNATIVE",
            "classHexa": "#4FA14F",
            "y": 1
          }
    ],
    asset_class_list: [
        {
            "holding": "0.0",
            "asset_class_name": "Cash",
            "classHexa": "#B3BE66",
            "class_seq": 1,
            "recommended": "15.0"
          },
          {
            "holding": "0.0",
            "asset_class_name": "Fixed Income",
            "classHexa": "#567DCC",
            "class_seq": 2,
            "recommended": "50.0"
          },
          {
            "holding": "0.0",
            "asset_class_name": "Local Equity",
            "classHexa": "#5CD3CD",
            "class_seq": 3,
            "recommended": "16.0"
          },
          {
            "holding": "0.0",
            "asset_class_name": "Regional Equity",
            "classHexa": "#955CD6",
            "class_seq": 4,
            "recommended": "9.0"
          },
          {
            "holding": "0.0",
            "asset_class_name": "Global Equity",
            "classHexa": "#D45DBA",
            "class_seq": 5,
            "recommended": "9.0"
          },
          {
            "holding": "0.0",
            "asset_class_name": "Alternative",
            "classHexa": "#4FA14F",
            "class_seq": 6,
            "recommended": "1.0"
          }
    ],
    fund_list: [
        {
          "maximum_initial_subscription_amount_str": "999,999,999,999.00",
          "close_date": "17 Mar 2022",
          "three_month_ind": "EQUAL",
          "switch_indicator": "Y",
          "fund_document": [
              {
              "msId": 10728,
              "fundCode": "BHL17D",
              "msLink": "F000000AP0",
              "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=52&investmenttype=1",
              "isActive": "Y",
              "docId": 52,
              "startDate": "2021-10-31T00:00:00",
              "endDate": null,
              "createdBy": null,
              "modifiedBy": null,
              "createdDate": null,
              "documentName": "Fact sheet",
              "modifiedDate": "2021-12-31T16:40:01"
            }
          ],
          "fund_code": "BHL17D",
          "risk_rating": "2",
          "minimum_initial_subscription_amount": 2000,
          "maximum_subsequent_subscription_amount": 999999999999,
          "manager_code": "BHL",
          "sales_charge_staff": 0,
          "minimum_initial_subscription_amount_str": "2,000.00",
          "class_name": "FIXED INCOME",
          "min_holding": 1000,
          "minimum_subsequent_subscription_amount_str": "500.00",
          "current_holding": "N",
          "min_redem_amt": 500,
          "fund_status": "I",
          "class_seq": 2,
          "maximum_initial_subscription_amount": 999999999999,
          "fund_name": "Cimb Islamic Sukuk Fund",
          "one_month_ind": "EQUAL",
          "fund_indicator": "I",
          "manager_name": "Cimb-Principal Asset Management Berhad",
          "three_month": "0.00",
          "one_month": "0.00",
          "max_redem_amt": 999999999999,
          "fund_risk_rating": "N",
          "maximum_subsequent_subscription_amount_str": "999,999,999,999.00",
          "nav_price": 1.2863,
          "min_switch_amt": 500,
          "risk_name": "Defensive",
          "product_category": "FIX_ INCOME ",
          "minimum_subsequent_subscription_amount": 500,
          "sales_charge_nonstaff": 0
        }
    ]
}
const mockState: PortfolioReducer.State = {
    holdingList: mockData.holding_list,
    recommendedList: mockData.recommended_list,
    assetClassList: mockData.asset_class_list,
    fundList: mockData.fund_list,
    status: 'pending',
    error: '',
    portfolioData: {
        holdingList: mockData.holding_list,
        recommendedList: mockData.recommended_list,
        assetClassLst: mockData.asset_class_list, 
        fundList: mockData.fund_list,
    },
};

describe('Portfolio recommended Selector', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
    });
  });

  
  it('should select recommended list', () => {
    const result = PortfolioRecoSelectors.selectRecommendedList.projector(mockState);

    expect(result).toEqual(mockState.portfolioData.recommendedList);
  });
  it('should select holding list', () => {
    const result = PortfolioRecoSelectors.selectHoldingList.projector(mockState);

    expect(result).toEqual(mockState.portfolioData.holdingList);
  });
  it('should select asset class list', () => {
    const result = PortfolioRecoSelectors.selectAssetClassList.projector(mockState);

    expect(result).toEqual(mockState.portfolioData.assetClassLst);
  });

  it('should select fund list', () => {
    const result = PortfolioRecoSelectors.selectFundList.projector(mockState);

    expect(result).toEqual(mockState.portfolioData.fundList);
  });
});

