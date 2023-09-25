import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MintCardModule } from '@cimb/mint';
import { MatButtonModule } from '@angular/material/button';
import { CimbCommonModule } from '@cimb/common';
import {
  CartRedemptionSummaryRoutingModule,
  CART_REDEMPTION_SUMMARY_COMPONENTS,
} from './cart-redemption-summary-routing.module';

@NgModule({
  declarations: [...CART_REDEMPTION_SUMMARY_COMPONENTS],
  imports: [
    CommonModule,
    CartRedemptionSummaryRoutingModule,
    MintCardModule,
    MatButtonModule,
    CimbCommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartRedemptionSummaryModule {}
