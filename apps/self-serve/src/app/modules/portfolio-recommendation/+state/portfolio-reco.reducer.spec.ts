
import * as PortfolioRecoActions from './portfolio-reco.actions';
import { State, initialState, reducer } from './portfolio-reco.reducer';

const mockData: State = {
    holdingList :  {
        "name": "CASH",
        "classHexa": "#B3BE66",
        "y": '0'
    },
    recommendedList: {
        "name": "CASH",
        "classHexa": "#B3BE66",
        "y": '15'
    },
    assetClassList: [
        {
            "holding": "0.0",
            "asset_class_name": "Cash",
            "classHexa": "#B3BE66",
            "class_seq": 1,
            "recommended": "15.0"
        }
    ],
    fundList: [
        {
            "maximum_initial_subscription_amount_str": "999,999,999,999.00",
            "close_date": "17 Mar 2022",
            "three_month_ind": "DOWN",
            "switch_indicator": "Y",
            "fund_document": [
              {
                "msId": 10724,
                "fundCode": "BHL17D",
                "msLink": "F000000AP0",
                "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=1&investmenttype=1",
                "isActive": "Y",
                "docId": 1,
                "startDate": "2021-07-01T00:00:00",
                "endDate": null,
                "createdBy": null,
                "modifiedBy": null,
                "createdDate": null,
                "documentName": "Master Prospectus",
                "modifiedDate": "2021-12-31T16:40:01"
              },
              {
                "msId": 10725,
                "fundCode": "BHL17D",
                "msLink": "F000000AP0",
                "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=77&investmenttype=1",
                "isActive": "Y",
                "docId": 77,
                "startDate": "2021-07-01T00:00:00",
                "endDate": null,
                "createdBy": null,
                "modifiedBy": null,
                "createdDate": null,
                "documentName": "Product Highlight Sheet",
                "modifiedDate": "2021-12-31T16:40:01"
              },
              {
                "msId": 10726,
                "fundCode": "BHL17D",
                "msLink": "F000000AP0",
                "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=4&investmenttype=1",
                "isActive": "Y",
                "docId": 4,
                "startDate": "2021-08-31T00:00:00",
                "endDate": null,
                "createdBy": null,
                "modifiedBy": null,
                "createdDate": null,
                "documentName": "Annual Report",
                "modifiedDate": "2021-12-31T16:40:01"
              },
              {
                "msId": 10727,
                "fundCode": "BHL17D",
                "msLink": "F000000AP0",
                "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=5&investmenttype=1",
                "isActive": "Y",
                "docId": 5,
                "startDate": "2021-02-28T00:00:00",
                "endDate": null,
                "createdBy": null,
                "modifiedBy": null,
                "createdDate": null,
                "documentName": "Semi-Annual Report",
                "modifiedDate": "2021-12-31T16:40:01"
              },
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
            "risk_rating": "1",
            "minimum_initial_subscription_amount": 2000,
            "maximum_subsequent_subscription_amount": 999999999999,
            "manager_code": "BHL",
            "classHexa": "#567DCC",
            "minimum_initial_subscription_amount_str": "2,000.00",
            "class_name": "FIXED INCOME",
            "min_holding": 1000,
            "minimum_subsequent_subscription_amount_str": "500.00",
            "current_holding": "Y",
            "min_redem_amt": 500,
            "fund_status": "I",
            "class_seq": 2,
            "maximum_initial_subscription_amount": 999999999999,
            "fund_name": "Cimb Islamic Sukuk Fund",
            "one_month_ind": "DOWN",
            "fund_indicator": "I",
            "esg_fund" : "Y",
            "recommended": 50,
            "manager_name": "Cimb-Principal Asset Management Berhad",
            "three_month": "-3.01",
            "one_month": "-0.43",
            "max_redem_amt": 999999999999,
            "fund_risk_rating": "N",
            "maximum_subsequent_subscription_amount_str": "999,999,999,999.00",
            "nav_price": 1.2863,
            "min_switch_amt": 500,
            "risk_name": "Defensive",
            "product_category": "FIX_ INCOME ",
            "minimum_subsequent_subscription_amount": 500,
            "totalInvestment": 100
        },
       
    ],
    status: 'error', // Series of states for the state
    error: '',  // For any error messages
    portfolioData: undefined
}

describe('PortfolioReco Reducer', () => {
    it('should return the previous state', () => {
        const action = {} as any;
  
        const result = reducer(initialState, action);
  
        expect(result).toBe(initialState);
    });

    //holding list
    it('should load holding data from API', () => {
        const action = PortfolioRecoActions.PortfolioRecoDataLoading({
            data: null
        });

        const result = reducer(initialState, action);
        expect(result.status).toEqual('loading');
    });
    it('should load holding data from API on success path', () => {
        const action = PortfolioRecoActions.PortfolioRecoDataLoadingSuccess({
            portfolioData: mockData.portfolioData
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('success');
        expect(result.portfolioData).toBe(mockData.portfolioData);
    });
    it('should load holding data from API on failed path', () => {
        const action = PortfolioRecoActions.PortfolioRecoDataLoadingFailure({
            error: 'The error message'
        });

        const result = reducer(initialState, action);

        expect(result.status).toEqual('error');
        expect(result.holdingList).toBeFalsy();
        expect(result.error).toEqual('The error message');

    });
});
