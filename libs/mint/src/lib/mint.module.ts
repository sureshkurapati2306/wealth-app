import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MintButtonModule } from './components/mint-button/mint-button.module';
import { MintDialogModule } from './components/mint-dialog/mint-dialog.module';
import { MintCardModule } from './components/mint-card/mint-card.module';
import { MintChipsModule } from './components/mint-chips/mint-chips.module';
import { MintSelectModule } from './components/mint-select/mint-select.module';
import { MintTabsModule } from './components/mint-tab/mint-tab.module';
import { MintListModule } from './components/mint-list/mint-list.module';
import { MintBoxModule } from './components/mint-box/mint-box.module';
import { MintAlertModule } from './components/mint-alert/mint-alert.module';
import { MintTableModule } from './components/mint-table/mint-table.module';
import { MintSliderModule } from './components/mint-slider/mint-slider.module';
import { MintActionSheetsModule } from './components/mint-action-sheets/mint-action-sheets.module';
import { MintFilterModule } from './components/mint-filter/mint-filter.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { MintInputModule } from './components/mint-input/mint-input.module';
import { MintPaginatorModule } from './components/mint-paginator/mint-paginator.module';
import { MintChartModule } from './components/mint-chart/mint-chart.module';
import { MintStepsModule } from './components/mint-steps/mint-steps.module';
import { MintMenuModule } from './components/mint-menu/mint-menu.module';
import { MintDatepickerModule } from './components/mint-datepicker/mint-datepicker.module';
import { MintAutocompleteModule } from './components/mint-autocomplete/mint-autocomplete.module';
import { MintIconModule } from './components/mint-icon/mint-icon.module';
import { MintCarouselModule } from './components/mint-carousel/mint-carousel.module';
import { DirectivesModule } from './directives/directive.module';


@NgModule({
  imports: [
    CommonModule,

    // Cimb custom components libs
    MintButtonModule,
    MintCardModule,
    MintDialogModule,
    MintChipsModule,
    MintSelectModule,
    MintTabsModule,
    MintListModule,
    MintBoxModule,
    MintAlertModule,
    MintTableModule,
    MintSliderModule,
    MintActionSheetsModule,
    MintFilterModule,
    HighchartsChartModule,
    MintInputModule,
    MintPaginatorModule,
    MintChartModule,
    MintStepsModule,
    MintMenuModule,
    MintDatepickerModule,
    MintAutocompleteModule,
    MintIconModule,
    MintCarouselModule,DirectivesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintModule {}
