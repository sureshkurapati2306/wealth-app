import { MediaMatcher } from '@angular/cdk/layout';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'cimb-keyword-descriptions',
    templateUrl: './keyword-descriptions.component.html',
    styleUrls: ['./keyword-descriptions.component.scss'],
})
export class KeywordDescriptionsComponent {
    showShortDesciption = true

    @ViewChild('sampleCalculationDialog') sampleCalculationDialog: TemplateRef<any>;
    @Input() page: any;
    mediaQueryList: MediaQueryList;


    constructor(private _matDialog: MatDialog, mediaMatcher: MediaMatcher) {
        this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
    }

    openDialog() {
        this._matDialog.open(this.sampleCalculationDialog, {
            panelClass: 'mint-calculation-panel',
        });
    }
    alterDescriptionText() {
       this.showShortDesciption = !this.showShortDesciption
    }
    closeDialog() {
        this._matDialog.closeAll();
    }
}
