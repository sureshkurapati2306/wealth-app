import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLegendComponent } from './table-legend/table-legend.component';
import { TableWealthComponent } from './table-wealth/table-wealth.component';
import { MatMenuModule } from '@angular/material/menu';
import { MintFilterModule } from '../mint-filter/mint-filter.module';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MintInputModule } from '../mint-input/mint-input.module';

@NgModule({
  declarations: [TableLegendComponent,TableWealthComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MintFilterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatCheckboxModule,
    MintInputModule
  ],
  exports: [TableLegendComponent,TableWealthComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintTableModule {}
