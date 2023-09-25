import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureBatchFileSchedulerComponent } from './mint-office-feature-batch-file-scheduler.component';

const routes: Routes = [
  { 
    path: '', 
    component: MintOfficeFeatureBatchFileSchedulerComponent
  },
  {
    path: 'add-batch-file-scheduler', 
    loadChildren: () => import('./add-batch-file-scheduler/add-batch-file-scheduler.module').then(m => m.AddBatchFileSchedulerModule) 
  },
  {
    path: 'edit-batch-file-scheduler', 
    loadChildren: () => import('./add-batch-file-scheduler/add-batch-file-scheduler.module').then(m => m.AddBatchFileSchedulerModule) 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MintOfficeFeatureBatchFileSchedulerRoutingModule {}

// Export list of components to getting-started.module
// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [MintOfficeFeatureBatchFileSchedulerComponent];
