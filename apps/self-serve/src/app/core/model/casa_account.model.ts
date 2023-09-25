export class CaseAccount {
  constructor(
    public casa_account_balance: string,
    public casa_account_format: string,
    public casa_account_name: string,
    public casa_account_no: string,

    public name: string,
    public account: string,
    public accountNumber: string,
    public isActive: boolean,
    public hasJointAccount: boolean,

  ) {}
}
