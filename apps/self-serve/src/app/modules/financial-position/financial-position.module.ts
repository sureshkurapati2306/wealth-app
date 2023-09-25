import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FinancialPositionRoutingModule,
  FINANCIAL_POSITION_COMPONENTS,
} from './financial-position-routing.module';

@NgModule({
  declarations: [...FINANCIAL_POSITION_COMPONENTS],
  imports: [CommonModule, FinancialPositionRoutingModule],
})
export class FinancialPositionModule {}
