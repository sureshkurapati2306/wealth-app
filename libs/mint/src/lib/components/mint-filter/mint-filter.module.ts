import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { FilterSortComponent } from './filter-sort/filter-sort.component';
import { MintAutocompleteModule } from '../mint-autocomplete/mint-autocomplete.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MintMultiSelectCheckboxModule } from '../mint-multi-select-checkbox/mint-multi-select-checkbox.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [FilterSortComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatBadgeModule,
    MintAutocompleteModule,
    MatButtonToggleModule,
    MatIconModule,
    MintMultiSelectCheckboxModule
  ],
  exports: [MatMenuModule, FilterSortComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintFilterModule {}
