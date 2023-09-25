import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MintMultiSelectChipComponent } from './mint-multi-select-chip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    declarations: [MintMultiSelectChipComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatBottomSheetModule,
        MatCheckboxModule,
        MatListModule,
        LayoutModule,
    ],
    exports: [MintMultiSelectChipComponent],
})
export class MintMultiSelectChipModule {}
