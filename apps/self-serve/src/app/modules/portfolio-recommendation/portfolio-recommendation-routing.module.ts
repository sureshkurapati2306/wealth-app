import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioRecommendationComponent } from './portfolio-recommendation.component';

const routes: Routes = [{ path: '', component: PortfolioRecommendationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRecommendationRoutingModule { }

export const PORTFOLIO_RECOMMENDATION_COMPONENTS = [PortfolioRecommendationComponent];
