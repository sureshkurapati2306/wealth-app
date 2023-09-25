import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TransactionRequestSuccessRoutingModule,
  TRANSACTION_REQUEST_SUCCESS_COMPONENTS,
} from './transaction-request-success-routing.module';

@NgModule({
  declarations: [...TRANSACTION_REQUEST_SUCCESS_COMPONENTS],
  imports: [CommonModule, TransactionRequestSuccessRoutingModule],
})
export class TransactionRequestSuccessModule {}
