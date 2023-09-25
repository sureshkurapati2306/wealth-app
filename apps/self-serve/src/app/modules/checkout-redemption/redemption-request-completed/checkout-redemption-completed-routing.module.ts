import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedemptionRequestCompletedComponent } from './redemption-request-completed.component';

const routes: Routes = [
  { path: '', component: RedemptionRequestCompletedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRedemptionCompletedRoutingModule {}

export const CHECKOUT_REDEMPTION_COMPLETED_COMPONENTS = [
  RedemptionRequestCompletedComponent,
];
