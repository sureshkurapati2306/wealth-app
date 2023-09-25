import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import {
    MintOfficeFeatureAsnbReportsRoutingModule,
    BACK_OFFICE_COMPONENTS,
} from './mint-office-feature-asnb-reports-routing.module';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MatDateFormats,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromAsnbReport from './+state/asnb-report.reducer';
import { MintOfficeUiPaginatorModule } from '../mint-office-ui-paginator/mint-office-ui-paginator.module';
import { AsnbReportEffects } from './+state/asnb-report.effects';

export const MY_FORMATS_ASNB: MatDateFormats = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'DD MMM YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

@NgModule({
    declarations: [BACK_OFFICE_COMPONENTS],
    imports: [
        CommonModule,
        MintOfficeFeatureAsnbReportsRoutingModule,
        MintOfficeUiBreadcrumbsModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatPaginatorModule,
        MatIconModule,
        MintOfficeUiPaginatorModule,
        CoreModule,
        EffectsModule.forFeature([AsnbReportEffects]),
        StoreModule.forFeature(fromAsnbReport.asnbReportFeatureKey, fromAsnbReport.reducer),
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_ASNB },
    ],
})
export class MintOfficeFeatureAsnbReportsModule {}
