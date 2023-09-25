import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectInvestmentOptionsComponent } from './select-investment-options.component';

const routes: Routes = [
  { path: '', component: SelectInvestmentOptionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectInvestmentOptionsRoutingModule {}

export const SELECT_INVESTMENT_OPTIONS_COMPONENTS = [
  SelectInvestmentOptionsComponent,
];
