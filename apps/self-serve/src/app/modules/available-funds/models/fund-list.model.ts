export interface FundList {
    maximum_initial_subscription_amount_str: string;
    close_date: string;
    cart_ind: boolean;
    three_month_ind: string;
    switch_indicator: number;
    fund_document: any;
    fund_code: string;
    risk_rating: string;
    minimum_initial_subscription_amount: number;
    maximum_subsequent_subscription_amount: number;
    manager_code: string;
    sales_charge_staff: number;
    minimum_initial_subscription_amount_str: string;
    class_name: string;
    min_holding: number;
    minimum_subsequent_subscription_amount_str: string;
    current_holding: string;
    min_redem_amt: number;
    recommend_fund: string;
    fund_status: string;
    class_seq: number;
    maximum_initial_subscription_amount: number;
    fund_name: string;
    one_month_ind: string;
    fund_indicator: string;
    manager_name: string;
    max_switch_amt: number;
    three_month: string;
    cart_list: CartList;
    one_month: string;
    max_redem_amt: number;
    maximum_subsequent_subscription_amount_str: string;
    nav_price: number;
    min_switch_amt: number;
    risk_name: string;
    product_category: string;
    minimum_subsequent_subscription_amount: number;
    sales_charge_nonstaff: number;
    cart_total_investment: number;
}

export interface CartList {
    cart_net_amount: number;
    cart_redem_amount: number;
    cart_sales_charges: number;
    cart_sales_percentage: number;
    cart_switch_in_amount: number;
    cart_switch_out_amount: number;
    cart_switch_sales_charges: number;
    cart_switch_sales_percentage: number;
    cart_total_investment: number;
    cart_total_redem: number;
    cart_total_switch_in: number;
    cart_total_switch_out: number;
    cart_txn_type: string;
}
