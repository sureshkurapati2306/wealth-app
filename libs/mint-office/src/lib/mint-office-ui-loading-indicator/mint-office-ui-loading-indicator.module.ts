import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { StoreModule } from '@ngrx/store';
import * as fromLoadingBar from './loading-bar/+state/loading-bar.reducer';


@NgModule({
  declarations: [
    LoadingBarComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    StoreModule.forFeature(fromLoadingBar.loadingBarFeatureKey, fromLoadingBar.reducer),
  ],
  exports: [
    LoadingBarComponent,
  ]
})
export class MintOfficeUiLoadingIndicatorModule { }
