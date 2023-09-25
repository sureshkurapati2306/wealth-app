import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditRefConfigComponent } from './add-edit-ref-config.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DatePickerModule } from '../../core/adapter/datepicker.module';
import { MintOfficeUiBreadcrumbsModule } from '../../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { AddEditRefConfigRoutingModule } from './add-edit-ref-config-routing.module';



@NgModule({
  declarations: [
    AddEditRefConfigComponent
  ],
  imports: [
    AddEditRefConfigRoutingModule,
    CommonModule,
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
    MintOfficeUiBreadcrumbsModule,
    MatIconModule,
    DatePickerModule,
    MatSelectModule
  ]
})
export class AddEditRefConfigModule { }
