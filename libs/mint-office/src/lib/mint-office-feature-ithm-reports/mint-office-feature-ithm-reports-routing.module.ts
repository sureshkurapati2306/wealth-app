import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureIthmReportsComponent } from './mint-office-feature-ithm-reports.component';

const routes: Routes = [{ path: '', component: MintOfficeFeatureIthmReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintOfficeFeatureIthmReportsRoutingModule { }

// Export list of components to getting-started.module
// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [MintOfficeFeatureIthmReportsComponent];