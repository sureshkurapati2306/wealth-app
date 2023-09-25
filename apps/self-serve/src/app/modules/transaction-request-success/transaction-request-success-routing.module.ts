import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionRequestSuccessComponent } from './transaction-request-success.component';

const routes: Routes = [
  { path: '', component: TransactionRequestSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRequestSuccessRoutingModule {}

export const TRANSACTION_REQUEST_SUCCESS_COMPONENTS = [
  TransactionRequestSuccessComponent,
];
