import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import {
  MintOfficeFeatureHomeRoutingModule,
  BACK_OFFICE_COMPONENTS,
} from './mint-office-feature-home-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './+state/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './+state/dashboard.effects';
@NgModule({
  declarations: [BACK_OFFICE_COMPONENTS],
  imports: [
    CommonModule,
    MintOfficeFeatureHomeRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonToggleModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    StoreModule.forFeature(fromDashboard.dashboardFeatureKey, fromDashboard.reducer),
    EffectsModule.forFeature([DashboardEffects])
  ],
})
export class MintOfficeFeatureHomeModule {}
