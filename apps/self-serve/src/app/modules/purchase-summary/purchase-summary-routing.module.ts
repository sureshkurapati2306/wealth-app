import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchaseSummaryComponent } from './purchase-summary.component';

const routes: Routes = [{ path: '', component: PurchaseSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseSummaryRoutingModule {}

export const PURCHASE_SUMMARY_COMPONENTS = [PurchaseSummaryComponent];
