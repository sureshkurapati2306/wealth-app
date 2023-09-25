import { Component, OnInit } from '@angular/core';
import { AsnbOverview } from '../../models';
import { Store, select } from '@ngrx/store';
import { getASNBOverview } from '../../+state/asnb.selectors';

@Component({
    selector: 'cimb-asnb-investment',
    templateUrl: './asnb-investment.component.html',
    styleUrls: ['./asnb-investment.component.scss'],
})
export class AsnbInvestmentComponent implements OnInit {
    asnbOverallInvestment: AsnbOverview;

    constructor(private store: Store) {}

    ngOnInit() {
        this.store.pipe(select(getASNBOverview)).subscribe((data) => {
            this.asnbOverallInvestment = data;
        });
    }
}
