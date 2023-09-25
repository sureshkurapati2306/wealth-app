import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendedAssetsFundsComponent } from './recommended-assets-funds.component';

const routes: Routes = [
  { path: '', component: RecommendedAssetsFundsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedAssetsFundsRoutingModule {}

export const RECOMMENDED_ASSETS_COMPONENTS = [RecommendedAssetsFundsComponent];
