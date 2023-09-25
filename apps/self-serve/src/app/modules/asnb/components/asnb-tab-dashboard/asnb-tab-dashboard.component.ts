import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    OnDestroy,
    AfterViewInit,
} from '@angular/core';
import {
    Fund,
    AsnbMember,
    HideTopUp,
    AsnbFavouriteList,
    OperationHourResponse,
} from '../../models/asnb.model';
import { Store } from '@ngrx/store';
import {
    asnbTopUp,
    loadFavouriteListSuccess,
    updateDashboardInfoFavouriteList,
} from '../../+state/asnb.actions';
import {
    getASNBDowntimeScheduledMaintenance,
    getOperationHourDetails,
    getSelectedMember,
} from '../../+state/asnb.selectors';
import * as moment from 'moment';
import { AsnbService } from '../../services/asnb.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription, combineLatest } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAsnbServiceHoursGeneralComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-service-hours-general/dialog-asnb-service-hours-general.component';

@Component({
    selector: 'cimb-asnb-tab-dashboard',
    templateUrl: './asnb-tab-dashboard.component.html',
    styleUrls: ['./asnb-tab-dashboard.component.scss'],
})
export class AsnbTabDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() fixedFunds: Fund[] = [];
    @Input() variableFunds?: Fund[];
    @Input() asnbMemberList: AsnbMember[] = [];

    @Output() selectedMemberShip = new EventEmitter<AsnbMember>();
    @Output() getPastTransaction = new EventEmitter<string>();

    hideTopUp: HideTopUp;

    operationHourDetails$ = this.store.select(getOperationHourDetails);

    asnbFavouritesList: AsnbFavouriteList;

    tabIndexSubscription: Subscription;
    selectedIndex = 0;

    enableAddNewInvestmentButton = false;
    enableFavouritesTab = true;
    hideVpTopUp: HideTopUp;

    favListSubscription: Subscription;
    operationHours: OperationHourResponse;

    constructor(
        private store: Store,
        private asnbService: AsnbService,
        private router: Router,
        private dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.getAsnbFavoriteList(0);

        this.operationHourDetails$.subscribe((data) => {
            this.hideTopUp = this.hideTopUpAfterBusinessOperationHours(
                data.startTime,
                data.endTime,
            );
            this.operationHours = data;
        });

        combineLatest([
            this.asnbService.getAsnbSettings('101'),
            this.asnbService.getAsnbSettings('102'),
            this.asnbService.getAsnbSettings('103'),
            this.asnbService.getAsnbSettings('104'),
            this.store.select(getSelectedMember),
        ]).subscribe(
            ([
                enableAddNewInvestmentButtonGuardian,
                enableAddNewInvestmentButtonMinor,
                enableFavouritesTabGuardian,
                enableFavouritesTabMinor,
                selectedAsnbMember,
            ]) => {
                let isMinor = false;

                if (selectedAsnbMember?.membershipNumber) {
                    isMinor =
                        selectedAsnbMember.membershipNumber !==
                        this.asnbMemberList[0].membershipNumber;
                }

                if (isMinor) {
                    this.enableAddNewInvestmentButton = enableAddNewInvestmentButtonMinor.enabled;
                    this.enableFavouritesTab = enableFavouritesTabMinor.enabled;
                } else {
                    this.enableAddNewInvestmentButton =
                        enableAddNewInvestmentButtonGuardian.enabled;
                    this.enableFavouritesTab = enableFavouritesTabGuardian.enabled;
                }
            },
        );

        combineLatest([
            this.asnbService.getAsnbSettings('105'),
            this.asnbService.getAsnbSettings('106'),
            this.store.select(getSelectedMember),
        ]).subscribe(([enableVpTopUpGuardian, enableVpTopUpMinor, selectedAsnbMember]) => {
            let isMinor = false;

            if (selectedAsnbMember?.membershipNumber) {
                isMinor =
                    selectedAsnbMember.membershipNumber !== this.asnbMemberList[0].membershipNumber;
            }

            this.hideVpTopUp = {
                status: isMinor ? !enableVpTopUpMinor.enabled : !enableVpTopUpGuardian.enabled,
                message: '',
            };
        });
    }

    ngAfterViewInit() {
        this.tabIndexSubscription = this.asnbService.tabIndex$.subscribe((index) => {
            this.selectedIndex = index;
        });
        this.favListSubscription = this.asnbService.favList$.pipe(skip(1)).subscribe(() => {
            this.store.dispatch(updateDashboardInfoFavouriteList());
            this.getAsnbFavoriteList(0);
        });
    }

    ngOnDestroy() {
        // Index 0 is My Funds Tab
        this.asnbService.updateTabIndex(0);
        this.tabIndexSubscription.unsubscribe();
        this.favListSubscription.unsubscribe();
    }

    onDropdownSelectedItem(selectedItem: AsnbMember) {
        this.selectedMemberShip.emit(selectedItem);
        this.store.dispatch(asnbTopUp({ fundName: '', amount: 0, fundId: '' }));
    }

    onTabChange(event: MatTabChangeEvent) {
        this.store.dispatch(asnbTopUp({ fundName: '', amount: 0, fundId: '' }));
        this.asnbService.updateTabIndex(event.index);
    }

    fetchPastTransactions(fundId: string) {
        this.getPastTransaction.emit(fundId);
    }

    hideTopUpAfterBusinessOperationHours(startTime: string, endTime: string): HideTopUp {
        const format = 'hh:mmA';
        const currentTime = moment().utcOffset('+0800');

        const startTimeInMilisecond = moment(startTime, format);
        const endTimeInMilisecond = moment(endTime, format);
        const currentTimeInMilisecond = moment(currentTime, format);

        const startTimeDisplay = moment(startTimeInMilisecond).format(format);
        const endTimeDisplay = moment(endTimeInMilisecond).format(format);

        return {
            status: !currentTimeInMilisecond.isBetween(startTimeInMilisecond, endTimeInMilisecond),
            message:
                'ASNB transactional services are only available from ' +
                '<strong>Monday to Sunday from ' +
                startTimeDisplay +
                ' to ' +
                endTimeDisplay +
                '.</strong> ' +
                'You can still browse and manage your ASNB account with us outside these hours. ' +
                'We’re happy to assist you with your investment when the transactional services are in operation again.',
        };
    }

    getAsnbFavoriteList(pageNumber: number) {
        this.asnbService.getAsnbFavourites(pageNumber).subscribe((data) => {
            if (data) {
                this.asnbFavouritesList = data;
                this.store.dispatch(loadFavouriteListSuccess());
            }
        });
    }

    onAddNewInvestment() {
        const isScheduledMaintenance = this.isAsnbScheduledMaintenance();

        if (isScheduledMaintenance) {
            return this.router.navigate(['/asnb-dashboard/scheduled-maintenance']);
        }

        if (this.hideTopUp.status) {
            return this.openOperationHourDialog();
        }

        this.router.navigate(['/asnb-dashboard/asnb-available-funds']);
    }

    isAsnbScheduledMaintenance() {
        let isScheduledMaintenance = false;

        const timeFormat = 'HH:mm:ss';

        const now = moment().utcOffset('+0800').format(timeFormat);

        const time = moment(now, timeFormat);

        this.store.select(getASNBDowntimeScheduledMaintenance).subscribe((data) => {
            const { startDate, startTime, endDate, endTime, dataPresent } = data;

            const date = new Date();

            const isBetweenDates = moment(moment(date).format('YYYY-MM-DD')).isBetween(
                startDate,
                endDate,
                null,
                '[]',
            );

            const maintenanceStartTime = moment(startTime, timeFormat);
            const maintenanceEndTime = moment(endTime, timeFormat);

            if (dataPresent === 'Yes') {
                if (isBetweenDates) {
                    isScheduledMaintenance =
                        time.isBetween(maintenanceStartTime, maintenanceEndTime) ||
                        time.isSame(maintenanceStartTime) ||
                        time.isSame(maintenanceEndTime);
                }
            }
        });

        return isScheduledMaintenance;
    }

    openOperationHourDialog() {
        this.dialog.open(DialogAsnbServiceHoursGeneralComponent, {
            data: this.operationHours,
        });
    }
}
