import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CimbCommonModule } from '@cimb/common';
import {
  PurchaseSummaryRoutingModule,
  PURCHASE_SUMMARY_COMPONENTS,
} from './purchase-summary-routing.module';
import { MintCardModule } from '@cimb/mint';

@NgModule({
  declarations: [...PURCHASE_SUMMARY_COMPONENTS],
  imports: [
    CommonModule,
    PurchaseSummaryRoutingModule,
    CimbCommonModule,
    MintCardModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PurchaseSummaryModule {}
