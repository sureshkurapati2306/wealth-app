import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AccountDetailsRoutingModule,
  ACCOUNT_DETAILS_COMPONENTS,
} from './account-details-routing.module';

@NgModule({
  declarations: [...ACCOUNT_DETAILS_COMPONENTS],
  imports: [CommonModule, AccountDetailsRoutingModule],
})
export class AccountDetailsModule {}
