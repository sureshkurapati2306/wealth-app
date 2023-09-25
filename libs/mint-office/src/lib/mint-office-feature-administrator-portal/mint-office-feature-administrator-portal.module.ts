import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MintOfficeFeatureAdministratorPortalRoutingModule } from './mint-office-feature-administrator-portal-routing.module';
import { MintOfficeFeatureAdministratorPortalComponent } from './mint-office-feature-administrator-portal.component';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAdministratorPortal from './+state/administrator-portal.reducer';
import { AdministratorPortalEffects } from './+state/administrator-portal.effects';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [MintOfficeFeatureAdministratorPortalComponent],
    imports: [
        CommonModule,
        MintOfficeFeatureAdministratorPortalRoutingModule,
        MintOfficeUiBreadcrumbsModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        StoreModule.forFeature(
            fromAdministratorPortal.ADMINISTRATOR_PORTAL_FEATURE_KEY,
            fromAdministratorPortal.reducer,
        ),
        EffectsModule.forFeature([AdministratorPortalEffects]),
    ],
})
export class MintOfficeFeatureAdministratorPortalModule {}
