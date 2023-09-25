import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureRefConfigComponent } from './mint-office-feature-ref-config.component';

const routes: Routes = [
  { 
    path: '', 
    component: MintOfficeFeatureRefConfigComponent
  },
  {
    path: 'add-ref-config', 
    loadChildren: () => import('./add-edit-ref-config/add-edit-ref-config.module').then(m => m.AddEditRefConfigModule) 
  },

  {
    path: 'edit-ref-config', 
    loadChildren: () => import('./add-edit-ref-config/add-edit-ref-config.module').then(m => m.AddEditRefConfigModule) 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MintOfficeFeatureRefConfingRoutingModule {}

// Export list of components to getting-started.module
// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [MintOfficeFeatureRefConfigComponent];
