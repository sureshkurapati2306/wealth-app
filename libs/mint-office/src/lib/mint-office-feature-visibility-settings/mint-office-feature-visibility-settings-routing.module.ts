import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureVisibilitySettingsComponent } from './mint-office-feature-visibility-settings.component';

const routes: Routes = [
  {
    path: '',
    component: MintOfficeFeatureVisibilitySettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintOfficeFeatureVisibilitySettingsRoutingModule { }

// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [MintOfficeFeatureVisibilitySettingsComponent];
