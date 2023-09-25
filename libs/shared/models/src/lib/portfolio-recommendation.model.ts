export interface RecommendedList {
  name: string;
  classHexa: string;
  y: string;
}
export interface HoldingList {
  name: string;
  classHexa: string;
  y: string;
}
export interface AssetClassLst {
  holding: string;
  asset_class_name: string;
  classHexa: string;
  class_seq: number;
  recommended: string;
}

export interface FundList {
  class_name: string;
  class_seq: string;
  close_date: string;
  current_holding: string;
  fund_code: string;
  fund_document: FundDocument[];
  fund_indicator: string;
  fund_name: string;
  fund_risk_rating: string;
  fund_status: string;
  manager_code: string;
  manager_name: string;
  max_redem_amt: number;
  maximum_initial_subscription_amount: number;
  maximum_initial_subscription_amount_str: string;
  maximum_subsequent_subscription_amount: number;
  maximum_subsequent_subscription_amount_str: string;
  min_holding: number;
  min_redem_amt: number;
  min_switch_amt: number;
  minimum_initial_subscription_amount: number;
  minimum_initial_subscription_amount_str: string;
  minimum_subsequent_subscription_amount: number;
  minimum_subsequent_subscription_amount_str: string;
  nav_price: number;
  one_month: string;
  one_month_ind: string;
  product_category: string;
  risk_name: string;
  risk_rating: string;
  sales_charge_nonstaff: number;
  sales_charge_staff: number;
  switch_indicator: string;
  three_month: string;
  three_month_ind: string;
}

export interface FundDocument {
    docId: number;
    documentName: string;
    fundCode: string;
    isActive: string;
    msId: string;
    msLink: string;
    msUrl: string;
}

export interface PortfolioData {
  assetClassLst: AssetClassLst;
  holdingList: HoldingList;
  fundList: FundList;
  recommendedList: RecommendedList;
}