import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitTrustDetailComponent } from './unit-trust-detail.component';

const routes: Routes = [{ path: '', component: UnitTrustDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitTrustDetailRoutingModule { }

// Export list of components to getting-started.module
// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [UnitTrustDetailComponent];