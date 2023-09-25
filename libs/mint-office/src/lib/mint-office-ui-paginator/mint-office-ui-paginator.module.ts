import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TablePaginatorComponent } from './table-paginator/table-paginator.component';

@NgModule({
    declarations: [TablePaginatorComponent],
    imports: [CommonModule, MatPaginatorModule],
    exports: [TablePaginatorComponent],
})
export class MintOfficeUiPaginatorModule {}

export { TablePaginatorComponent };
