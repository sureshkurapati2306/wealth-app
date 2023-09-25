// import { User } from '../../model/user.model';
import {
    GetDashboardApi,
    GET_DASHBOARD_DATA,
    CallDashboardApi,
    StoreDashboardApiResponse,
    CALL_DASHBOARD_API,
    STORE_DASHBOARD_API_RESPONSE,
    AddDisplayFlagDashboardApiResponse,
    STORE_DASHBOARD_DATA_DISPLAY_FLAG,
    GetPurchaseDetail,
    GET_PURCHASE_DETAIL,
    StorePurchaseDetailResponse,
    STORE_PURCHASE_DETAIL_RESPONSE,
} from './dashboard.actions';
import { Dashboard } from '../../model/dashboard.model';
import * as DashboardAction from './dashboard.actions';

describe('DashboardActions Dashboard Data', () => {
    it('should create an action GetDashboardApi', () => {
        const payload = '';
        const action = new GetDashboardApi(payload);

        expect({ ...action }).toEqual({
            type: GET_DASHBOARD_DATA,
            payload,
        });
    });

    it('should create an action CallDashboardApi', () => {
        const payload = '1';
        const action = new CallDashboardApi(payload);

        expect({ ...action }).toEqual({
            type: CALL_DASHBOARD_API,
            payload,
        });
    });

    it('should create an action getPurchaseDetail', () => {
        const payload = '1';
        const action = new GetPurchaseDetail(payload);

        expect({ ...action }).toEqual({
            type: GET_PURCHASE_DETAIL,
            payload,
        });
    });

    it('should create an action StoreDashboardApiResponse', () => {
        const payload = new Dashboard(
            'Ramasamy',
            'Significant Deviation',
            '96,259.93',
            '60.00',
            'P',
            'Aggresive',
            [
                {
                    holding: 0,
                    asset_class_name: 'CASH / MONEY MARKET',
                    classHexa: '#B3BE66',
                    class_seq: 1,
                    recommended: 3,
                },
                {
                    holding: 0,
                    asset_class_name: 'FIXED INCOME FUND',
                    classHexa: '#567DCC',
                    class_seq: 2,
                    recommended: 23,
                },
                {
                    holding: 100,
                    asset_class_name: 'LOCAL EQUITY',
                    classHexa: '#5CD3CD',
                    class_seq: 3,
                    recommended: 40,
                },
                {
                    holding: 0,
                    asset_class_name: 'REGIONAL EQUITY',
                    classHexa: '#955CD6',
                    class_seq: 4,
                    recommended: 15,
                },
                {
                    holding: 0,
                    asset_class_name: 'GLOBAL EQUITY',
                    classHexa: '#D45DBA',
                    class_seq: 5,
                    recommended: 15,
                },
                {
                    holding: 0,
                    asset_class_name: 'ALTERNATIVE',
                    classHexa: '#4FA14F',
                    class_seq: 6,
                    recommended: 4,
                },
            ],
            'N',
            '-3.74',
            '100,000.00',
            [
                {
                    name: 'CASH / MONEY MARKET',
                    y: 3,
                },
                {
                    name: 'FIXED INCOME FUND',
                    y: 23,
                },
                {
                    name: 'LOCAL EQUITY',
                    y: 40,
                },
                {
                    name: 'REGIONAL EQUITY',
                    y: 15,
                },
                {
                    name: 'GLOBAL EQUITY',
                    y: 15,
                },
                {
                    name: 'ALTERNATIVE',
                    y: 4,
                },
            ],
            '-3,740.07',
            [],
            'Aggresive',
            'Ramasamy',
            'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
            [
                {
                    default_ind: 'Y',
                    ut_account_no: 'A80112508',
                },
            ],
            'N',
            '01 Jan 2021, 10:21 am',
            [],
            'Transactions performed after 2pm will be executed the next business day',
            'N',
            'N',
        );
        const action = new StorePurchaseDetailResponse(payload);

        expect({ ...action }).toEqual({
            type: STORE_PURCHASE_DETAIL_RESPONSE,
            payload,
        });
    });

    it('should create an action StoreDashboardApiResponse', () => {
        const payload = new Dashboard(
            'Ramasamy',
            'Significant Deviation',
            '96,259.93',
            '60.00',
            'P',
            'Aggresive',
            [
                {
                    holding: 0,
                    asset_class_name: 'CASH / MONEY MARKET',
                    classHexa: '#B3BE66',
                    class_seq: 1,
                    recommended: 3,
                },
                {
                    holding: 0,
                    asset_class_name: 'FIXED INCOME FUND',
                    classHexa: '#567DCC',
                    class_seq: 2,
                    recommended: 23,
                },
                {
                    holding: 100,
                    asset_class_name: 'LOCAL EQUITY',
                    classHexa: '#5CD3CD',
                    class_seq: 3,
                    recommended: 40,
                },
                {
                    holding: 0,
                    asset_class_name: 'REGIONAL EQUITY',
                    classHexa: '#955CD6',
                    class_seq: 4,
                    recommended: 15,
                },
                {
                    holding: 0,
                    asset_class_name: 'GLOBAL EQUITY',
                    classHexa: '#D45DBA',
                    class_seq: 5,
                    recommended: 15,
                },
                {
                    holding: 0,
                    asset_class_name: 'ALTERNATIVE',
                    classHexa: '#4FA14F',
                    class_seq: 6,
                    recommended: 4,
                },
            ],
            'N',
            '-3.74',
            '100,000.00',
            [
                {
                    name: 'CASH / MONEY MARKET',
                    y: 3,
                },
                {
                    name: 'FIXED INCOME FUND',
                    y: 23,
                },
                {
                    name: 'LOCAL EQUITY',
                    y: 40,
                },
                {
                    name: 'REGIONAL EQUITY',
                    y: 15,
                },
                {
                    name: 'GLOBAL EQUITY',
                    y: 15,
                },
                {
                    name: 'ALTERNATIVE',
                    y: 4,
                },
            ],
            '-3,740.07',
            [],
            'Aggresive',
            'Ramasamy',
            'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
            [
                {
                    default_ind: 'Y',
                    ut_account_no: 'A80112508',
                },
            ],
            'N',
            '01 Jan 2021, 10:21 am',
            [],
            'Transactions performed after 2pm will be executed the next business day',
            'N',
            'N',
        );
        const action = new StoreDashboardApiResponse(payload);

        expect({ ...action }).toEqual({
            type: STORE_DASHBOARD_API_RESPONSE,
            payload,
        });
    });

    it('should create an action StoreDashboardApiResponse', () => {
        const payload = new Dashboard(
            'Ramasamy',
            'Significant Deviation',
            '96,259.93',
            '60.00',
            'P',
            'Aggresive',
            [
                {
                    holding: 0,
                    asset_class_name: 'CASH / MONEY MARKET',
                    classHexa: '#B3BE66',
                    class_seq: 1,
                    recommended: 3,
                },
                {
                    holding: 0,
                    asset_class_name: 'FIXED INCOME FUND',
                    classHexa: '#567DCC',
                    class_seq: 2,
                    recommended: 23,
                },
                {
                    holding: 100,
                    asset_class_name: 'LOCAL EQUITY',
                    classHexa: '#5CD3CD',
                    class_seq: 3,
                    recommended: 40,
                },
                {
                    holding: 0,
                    asset_class_name: 'REGIONAL EQUITY',
                    classHexa: '#955CD6',
                    class_seq: 4,
                    recommended: 15,
                },
                {
                    holding: 0,
                    asset_class_name: 'GLOBAL EQUITY',
                    classHexa: '#D45DBA',
                    class_seq: 5,
                    recommended: 15,
                },
                {
                    holding: 0,
                    asset_class_name: 'ALTERNATIVE',
                    classHexa: '#4FA14F',
                    class_seq: 6,
                    recommended: 4,
                },
            ],
            'N',
            '-3.74',
            '100,000.00',
            [
                {
                    name: 'CASH / MONEY MARKET',
                    y: 3,
                },
                {
                    name: 'FIXED INCOME FUND',
                    y: 23,
                },
                {
                    name: 'LOCAL EQUITY',
                    y: 40,
                },
                {
                    name: 'REGIONAL EQUITY',
                    y: 15,
                },
                {
                    name: 'GLOBAL EQUITY',
                    y: 15,
                },
                {
                    name: 'ALTERNATIVE',
                    y: 4,
                },
            ],
            '-3,740.07',
            [],
            'Aggresive',
            'Ramasamy',
            'Your portfolio has <b>changed considerably (20% or more)</b> from the recommended model asset class breakdown. This may result in returns that are different from those expected fro your risk profile',
            [
                {
                    default_ind: 'Y',
                    ut_account_no: 'A80112508',
                },
            ],
            'N',
            '01 Jan 2021, 10:21 am',
            [],
            'Transactions performed after 2pm will be executed the next business day',
            'N',
            'N',
        );
        const action = new AddDisplayFlagDashboardApiResponse(payload, false);

        expect({ ...action }).toEqual({
            type: STORE_DASHBOARD_DATA_DISPLAY_FLAG,
            payload: payload,
            displayFlag: false,
        });
    });

    it('should create an action UpdateCartItemInFund', () => {
        const payload = null;
        const flow = '';
        const value = '';
        const indicativeAmount = '0.0';
        const action = new DashboardAction.UpdateCartItemInFund(
            payload,
            flow,
            value,
            indicativeAmount,
        );

        expect({ ...action }).toEqual({
            type: DashboardAction.UPDATE_CART_ITEM_IN_FUND,
            payload,
            flow,
            value,
            indicativeAmount,
        });
    });
});
