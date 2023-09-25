import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSmsDeliveryLog from '../+state/sms-delivery-log.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SmsDeliveryLogEffects } from '../+state/sms-delivery-log.effects';
import { CoreModule } from '../../core/core.module';
import { SmsDeliveryDetailRoutingModule, BACK_OFFICE_COMPONENTS } from './sms-delivery-detail-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { CimbCommonModule } from '@cimb/common';
import { MintOfficeUiBreadcrumbsModule } from '../../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { SnackBarService } from '../../core/services/snack-bar.service';


@NgModule({
  declarations: [BACK_OFFICE_COMPONENTS],
  imports: [
    CommonModule,
    SmsDeliveryDetailRoutingModule,
    MatButtonModule,
    CimbCommonModule,
    MintOfficeUiBreadcrumbsModule,
    CoreModule,
    StoreModule.forFeature(fromSmsDeliveryLog.smsDeliveryFeatureKey, fromSmsDeliveryLog.reducer),
    EffectsModule.forFeature([SmsDeliveryLogEffects])
  ],
  providers: [SnackBarService]
})
export class SmsDeliveryDetailModule { }
