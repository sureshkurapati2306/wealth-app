import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import { NumberedPaginatorComponent } from './numbered-paginator/numbered-paginator.component';
import { PaginationBoundsIndicatorComponent } from './pagination-bounds-indicator/pagination-bounds-indicator.component';

@NgModule({
  declarations: [CustomPaginatorComponent, NumberedPaginatorComponent, PaginationBoundsIndicatorComponent],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports: [CustomPaginatorComponent, NumberedPaginatorComponent, PaginationBoundsIndicatorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintPaginatorModule {}
