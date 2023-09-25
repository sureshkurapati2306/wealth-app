import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MintOfficeFeatureRefConfigComponent } from './mint-office-feature-ref-config.component';
import { MintOfficeFeatureRefConfingRoutingModule } from './mint-office-feature-ref-config-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { MintOfficeUiPaginatorModule } from '../mint-office-ui-paginator/mint-office-ui-paginator.module';
import { UnitTrustTransactionsEffects } from './+state/ref-config.effects';
import * as fromUnitTrustTransactions from './+state/ref-config.reducer';
import { SnackBarService } from '../core/services/snack-bar.service';
import { RefConfigListTableComponent } from './ref-config-list-table/ref-config-list-table.component';
import { RefSearchFormComponent } from './ref-search-form/ref-search-form.component';

@NgModule({
  declarations: [
    MintOfficeFeatureRefConfigComponent,
    RefConfigListTableComponent,
    RefSearchFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MintOfficeFeatureRefConfingRoutingModule,
    MintOfficeUiBreadcrumbsModule,
    MintOfficeUiPaginatorModule,
    CoreModule,
    StoreModule.forFeature(fromUnitTrustTransactions.unitTrustTransactionsFeatureKey, fromUnitTrustTransactions.reducer),
    EffectsModule.forFeature([UnitTrustTransactionsEffects]),
  ],
  providers: [
    SnackBarService,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintOfficeFeatureRefConfigModule { }
