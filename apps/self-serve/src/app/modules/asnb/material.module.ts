import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    exports: [
        MatTabsModule,
        MatSelectModule,
        MatMenuModule,
        MatChipsModule,
        MatIconModule,
        MatExpansionModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule,
        MatProgressSpinnerModule,
    ],
})
export class MaterialModule {}
