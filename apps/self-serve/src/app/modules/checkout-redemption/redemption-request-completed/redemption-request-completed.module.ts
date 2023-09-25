import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CHECKOUT_REDEMPTION_COMPLETED_COMPONENTS,
  CheckoutRedemptionCompletedRoutingModule,
} from './checkout-redemption-completed-routing.module';
import { MintCardModule } from '@cimb/mint';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CimbCommonModule } from '@cimb/common';

@NgModule({
  declarations: [...CHECKOUT_REDEMPTION_COMPLETED_COMPONENTS],
  imports: [
    CommonModule,
    CheckoutRedemptionCompletedRoutingModule,
    MintCardModule,
    MatSnackBarModule,
    MatButtonModule,
    CimbCommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RedemptionRequestCompletedModule {}
