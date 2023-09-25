import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MintMultiSelectCheckboxComponent } from './mint-multi-select-checkbox.component';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MintMultiSelectCheckboxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [MintMultiSelectCheckboxComponent]
})
export class MintMultiSelectCheckboxModule { }
