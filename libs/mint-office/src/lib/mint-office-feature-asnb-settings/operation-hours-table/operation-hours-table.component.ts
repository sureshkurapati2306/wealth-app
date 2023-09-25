import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { loadOperationHours } from '../+state/asnb-settings.actions';
import { getOperationHours } from '../+state/asnb-settings.selectors';

const DATA = [
    {
        id: 1,
        openingHour: '2:00 AM',
        closingHour: '9:00 PM',
    },
];

@Component({
    selector: 'cimb-office-operation-hours-table',
    templateUrl: './operation-hours-table.component.html',
    styleUrls: ['./operation-hours-table.component.scss'],
})
export class OperationHoursTableComponent implements OnInit {
    displayedColumns: string[] = ['startTime', 'endTime', 'action'];
    operationHours$ = this.store.select(getOperationHours);

    constructor(private router: Router, private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(loadOperationHours());
    }

    editOperationHours($event: any) {
        this.router.navigate(['/asnb-settings/edit-operation-hours']);
    }
}
