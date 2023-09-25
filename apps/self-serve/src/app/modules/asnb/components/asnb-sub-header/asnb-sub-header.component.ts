import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { path } from '../../../../../app/shared/config/path';
import { AsnbOverview, AsnbSubheaderContent, Investment } from '../../models';
import * as moment from 'moment';

@Component({
    selector: 'cimb-asnb-sub-header',
    templateUrl: './asnb-sub-header.component.html',
    styleUrls: ['./asnb-sub-header.component.scss'],
})
export class AsnbSubHeaderComponent implements OnInit, OnChanges {
    @Input() asnbOverallInvestment: AsnbOverview;
    @Input() asnbSummary: Investment;

    content: AsnbSubheaderContent;

    constructor(private router: Router) {}

    ngOnInit() {
        this.content = {
            title: 'My ASNB Dashboard',
            description: 'This is an overview to all your investments from your ASNB account.',
            goToWealthDashboardText: 'Back to My Wealth Dashboard',
        };
    }

    ngOnChanges() {
        if (this.content) {
            this.content.lastUpdate =
                'Last update ' +
                moment(this.asnbSummary?.investmentLastUpdated).format('DD MMM YYYY, hh:mm A');
        }
    }

    goToWealthDashboard() {
        this.router.navigate([path.WEALTH_DASHBOARD]);
    }
}
