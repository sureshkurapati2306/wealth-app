import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MintSingleSelectComponent } from './mint-single-select.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';

@NgModule({
    declarations: [MintSingleSelectComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatListModule,
        LayoutModule,
    ],
    exports: [MintSingleSelectComponent],
})
export class MintSingleSelectModule {}
