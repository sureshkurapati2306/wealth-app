import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';

@Component({
  selector: 'cimb-card-current-value',
  templateUrl: './card-current-value.component.html',
  styleUrls: ['./card-current-value.component.scss'],
})
export class CardCurrentValueComponent {
  @Input() title = '';
  @Input() currency = '';
  @Input() amount = '';
  @Input() toolTip = '';

  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(MobileTooltipComponent, {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Current Investment Value',
        actionContent:
          '<p>This equals your total amount invested plus your total returns. It represents the current worth of all your funds combined.</p>',
      },
    });
  }
}
