import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromStore from 'apps/self-serve/src/app/core/state/reducers';
import { getRiskProfileResults } from 'apps/self-serve/src/app/modules/risk-profile/+state/risk-profile.selectors';
import * as UserAction from 'apps/self-serve/src/app/core/state/user/user.actions';

@Component({
    selector: 'cimb-risk-profile-summary-card',
    templateUrl: './risk-profile-summary-card.component.html',
    styleUrls: ['./risk-profile-summary-card.component.scss'],
})
export class RiskProfileSummaryCardComponent implements OnInit {
    @ViewChild('riskProfileCalculationDialog') riskProfileCalculationDialog: TemplateRef<any>;
    @Input() result: any;
    riskProfile: string;

    constructor(public _matDialog: MatDialog, private store: Store<fromStore.AppState>) {}

    ngOnInit(){
        this.store
            .select(getRiskProfileResults)
            .subscribe((response) => {
                this.riskProfile = response.data.riskProfile
                this.store.dispatch(new UserAction.UpdateRiskProfile(response?.data.riskProfile));
            });
    }
    openRiskCalculationDialog() {
        this._matDialog.open(this.riskProfileCalculationDialog, {
            panelClass: 'full-width-custom',
            maxWidth: '948px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
        });
    }

    onClose() {
        this._matDialog.closeAll();
    }
}
