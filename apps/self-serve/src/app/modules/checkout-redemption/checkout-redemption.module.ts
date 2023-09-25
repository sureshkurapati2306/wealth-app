import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CimbCommonModule } from '@cimb/common';
import {
  CHECKOUT_REDEMPTION_COMPONENTS,
  CheckoutRedemptionRoutingModule,
} from './checkout-redemption-routing.module';
import { MintCardModule, MintSelectModule } from '@cimb/mint';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [...CHECKOUT_REDEMPTION_COMPONENTS],
  imports: [
    CommonModule,
    CimbCommonModule,
    CheckoutRedemptionRoutingModule,
    MintCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MintSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckoutRedemptionModule {}
