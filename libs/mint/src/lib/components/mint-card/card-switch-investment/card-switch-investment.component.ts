import { Component, Input } from '@angular/core';

@Component({
  selector: 'cimb-card-switch-investment',
  templateUrl: './card-switch-investment.component.html',
  styleUrls: ['./card-switch-investment.component.scss'],
})
export class CardSwitchInvestmentComponent {
  @Input() cardTitle: string;

  @Input() switchOutAssetType: string;
  @Input() switchOutFundName: string;
  @Input() switchOutUnits: number;
  @Input() switchOutAmount: number;

  @Input() switchInAssetType: string;
  @Input() switchInFundName: string;
  @Input() switchInUnits: number;
  @Input() switchInAmount: number;
  @Input() switchingFee: number;
  @Input() netSwitchInAmount: number;
}
