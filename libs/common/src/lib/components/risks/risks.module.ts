import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskProfileSummaryCardComponent } from './risk-profile-summary-card/risk-profile-summary-card.component';
import { RecommendedAssetsChartComponent } from './recommended-assets-chart/recommended-assets-chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { EstimatedReturnsGraphComponent } from './estimated-returns-graph/estimated-returns-graph.component';

@NgModule({
    declarations: [
        RiskProfileSummaryCardComponent,
        RecommendedAssetsChartComponent,
        EstimatedReturnsGraphComponent,
    ],
    imports: [CommonModule, GoogleChartsModule],
    exports: [
        RiskProfileSummaryCardComponent,
        RecommendedAssetsChartComponent,
        EstimatedReturnsGraphComponent,
    ],
})
export class RisksModule {}
