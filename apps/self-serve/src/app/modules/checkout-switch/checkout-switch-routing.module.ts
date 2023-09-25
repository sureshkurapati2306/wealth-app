import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutSwitchComponent } from './checkout-switch.component';

const routes: Routes = [{ path: '', component: CheckoutSwitchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckoutSwitchRoutingModule {}

export const CHECKOUT_SWITCH_COMPONENTS = [CheckoutSwitchComponent];
