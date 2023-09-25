import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectBasicComponent } from './select-basic/select-basic.component';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDropdownComponent } from './input-dropdown/input-dropdown.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SelectBasicComponent,
    InputDropdownComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatMenuModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    SelectBasicComponent,
    InputDropdownComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintSelectModule {}
