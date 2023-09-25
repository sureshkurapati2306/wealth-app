import { Component, OnInit } from '@angular/core';
import { getUrlList } from '../+state/asnb-settings.selectors';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { loadUrlList } from '../+state/asnb-settings.actions';

@Component({
    selector: 'cimb-office-url-maintenance-table',
    templateUrl: './url-maintenance-table.component.html',
    styleUrls: ['./url-maintenance-table.component.scss'],
})
export class UrlMaintenanceTableComponent implements OnInit {
    displayedColumns: string[] = ['urlShortCode', 'urlLabel', 'urlLink', 'urlAction'];
    urlList$ = this.store.select(getUrlList);

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.store.dispatch(loadUrlList());
    }

    addUrl() {
        this.router.navigate(['/asnb-settings/add-url'], { relativeTo: this.route });
    }

    editUrl(urlCode: string) {
        this.router.navigate(['/asnb-settings/edit-url', urlCode]);
    }
}
