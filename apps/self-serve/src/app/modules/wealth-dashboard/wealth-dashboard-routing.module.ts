import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WealthDashboardComponent } from './wealth-dashboard.component';

const routes: Routes = [{ path: '', component: WealthDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WealthDashboardRoutingModule {}

export const DASHBOARD_COMPONENTS = [WealthDashboardComponent];
