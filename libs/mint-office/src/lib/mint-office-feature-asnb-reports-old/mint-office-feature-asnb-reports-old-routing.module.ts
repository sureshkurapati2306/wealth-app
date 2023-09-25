import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MintOfficeFeatureAsnbReportsOldComponent } from './mint-office-feature-asnb-reports-old.component';

const routes: Routes = [{ path: '', component: MintOfficeFeatureAsnbReportsOldComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MintOfficeFeatureAsnbReportsOldRoutingModule {}

export const BACK_OFFICE_COMPONENTS = [MintOfficeFeatureAsnbReportsOldComponent];
