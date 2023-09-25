import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBatchFileSchedulerRoutingModule, BACK_OFFICE_COMPONENTS } from './add-batch-file-scheduler-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromBatchFileScheduler from '../+state/batch-file-scheduler.reducer'
import { EffectsModule } from '@ngrx/effects';
import { BatchFileSchedulerEffects } from '../+state/batch-file-scheduler.effects';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MintOfficeUiBreadcrumbsModule } from '../../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import {MatIconModule} from '@angular/material/icon';
import { DatePickerModule } from '../../core/adapter/datepicker.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [BACK_OFFICE_COMPONENTS],
  imports: [
    CommonModule,
    AddBatchFileSchedulerRoutingModule,
    MatDatepickerModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    StoreModule.forFeature(fromBatchFileScheduler.jobsKey, fromBatchFileScheduler.reducer),
    EffectsModule.forFeature([BatchFileSchedulerEffects]),
    MintOfficeUiBreadcrumbsModule,
    MatIconModule,
    DatePickerModule,
    MatSelectModule
  ]
})



export class AddBatchFileSchedulerModule { }
