import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureCsatReportingComponent } from './mint-office-feature-csat-reporting.component';

const routes: Routes = [
  {
    path: '',
    component: MintOfficeFeatureCsatReportingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintOfficeFeatureCsatReportingRoutingModule { }

// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [MintOfficeFeatureCsatReportingComponent];
