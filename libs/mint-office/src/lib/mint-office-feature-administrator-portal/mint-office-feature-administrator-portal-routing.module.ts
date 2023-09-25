import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureAdministratorPortalComponent } from './mint-office-feature-administrator-portal.component';

const routes: Routes = [
  { 
    path: '', 
    component: MintOfficeFeatureAdministratorPortalComponent
  },
  {
    path: 'add-user', 
    loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintOfficeFeatureAdministratorPortalRoutingModule { }
