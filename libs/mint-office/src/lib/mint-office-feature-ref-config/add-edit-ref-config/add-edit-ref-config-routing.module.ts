import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditRefConfigComponent } from './add-edit-ref-config.component';

const routes: Routes = [{ path: '', component: AddEditRefConfigComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditRefConfigRoutingModule {}

// Export list of components to getting-started.module
// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [AddEditRefConfigComponent];
