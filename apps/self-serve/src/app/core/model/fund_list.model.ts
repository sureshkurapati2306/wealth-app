

export class FundLlist {
  constructor(
    public min_sub_amt: number,
    public current_investment: string,
    public unit_held: string,
    public total_percentage: string,
    public min_init_amt: number,
    public total_return: string,
    public holding: string,
    public max_sub_amt: number,
    public risk_rating: string,
    public average_nav_price: string,
    public classHexa: string,
    public sales_charge: number,
    public class_holding: number,
    public min_holding: number,
    public wholesale_msg: string,
    public asset_class: string,
    public fund_status: string,
    public class_seq: number,
    public fund_name: string,
    public ut_account_no: string,
    public total_invested: string,
    public max_init_amt: number,
    public syariah_complaint: string,
    public nav_price: string,
    public wholesale_ind: string,
    public risk_name: string,
    public product_category: string,
    public fundTotalReturnType: string,
    public fundTotalReturnValue: string,
    public displayFlag: boolean,
    public total_return_type: any,
    public sales_charge_nonstaff: number,
    public sales_charge_staff: number,
    public switch_indicator: number,
    public fund_code: string,
    public minimum_initial_subscription_amount: number,
    public maximum_subsequent_subscription_amount: number,
    public min_redem_amt: number,
    public maximum_initial_subscription_amount: number,
    public max_switch_amt: number,
    public total_return_value: string,
    public max_redem_amt: number,
    public min_switch_amt: number,
    public minimum_subsequent_subscription_amount: number,



    public can_edit: boolean,
    public txn_type: string,

    public card_redemption_units: number,
    public card_redemption_amount: number,

    public card_switch_out_units: number,
    public card_switch_out_amount: number,
    public card_switch_in_units: number,
    public card_switch_in_amount: number,
    public card_switch_percentage: number,
    public card_switch_charges_fee: number,
    public card_net_switch_in_amount: number,
    public card_switch_in_fund: any[],
    public flow: string,
    public flow_text: string,

    public card_amount: number,
    public card_sale_charge: number,
    public card_net_amount: number,
    public min_amt: number,
    public max_amt: number,
    public risk_ind: string,
    public source_screen: string,
    public units_held_number: number,
    public nav_price_number: number,
    public cart_list:[],
    public one_month: any, 
    public three_month: any,
    public one_month_ind: any,
    public three_month_ind:any
  ) {}
}
