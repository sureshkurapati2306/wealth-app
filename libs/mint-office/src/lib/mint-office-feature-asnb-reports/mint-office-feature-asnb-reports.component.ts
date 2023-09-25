import { Component } from '@angular/core';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { AsnbReportsService } from '../core/services/asnb-reports.service';
import { Store } from '@ngrx/store';
import { DownloadService } from '../core/services/json-to-csv.service';
import {
    loadTransactions,
    clearTransactions,
    loadLinkAccount,
    clearLinkAccount,
    loadFavourite,
    clearFavourite,
} from './+state/asnb-report.actions';
import {
    getTransactions,
    getLoadingStatus,
    getHasSearched,
    getLinkAccount,
    getLinkAccountLoadingStatus,
    getLinkAccountHasSearched,
    getTransactionFilter,
    getLinkAccountFilter,
    getFavouriteFilter,
    getFavourite,
    getFavouriteLoadingStatus,
    getFavouriteHasSearched,
} from './+state/asnb-report.selectors';
import * as moment from 'moment';

@Component({
    selector: 'cimb-office-mint-office-feature-asnb-reports',
    templateUrl: './mint-office-feature-asnb-reports.component.html',
    styleUrls: ['./mint-office-feature-asnb-reports.component.scss'],
    providers: [DownloadService],
})
export class MintOfficeFeatureAsnbReportsComponent {
    tabName = 'Transactions';
    transactions$ = this.store.select(getTransactions);
    loadingState$ = this.store.select(getLoadingStatus);
    hasSearched$ = this.store.select(getHasSearched);
    transactionFilter$ = this.store.select(getTransactionFilter);
    accountLinkFilter$ = this.store.select(getLinkAccountFilter);
    favouriteFilter$ = this.store.select(getFavouriteFilter);

    linkAccount$ = this.store.select(getLinkAccount);
    linkAccountLoadingState$ = this.store.select(getLinkAccountLoadingStatus);
    linkAccountHasSearched$ = this.store.select(getLinkAccountHasSearched);

    favourite$ = this.store.select(getFavourite);
    favouriteLoadingState$ = this.store.select(getFavouriteLoadingStatus);
    favouriteHasSearched$ = this.store.select(getFavouriteHasSearched);

    hasSearched = false;
    linkAccountHasSearched = false;
    favouriteHasSearched = false;

    breadcrumbsPaths: BreadcrumbsPath[] = [
        {
            label: 'ASNB Reports',
            url: null,
        },
    ];

    constructor(private asnbReports: AsnbReportsService, private store: Store) {}

    tabChanged(event) {
        switch (event.index) {
            case 1: {
                this.tabName = 'Link Account';
                break;
            }
            case 2: {
                this.tabName = 'Add Favourite';
                break;
            }
            default: {
                this.tabName = 'Transactions';
                break;
            }
        }
    }

    searchTransactions(filter) {
        const payload = this.getPayload(filter);
        this.store.dispatch(
            loadTransactions({
                payload,
            }),
        );
        this.hasSearched = true;
    }

    clearTransactions() {
        this.store.dispatch(clearTransactions());
    }

    searchLinkAccount(filter) {
        const payload = this.getPayload(filter);
        this.store.dispatch(
            loadLinkAccount({
                payload,
            }),
        );
        this.linkAccountHasSearched = true;
    }

    clearLinkAccount() {
        this.store.dispatch(clearLinkAccount());
    }

    filterLinkAccountAction(data: string[]) {
        const linkAccountAction = ['Link', 'Delink'];

        if (data.length === 1) {
            if (data.includes(linkAccountAction[0])) {
                return true;
            } else if (data.includes(linkAccountAction[1])) {
                return false;
            }
        } else {
            return null;
        }
    }

    searchFavourite(filter) {
        const payload = this.getPayload(filter);
        this.store.dispatch(
            loadFavourite({
                payload,
            }),
        );
        this.favouriteHasSearched = true;
    }

    clearFavourite() {
        this.store.dispatch(clearFavourite());
    }

    getPayload(filter) {
        return {
            ...(filter.startDate && {
                startDate: moment(filter.startDate).format('YYYY-MM-DDT00:00:00'),
            }),
            ...(filter.endDate && {
                endDate: moment(filter.endDate).format('YYYY-MM-DDT23:59:59'),
            }),
            ...(filter.status && {
                transactionStatus: filter.status,
            }),
            ...(filter.action?.length && { 
                transactionType: filter.action,
                isAsnbAccountLink: this.filterLinkAccountAction(filter.action) 
            }),
            ...(filter.customerName && { 
                clientName: filter.customerName,
                customerName: filter.customerName,
            }),
            ...(filter.customerId && { 
                clientId: filter.customerId,
                customerId: filter.customerId,
            }),
        }
    }
}
