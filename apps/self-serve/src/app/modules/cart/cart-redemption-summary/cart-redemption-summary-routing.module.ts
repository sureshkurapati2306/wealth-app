import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartRedemptionSummaryComponent } from './cart-redemption-summary.component';
const routes: Routes = [
  { path: '', component: CartRedemptionSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRedemptionSummaryRoutingModule {}

export const CART_REDEMPTION_SUMMARY_COMPONENTS = [
  CartRedemptionSummaryComponent,
];
