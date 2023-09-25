import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MintCardModule } from '@cimb/mint';
import { MatButtonModule } from '@angular/material/button';
import { CimbCommonModule } from '@cimb/common';
import {
  CartSwitchSummaryRoutingModule,
  CART_SWITCH_SUMMARY_COMPONENTS,
} from './cart-switch-summary-routing.module';

@NgModule({
  declarations: [...CART_SWITCH_SUMMARY_COMPONENTS],
  imports: [
    CommonModule,
    CartSwitchSummaryRoutingModule,
    MintCardModule,
    MatButtonModule,
    CimbCommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartSwitchSummaryModule {}
