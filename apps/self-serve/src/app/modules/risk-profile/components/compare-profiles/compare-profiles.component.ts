import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Results, RiskProfileDetails } from '../../models';
import * as fromStore from '../../../../core/state/reducers';
import { getRiskProfileDetails, getRiskProfileResults } from '../../+state/risk-profile.selectors';
import { takeUntil } from 'rxjs/operators';
import { selectRiskProfileEnquiry } from 'apps/self-serve/src/app/core/state/wealth-dashboard/wealth-dashboard.selectors';

@Component({
    selector: 'cimb-compare-profiles',
    templateUrl: './compare-profiles.component.html',
    styleUrls: ['./compare-profiles.component.scss'],
})
export class CompareProfilesComponent implements OnInit, OnDestroy {
    @ViewChild('suggestionDialog') suggestionDialog: TemplateRef<any>;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    assetsAllocation$: Observable<RiskProfileDetails[]>;
    results$: Observable<Results>;
    selectedRiskName: number;
    selectedTabName: string;
    mediaQueryList: MediaQueryList
    tabs = ['Defensive', 'Conservative', 'Balanced', 'Growth', 'Aggressive'];
    riskAllocation: string
    constructor(private _matDialog: MatDialog, private store: Store<fromStore.AppState>, mediaMatcher: MediaMatcher) 
    {
        this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
    }

    ngOnInit(): void {
        this.assetsAllocation$ = this.store.select(getRiskProfileDetails);
        this.getRiskProfileResult();
    }

    getRiskProfileResult() {
        this.store
            .select(getRiskProfileResults)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: Results) => {
                if (!response) {
                    this.store.select(selectRiskProfileEnquiry).subscribe((riskProfile) => {
                        this.selectedTabName = riskProfile['data'].riskProfile;
                        this.selectedRiskName = this.tabs.indexOf(this.selectedTabName);
                    });
                } else {
                    this.selectedTabName = response.data.riskProfile;
                    this.selectedRiskName = this.tabs.indexOf(this.selectedTabName);
                }
            });
    }

    openSuggestionDialog() {
        this._matDialog.open(this.suggestionDialog, {
            panelClass: 'modalSuggestion',
            maxWidth: '800px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    riskProfileAssetAlloaction(allocation: string) {
        this.riskAllocation = allocation;
    }
}
