import { NgModule } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [SearchBarComponent],
    imports: [MatInputModule, MatButtonModule, FormsModule, CommonModule],
    exports: [SearchBarComponent],
})
export class MintOfficeUiSearchBar {}
