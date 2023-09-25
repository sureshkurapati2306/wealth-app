import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import {
  MintButtonModule,
  MintCardModule,
  MintBoxModule,
  MintTabsModule,
} from '@cimb/mint';

import {
  DashboardRoutingModule,
  DASHBOARD_COMPONENTS,
} from './dashboard-routing.module';
import { CimbCommonModule } from '@cimb/common';
import { CartService } from '../../core/services/cart/cart.service';

@NgModule({
  declarations: [...DASHBOARD_COMPONENTS],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MintCardModule,
    MintButtonModule,
    MintTabsModule,
    MintBoxModule,
    CimbCommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CartService, DecimalPipe],
})
export class DashboardModule {}
