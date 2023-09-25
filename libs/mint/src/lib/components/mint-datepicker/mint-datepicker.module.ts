import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DateRangePickerComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [DateRangePickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintDatepickerModule {}
