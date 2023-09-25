import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  InvestmentGoalsRoutingModule,
  INVESTMENT_GOALS_COMPONENTS,
} from './investment-goals-routing.module';

@NgModule({
  declarations: [...INVESTMENT_GOALS_COMPONENTS],
  imports: [CommonModule, InvestmentGoalsRoutingModule],
})
export class InvestmentGoalsModule {}
