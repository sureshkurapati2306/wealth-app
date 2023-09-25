import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBatchFileSchedulerComponent } from './add-batch-file-scheduler.component';

const routes: Routes = [{ path: '', component: AddBatchFileSchedulerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBatchFileSchedulerRoutingModule {}

// Export list of components to getting-started.module
// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [AddBatchFileSchedulerComponent];
