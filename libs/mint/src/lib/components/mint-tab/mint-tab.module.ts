import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { TabDashboardComponent } from './tab-dashboard/tab-dashboard.component';
import { TabWealthComponent } from './tab-wealth/tab-wealth.component';
import { MatMenuModule } from '@angular/material/menu';
import { MintButtonModule } from '../mint-button/mint-button.module';
import { MintBoxModule } from '../mint-box/mint-box.module';
import { MintListModule } from '../mint-list/mint-list.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MintTableModule } from '../mint-table/mint-table.module';
import { MintPaginatorModule } from '../mint-paginator/mint-paginator.module';
import { MintChartModule } from '../mint-chart/mint-chart.module';
import { MintDatepickerModule } from '../mint-datepicker/mint-datepicker.module';
import { TabHeaderComponent } from './tab-header/tab-header.component';
import { MintCarouselModule } from '../mint-carousel/mint-carousel.module';

@NgModule({
  declarations: [TabDashboardComponent, TabHeaderComponent,TabWealthComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatMenuModule,
    MintButtonModule,
    MintListModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MintTableModule,
    MintPaginatorModule,
    MintDatepickerModule,
    MintChartModule,
    MatTooltipModule,
    MintBoxModule,
    MintCarouselModule
  ],
  exports: [TabDashboardComponent, TabHeaderComponent,TabWealthComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintTabsModule {}
