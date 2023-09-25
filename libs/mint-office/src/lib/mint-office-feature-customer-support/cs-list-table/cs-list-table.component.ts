import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../core/models/customer.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CustomerSupportActions from '../+state/customer-support.actions';

@Component({
    selector: 'cimb-office-cs-list-table',
    templateUrl: './cs-list-table.component.html',
    styleUrls: ['./cs-list-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class CsListTableComponent {
    constructor(private router: Router, private store: Store) {}

    rows: Customer[] = [];

    loadingState = '';

    dataSource = new MatTableDataSource<Customer>(this.rows);

    columnsToDisplay: string[] = [
        'position',
        'fullName',
        'idType',
        'idNumber',
        'cifNumber',
        'action',
    ];

    expandedRow: Customer | null;

    @Input() set dataSourceRows(data: Customer[]) {
        this.rows = data;
        this.dataSource = new MatTableDataSource<Customer>(this.rows);
    }
    @Input() set getLoadingState(data: string) {
        this.loadingState = data;
    }
    @Input() hasSearched = false;

    goToDetailPage(row) {
        this.store.dispatch(
            CustomerSupportActions.loadCustomerDetail({
                data: row,
            }),
        );
        this.router.navigate(['customer-support', 'customer']);
    }
}
