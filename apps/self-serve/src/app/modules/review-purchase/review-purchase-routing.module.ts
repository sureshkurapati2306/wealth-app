import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewPurchaseComponent } from './review-purchase.component';

const routes: Routes = [{ path: '', component: ReviewPurchaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewPurchaseRoutingModule {}

export const REVIEW_PURCHASE_COMPONENTS = [ReviewPurchaseComponent];
