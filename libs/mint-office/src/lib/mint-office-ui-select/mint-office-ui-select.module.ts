import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSearchableComponent } from './select-searchable/select-searchable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    SelectSearchableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  exports: [
    SelectSearchableComponent
  ]
})
export class MintOfficeUiSelectModule { }
