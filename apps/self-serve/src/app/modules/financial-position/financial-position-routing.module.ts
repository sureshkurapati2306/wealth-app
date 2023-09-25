import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinancialPositionComponent } from './financial-position.component';

const routes: Routes = [{ path: '', component: FinancialPositionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialPositionRoutingModule {}

export const FINANCIAL_POSITION_COMPONENTS = [FinancialPositionComponent];
