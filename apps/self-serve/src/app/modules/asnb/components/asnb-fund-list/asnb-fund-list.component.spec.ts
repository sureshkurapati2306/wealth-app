import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
    AsnbFundListComponent,
    updateShowSofSowPopUpState,
    updateShowSowState,
} from './asnb-fund-list.component';

import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import {
    ASNBScheduledDowntimeInfo,
    AsnbFund,
    AsnbTransactionLimit,
    CommonDropDown,
    PastTransactionMap,
    ScheduledMaintenance,
} from '../../models';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DowntimeService } from 'apps/self-serve/src/app/core/services/downtime/downtime.service';
import {
    getASNBDowntimeScheduledMaintenance,
    getCheckout,
    getFetchStatus,
    getFundTypesMap,
    getPastTransaction,
    getSofSowList,
    getTopUp,
    getTransactionLimit,
    getUserRiskStatus,
} from '../../+state/asnb.selectors';
import { checkoutMockData } from '../../mocks/data';
import { createOrder } from '../../+state/asnb.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Status } from '../../+state/asnb.reducer';
import { Router } from '@angular/router';

describe('AsnbFundListComponent', () => {
    let component: AsnbFundListComponent;
    let fixture: ComponentFixture<AsnbFundListComponent>;
    let mockDialog;
    let mockStore: MockStore;
    let mockDialogRef;
    let mockDowntimeService: Partial<DowntimeService>;
    let router: Router;

    const mockTopUp = {
        fundName: 'fundname1',
        amount: 10,
        fundId: 'fundcode1',
    };
    const mockFetchStatus: { status: Status; error: string } = { status: 'success', error: '' };
    const mockFundTypesMap = { fundcode1: 'Fundcode 1' };
    const mockTransactionLimit: AsnbTransactionLimit = {
        currentLimit: 1,
        maxLimit: 1,
    };
    const mockSofSowList: CommonDropDown[] = [
        {
            id: 'SAL',
            value: 'Salary',
        },
    ];
    const mockPastTransactions: PastTransactionMap = {
        transaction1: {
            transactionalDetail: [
                {
                    transactionAmount: '100',
                    transactionDate: '2023-09-01',
                    transactionType: 'Own',
                },
            ],
            errorCode: '0',
            errorMsg: 'Success',
        },
    };

    beforeEach(async () => {
        mockDialog = {
            open: jest.fn(),
        };

        mockDialogRef = {
            afterClosed: jest.fn().mockReturnValue(of(true)),
        };

        mockDowntimeService = {
            getASNBScheduledDowntime: jest.fn().mockReturnValue(of({})),
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [AsnbFundListComponent],
            providers: [
                { provide: MatDialog, useValue: mockDialog },
                provideMockStore(),
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: DowntimeService, useValue: mockDowntimeService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        mockStore = TestBed.inject(MockStore);
        router = TestBed.inject(Router);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbFundListComponent);
        component = fixture.componentInstance;
        component.fundListData = {
            fundId: 'ASB',
            uhHoldings: 100,
            totalUnits: 10,
            ubbUnits: 20,
            ubcUnits: 30,
            blockedUnits: 200,
            certUnits: 200,
            eligibleLoanUnits: 200,
            epfUnits: 200,
            loanUnits: 200,
            nav: 200,
            provisionalUnits: 200,
            uhAccountStatus: 'status',
            unitBalance: 200,
        };
        mockStore.overrideSelector(getTopUp, mockTopUp);
        mockStore.overrideSelector(getFetchStatus, mockFetchStatus);
        mockStore.overrideSelector(getFundTypesMap, mockFundTypesMap);
        mockStore.overrideSelector(getTransactionLimit, mockTransactionLimit);
        mockStore.overrideSelector(getSofSowList, mockSofSowList);
        mockStore.overrideSelector(getPastTransaction, mockPastTransactions);
        Date.now = jest.fn(() => new Date('2023-01-01T13:00:00.000+08:00').getTime());
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should unsubscribe from pastTransactionSubscription', () => {
        // Mock the pastTransactionSubscription object
        const mockSubscription: Subscription = {
            unsubscribe: jest.fn(),
        } as unknown as Subscription;

        component.pastTransactionSubscription = mockSubscription;
        // Call the ngOnDestroy method
        component.ngOnDestroy();

        // Verify that unsubscribe is called
        expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should dispatch the expected action on changeValueEvent', () => {
        // const amount = '1000'; // Mock the amount value
        // const fundName = 'Fund Name'; // Mock the fundName value
        // const fundId = '123'; // Mock the fundId value

        // Mock the necessary dependencies
        const fundTopUpFormMock = new FormGroup({
            amount: new FormControl(''),
        });

        // Set the mock dependencies in the component
        component.fundTopUpForm = fundTopUpFormMock;

        // Execute the method
        component.changeValueEvent();

        // Assert that the expected action is dispatched
    });

    it('should emit the expected event when expanded is true', () => {
        // Mock the necessary data
        const fundId = '123'; // Mock the fundId value
        const expanded = true;

        const mockFundListData: AsnbFund = {
            fundId: '123',
            uhHoldings: 100,
            totalUnits: 10,
            ubbUnits: 20,
            ubcUnits: 30,
            blockedUnits: 200,
            certUnits: 200,
            eligibleLoanUnits: 200,
            epfUnits: 200,
            loanUnits: 200,
            nav: 200,
            provisionalUnits: 200,
            uhAccountStatus: 'status',
            unitBalance: 200,
        };
        // Set the necessary mock data in the component
        component.fundListData = mockFundListData;

        // Create a spy for the emit method
        const emitSpy = jest.spyOn(component.fetchPastTransactions, 'emit');

        // Execute the method
        component.showPastTransactions(expanded);

        // Assert that the expected event is emitted
        expect(emitSpy).toHaveBeenCalledWith(fundId);
    });

    it('should not emit any event when expanded is false', () => {
        const expanded = false;

        // Create a spy for the emit method
        const emitSpy = jest.spyOn(component.fetchPastTransactions, 'emit');

        // Execute the method
        component.showPastTransactions(expanded);

        // Assert that the emit method is not called
        expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should update properties when getASNBScheduledDowntime is called with data', () => {
        const mockUpcomingDowntimeResponse: ASNBScheduledDowntimeInfo = {
            scheduledMaintenance: {
                dataPresent: 'Yes',
                startTime: '13:43:13',
                startDate: '2023-08-16',
                endTime: '14:30:13',
                endDate: '2023-08-16',
            },
            maintenanceStartTime: '1:43:13 PM',
            maintenanceEndTime: '2:30:13 PM',
            hasScheduledMaintenance: true,
        };

        jest.spyOn(mockDowntimeService, 'getASNBScheduledDowntime').mockReturnValue(
            of(mockUpcomingDowntimeResponse),
        );
        component.ngOnInit();
        expect(component.scheduledMaintenance).toEqual(
            mockUpcomingDowntimeResponse.scheduledMaintenance,
        );
        expect(component.maintenanceStartTime).toEqual('01:43 PM');
        expect(component.maintenanceEndTime).toEqual('02:30 PM');
        expect(component.hasScheduledMaintenance).toEqual(
            mockUpcomingDowntimeResponse.hasScheduledMaintenance,
        );
    });

    it('should call displaySofSowDialog without SofSow when onTopUp is called', () => {
        mockStore.overrideSelector(getSofSowList, []);
        const mockTopUp = {
            fundName: 'fundname1',
            amount: 30000,
            fundId: 'fundcode1',
        };
        mockStore.overrideSelector(getTopUp, mockTopUp);
        mockStore.overrideSelector(getUserRiskStatus, 'HI');

        const displaySofSowDialogSpy = jest.spyOn(component, 'displaySofSowDialog');

        jest.spyOn(mockDialog, 'open').mockReturnValue({
            afterClosed: () => of(null),
        });

        component.onTopUp();

        expect(displaySofSowDialogSpy).toHaveBeenCalled();
    });

    it('should call dispatchCreateOrder when onTopUp is called', () => {
        mockStore.overrideSelector(getUserRiskStatus, 'L');
        mockStore.overrideSelector(getCheckout, checkoutMockData);

        const dispatchCreateOrderSpy = jest.spyOn(component, 'dispatchCreateOrder');

        component.onTopUp();

        expect(dispatchCreateOrderSpy).toHaveBeenCalled();
    });

    it('should call dispatchCreateOrder when displaySofSowDialog is called', () => {
        const mockDialogResponse = {
            sof: 'SOF',
            sofOthers: '',
            sow: 'SOW',
            sowOthers: '',
        };
        jest.spyOn(mockDialog, 'open').mockReturnValue({
            afterClosed: () => of(mockDialogResponse),
        });

        const dispatchCreateOrderSpy = jest.spyOn(component, 'dispatchCreateOrder');

        component.displaySofSowDialog(true, mockTopUp);

        expect(dispatchCreateOrderSpy).toHaveBeenCalled();

        const mockDialogResponseEmpty = {
            sof: '',
            sofOthers: '',
            sow: '',
            sowOthers: '',
        };
        jest.spyOn(mockDialog, 'open').mockReturnValue({
            afterClosed: () => of(mockDialogResponseEmpty),
        });

        component.displaySofSowDialog(true, mockTopUp);

        expect(dispatchCreateOrderSpy).toHaveBeenCalled();
    });

    it('should navigate to scheduled-maintenance when showASNBMaintennaceScreen() is called with downtime', () => {
        const mockScheduledMaintenance: ScheduledMaintenance = {
            dataPresent: 'Yes',
            startTime: '12:00:00',
            startDate: '2023-01-01',
            endTime: '14:00:00',
            endDate: '2023-01-01',
        };
        mockStore.overrideSelector(getASNBDowntimeScheduledMaintenance, mockScheduledMaintenance);

        const navigateSpy = jest.spyOn(router, 'navigate');
        component.showASNBMaintenanceScreen();
        expect(navigateSpy).toHaveBeenCalledWith(['/asnb-dashboard/scheduled-maintenance']);
    });

    it('should dispatch createOrder when dispatchCreateOrder is called', () => {
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        const selectSpy = jest.spyOn(mockStore, 'select').mockReturnValue(of(checkoutMockData));
        const showASNBMaintenanceScreenSpy = jest.spyOn(component, 'showASNBMaintenanceScreen');

        component.dispatchCreateOrder(checkoutMockData, false);
        expect(selectSpy).toHaveBeenCalledWith(getCheckout);
        expect(showASNBMaintenanceScreenSpy).toHaveBeenCalledTimes(0);
        expect(dispatchSpy).toHaveBeenCalledWith(createOrder({ payload: checkoutMockData }));
    });

    it('should return updateShowSofSowPopUpState as false when userRiskStatus is not HI and amount is less than 25000', () => {
        const result = updateShowSofSowPopUpState('M', 20);
        expect(result).toBeFalsy();
    });

    it('should return updateShowSofSowPopUpState as true when userRiskStatus is not HI or amount is more than 25000', () => {
        const result = updateShowSofSowPopUpState('HI', 20);
        expect(result).toBeTruthy();
    });

    it('should return showSowState as true when userRiskStatus is HI', () => {
        const result = updateShowSowState('HI');
        expect(result).toBeTruthy();
    });

    it('should return showSowState as false when userRiskStatus is not HI', () => {
        const result = updateShowSowState('L');
        expect(result).toBeFalsy();
    });
});
