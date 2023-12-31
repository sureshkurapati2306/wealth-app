export class FundCart {
  constructor(
     public min_sub_amt: number,
     public current_investment: string,
     public wholesale_msg: string,
     public unit_held: string,
     public asset_class: string,
     public fund_status: string,
     public class_seq: number,
     public total_percentage: string,
     public fund_name: string,
     public ut_account_no: string,
     public total_invested: string,
     public min_init_amt: number,
     public total_return: string,
     public holding: string,
     public max_sub_amt: number,
     public average_nav_price: string,
     public max_init_amt: number,
     public classHexa: string,
     public syariah_complaint: string,
     public nav_price: string,
     public sales_charge: number,
     public wholesale_ind: string,
     public class_holding: number,
     public min_holding: number,
     public card_amount: number,
     public card_sale_charge: number,
     public card_net_amount: number,
     public min_amt: number,
     public max_amt: number,
     public risk_ind: string,

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
     public source_screen: string,
     public units_held_number: number,
     public nav_price_number: number
  ) {}
}
