import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'cimb-mobile-tooltip',
  templateUrl: './mobile-tooltip.component.html',
  styleUrls: ['./mobile-tooltip.component.scss'],
})
export class MobileTooltipComponent implements OnInit {
  constructor(
    private _bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any
  ) {}

  actionHeading = '';
  actionContent = '';
  buttonRed = false;

  ngOnInit(): void {
    this.actionHeading = this.data?.actionHeading;
    this.actionContent = this.data?.actionContent;
    this.buttonRed = this.data?.buttonRed;
  }
  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }
}
