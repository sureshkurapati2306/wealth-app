import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwitchRequestCompletedComponent } from './switch-request-completed.component';

const routes: Routes = [
  { path: '', component: SwitchRequestCompletedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwitchRequestRoutingModule {}

export const SWITCH_REQUEST_COMPONENTS = [SwitchRequestCompletedComponent];
