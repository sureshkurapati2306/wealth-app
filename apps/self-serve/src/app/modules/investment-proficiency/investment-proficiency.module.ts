import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  InvestmentProficiencyRoutingModule,
  INVESTMENT_PROFICIENCY_COMPONENTS,
} from './investment-proficiency-routing.module';

@NgModule({
  declarations: [...INVESTMENT_PROFICIENCY_COMPONENTS],
  imports: [CommonModule, InvestmentProficiencyRoutingModule],
})
export class InvestmentProficiencyModule {}
