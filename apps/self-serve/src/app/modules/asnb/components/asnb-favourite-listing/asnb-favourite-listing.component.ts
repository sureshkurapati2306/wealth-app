import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import {
    AsnbFavourite,
    AsnbFavouriteList,
    AsnbFundListing,
    OperationHourResponse,
} from '../../models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { asnbFavouritePurchase } from '../../+state/asnb.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogAsnbServiceHoursGeneralComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-service-hours-general/dialog-asnb-service-hours-general.component';
import { take } from 'rxjs/operators';
import { DowntimeService } from 'apps/self-serve/src/app/core/services/downtime/downtime.service';
import { getAllFundsListing } from '../../+state/asnb.selectors';
import { DialogAlertComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-alert/dialog-alert.component';

@Component({
    selector: 'cimb-asnb-favourite-listing',
    templateUrl: './asnb-favourite-listing.component.html',
    styleUrls: ['./asnb-favourite-listing.component.scss'],
})
export class AsnbFavouriteListingComponent extends MatPaginatorIntl implements OnChanges, OnInit {
    @Input() favouriteList: AsnbFavouriteList;
    @Input() disablePurchaseNonOperation: boolean;
    @Input() operationHours: OperationHourResponse;
    @Output() pageChange = new EventEmitter<number>();

    constructor(
        private router: Router,
        private store: Store,
        private dialog: MatDialog,
        private downtimeService: DowntimeService,
    ) {
        super();
    }

    pageSize = 10;
    currentPage = 0;
    startIndex: number = null;
    endIndex: number = null;

    nextPageLabel = '';
    previousPageLabel = '';
    paginationHeading = '';

    isFundSuspended = false;

    fundListing: AsnbFundListing[] = [];

    ngOnInit(): void {
        this.store.select(getAllFundsListing).subscribe((data) => {
            if (data) {
                this.fundListing = data;
            }
        });
    }

    onPageClick(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageChange.emit(event.pageIndex);
        this.generatePaginationHeading();
    }

    getRangeLabel = (page: number, _pageSize: number, length: number) => {
        const itemsPerPage = this.pageSize;
        this.startIndex = page * itemsPerPage + 1;
        this.endIndex = Math.min(this.startIndex + itemsPerPage - 1, length);

        return `Page ${this.startIndex} - ${this.endIndex} of ${length}`;
    };

    generatePaginationHeading() {
        const itemsPerPage = this.pageSize;
        this.startIndex = this.currentPage * itemsPerPage + 1;
        this.endIndex = Math.min(
            this.startIndex + itemsPerPage - 1,
            this.favouriteList.totalAsnbFavourites,
        );

        this.paginationHeading = `Showing ${this.startIndex}-${this.endIndex} of ${this.favouriteList.totalAsnbFavourites} favourite account(s)`;
    }

    initializePagination() {
        // Initialize startIndex
        this.startIndex = 1;

        // Initialize endIndex
        this.endIndex =
            this.favouriteList.totalAsnbFavourites > this.pageSize
                ? this.pageSize
                : this.favouriteList.totalAsnbFavourites;

        // Initialize pagination heading
        this.generatePaginationHeading();
    }

    onPurchaseClick(event: AsnbFavourite) {
        let hasScheduledMaintenance = false;

        this.downtimeService
            .getASNBScheduledDowntime()
            .pipe(take(1))
            .subscribe((data) => {
                hasScheduledMaintenance = data?.hasScheduledMaintenance;
            });

        const isFundSuspended =
            this.fundListing.find((fund) => fund.fundCode === event.fundCode)?.fundStatus ===
            'SUSPEND';

        if (hasScheduledMaintenance) {
            return this.router.navigate(['/asnb-dashboard/scheduled-maintenance']);
        }

        if (this.disablePurchaseNonOperation) {
            return this.dialog.open(DialogAsnbServiceHoursGeneralComponent, {
                data: this.operationHours,
            });
        }

        if (isFundSuspended) {
            return this.openSuspendFundDialog();
        }

        this.store.dispatch(asnbFavouritePurchase({ payload: event }));
        this.router.navigate(['/asnb-dashboard/asnb-favourite-purchase']);
    }

    openSuspendFundDialog() {
        this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog'],
            maxWidth: '600px',
            autoFocus: false,
            disableClose: true,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-danger"></em>',
                dialogHeading: 'Fund Suspend Period',
                dialogContent: `<p>Sorry, transaction for this fund currently is not available due to <strong>Fund Suspension.</strong> We'll be back once the fund suspension period ends.<br><br>Please check back with us later.</p>`,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Okay',
            },
        });
    }

    ngOnChanges(change: SimpleChanges) {
        if (change.favouriteList?.currentValue) {
            this.initializePagination();
            window.scrollTo(0, 0);
        }
    }
}
