import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CartRoutingModule, CART_COMPONENTS } from './cart-routing.module';
import { MintCardModule } from '@cimb/mint';
import { MatButtonModule } from '@angular/material/button';
import { CimbCommonModule } from '@cimb/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CartService } from '../../core/services/cart/cart.service';

@NgModule({
  declarations: [...CART_COMPONENTS],
  imports: [
    CommonModule,
    CartRoutingModule,
    MintCardModule,
    MatButtonModule,
    CimbCommonModule,
    MatDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CartService, DecimalPipe],
})
export class CartModule {}
