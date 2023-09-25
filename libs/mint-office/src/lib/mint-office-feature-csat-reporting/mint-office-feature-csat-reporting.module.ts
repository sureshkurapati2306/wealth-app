import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MintOfficeFeatureCsatReportingRoutingModule,
    BACK_OFFICE_COMPONENTS,
} from './mint-office-feature-csat-reporting-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as csatReportSettings from './+state/csat-report.reducer';
import * as csatReportSettingsEffects from './+state/csat-report.effects';

@NgModule({
    declarations: [BACK_OFFICE_COMPONENTS],
    imports: [
        CommonModule,
        MintOfficeFeatureCsatReportingRoutingModule,
        MatInputModule,
        MatChipsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatTabsModule,
        MatDatepickerModule,
        MintOfficeUiBreadcrumbsModule,
        StoreModule.forFeature(
            csatReportSettings.csatReportFeatureKey,
            csatReportSettings.csatReportReducer,
        ),
        EffectsModule.forFeature([csatReportSettingsEffects.CsatReportEffects]),
        FormsModule,
        ReactiveFormsModule 
    ],
})
export class MintOfficeFeatureCsatReportingModule {}
