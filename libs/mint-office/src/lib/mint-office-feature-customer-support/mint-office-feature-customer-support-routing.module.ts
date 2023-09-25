import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureCustomerSupportComponent } from './mint-office-feature-customer-support.component';

const routes: Routes = [
  { 
    path: '', 
    component: MintOfficeFeatureCustomerSupportComponent 
  },
  { 
    path: 'customer', 
    loadChildren: () => import('./customer-detail/customer-detail.module').then(m => m.CustomerDetailModule) 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintOfficeFeatureCustomerSupportRoutingModule { }
