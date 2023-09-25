import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCustomerSupport from '../+state/customer-support.reducer';
import * as fromActivityLog from '../+state/activity-log.reducer';
import * as fromUtActivity from '../+state/ut-activity.reducer';
import { CustomerSupportEffects } from '../+state/customer-support.effects';
import { ActivityLogEffects } from '../+state/activity-log.effects';
import { UtActivityEffects } from '../+state/ut-activity.effects';

import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerActivityLogComponent } from './customer-activity-log/customer-activity-log.component';
import { CustomerDetailRoutingModule } from './customer-detail-routing.module';
import { CustomerDetailShellComponent } from './customer-detail-shell/customer-detail-shell.component';
import { MintOfficeUiBreadcrumbsModule } from '../../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { CoreModule } from '../../core/core.module';
import { ActivityLogSearchFormComponent } from './activity-log-search-form/activity-log-search-form.component';
import { ActivityLogTableComponent } from './activity-log-table/activity-log-table.component';
import { ActivityLogTableSubComponent } from './activity-log-table-sub/activity-log-table-sub.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MintOfficeUiPaginatorModule } from '../../mint-office-ui-paginator/mint-office-ui-paginator.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
  declarations: [
    CustomerProfileComponent,
    CustomerActivityLogComponent,
    CustomerDetailShellComponent,
    ActivityLogSearchFormComponent,
    ActivityLogTableComponent,
    ActivityLogTableSubComponent
  ],
  imports: [
    CommonModule,
    CustomerDetailRoutingModule,
    MintOfficeUiBreadcrumbsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MintOfficeUiPaginatorModule,
    StoreModule.forFeature(fromCustomerSupport.customerSupportFeatureKey, fromCustomerSupport.reducer),
    StoreModule.forFeature(fromActivityLog.activityLogFeatureKey, fromActivityLog.reducer),
    StoreModule.forFeature(fromUtActivity.utActivityFeatureKey, fromUtActivity.reducer),
    EffectsModule.forFeature([CustomerSupportEffects, ActivityLogEffects, UtActivityEffects])
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class CustomerDetailModule { }
