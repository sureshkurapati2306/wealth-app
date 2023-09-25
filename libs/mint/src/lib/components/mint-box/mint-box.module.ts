import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxPortfolioComponent } from './box-portfolio/box-portfolio.component';
import { BoxWealthComponent } from './box-wealth/box-wealth.component';
import { BoxInvestmentComponent } from './box-investment/box-investment.component';
import { MintTableModule } from '../mint-table/mint-table.module';
import { MintAlertModule } from '../mint-alert/mint-alert.module';
import { BoxRiskProfileComponent } from './box-risk-profile/box-risk-profile.component';
import {BoxProductWealthComponent} from './box-product-wealth/box-product-wealth.component';
import { MintChartModule } from '../mint-chart/mint-chart.module';
import { BoxSelectComponent } from './box-select/box-select.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BoxLoanCardsComponent } from './box-loan-cards/box-loan-cards.component';
import { CoreModule } from '@cimb/core';

@NgModule({
  declarations: [BoxPortfolioComponent, BoxRiskProfileComponent, BoxInvestmentComponent,BoxLoanCardsComponent,BoxSelectComponent,BoxProductWealthComponent,BoxWealthComponent],
  imports: [CommonModule,MatTooltipModule, MintTableModule, MintAlertModule, MintChartModule, CoreModule],
  exports: [BoxPortfolioComponent,BoxInvestmentComponent,BoxLoanCardsComponent, BoxRiskProfileComponent, BoxSelectComponent,BoxProductWealthComponent,BoxWealthComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintBoxModule {}
