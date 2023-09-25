import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerActivityLogComponent } from './customer-activity-log/customer-activity-log.component';
import { CustomerDetailShellComponent } from './customer-detail-shell/customer-detail-shell.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

const routes: Routes = [
  { 
    path: '', 
    component: CustomerDetailShellComponent,
    children: [
      { 
        path: 'profile', 
        component: CustomerProfileComponent
      },
      { 
        path: 'activity-log', 
        component: CustomerActivityLogComponent
      },
      { 
        path: '', 
        redirectTo: 'profile', 
        pathMatch: 'full'
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDetailRoutingModule { }
