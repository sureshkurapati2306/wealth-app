import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LandingPageRoutingModule,
  Landing_COMPONENTS,
} from './lang-page-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { StoreModule } from '@ngrx/store';
import * as fromLandingPage from '../../core/state/landing-page/landing-page.reducer'

@NgModule({
  declarations: [...Landing_COMPONENTS],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MatCardModule,
    MatGridListModule,
    StoreModule.forFeature(fromLandingPage.landingPageFeatureKey, fromLandingPage.reducer),
  ],
})
export class LandingPageModule {}
