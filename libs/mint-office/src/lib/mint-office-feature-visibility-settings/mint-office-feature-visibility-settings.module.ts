import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MintOfficeFeatureVisibilitySettingsRoutingModule,
    BACK_OFFICE_COMPONENTS,
} from './mint-office-feature-visibility-settings-routing.module';
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
import * as fromVisibilitySettings from './+state/visibility-settings.reducer';
import { VisibilitySettingsEffects } from './+state/visibility-settings.effects';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardPopupComponent } from './dashboard-popup/dashboard-popup.component';
import { FormsModule } from '@angular/forms'; 
import { DashboardPopupEffects } from './dashboard-popup/+state/dashboard-popup.effects'
import * as dashboardPopUpTransactions from './dashboard-popup/+state/dashboard-popup.reducer';
import { BatchDirectoryComponent } from './batch-directory/batch-directory.component';
import { MintOfficeUiPaginatorModule } from '../mint-office-ui-paginator/mint-office-ui-paginator.module';
import { BatchDirectoryEffects } from './batch-directory/+state/batch-directory.effects';

@NgModule({
    declarations: [BACK_OFFICE_COMPONENTS, DashboardPopupComponent, BatchDirectoryComponent],
    imports: [
        CommonModule,
        MintOfficeFeatureVisibilitySettingsRoutingModule,
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
        MintOfficeUiBreadcrumbsModule,
        MintOfficeUiPaginatorModule,
        StoreModule.forFeature(
            fromVisibilitySettings.VISIBILITY_SETTINGS_FEATURE_KEY,
            fromVisibilitySettings.reducer,
        ),
        StoreModule.forFeature(dashboardPopUpTransactions.DashboardPopupTransactionFeatureKey, dashboardPopUpTransactions.dashboardPopupReducer),
        EffectsModule.forFeature([VisibilitySettingsEffects,DashboardPopupEffects, BatchDirectoryEffects]),
        FormsModule
    ],
})
export class MintOfficeFeatureVisibilitySettingsModule {}
