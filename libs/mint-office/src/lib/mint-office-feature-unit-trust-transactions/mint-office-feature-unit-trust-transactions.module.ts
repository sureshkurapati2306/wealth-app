import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BACK_OFFICE_COMPONENTS, MintOfficeFeatureUnitTrustTransactionsRoutingModule } from './mint-office-feature-unit-trust-transactions-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromUnitTrustTransactions from './+state/unit-trust-transactions.reducer';
import * as fromSmsDeliveryLog from 'libs/mint-office/src/lib/mint-office-feature-sms-delivery-log/+state/sms-delivery-log.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UnitTrustTransactionsEffects } from './+state/unit-trust-transactions.effects';
import { SmsDeliveryLogEffects } from 'libs/mint-office/src/lib/mint-office-feature-sms-delivery-log/+state/sms-delivery-log.effects';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CoreModule } from '../core/core.module';
import { MintOfficeUiPaginatorModule } from '../mint-office-ui-paginator/mint-office-ui-paginator.module';
import { SnackBarService } from '../core/services/snack-bar.service';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DownloadService } from '../core/services/json-to-csv.service';

export const MY_FORMATS:MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'D MMM YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@NgModule({
  declarations: [BACK_OFFICE_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MintOfficeFeatureUnitTrustTransactionsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    // MatSnackBarModule,
    MintOfficeUiBreadcrumbsModule,
    MintOfficeUiPaginatorModule,
    CoreModule,
    StoreModule.forFeature(fromUnitTrustTransactions.unitTrustTransactionsFeatureKey, fromUnitTrustTransactions.reducer),
    StoreModule.forFeature(fromSmsDeliveryLog.smsDeliveryFeatureKey, fromSmsDeliveryLog.reducer),
    EffectsModule.forFeature([UnitTrustTransactionsEffects, SmsDeliveryLogEffects]),
  ],
  providers: [
    SnackBarService,
    DownloadService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class MintOfficeFeatureUnitTrustTransactionsModule { }
