import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MintButtonModule,
  MintCardModule,
  MintBoxModule,
  MintTabsModule,
  MintTableModule,
  MintChartModule
} from '@cimb/mint';

import {
  WealthDashboardRoutingModule,
  DASHBOARD_COMPONENTS,
} from './wealth-dashboard-routing.module';
import { CimbCommonModule } from '@cimb/common';
import { StoreModule } from '@ngrx/store';
import * as fromWealthDashboard from '../../core/state/wealth-dashboard/wealth-dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WealthDashboardEffects } from '../../core/state/wealth-dashboard/wealth-dashboard.effects';
import {
  DirectivesModule
  } from '@cimb/common';
import { AsnbEffects } from '../asnb/+state/asnb.effects';

@NgModule({
  declarations: [...DASHBOARD_COMPONENTS],
  imports: [
    CommonModule,
    WealthDashboardRoutingModule,
    MintCardModule,
    MintButtonModule,
    MintTabsModule,
    MintBoxModule,
    MintChartModule,
    CimbCommonModule,
    MintTableModule,DirectivesModule,
    StoreModule.forFeature(fromWealthDashboard.wealthDashboardFeatureKey, fromWealthDashboard.reducer),
    EffectsModule.forFeature([WealthDashboardEffects])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WealthDashboardModule {}
