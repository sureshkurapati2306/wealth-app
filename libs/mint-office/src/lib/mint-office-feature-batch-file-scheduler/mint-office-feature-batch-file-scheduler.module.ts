import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MintOfficeFeatureBatchFileSchedulerRoutingModule,
  BACK_OFFICE_COMPONENTS,
} from './mint-office-feature-batch-file-scheduler-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StoreModule } from '@ngrx/store';
import * as fromBatchFileScheduler from './+state/batch-file-scheduler.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BatchFileSchedulerEffects } from './+state/batch-file-scheduler.effects';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreModule } from '../core/core.module';
import { MintOfficeUiBreadcrumbsModule } from '../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackBarService } from '../core/services/snack-bar.service';
@NgModule({
  declarations: [BACK_OFFICE_COMPONENTS],
  imports: [
    CommonModule,
    MintOfficeFeatureBatchFileSchedulerRoutingModule,
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    StoreModule.forFeature(fromBatchFileScheduler.batchFileSchedulerFeatureKey, fromBatchFileScheduler.reducer),
    EffectsModule.forFeature([BatchFileSchedulerEffects]),
    MatButtonModule,
    // MatSnackBarModule,
    CoreModule,
    MintOfficeUiBreadcrumbsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [SnackBarService]
})
export class MintOfficeFeatureBatchFileSchedulerModule { }