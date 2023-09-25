import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutPageComponent } from './logout-page.component';

const routes: Routes = [{ path: '', component: LogoutPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutPageRoutingModule {}

// Export list of components to getting-started.module
// Manage components in one place
export const GETTING_STARTED_COMPONENTS = [LogoutPageComponent];
