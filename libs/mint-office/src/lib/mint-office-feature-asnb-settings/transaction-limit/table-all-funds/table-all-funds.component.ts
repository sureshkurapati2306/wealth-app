import { Component } from '@angular/core';
import { Router } from '@angular/router';

const DATA = [
    {
        fid: 1,
        minAmount: '10.00',
        subsequentMin: '1.00',
    },
];

@Component({
    selector: 'cimb-office-table-all-funds',
    templateUrl: './table-all-funds.component.html',
    styleUrls: ['./table-all-funds.component.scss'],
})
export class TableAllFundsComponent {
    displayedColumns: string[] = ['minAmount', 'subsequentMin', 'action'];
    fundData = DATA;
    constructor(private router: Router) {}

    editAllFundLimit($event: any) {
        this.router.navigate(['/asnb-settings/edit-all-limit']);
    }
}
