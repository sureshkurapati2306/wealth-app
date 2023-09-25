import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  RecommendedAssetsFundsRoutingModule,
  RECOMMENDED_ASSETS_COMPONENTS,
} from './recommended-assets-funds-routing.module';

@NgModule({
  declarations: [...RECOMMENDED_ASSETS_COMPONENTS],
  imports: [CommonModule, RecommendedAssetsFundsRoutingModule],
})
export class RecommendedAssetsFundsModule {}
