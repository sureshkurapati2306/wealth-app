/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MobileTooltipComponent } from '@cimb/mint';
import { Router } from '@angular/router';
import { AppService } from '../../../../../../../wealth-app/apps/self-serve/src/app/core/services/app.service';

@Component({
    selector: 'cimb-progress-sub-header',
    templateUrl: './progress-sub-header.component.html',
    styleUrls: ['./progress-sub-header.component.scss'],
})
export class ProgressSubHeaderComponent {
    @Output() backButtonEvent: EventEmitter<any> = new EventEmitter();
    @Output() startInvestmentButtonEvent: EventEmitter<any> = new EventEmitter();
    @Output() redirectEvent = new EventEmitter();
    allUrl: string[];
    lastElement: string[];

    @Input() pageTitle: string;
    @Input() label: string;
    @Input() isFundHoliday: boolean;
    @Input() isBackButtonEnabled: boolean;
    @Input() noProgressStep: boolean;
    // @Input() progressActiveStep? = 1;
    @Input() userType: string;
    @Input() enableStartInvestmentButton = false;

    constructor(
        private _bottomSheet: MatBottomSheet,
        private router: Router,
        private appService: AppService,
    ) {
        this.allUrl = this.appService.getURLs();
    }

    fundHolidayBottomSheet() {
        this._bottomSheet.open(MobileTooltipComponent, {
            panelClass: 'tooltip-action-sheet',
            data: {
                actionHeading: 'Fund Holiday',
                actionContent:
                    '<p>The fund is currently not available for transactions due to the fund holiday declared by the fund house. Pricing of the funds will resume on the following business day.</p>',
            },
        });
    }
    //back button functionality
    backClickEvent() {
        if (this.allUrl.length > 1) {
            this.allUrl.pop();
        }
        this.lastElement = this.allUrl.slice(-1);

        if (this.lastElement[0] === '/opening-account') {
            this.allUrl.pop();
            this.lastElement = this.allUrl.slice(-1);
        } else if (
            this.lastElement[0] === '/dashboard;tab=0' ||
            this.lastElement[0] === '%2Fdashboard%3Btab%3D0' ||
            this.lastElement[0] === '/review-purchase'
        ) {
            this.lastElement[0] = '/dashboard';
        }
        this.router.navigate([this.lastElement[0]]);
        this.redirectEvent.emit();
    }
    startInvestment() {
        this.startInvestmentButtonEvent.emit(true);
    }
}
