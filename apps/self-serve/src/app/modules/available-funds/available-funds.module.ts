import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import {
    AvailableFundsRoutingModule,
    AVAILABLE_FUNDS_COMPONENTS,
} from './available-funds-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FundDetailComponent } from './fund-detail/fund-detail.component';
import {
    MintCardModule,
    MintChartModule,
    MintDialogModule,
    MintFilterModule,
    MintStepsModule,
    MintTabsModule,
    MintPaginatorModule,
    MintMultiSelectCheckboxModule,
} from '@cimb/mint';
import { CimbCommonModule } from '@cimb/common';
import { MatSelectModule } from '@angular/material/select';
import { FundDetailComponentLoaderSectionContentComponent } from './fund-detail-component-loader-section-content/fund-detail-component-loader-section-content.component';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromAvailableFunds from './+state/available-funds.reducer';
import { AvailableFundsEffects } from './+state/available-funds.effects';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CoreModule, EventService, HighlightTextPipe } from '@cimb/core';
import { FundTableComponent } from './fund-table/fund-table.component';
import { FundFiltersComponent } from './fund-filters/fund-filters.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FilterSelectionsComponent } from './filter-selections/filter-selections.component';
import { CartService } from '../../core/services/cart/cart.service';
import { MatPaginatorIntlCustom } from './CustomPaginatorIntl';

@NgModule({
    declarations: [
        ...AVAILABLE_FUNDS_COMPONENTS,
        FundDetailComponent,
        FundDetailComponentLoaderSectionContentComponent,
        FundTableComponent,
        FundFiltersComponent,
        FilterSelectionsComponent,
    ],
    imports: [
        CommonModule,
        AvailableFundsRoutingModule,
        MatInputModule,
        MintDialogModule,
        MatDialogModule,
        MatMenuModule,
        MatButtonModule,
        MatCheckboxModule,
        MatBadgeModule,
        MatListModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MintTabsModule,
        MintFilterModule,
        MintStepsModule,
        MintCardModule,
        MintChartModule,
        CimbCommonModule,
        MintPaginatorModule,
        MatSelectModule,
        MatIconModule,
        MatTooltipModule,

        NgxPaginationModule,

        FormsModule,
        MatPaginatorModule,
        MatSortModule,
        MintDialogModule,
        CoreModule,
        MatButtonToggleModule,

        MintMultiSelectCheckboxModule,
        MatTableModule,
        StoreModule.forFeature(
            fromAvailableFunds.AVAILABLE_FUNDS_FEATURE_KEY,
            fromAvailableFunds.reducer,
        ),
        EffectsModule.forFeature([AvailableFundsEffects]),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        EventService, 
        CartService, 
        DecimalPipe,
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCustom}
    ],
})
export class AvailableFundsModule {}
