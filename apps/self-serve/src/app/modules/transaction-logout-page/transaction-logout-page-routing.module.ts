import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionLogoutPageComponent } from './transaction-logout-page.component';

const routes: Routes = [{ path: '', component: TransactionLogoutPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionLogoutPageRoutingModule {}

// Export list of components to getting-started.module
// Manage components in one place
export const GETTING_STARTED_COMPONENTS = [TransactionLogoutPageComponent];
