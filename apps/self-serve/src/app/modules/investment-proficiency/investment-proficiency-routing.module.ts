import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvestmentProficiencyComponent } from './investment-proficiency.component';

const routes: Routes = [
  { path: '', component: InvestmentProficiencyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentProficiencyRoutingModule {}

export const INVESTMENT_PROFICIENCY_COMPONENTS = [
  InvestmentProficiencyComponent,
];
