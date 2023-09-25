import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MintOfficeFeatureAsnbReportsOldRoutingModule,
    BACK_OFFICE_COMPONENTS,
} from './mint-office-feature-asnb-reports-old-routing.module';

import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [BACK_OFFICE_COMPONENTS],
    imports: [
        CommonModule,
        MintOfficeFeatureAsnbReportsOldRoutingModule,
        MintOfficeUiBreadcrumbsModule,
        MatButtonModule,
    ],
})
export class MintOfficeFeatureAsnbReportsOldModule {}
