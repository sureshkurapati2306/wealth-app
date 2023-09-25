import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MintOfficeFeatureIthmReportsRoutingModule,
    BACK_OFFICE_COMPONENTS,
  } from './mint-office-feature-ithm-reports-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';

@NgModule({
    declarations: [BACK_OFFICE_COMPONENTS],
    imports: [
        MintOfficeFeatureIthmReportsRoutingModule,
        CommonModule,
        MatButtonModule,
        MintOfficeUiBreadcrumbsModule
    ],
})
export class MintOfficeFeatureIthmReportsModule {}
