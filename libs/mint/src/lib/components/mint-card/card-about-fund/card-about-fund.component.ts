import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
@Component({
  selector: 'cimb-card-about-fund',
  templateUrl: './card-about-fund.component.html',
  styleUrls: ['./card-about-fund.component.scss'],
})
export class CardAboutFundComponent implements OnInit  {
    @Input() addClass: string;
    @Input() selectedFund;
    @Input() switchFundPopup: any;
    assetClassName;

    constructor(
      private _bottomSheet: MatBottomSheet
    ) { }

  ngOnInit() {
    this.assetClassName = this.selectedFund?.asset_class?.toLowerCase();
  }

  openNAVactionSheet(): void {
    const param = {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'NAV Price',
        actionContent:
          '<p>Net Asset Value (NAV) price tells you how much one unit of a fund is worth as of the stated date.</p>',
      },
    }
    this._bottomSheet.open(MobileTooltipComponent, param);
  }
}
