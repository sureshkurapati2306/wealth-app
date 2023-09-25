import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectToClicksComponent } from './redirect-to-clicks.component';

const routes: Routes = [{ path: '', component: RedirectToClicksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedirectToClicksRoutingModule {}

export const REDIRECT_COMPONENTS = [RedirectToClicksComponent];
