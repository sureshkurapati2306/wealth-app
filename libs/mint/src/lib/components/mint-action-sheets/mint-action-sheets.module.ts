import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MobileTooltipComponent } from './mobile-tooltip/mobile-tooltip.component';

@NgModule({
  declarations: [MobileTooltipComponent],
  imports: [CommonModule, MatBottomSheetModule],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintActionSheetsModule {}
