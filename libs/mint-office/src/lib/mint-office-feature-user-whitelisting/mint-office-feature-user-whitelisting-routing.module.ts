import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureUserWhitelistingComponent } from './mint-office-feature-user-whitelisting.component';

const routes: Routes = [
  {
    path: '',
    component: MintOfficeFeatureUserWhitelistingComponent
  },
   {
    path: 'add-new', 
    loadChildren: () => import('./add-new/add-new.module').then(m => m.AddNewModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintOfficeFeatureUserWhitelistingRoutingModule { }

// Manage components in one place
export const BACK_OFFICE_COMPONENTS_USER_WHITELISTING = [MintOfficeFeatureUserWhitelistingComponent];
