import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlCustom extends MatPaginatorIntl {

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    const lastPage = Math.ceil(length / pageSize)
    return 'Page ' + (page + 1) + ' of ' + lastPage;
  };
}