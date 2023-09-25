import { Component, OnInit } from '@angular/core';
import { AsnbSettingsService } from '../../core/services/asnb-settings.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { loadFundSuspensionList } from '../+state/asnb-settings.actions';
import { getFundSuspensList, getFundTypeMap } from '../+state/asnb-settings.selectors';

@Component({
    selector: 'cimb-office-fund-suspension-table',
    templateUrl: './fund-suspension-table.component.html',
    styleUrls: ['./fund-suspension-table.component.scss'],
})
export class FundSuspensionTableComponent implements OnInit {
    displayedColumns: string[] = [
        'fsId',
        'asnbFundId',
        'suspensionReason',
        'noticeReason',
        'startDate',
        'endDate',
    ];

    fundSuspensionData$ = this.store.select(getFundSuspensList);
    fundTypeMap$ = this.store.select(getFundTypeMap);

    constructor(
        private asnbSettingsService: AsnbSettingsService,
        private store: Store,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.store.dispatch(loadFundSuspensionList());
    }

    editFundSuspension($event: any) {
        this.router.navigate(['/asnb-settings/edit-suspension', $event.fsId]);
    }
}
