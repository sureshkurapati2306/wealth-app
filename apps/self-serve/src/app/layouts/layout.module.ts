import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RegistrationLayoutComponent } from './registration-layout/registration-layout.component';
import { CimbCommonModule } from '@cimb/common';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { LogoutLayoutComponent } from './logout-layout/logout-layout.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DialogPopupComponent } from './dashboard-layout/dialog-popup/dialog-popup.component';
import * as DialogPopupTransaction from './dashboard-layout/dialog-popup/+state/dialog-popup.reducer'
import * as DialogPopupEffect from './dashboard-layout/dialog-popup/+state/dialog-popup.effects'
@NgModule({
  declarations: [DashboardLayoutComponent, RegistrationLayoutComponent, CommonLayoutComponent,LogoutLayoutComponent, DialogPopupComponent],
  imports: [
    CommonModule, 
    RouterModule, 
    CimbCommonModule,
    StoreModule.forFeature(DialogPopupTransaction.DialogPopupTransactionFeatureKey ,DialogPopupTransaction.dialogPopupReducer),
    EffectsModule.forFeature([DialogPopupEffect.DialogPopupEffects])
  ],
  exports: [DashboardLayoutComponent, RegistrationLayoutComponent,CommonLayoutComponent,LogoutLayoutComponent],
})
export class LayoutModule {}
