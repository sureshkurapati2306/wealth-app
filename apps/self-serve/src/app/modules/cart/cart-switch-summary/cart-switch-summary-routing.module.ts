import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartSwitchSummaryComponent } from './cart-switch-summary.component';
const routes: Routes = [{ path: '', component: CartSwitchSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartSwitchSummaryRoutingModule {}

export const CART_SWITCH_SUMMARY_COMPONENTS = [CartSwitchSummaryComponent];
