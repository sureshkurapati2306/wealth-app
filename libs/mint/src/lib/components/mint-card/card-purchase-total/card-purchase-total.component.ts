import { Component, Input } from '@angular/core';

@Component({
  selector: 'cimb-card-purchase-total',
  templateUrl: './card-purchase-total.component.html',
  styleUrls: ['./card-purchase-total.component.scss'],
})
export class CardPurchaseTotalComponent {
  @Input() totalFund: number;
  @Input() totalSalesCharge: number;
  @Input() totalBankCharge: number;
  @Input() totalNetInvestmentAmount: number;
  @Input() totalAmount: number;

  @Input() cardTitle: string;

  @Input() isNeededOnPage = true;

  @Input() totalLabel: string;

  @Input() isForRedemption = true;

  @Input() totalRedemptionUnits: number;

  @Input() totalRedemptionAmount: number;

  @Input() totalSwitchOutUnits: number;

  @Input() totalSwitchInUnits: number;
  
  @Input() flow: string;

  @Input() isForAsnbCheckout = false;

  @Input() asnbFundName: string;

  @Input() asnbFundCategory: string;
}
