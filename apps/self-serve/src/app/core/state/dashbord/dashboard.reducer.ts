import * as DashboardAction from './dashboard.actions';
import { Dashboard } from '../../model/dashboard.model';
import { FundLlist } from '../../model/fund_list.model';
import { CaseAccount } from '../../model/casa_account.model';
export interface Store {
  loadInitialData: boolean;
  loadCount: number;
  dashboardParam: string;
  dashboardApiResponseData: string;
  dashboardData : Dashboard;
  purchaseDetailData : any;
  fundList: FundLlist[];
  fundPosition :string;
  fundImg : string;
  dataLoaded: boolean;
  casa_account:CaseAccount[];
  scheduler_msg: string;
  cartUTAccount: string;
  foreignerInd: string;
  occupationInd: string;
}

const initialState: Store = {
  loadInitialData: false,
  loadCount: -1,
  dashboardParam: '',
  dashboardApiResponseData: '',
  fundList: [],
  dashboardData : null,
  fundPosition : '',
  fundImg : '',
  dataLoaded: false,
  casa_account: [],
  purchaseDetailData : [],
  scheduler_msg: null,
  cartUTAccount: null,
  foreignerInd: '',
  occupationInd: '',
};

export function dashbordReducer(
  state = initialState,
  action: DashboardAction.Actions,

) {
  switch (action.type) {

    case DashboardAction.CALL_DASHBOARD_API:
      return {
        ...state,
        dashboardParam: action.payload,
      };
    case DashboardAction.STORE_DASHBOARD_API_RESPONSE: {

      let isCashAssetDisplayed = false;
      let isFixedIncomeAssetDisplayed = false;
      let isLocalEquityAssetDisplayed = false;
      let isRegionalEquityAssetDisplayed = false;
      let isGlobalEquityAssetDisplayed = false;
      let isAlternativesAssetDisplayed = false;
      let fundItem :any = '';
      const fundListNew = [];
      let casa_account = [];
      let casaAccount = [];
      let dataLoaded = false;
      const payload = action?.payload ? {...action?.payload} : null;
      if(payload){
      const fundList = payload?.fund_list ? [...payload.fund_list] : [];

      let units_held_number = 0.00;
      let nav_price_number = 0.00;
      for(let i=0;i<fundList.length; i++) {

        const total_Return_Type = fundList[i].total_return_type;
        const total_return_value = fundList[i].total_return_value;
        let fundPosition = '';
        let fundImg = '';

        if(total_Return_Type.includes('-') && total_return_value != "0.00"){
         fundPosition = 'Decrease';
         fundImg = './assets/images/chart-decrease.svg';
        }
        if(total_Return_Type.includes('+') && total_return_value != "0.00") {
          fundPosition = 'Increase';
          fundImg = './assets/images/chart-increase.svg';
        }
        if(total_return_value == "0.00") {
          fundPosition = 'Equal';
          fundImg = './assets/images/chart-equal.svg';
        }

        //Cash Asset
        if (!isCashAssetDisplayed && fundList[i].asset_class == 'CASH') {
          isCashAssetDisplayed = true;
           fundItem = {
             ...fundList[i],
             displayFlag : true,
             fundPosition : fundPosition,
             fundImg : fundImg
           };
           fundList[i] = fundItem
         }
         //Fixed Income
         else if (!isFixedIncomeAssetDisplayed && fundList[i].asset_class == 'FIXED INCOME') {
          isFixedIncomeAssetDisplayed = true;
           fundItem = {
             ...fundList[i],
             displayFlag : true,
             fundPosition : fundPosition,
             fundImg : fundImg
           };
           fundList[i] = fundItem
         }
         //Local Equity
        else if (!isLocalEquityAssetDisplayed && fundList[i].asset_class == 'LOCAL EQUITY') {
         isLocalEquityAssetDisplayed = true;
          fundItem = {
            ...fundList[i],
            displayFlag : true,
            fundPosition : fundPosition,
            fundImg : fundImg
          }
          fundList[i] = fundItem
        }
        //Regional Equity
        else if(!isRegionalEquityAssetDisplayed && fundList[i].asset_class == 'REGIONAL EQUITY') {
          isRegionalEquityAssetDisplayed = true;
          fundItem = {
            ...fundList[i],
            displayFlag : true,
            fundPosition : fundPosition,
            fundImg : fundImg
          };
          fundList[i] = fundItem
        }
        //Global Equity
        else if(!isGlobalEquityAssetDisplayed && fundList[i].asset_class == 'GLOBAL EQUITY') {
          isGlobalEquityAssetDisplayed = true;
          fundItem = {
            ...fundList[i],
            displayFlag : true,
            fundPosition : fundPosition,
            fundImg : fundImg
          };
          fundList[i] = fundItem
        }
        //Alternatives
        else if(!isAlternativesAssetDisplayed && fundList[i].asset_class == 'ALTERNATIVES') {
          isAlternativesAssetDisplayed = true;
          fundItem = {
            ...fundList[i],
            displayFlag : true,
            fundPosition : fundPosition,
            fundImg : fundImg
          };
          fundList[i] = fundItem
        }

          fundItem = {
            ...fundList[i],
            displayFlag : false,
            fundPosition : fundPosition,
            fundImg : fundImg
          };
          const fundDummy = { min_sub_amt: 0,current_investment: null,unit_held: null,total_percentage: null, min_init_amt: 0,total_return: null,
            holding: null,max_sub_amt: 0,risk_rating: null,average_nav_price: null,classHexa: null, sales_charge: 0, class_holding: 0, min_holding: 0,
            wholesale_msg: null, asset_class: null, fund_status: null, class_seq: 0, fund_name: null, ut_account_no: null, total_invested: null,
            max_init_amt: 0, syariah_complaint: null, nav_price: null, wholesale_ind: null, risk_name: null, product_category: null, fundTotalReturnType: null,
            fundTotalReturnValue: null, displayFlag: false, total_return_type: null, sales_charge_nonstaff: 0, sales_charge_staff: 0, switch_indicator: 0,
            fund_code: null, minimum_initial_subscription_amount: 0, maximum_subsequent_subscription_amount: 0, min_redem_amt: 0, maximum_initial_subscription_amount: 0,
            max_switch_amt: 0, total_return_value: null, max_redem_amt: 0, min_switch_amt: 0, minimum_subsequent_subscription_amount: 0,
            can_edit: false,  txn_type: null, card_amount: null, card_sale_charge: 0, card_net_amount: 0, card_redemption_units: 0, card_redemption_amount: 0, card_switch_out_units: 0, card_switch_out_amount: 0,
            card_switch_in_units: 0, card_switch_in_amount: 0, card_switch_percentage: 0, card_switch_charges_fee: 0, card_net_switch_in_amount: 0,
            card_switch_in_fund: [], flow: null, flow_text: null, min_amt: 0,  max_amt: 0, risk_ind: null, fund_index: i,
          };
          units_held_number = fundItem.unit_held ? parseFloat(fundItem.unit_held.toString().replace(/,/g, '')) : 0.00;
          nav_price_number = fundItem.nav_price ? parseFloat(fundItem.nav_price.toString().replace(/,/g, '')) : 0.00;
          const processedObj = {...fundDummy,...fundItem,units_held_number, nav_price_number, cart_list: fundList[i].cart_list};
          fundList[i] = processedObj;

          fundListNew.push(processedObj);

        payload.fund_list = fundListNew;
      }
       casa_account = payload?.casa_account ? [...payload?.casa_account] : [];
       casaAccount =[];
      let casaAccountObj;
      let accountObj;
      for(let j =0;j < casa_account.length;j++){
        accountObj  = {...casa_account[j]};
        casaAccountObj = {
          ...accountObj,
          casa_account_balance:accountObj.casa_account_balance,
          casa_account_format:accountObj.casa_account_format,
          casa_account_name:accountObj.casa_account_name,
          casa_account_no:accountObj.casa_account_no,
          name:accountObj.casa_account_format,
          account:accountObj.casa_account_name,
          accountNumber:accountObj.casa_account_no,
          isActive: accountObj.account_status === "Active",
          hasJointAccount: accountObj.joint_indicator === "J",
          index:j
      };

          casaAccount.push(casaAccountObj);
      }
      dataLoaded = true;
    }
      const schedulerMsg = payload?.scheduler_msg ?  payload?.scheduler_msg : "";
      const foreignerInd = payload?.foreigner_ind ? payload?.foreigner_ind : 'N';
      const occupationInd = payload?.occupation_ind ? payload?.occupation_ind : 'N';
      return {
        ...state,
        dashboardData: payload,
        fundList: [...fundListNew],
        casa_account:[...casaAccount],
        scheduler_msg : schedulerMsg,
        foreignerInd: foreignerInd,
        occupationInd: occupationInd,
        dataLoaded: dataLoaded
      };
    }


    case DashboardAction.UPDATE_CART_ITEM_IN_FUND: {
      const funItem = action.payload;
      const fundList = [...state.dashboardData.fund_list];
      //Find index of specific object using findIndex method.
      const objIndex = fundList.findIndex((obj => obj.fund_code == funItem.fund_code));
      const fundObj = fundList[objIndex];
      let cardRedemptionAmount = null;
      let cardRedemptionUnits =  null;

      let amount  =  null;
      let salesCharge  =  null;
      let salesChargeAmount =   null;
      let cardNetAmount =   null;

      let minAmount = 1;
      let maxAmount = 999999.99;

      const flow = action.flow;
      let flowText = null;

      if(flow === '001'){
        flowText = 'topup';
         amount = parseFloat(action.value);
         salesCharge = fundObj ? fundObj.sales_charge_nonstaff : 0.0;
          salesChargeAmount = amount * (salesCharge / 100);
          cardNetAmount = amount - salesChargeAmount;

          minAmount = fundObj.min_sub_amt;
          maxAmount = fundObj.max_sub_amt;
      } else if(flow === '002'){
        flowText = 'redeem';
        cardRedemptionAmount = parseFloat(action.indicativeAmount);
        cardRedemptionUnits = parseFloat(action.value);

        minAmount = fundObj.min_sub_amt;
        maxAmount = fundObj.max_sub_amt;
      } else if(flow === '003'){
        flowText = 'switch';
      }


      const newFundObj = {
        ...fundObj,
        card_amount: amount,
        card_sale_charge: salesChargeAmount,
        card_net_amount: cardNetAmount,
        card_redemption_amount :  cardRedemptionAmount,
        card_redemption_units :  cardRedemptionUnits,
        canEdit: false,
        min_amt: minAmount,
        max_amt: maxAmount,
        flow: flow,
        flow_text: flowText
      };


      fundList[objIndex] = newFundObj;

      const dashboardData = {...state.dashboardData}
      dashboardData.fund_list = fundList;

      return {
        ...state,
        dashboardData: dashboardData,
        fundList: [...fundList]
      };
    }

    case DashboardAction.GET_PURCHASE_DETAIL:
      return {
        ...state,
        purchaseDetailData : action.payload
      }
      case DashboardAction.STORE_PURCHASE_DETAIL_RESPONSE: {
        const purchaseDetailData = [...action.payload];
        return {
          ...state,
          purchaseDetailData: purchaseDetailData,
        };
      }
      case DashboardAction.UPDATE_CART_UT_ACCOUNT: {
        return {
          ...state,
          cartUTAccount: action.payload,
        };
      }

    default:
      return state;
  }
}
