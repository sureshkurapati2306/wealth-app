import { AssetClass } from './asset_class.model';
import { Recommended } from './recommended.model';
import { FundLlist } from './fund_list.model';
import { UTAccount } from './ut_account.model';
import { CaseAccount } from './casa_account.model';
export class Dashboard {
    constructor(
        public customer_name: string,
        public deviation_level: string,
        public current_investment: string,
        public deviation_value: string,
        public soleprop_ind: string,
        public risk_profile: string,
        public asset_class: AssetClass[],
        public investment_ind: string,
        public total_percentage: string,
        public total_invested: string,
        public recommended: Recommended[],
        public total_return: string,
        public fund_list: FundLlist[],
        public risk_description: string,
        public name: string,
        public deviation_msg: string,
        public ut_account: UTAccount[],
        public casa_ind: string,
        public last_update_date: string,
        public casa_account: CaseAccount[],
        public scheduler_msg: string,
        public foreigner_ind: string,
        public occupation_ind: string,
    ) {}
}
