import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListHoldingComponent } from './list-holding/list-holding.component';
import { ListHoldingEmptyComponent } from './list-holding-empty/list-holding-empty.component';
import { ListHoldingProcessedComponent } from './list-holding-processed/list-holding-processed.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MintSliderModule } from '../mint-slider/mint-slider.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MintFilterModule } from '../mint-filter/mint-filter.module';
import { MintInputModule } from '../mint-input/mint-input.module';
import { MintMenuModule } from '../mint-menu/mint-menu.module';
import { ListTransactionHistoryComponent } from './list-transaction-history/list-transaction-history.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MintRedeemModule } from './dashboard-redeem-value/mint-redeem.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MintPaginatorModule } from '../mint-paginator/mint-paginator.module';
@NgModule({
  declarations: [
    ListHoldingComponent,
    ListHoldingEmptyComponent,
    ListHoldingProcessedComponent,
    ListTransactionHistoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    MatRadioModule,
    MatInputModule,
    MatTooltipModule,
    MintSliderModule,
    MatCheckboxModule,
    MatListModule,
    MintFilterModule,
    MintInputModule,
    MintMenuModule,
    MatDialogModule,
    MatSliderModule,
    MintRedeemModule,
    NgxPaginationModule,
    MintPaginatorModule
  ],
  exports: [
    ListHoldingComponent,
    ListHoldingEmptyComponent,
    ListHoldingProcessedComponent,
    ListTransactionHistoryComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintListModule {}
