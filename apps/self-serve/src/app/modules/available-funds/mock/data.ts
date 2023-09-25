import { AssetsClass, FundHouse, FundList, RiskCategory, FundPerfHistory } from '../models';
import { Fund } from '@cimb/shared/models';
import { Store as UserState } from '../../../core/state/user/user.reducer';


export const mockRiskCategories: RiskCategory[] = [
    { id: 1, name: 'risk 1' },
    { id: 2, name: 'risk 2' },
];

export const mockFundHouseResponse: FundHouse[] = [
    {
        code: 'ABD',
        createdBy: null,
        createdDate: '2022-03-08T19:40:57',
        id: 102,
        modifiedBy: null,
        modifiedDate: '2022-03-08T19:40:57',
        name: 'ABERDEEN ISLAMIC ASSET MANAGEMENT SDN BHD',
    },
    {
        code: 'AMU',
        createdBy: null,
        createdDate: '2022-03-08T19:40:57',
        id: 103,
        modifiedBy: null,
        modifiedDate: '2022-03-08T19:40:57',
        name: 'AMINVESTMENT SERVICES BERHAD',
    },
];

export const mockAssetsClassesResponse: AssetsClass[] = [
    {
        classId: 12345,
        className: 'Class Name 1',
        classSeq: 1,
        createdBy: 'string 1',
        modifiedBy: 'string 1',
        createdDate: 'string 1',
        modifiedDate: 'string 1',
    },
    {
        classId: 67890,
        className: 'Class Name 2',
        classSeq: 2,
        createdBy: 'string 2',
        modifiedBy: 'string 2',
        createdDate: 'string 2',
        modifiedDate: 'string 2',
    },
];

export const mockFundPerHistory: FundPerfHistory[] = [
    {
        "thirtyDaysNavPriceHistory": [],
        "ninetyDaysNavPriceHistory": [
            [
                "Mar 30",
                1.417200
            ],
            [
                "Mar 31",
                1.410500
            ],
            [
                "Apr 1",
                1.399800
            ]
    ]
    },
];

export const mockfundListResponse: FundList[] = [
    {
        cart_ind: false,
        cart_list: {
            cart_net_amount: 20,
            cart_redem_amount: 20,
            cart_sales_charges: 20,
            cart_sales_percentage: 20,
            cart_switch_in_amount: 20,
            cart_switch_out_amount: 20,
            cart_switch_sales_charges: 20,
            cart_switch_sales_percentage: 20,
            cart_total_investment: 20,
            cart_total_redem: 20,
            cart_total_switch_in: 20,
            cart_total_switch_out: 20,
            cart_txn_type: 'string',
        },
        class_name: 'FIXED INCOME',
        class_seq: 2,
        close_date: '10 Aug 2014',
        current_holding: 'N',
        fund_code: 'BHL17D',
        fund_document: [
            {
                msId: 10724,
                fundCode: 'BHL17D',
                msLink: 'F000000AP0',
                msUrl: 'https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=1&investmenttype=1',
                isActive: 'Y',
                docId: 1,
                startDate: '2021-07-01T00:00:00',
                endDate: null,
                createdBy: null,
                modifiedBy: null,
                createdDate: null,
                documentName: 'Prospectus',
                modifiedDate: '2021-12-31T16:40:01',
            },
        ],
        fund_indicator: 'I',
        cart_total_investment: 500,
        fund_name: 'Cimb Islamic Sukuk Fund',
        fund_status: 'I',
        manager_code: 'BHL',
        manager_name: 'CIMB-PRINCIPAL ASSET MANAGEMENT BERHAD',
        max_redem_amt: 1000000000000,
        max_switch_amt: 500,
        maximum_initial_subscription_amount: 1000000000000,
        maximum_initial_subscription_amount_str: '999,999,995,904.00',
        maximum_subsequent_subscription_amount: 1000000000000,
        maximum_subsequent_subscription_amount_str: '999,999,995,904.00',
        min_holding: 1000,
        min_redem_amt: 500,
        min_switch_amt: 500,
        minimum_initial_subscription_amount: 2000,
        minimum_initial_subscription_amount_str: '2,000.00',
        minimum_subsequent_subscription_amount: 500,
        minimum_subsequent_subscription_amount_str: '500.00',
        nav_price: 0.5,
        one_month: '-0.25',
        one_month_ind: 'DOWN',
        product_category: 'FIX_ INCOME ',
        recommend_fund: 'N',
        risk_name: 'Defensive',
        risk_rating: '2',
        sales_charge_nonstaff: 2,
        sales_charge_staff: 2,
        switch_indicator: 500,
        three_month: '0.48',
        three_month_ind: 'UP',
    },
    {
        cart_ind: false,
        cart_list: {
            cart_net_amount: 20,
            cart_redem_amount: 20,
            cart_sales_charges: 20,
            cart_sales_percentage: 20,
            cart_switch_in_amount: 20,
            cart_switch_out_amount: 20,
            cart_switch_sales_charges: 20,
            cart_switch_sales_percentage: 20,
            cart_total_investment: 20,
            cart_total_redem: 20,
            cart_total_switch_in: 20,
            cart_total_switch_out: 20,
            cart_txn_type: 'string',
        },
        class_name: 'CASH',
        class_seq: 1,
        close_date: '31 Dec 2050',
        current_holding: 'N',
        fund_code: 'BHL15F',
        fund_document: [
            {
                msId: 10725,
                fundCode: 'BHL17D',
                msLink: 'F000000AP0',
                msUrl: 'https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=77&investmenttype=1',
                isActive: 'Y',
                docId: 77,
                startDate: '2021-07-01T00:00:00',
                endDate: null,
                createdBy: null,
                modifiedBy: null,
                createdDate: null,
                documentName: 'Product Highlight Sheet',
                modifiedDate: '2021-12-31T16:40:01',
            },
        ],
        fund_indicator: 'C',
        cart_total_investment: 9000,
        fund_name: 'Cimb-principal Deposit Fund',
        fund_status: 'A',
        manager_code: 'BHL',
        manager_name: 'CIMB-PRINCIPAL ASSET MANAGEMENT BERHAD',
        max_redem_amt: 1000000000000,
        max_switch_amt: 0,
        maximum_initial_subscription_amount: 1000000000000,
        maximum_initial_subscription_amount_str: '999,999,995,904.00',
        maximum_subsequent_subscription_amount: 1000000000000,
        maximum_subsequent_subscription_amount_str: '999,999,995,904.00',
        min_holding: 0,
        min_redem_amt: 0,
        min_switch_amt: 0,
        minimum_initial_subscription_amount: 10000,
        minimum_initial_subscription_amount_str: '10,000.00',
        minimum_subsequent_subscription_amount: 1000,
        minimum_subsequent_subscription_amount_str: '1,000.00',
        nav_price: 0.5,
        one_month: '-0.01',
        one_month_ind: 'DOWN',
        product_category: 'CASH',
        recommend_fund: 'N',
        risk_name: 'Defensive',
        risk_rating: '0',
        sales_charge_nonstaff: 0,
        sales_charge_staff: 0,
        switch_indicator: 0,
        three_month: '-0.01',
        three_month_ind: 'DOWN',
    },
];

export const mockFundDetailData: Fund = {
    asset_class: "LOCAL EQUITY",
    average_nav_price: "0.7168",
    can_edit: false,
    card_amount: null,
    card_net_amount: 0,
    card_net_switch_in_amount: 0,
    card_redemption_amount: 0,
    card_redemption_units: 0,
    card_sale_charge: 0,
    card_switch_charges_fee: 0,
    card_switch_in_amount: 0,
    card_switch_in_fund: [],
    card_switch_in_units: 0,
    card_switch_out_amount: 0,
    card_switch_out_units: 0,
    card_switch_percentage: 0,
    cart_list: [],
    class_holding: 0,
    class_seq: 3,
    classHexa: "#5CD3CD",
    close_date: "11 Nov 2021",
    current_investment: "697.59",
    displayFlag: true,
    flow_text: null,
    flow: null,
    fund_code: "AMU03A",
    fund_document: [
        {
            msId: 10289,
            fundCode: "AMU03A",
            msLink: "F000000AGL",
            msUrl: "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AGL&documenttype=1&investmenttype=1",
            isActive: "Y",
            docId: 1,
            startDate: "2017-09-10T00:00:00",
            endDate: null,
            createdBy: null,
            modifiedBy: null,
            createdDate: null,
            documentName: "Master Prospectus",
            modifiedDate: "2021-12-31T16:40:00"
        },
        {
            msId: 10290,
            fundCode: "AMU03A",
            msLink: "F000000AGL",
            msUrl: "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AGL&documenttype=77&investmenttype=1",
            isActive: "Y",
            docId: 77,
            startDate: "2021-01-13T00:00:00",
            endDate: null,
            createdBy: null,
            modifiedBy: null,
            createdDate: null,
            documentName: "Product Highlight Sheet",
            modifiedDate: "2021-12-31T16:40:00"
        },
        {
            msId: 10291,
            fundCode: "AMU03A",
            msLink: "F000000AGL",
            msUrl: "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AGL&documenttype=4&investmenttype=1",
            isActive: "Y",
            docId: 4,
            startDate: "2021-09-30T00:00:00",
            endDate: null,
            createdBy: null,
            modifiedBy: null,
            createdDate: null,
            documentName: "Annual Report",
            modifiedDate: "2021-12-31T16:40:00"
        },
        {
            msId: 10292,
            fundCode: "AMU03A",
            msLink: "F000000AGL",
            msUrl: "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AGL&documenttype=5&investmenttype=1",
            isActive: "Y",
            docId: 5,
            startDate: "2021-03-31T00:00:00",
            endDate: null,
            createdBy: null,
            modifiedBy: null,
            createdDate: null,
            documentName: "Semi-Annual Report",
            modifiedDate: "2021-12-31T16:40:00"
        },
        {
            msId: 10293,
            fundCode: "AMU03A",
            msLink: "F000000AGL",
            msUrl: "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AGL&documenttype=52&investmenttype=1",
            isActive: "Y",
            docId: 52,
            startDate: "2021-10-31T00:00:00",
            endDate: null,
            createdBy: null,
            modifiedBy: null,
            createdDate: null,
            documentName: "Fact sheet",
            modifiedDate: "2021-12-31T16:40:00"
        }
    ],
    fund_house_code: "AMU",
    fund_house_name: "AMINVESTMENT SERVICES BERHAD",
    fund_index: 5,
    fund_indicator: "I",
    fund_name: "Amittikal",
    fund_risk_rating: "Y",
    fund_status: "A",
    fundImg: "./assets/images/chart-decrease.svg",
    fundPosition: "Decrease",
    fundTotalReturnType: null,
    fundTotalReturnValue: null,
    holding: "1,395.18",
    max_amt: 0,
    max_init_amt: 999999999999,
    max_redem_amt: 999999999999,
    max_sub_amt: 999999999999,
    max_switch_amt: 500,
    maximum_initial_subscription_amount: 999999999999,
    maximum_subsequent_subscription_amount: 999999999999,
    min_amt: 0,
    min_holding: 1000,
    min_init_amt: 1000,
    min_redem_amt: 500,
    min_sub_amt: 500,
    min_switch_amt: 500,
    minimum_initial_subscription_amount: 1000,
    minimum_subsequent_subscription_amount: 500,
    nav_price_number: 0.5,
    nav_price: "0.50",
    product_category: "LOCAL_EQT",
    risk_ind: null,
    risk_name: "Growth",
    risk_rating: "4",
    sales_charge_nonstaff: 0,
    sales_charge_staff: 0,
    sales_charge: 0,
    switch_indicator: "Y",
    syariah_complaint: "I",
    total_invested: "1,000.00",
    total_percentage_value: "-30.24",
    total_percentage: "-30.24%",
    total_return_type: "-",
    total_return_value: "302.41",
    total_return: "-302.41",
    txn_type: null,
    unit_held: "1,395.18",
    units_held_number: 1395.18,
    ut_account_no: "A80111183",
    wholesale_ind: "N",
    wholesale_msg: "Wholesales Msg Fund Detail Object Found"
};

export const mockUserStateEtp: UserState = {
    "user": {
       "casa_indicator": "N",
       "cifNumber": "10280000511148",
       "cimb_staff": '2',
       "customer_id_type": "New IC",
       "customer_id": "690629135086",
       "customer_mobile_no": "",
       "customer_name": "RCCP039 580913045039",
       "dashbordData": 1,
       "debit_card_no": 5196032215004728,
       "invertment_indicator": "N",
       "join_and_ut_account": "N",
       "join_or_ut_account": "N",
       "lastSeen": "",
       "risk_profile": "Conservative",
       "sole_prop": "N",
       "story": "",
       "utAccNo": "A80111274"
    },
    "createSessionResponse": true,
    "customerIdType": "3",
    "customerSessionData": {
        "sessionId": 8788,
        "clientId": "690629135086",
        "cifNumber": "10280000511148",
        "sessionNo": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2OTA2MjkxMzUwODYiLCJleHAiOjE2NjAzODk1MTAsImlhdCI6MTY1OTk4OTUxMH0.aItf5T_QlwQnCERKlReHNCD8hrSy1Z7F6Htspc_kH-50udSBuvU06W_bgqSfuHWdmah0ZNQK_533qN0bC97Ohg",
        "sessionDate": "2022-08-09T04:11:50.555512",
        "chkSessionValue": true
    },
    "customer_name": "RCCP039 580913045039",
    "dashboardData": "",
    "dashboardScreenData": "",
    "deleteSessionResponse": "",
    "loadCount": -1,
    "loadInitialData": false,
    "getSessionData": "",
    "loginTime": 1659989510372,
    "riskProfile": "Conservative",
    "riskProfileStatus": "VALID",
    "sessionNo": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2OTA2MjkxMzUwODYiLCJleHAiOjE2NjAzODk1MTAsImlhdCI6MTY1OTk4OTUxMH0.aItf5T_QlwQnCERKlReHNCD8hrSy1Z7F6Htspc_kH-50udSBuvU06W_bgqSfuHWdmah0ZNQK_533qN0bC97Ohg",
    "userTypeSuccessData": "ETP",
    "unitTrustAccount": "A80111274",
    "unitTrustAccountList": [
       {
          "default_ind": "Y",
          "ut_account_no": "A80111274"
       },
       {
          "default_ind": "N",
          "ut_account_no": "A80111275"
       }
    ],
    "userCodeResponse": "",
    "userType": "ETP",
    "userTypeData": ""
 };