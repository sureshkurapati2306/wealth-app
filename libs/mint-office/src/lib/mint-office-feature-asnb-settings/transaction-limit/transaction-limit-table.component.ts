import { Component } from '@angular/core';

@Component({
    selector: 'cimb-office-transaction-limit-table',
    templateUrl: './transaction-limit-table.component.html',
})
export class TransactionLimitTableComponent {
    filters = [
        {
            id: 1,
            name: 'Limit All Funds',
            value: 'All',
        },
        {
            id: 2,
            name: 'Limit Individual Funds',
            value: 'Individual',
        },
    ];
    activeFilter = 1;

    toggleFilterStatus(value: number) {
        this.activeFilter = value;
    }
}
