export class User {
  constructor(
    public customer_name: string,
    public customer_id: string,
    public customer_id_type: string,
    public debit_card_no: number,
    public dashbordData: number,
    public lastSeen: string,
    public story:string,
    public sole_prop: string,
    public invertment_indicator: string,
    public casa_indicator: string,
    public risk_profile: string,
    public customer_mobile_no: string,
    public cimb_staff: string,
    public join_or_ut_account: string,
    public join_and_ut_account: string,
    public cifNumber?: string,
    public utAccNo? : string,
  ) {}
}
