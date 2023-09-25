import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsnbRoutingModule, ASNB_COMPONENTS } from './asnb-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAsnb from './+state/asnb.reducer';
import { AsnbEffects } from './+state/asnb.effects';
import { AsnbTabDashboardComponent } from './components/asnb-tab-dashboard/asnb-tab-dashboard.component';
import { MaterialModule } from './material.module';
import { MintInputModule, MintSingleSelectModule, MintCardModule } from '@cimb/mint';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CimbCommonModule } from '@cimb/common';
import { AsnbCardWithHeadingComponent } from './components/asnb-card-with-heading/asnb-card-with-heading.component';
import { AsnbSummaryCardComponent } from './components/asnb-summary-card/asnb-summary-card.component';
import { AsnbDowntimeMaintenanceComponent } from './components/asnb-downtime-maintenance/asnb-downtime-maintenance.component';
import { FundTableComponent } from './components/asnb-available-funds/fund-table/fund-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AsnbSummaryCardTemplateComponent } from './components/asnb-summary-card-template/asnb-summary-card-template.component';
import { AsnbAddFavouriteComponent } from './components/asnb-add-favourite/asnb-add-favourite.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { AsnbFavouriteListingComponent } from './components/asnb-favourite-listing/asnb-favourite-listing.component';
import { AsnbFavouriteComponent } from './components/asnb-favourite/asnb-favourite.component';
import { AsnbTransactionStatusCardTemplateComponent } from './components/asnb-transaction-status-card-template/asnb-transaction-status-card-template.component';
import { AsnbAddFavouriteSummaryComponent } from './components/asnb-add-favourite-summary/asnb-add-favourite-summary.component';
import { AsnbCardDetailsTemplateComponent } from './components/asnb-card-details-template/asnb-card-details-template.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    declarations: [
        ...ASNB_COMPONENTS,
        AsnbTabDashboardComponent,
        AsnbCardWithHeadingComponent,
        AsnbSummaryCardComponent,
        AsnbDowntimeMaintenanceComponent,
        FundTableComponent,
        AsnbSummaryCardTemplateComponent,
        AsnbAddFavouriteComponent,
        AsnbFavouriteListingComponent,
        AsnbFavouriteComponent,
        AsnbTransactionStatusCardTemplateComponent,
        AsnbAddFavouriteSummaryComponent,
        AsnbCardDetailsTemplateComponent,
        TooltipComponent,
    ],
    imports: [
        CimbCommonModule,
        CommonModule,
        MintInputModule,
        MintSingleSelectModule,
        AsnbRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MintCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        StoreModule.forFeature(fromAsnb.ASNB_FEATURE_KEY, fromAsnb.reducer),
        EffectsModule.forFeature([AsnbEffects]),
    ],
    providers: [{ provide: MatPaginatorIntl, useClass: AsnbFavouriteListingComponent }],
})
export class AsnbModule {}
