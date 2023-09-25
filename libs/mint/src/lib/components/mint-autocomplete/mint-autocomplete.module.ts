import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteBasicComponent } from './autocomplete-basic/autocomplete-basic.component';
import { MatButtonModule } from '@angular/material/button';
import { HighlightPipe } from './highlight.pipe';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { MatIconModule } from '@angular/material/icon';
import { AutocompleteSwitchInFundsComponent } from './autocomplete-switch-in-funds/autocomplete-switch-in-funds.component';
import { CoreModule } from '@cimb/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AutocompleteBasicComponent, HighlightPipe, TypeaheadComponent, AutocompleteSwitchInFundsComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CoreModule
  ],
  exports: [AutocompleteBasicComponent,TypeaheadComponent, AutocompleteSwitchInFundsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintAutocompleteModule {}
