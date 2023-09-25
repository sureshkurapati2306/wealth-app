import { NgModule } from '@angular/core';
import { MapToFlatArrayPipe } from './pipes/map-to-flat-array.pipe';
import { LocalDateToUtcPipe } from './pipes/local-date-to-utc.pipe';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './+state/mint-office.reducer';
import * as fromMintOffice from './+state/mint-office.reducer';
import { SumPipe } from './pipes/sum.pipe';
import * as fromErrors from './+state/errors.reducer';

@NgModule({
    declarations: [MapToFlatArrayPipe, LocalDateToUtcPipe, SumPipe],
    exports: [MapToFlatArrayPipe, LocalDateToUtcPipe, SumPipe],
    imports: [
        StoreModule.forFeature(fromApp.mintOfficeFeatureKey, fromApp.reducer),
        StoreModule.forFeature(fromMintOffice.mintOfficeFeatureKey, fromMintOffice.reducer),
        StoreModule.forFeature(fromErrors.ERRORS_FEATURE_KEY, fromErrors.reducer),
    ],
})
export class CoreModule {}
