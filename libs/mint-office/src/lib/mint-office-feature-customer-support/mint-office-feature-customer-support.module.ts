import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MintOfficeFeatureCustomerSupportRoutingModule } from './mint-office-feature-customer-support-routing.module';
import { MintOfficeFeatureCustomerSupportComponent } from './mint-office-feature-customer-support.component';
import { StoreModule } from '@ngrx/store';
import * as fromCustomerSupport from './+state/customer-support.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomerSupportEffects } from './+state/customer-support.effects';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CsSearchFormComponent } from './cs-search-form/cs-search-form.component';
import { CsListTableComponent } from './cs-list-table/cs-list-table.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MintOfficeUiPaginatorModule } from '../mint-office-ui-paginator/mint-office-ui-paginator.module';
import { SnackBarService } from '../core/services/snack-bar.service';
// import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    MintOfficeFeatureCustomerSupportComponent,
    CsSearchFormComponent,
    CsListTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MintOfficeFeatureCustomerSupportRoutingModule,
    MintOfficeUiBreadcrumbsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MintOfficeUiPaginatorModule,
    CoreModule,
    // MatSnackBarModule,
    StoreModule.forFeature(fromCustomerSupport.customerSupportFeatureKey, fromCustomerSupport.reducer),
    EffectsModule.forFeature([CustomerSupportEffects])
  ],
  providers: [SnackBarService]
})
export class MintOfficeFeatureCustomerSupportModule { }
