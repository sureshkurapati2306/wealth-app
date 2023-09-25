import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
    AsnbLinkAccountItem,
    AsnbLinkAccountResponse,
    AsnbSearchLinkAccount,
} from '../../../core/models/asnb.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'cimb-office-link-account-table',
    templateUrl: './link-account-table.component.html',
    styleUrls: ['./link-account-table.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class LinkAccountTableComponent implements AfterViewInit {
    resetCount: number;
    loadingState = 'pending';
    linkAccountRows: AsnbLinkAccountResponse[] = [];
    displayedColumns: string[] = [
        'indexNumber',
        'linkAccountDatetime',
        'linkAccountAction',
        'clientName',
        'clientId',
        'expand',
    ];
    columnsToDisplayWithExpand = [...this.displayedColumns];

    dataSource = new MatTableDataSource<AsnbLinkAccountResponse>(this.linkAccountRows);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    expandedRow: AsnbLinkAccountItem | null;

    @Input() set getLoadingState(data: string) {
        this.loadingState = data;
    }

    @Input() hasSearched;

    @Input() set data(data: any[]) {
        this.linkAccountRows = data;
        this.dataSource = new MatTableDataSource<any>(this.linkAccountRows);
    }

    @Input() tabName: string;
    @Input() filter: AsnbSearchLinkAccount;

    constructor(private store: Store) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
