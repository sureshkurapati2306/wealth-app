import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureHomeComponent } from './mint-office-feature-home.component';

const routes: Routes = [{ path: '', component: MintOfficeFeatureHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintOfficeFeatureHomeRoutingModule { }

// Export list of components to getting-started.module
// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [MintOfficeFeatureHomeComponent];