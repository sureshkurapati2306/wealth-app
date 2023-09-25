import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartPortfolioComponent } from './chart-portfolio/chart-portfolio.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartFundPerformanceComponent } from './chart-fund-performance/chart-fund-performance.component';
import { ChartFundPerformanceGoogleComponent } from './chart-fund-performance-google/chart-fund-performance-google.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChartProgressComponent } from './chart-progress/chart-progress.component';
import { ChartHoldingsComponent } from './chart-holdings/chart-holdings.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GoogleChartsModule } from 'angular-google-charts';



@NgModule({
  declarations: [ChartPortfolioComponent, ChartFundPerformanceComponent,ChartHoldingsComponent,ChartProgressComponent,ChartFundPerformanceGoogleComponent],
  imports: [CommonModule, HighchartsChartModule, MatButtonToggleModule,MatProgressBarModule, GoogleChartsModule],
  exports: [ChartPortfolioComponent, ChartHoldingsComponent, ChartFundPerformanceComponent, ChartProgressComponent, ChartFundPerformanceGoogleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintChartModule {}
