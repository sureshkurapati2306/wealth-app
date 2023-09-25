import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvestmentGoalsComponent } from './investment-goals.component';

const routes: Routes = [{ path: '', component: InvestmentGoalsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentGoalsRoutingModule {}

export const INVESTMENT_GOALS_COMPONENTS = [InvestmentGoalsComponent];
