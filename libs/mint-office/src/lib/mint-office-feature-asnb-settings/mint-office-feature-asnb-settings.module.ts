import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import {
    ASNB_SETTINGS,
    MintOfficeFeatureAsnbSettingsRoutingModule,
} from './mint-office-feature-asnb-settings-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AsnbSettingsEffects } from './+state/asnb-settings.effects';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ScheduledDowntimeTableComponent } from './scheduled-downtime-table/scheduled-downtime-table.component';
import { FundSuspensionTableComponent } from './fund-suspension-table/fund-suspension-table.component';
import { OperationHoursTableComponent } from './operation-hours-table/operation-hours-table.component';
import { FundLibraryTableComponent } from './fund-library-table/fund-library-table.component';
import { TransactionLimitTableComponent } from './transaction-limit/transaction-limit-table.component';
import { TableAllFundsComponent } from './transaction-limit/table-all-funds/table-all-funds.component';
import { TableIndividualFundsComponent } from './transaction-limit/table-individual-funds/table-individual-funds.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduledDowntimeFormComponent } from './scheduled-downtime-form/scheduled-downtime-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DatePickerModule } from '../core/adapter/datepicker.module';
import { MatChipsModule } from '@angular/material/chips';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import {
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import * as fromAsnbSettings from './+state/asnb-settings.reducer';
import { MintOfficeUiSearchBar } from '../mint-office-ui-search-bar/mint-office-ui-search-bar.module';
import { UrlMaintenanceTableComponent } from './url-maintenance-table/url-maintenance-table.component';
import { UrlMaintenanceFormComponent } from './url-maintenance-form/url-maintenance-form.component';
import { TimeConversionPipe } from '../core/pipes/time-conversion.pipe';

@NgModule({
    declarations: [
        ASNB_SETTINGS,
        ScheduledDowntimeTableComponent,
        ScheduledDowntimeFormComponent,
        FundSuspensionTableComponent,
        OperationHoursTableComponent,
        FundLibraryTableComponent,
        UrlMaintenanceTableComponent,
        UrlMaintenanceFormComponent,
        TransactionLimitTableComponent,
        TableAllFundsComponent,
        TableIndividualFundsComponent,
        TimeConversionPipe,
    ],
    imports: [
        MintOfficeFeatureAsnbSettingsRoutingModule,
        CommonModule,
        MintOfficeUiBreadcrumbsModule,
        MatTabsModule,
        MatTableModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        NgxMatDatetimePickerModule,
        MatIconModule,
        MatDatepickerModule,
        MintOfficeFeatureAsnbSettingsRoutingModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatIconModule,
        DatePickerModule,
        MatInputModule,
        MatSnackBarModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTableModule,
        MintOfficeUiSearchBar,
        MatChipsModule,
        EffectsModule.forFeature([AsnbSettingsEffects]),
        StoreModule.forFeature(fromAsnbSettings.asnbSettingsFeatureKey, fromAsnbSettings.reducer),
    ],
})
export class MintOfficeFeatureAsnbSettingsModule {}
