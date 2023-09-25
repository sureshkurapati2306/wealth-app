import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsnbSearchFields, AsnbTransactionItem } from '../../../core/models/asnb.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'cimb-office-transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class TransactionsTableComponent implements AfterViewInit {
    resetCount: number;
    loadingState = 'pending';
    transactionRows: AsnbTransactionItem[] = [];
    displayedColumns: string[] = [
        'expand',
        'transactionDatetime',
        'transId',
        'txnNum',
        'clientName',
        'clientId',
        'transactionType',
        'fundName',
        'transactionStatus',
    ];
    columnsToDisplayWithExpand = [...this.displayedColumns];

    dataSource = new MatTableDataSource<AsnbTransactionItem>(this.transactionRows);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    expandedRow: AsnbTransactionItem | null;

    @Input() set getLoadingState(data: string) {
        this.loadingState = data;
    }

    @Input() hasSearched;

    @Input() set transactionsData(data: any[]) {
        this.transactionRows = data;
        this.dataSource = new MatTableDataSource<any>(this.transactionRows);
    }

    @Input() tabName: string;
    @Input() filter: AsnbSearchFields;

    constructor(private store: Store) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
