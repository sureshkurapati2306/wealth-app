import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const DATA = [
    {
        fid: 1,
        fundCode: 'ASB',
        fundName: 'Amanah Saham Bumiputera',
        minInvestment: '10.00',
        maxInvestment: '100.00',
    },
];

@Component({
    selector: 'cimb-office-table-individual-funds',
    templateUrl: './table-individual-funds.component.html',
    styleUrls: ['./table-individual-funds.component.scss'],
})
export class TableIndividualFundsComponent implements OnInit {
    displayedColumns: string[] = [
        'fundCode',
        'fundName',
        'minInvestment',
        'maxInvestment',
        'action',
    ];
    individualFundData = DATA;
    constructor(private router: Router) {}

    ngOnInit(): void {
        console.log('init');
    }

    editIndividualFundLimit($event: any) {
        this.router.navigate(['/asnb-settings/edit-individual-limit', $event.fid]);
    }
}
