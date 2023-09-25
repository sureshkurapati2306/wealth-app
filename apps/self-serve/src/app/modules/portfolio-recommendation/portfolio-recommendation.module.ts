import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    PortfolioRecommendationRoutingModule,
    PORTFOLIO_RECOMMENDATION_COMPONENTS,
} from './portfolio-recommendation-routing.module';
import { CimbCommonModule } from '@cimb/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { ChartComponent } from './chart/chart.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPortfolioReco from './+state/portfolio-reco.reducer';
import { PortfolioRecoEffects } from './+state/portfolio-reco.effects';
import { WealthDashboardEffects } from '../../core/state/wealth-dashboard/wealth-dashboard.effects';
import { TableAssetClassComponent } from './table-asset-class/table-asset-class.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FundListComponent } from './fund-list/fund-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterByStatusPipe } from './pipes/filter-by-status.pipe';
import { DialogFundsComponent } from './dialog/dialog-funds/dialog-funds.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
    declarations: [...PORTFOLIO_RECOMMENDATION_COMPONENTS, ChartComponent, TableAssetClassComponent, FundListComponent, FilterByStatusPipe, DialogFundsComponent],
    imports: [
        CommonModule,
        CimbCommonModule,
        MatCheckboxModule,
        MatExpansionModule,
        PortfolioRecommendationRoutingModule,
        HighchartsChartModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        FormsModule,
        MatTooltipModule,
        MatTableModule,
        MatButtonModule,
        MatSortModule,
        MatPaginatorModule,
        StoreModule.forFeature(
            fromPortfolioReco.PORTFOLIO_RECO_FEATURE_KEY,
            fromPortfolioReco.reducer
        ),
        EffectsModule.forFeature([PortfolioRecoEffects, WealthDashboardEffects]),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PortfolioRecommendationModule {}
