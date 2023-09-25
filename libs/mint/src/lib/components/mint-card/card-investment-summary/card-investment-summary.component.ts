import { Component, Input } from '@angular/core';
import { FundCart } from '@cimb/shared/models';

@Component({
  selector: 'cimb-card-investment-summary',
  templateUrl: './card-investment-summary.component.html',
  styleUrls: ['./card-investment-summary.component.scss'],
})

export class CardInvestmentSummaryComponent {

  @Input() investments: FundCart[] = [];
  @Input() cardTitle: string;
  @Input() totalInvestmentItems: number;
  @Input() redemptionUnits: number;
  @Input() redemptionAmount: number;

  @Input() isNeededOnPage = true;

  @Input() cimbStaff: 'N';
  @Input() showAssetClass = true;
  @Input() showRiskProfile = true;
  @Input() flow = '';
}
