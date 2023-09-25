import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUnitTrustTransactions from '../+state/unit-trust-transactions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UnitTrustTransactionsEffects } from '../+state/unit-trust-transactions.effects';
import { CoreModule } from '../../core/core.module';
import { UnitTrustDetailRoutingModule, BACK_OFFICE_COMPONENTS } from './unit-trust-detail-routing.module';
import { MatButtonModule } from '@angular/material/button';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CimbCommonModule } from '@cimb/common';
import { MintOfficeUiBreadcrumbsModule } from '../../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { SnackBarService } from '../../core/services/snack-bar.service';


@NgModule({
  declarations: [BACK_OFFICE_COMPONENTS],
  imports: [
    CommonModule,
    UnitTrustDetailRoutingModule,
    MatButtonModule,
    // MatSnackBarModule,
    CimbCommonModule,
    MintOfficeUiBreadcrumbsModule,
    CoreModule,
    StoreModule.forFeature(fromUnitTrustTransactions.unitTrustTransactionsFeatureKey, fromUnitTrustTransactions.reducer),
    EffectsModule.forFeature([UnitTrustTransactionsEffects])
  ],
  providers: [SnackBarService]
})
export class UnitTrustDetailModule { }
