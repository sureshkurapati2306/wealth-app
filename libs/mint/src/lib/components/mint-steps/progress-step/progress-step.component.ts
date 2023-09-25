import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';

@Component({
    selector: 'cimb-progress-step',
    templateUrl: './progress-step.component.html',
    styleUrls: ['./progress-step.component.scss'],
})
export class ProgressStepComponent implements OnInit {
    riskProfileStatus = 'N';
    selectInvestmentStatus = 'N';
    accountOpeningStatus = 'N';
    confirmPurchaseStatus = 'N';

    riskProfileActive = true;
    riskProfileCompleted = false;
    selectInvestActive = false;
    selectInvestCompleted = false;
    openAccountActive = false;
    openAccountCompleted = false;
    confirmPurchaseActive = false;
    confirmPurchaseCompleted = false;
    fundStatus: string;
    constructor(private store: Store<fromStore.AppState>,
                private ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.store.select('landingPageReducer').subscribe((data) => {
            this.riskProfileStatus = data.landingPageStatus.rwsStatus;
            this.selectInvestmentStatus = data.landingPageStatus.investmentStatus;
            this.accountOpeningStatus = data.landingPageStatus.accountStatus;
            this.confirmPurchaseStatus = data.landingPageStatus.finalStatus;

            this.updateProgressStep(
                this.riskProfileStatus,
                this.selectInvestmentStatus,
                this.accountOpeningStatus,
                this.confirmPurchaseStatus,
            );
        });

    }

    updateProgressStep(
        riskProfileStatus: string,
        selectInvestmentStatus: string,
        accountOpeningStatus: string,
        confirmPurchaseStatus: string,
    ) {
        if (riskProfileStatus === 'Y') {
            this.riskProfileActive = false;
            this.riskProfileCompleted = true;
            this.selectInvestActive = true;
            this.ref.detectChanges();
        }

        if (riskProfileStatus === 'Y' && selectInvestmentStatus === 'Y') {
            this.selectInvestActive = false;
            this.selectInvestCompleted = true;
            this.openAccountActive = true;
            this.ref.detectChanges();
        }

        if (riskProfileStatus === 'Y' && selectInvestmentStatus === 'N') {
            this.selectInvestActive = true;
            this.selectInvestCompleted = false;
            this.ref.detectChanges();

        }
        
        if (riskProfileStatus === 'Y' && selectInvestmentStatus === 'Y' && accountOpeningStatus === 'Y') {
            this.openAccountActive = false;
            this.openAccountCompleted = true;
            this.confirmPurchaseActive = true;
            this.ref.detectChanges();
        }

        if(riskProfileStatus === 'Y' && selectInvestmentStatus === 'N' && accountOpeningStatus === 'Y') {
            this.openAccountCompleted = true;
            this.ref.detectChanges();
        }
        if (confirmPurchaseStatus === 'Y') {
            this.confirmPurchaseActive = false;
            this.confirmPurchaseCompleted = true;
            this.ref.detectChanges();
        }
    }
}
