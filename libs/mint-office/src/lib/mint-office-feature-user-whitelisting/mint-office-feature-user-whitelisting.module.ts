import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MintOfficeFeatureUserWhitelistingRoutingModule,
    BACK_OFFICE_COMPONENTS_USER_WHITELISTING,
} from './mint-office-feature-user-whitelisting-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MintOfficeUiPaginatorModule } from '../mint-office-ui-paginator/mint-office-ui-paginator.module';
import { HttpClientModule } from '@angular/common/http';
import * as WhitelistingUser from './+state/whitelisting-user.reducer'
import { WhitelistingUserEffects } from './+state/whitelisting-user.effects'
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [BACK_OFFICE_COMPONENTS_USER_WHITELISTING],
    imports: [
        CommonModule,
        MintOfficeFeatureUserWhitelistingRoutingModule,
        MatInputModule,
        MatChipsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatTabsModule,
        MintOfficeUiBreadcrumbsModule,
        MintOfficeUiPaginatorModule,
        StoreModule.forFeature(
            WhitelistingUser.WHITELISTING_USER_FEATURE_KEY,
            WhitelistingUser.whitelistingUserReducer,
        ),
        EffectsModule.forFeature([WhitelistingUserEffects]),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        DatePipe,
      ]
})
export class MintOfficeFeatureUserWhitelistingModule {}
