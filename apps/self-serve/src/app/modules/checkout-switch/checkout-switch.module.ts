import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CheckoutSwitchRoutingModule,
  CHECKOUT_SWITCH_COMPONENTS,
} from './checkout-switch-routing.module';
import { CimbCommonModule } from '@cimb/common';
import { MintCardModule } from '@cimb/mint';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [...CHECKOUT_SWITCH_COMPONENTS],
  imports: [
    CommonModule,
    CheckoutSwitchRoutingModule,
    MintCardModule,
    MatSnackBarModule,
    MatButtonModule,
    CimbCommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckoutSwitchModule {}
