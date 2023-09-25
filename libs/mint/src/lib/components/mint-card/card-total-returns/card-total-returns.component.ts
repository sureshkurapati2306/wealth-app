import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';


@Component({
  selector: 'cimb-card-total-returns',
  templateUrl: './card-total-returns.component.html',
  styleUrls: ['./card-total-returns.component.scss'],
})
export class CardTotalReturnsComponent implements OnInit {
  @Input() title = ' ';
  @Input() gainOrLoss = false;
  @Input() percentage = '';
  @Input() amount = '';
  @Input() toolTip = '';
  image = 'chart-increase';
  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    this.image = this.gainOrLoss ? 'chart-increase' : 'chart-decrease';
  }
  openBottomSheet(): void {
    this._bottomSheet.open(MobileTooltipComponent, {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Total Return',
        actionContent:
          '<p>These are the gains or losses on your investments. It is calculated by subtracting the Total Invested from Current Investment Value.</p>',
      },
    });
  }
}
