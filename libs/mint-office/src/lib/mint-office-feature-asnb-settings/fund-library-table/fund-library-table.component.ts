import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadFundLibraryList } from '../+state/asnb-settings.actions';
import { getFundLibraryList } from '../+state/asnb-settings.selectors';
import { map } from 'rxjs/operators';

@Component({
    selector: 'cimb-office-fund-library-table',
    templateUrl: './fund-library-table.component.html',
    styleUrls: ['./fund-library-table.component.scss'],
})
export class FundLibraryTableComponent implements OnInit {
    displayedColumns: string[] = [
        'fundCode',
        'fundName',
        'fundType',
        'fundBankCharges',
        'fundAction',
    ];

    fundLibraryData$ = this.store.select(getFundLibraryList);

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.store.dispatch(loadFundLibraryList());
    }

    addFund() {
        this.router.navigate(['/asnb-settings/add-fund'], { relativeTo: this.route });
    }

    editFund(fundId) {
        this.router.navigate(['/asnb-settings/edit-fund', fundId]);
    }

    onInputChange(event: string) {
        this.fundLibraryData$ = this.store.select(getFundLibraryList).pipe(
            map((fundLibraryList) => {
                return fundLibraryList.filter(
                    (fundLibrary) =>
                        fundLibrary.paramText.toLowerCase().includes(event.toLowerCase()) ||
                        fundLibrary.fundCode.toLowerCase().includes(event.toLowerCase()),
                );
            }),
        );

        //User cleared input
        if (event === '') {
            this.fundLibraryData$ = this.store.select(getFundLibraryList);
        }
    }
}
