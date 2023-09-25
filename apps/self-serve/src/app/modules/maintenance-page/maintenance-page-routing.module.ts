import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenancePageComponent } from './maintenance-page.component';

const routes: Routes = [{ path: '', component: MaintenancePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePageRoutingModule {}

// Export list of components to getting-started.module
// Manage components in one place
export const GETTING_STARTED_COMPONENTS = [MaintenancePageComponent];
