import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnabletoproceedPageComponent } from './unabletoproceed-page.component';

const routes: Routes = [{ path: '', component: UnabletoproceedPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnabletoproceedPageRoutingModule {}

// Export list of components to getting-started.module
// Manage components in one place
export const GETTING_STARTED_COMPONENTS = [UnabletoproceedPageComponent];
