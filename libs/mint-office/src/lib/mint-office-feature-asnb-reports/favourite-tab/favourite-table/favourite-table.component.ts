import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsnbSearchFavourite, AsnbFavouriteResponse } from '../../../core/models/asnb.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'cimb-office-favourite-table',
    templateUrl: './favourite-table.component.html',
    styleUrls: ['./favourite-table.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class FavouriteTableComponent implements AfterViewInit {
    resetCount: number;
    loadingState = 'pending';
    favouriteRows: AsnbFavouriteResponse[] = [];
    displayedColumns: string[] = [
        'indexNumber',
        'transactionDatetime',
        'transId',
        'favouriteClientName',
        'favouriteClientId',
        'favouriteTransactionType',
        'expand',
    ];
    favouriteColumnsToDisplayWithExpand = [...this.displayedColumns];

    dataSource = new MatTableDataSource<AsnbFavouriteResponse>(this.favouriteRows);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    expandedRow: AsnbFavouriteResponse | null;

    @Input() set getLoadingState(data: string) {
        this.loadingState = data;
    }

    @Input() hasSearched;

    @Input() set data(data: any[]) {
        this.favouriteRows = data;
        this.dataSource = new MatTableDataSource<any>(this.favouriteRows);
    }

    @Input() tabName: string;
    @Input() filter: AsnbSearchFavourite;

    constructor(private store: Store) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
