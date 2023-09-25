import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemdowntimePageComponent } from './systemdowntime-page.component';

const routes: Routes = [{ path: '', component: SystemdowntimePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemdowntimePageRoutingModule {}

// Export list of components to getting-started.module
// Manage components in one place
export const GETTING_STARTED_COMPONENTS = [SystemdowntimePageComponent];
