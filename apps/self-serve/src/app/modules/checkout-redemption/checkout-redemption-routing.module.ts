import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutRedemptionComponent } from './checkout-redemption.component';

const routes: Routes = [{ path: '', component: CheckoutRedemptionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRedemptionRoutingModule {}

export const CHECKOUT_REDEMPTION_COMPONENTS = [CheckoutRedemptionComponent];
