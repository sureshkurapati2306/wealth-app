import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentAssetsPortfolioRoutingModule } from './investment-assets-portfolio-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, InvestmentAssetsPortfolioRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InvestmentAssetsPortfolioModule {}
