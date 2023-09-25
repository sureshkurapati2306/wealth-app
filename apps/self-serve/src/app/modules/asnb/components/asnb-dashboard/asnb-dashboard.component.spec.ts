import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AsnbDashboardComponent } from './asnb-dashboard.component';
import { AsnbService } from '../../services/asnb.service';
import {
    getASNBFundDetails,
    getASNBMemberList,
    getCheckout,
    getExternalUrlList,
    getSelectedMember,
} from '../../+state/asnb.selectors';
import {
    asnbTopUp,
    loadAsnbFundDetails,
    loadAsnbMinorFundDetails,
    loadPastTransaction,
    updateCheckoutState,
    updateSelectedMember,
    loadOperationHourDetails,
    loadExternalUrlList,
} from '../../+state/asnb.actions';
import { Subscription, of } from 'rxjs';
import { AsnbMember, FundDetails } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { initialState } from '../../+state/asnb.reducer';

describe('AsnbDashboardComponent', () => {
    let component: AsnbDashboardComponent;
    let fixture: ComponentFixture<AsnbDashboardComponent>;
    let storeMock: Partial<Store>;

    beforeEach(async () => {
        storeMock = {
            select: jest.fn().mockReturnValue(of({})),
            dispatch: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [AsnbDashboardComponent],
            imports: [HttpClientModule],
            providers: [
                AsnbService,
                { provide: Store, useValue: storeMock },
                { provide: MatDialog, useValue: {} },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbDashboardComponent);
        component = fixture.componentInstance;

        component.asnbOverview = {
            name: '',
            uhId: '',
            currentInvestment: 0,
            lastUpdateDate: '',
        };
    });

    it('should dispatch loadAsnbFundDetails action on ngOnInit', () => {
        const mockData = null;

        const selectSpy = jest.spyOn(storeMock, 'select').mockReturnValue(of(mockData));
        const expectedAction = loadAsnbFundDetails({ options: {} });
        fixture.detectChanges();
        expect(selectSpy).toHaveBeenCalledWith(getSelectedMember);
        expect(storeMock.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch loadAsnbMinorFundDetails action on ngOnInit', () => {
        const mockData: AsnbMember = { name: 'Test', membershipNumber: '123', value: '123' };

        const selectSpy = jest.spyOn(storeMock, 'select').mockReturnValue(of(mockData));
        const expectedAction = loadAsnbMinorFundDetails({
            options: { unitHolderId: mockData.value },
        });
        fixture.detectChanges();
        expect(selectSpy).toHaveBeenCalledWith(getSelectedMember);
        expect(storeMock.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('shoud dispatch loadExternalUrlList action on ngOnInit when URL object is empty', () => {
        const mockData = {};
        const selectSpy = jest.spyOn(storeMock, 'select').mockReturnValue(of(mockData));

        const expectedAction = loadExternalUrlList();
        fixture.detectChanges();
        expect(selectSpy).toHaveBeenCalledWith(getExternalUrlList);
        expect(storeMock.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should assign memberlist on ngOnInit', () => {
        const mockData: AsnbMember[] = [
            {
                name: 'Test',
                membershipNumber: '123',
                value: '123',
            },
            {
                name: 'Test2',
                membershipNumber: '123',
                value: '123',
            },
        ];

        const selectSpy = jest.spyOn(storeMock, 'select').mockReturnValue(of(mockData));

        component.ngOnInit();

        expect(selectSpy).toHaveBeenCalledWith(getASNBMemberList);
        expect(component.asnbMemberList).toEqual(mockData);
    });

    it('should clear asnb top up state on ngOnInit', () => {
        const expectedAction = asnbTopUp({
            amount: null,
            fundId: null,
            fundName: null,
        });

        fixture.detectChanges();

        expect(storeMock.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should update fixedFunds and variableFunds with data from store', () => {
        const expectedData: FundDetails = {
            fix_price: [
                {
                    blockedUnits: 123,
                    certUnits: 123,
                    eligibleLoanUnits: 123,
                    epfUnits: 123,
                    fundId: 'Fixed Fund ID',
                    loanUnits: 123,
                    nav: 123,
                    provisionalUnits: 123,
                    totalUnits: 400,
                    ubbUnits: 123,
                    ubcUnits: 123,
                    uhAccountStatus: 'status',
                    uhHoldings: 123,
                    unitBalance: 123,
                },
            ],
            variable_price: [
                {
                    blockedUnits: 456,
                    certUnits: 456,
                    eligibleLoanUnits: 456,
                    epfUnits: 456,
                    fundId: 'Variable Fund ID',
                    loanUnits: 456,
                    nav: 456,
                    provisionalUnits: 456,
                    totalUnits: 500,
                    ubbUnits: 456,
                    ubcUnits: 456,
                    uhAccountStatus: 'status',
                    uhHoldings: 456,
                    unitBalance: 456,
                },
            ],
        };
        const spySelect = jest.spyOn(storeMock, 'select').mockReturnValue(of(expectedData));
        component.ngOnInit();

        expect(spySelect).toHaveBeenCalledWith(getASNBFundDetails);
        expect(component.fixedFunds).toEqual(expectedData.fix_price);
        expect(component.variableFunds).toEqual(expectedData.variable_price);
    });

    it('should unsubscribe from all subscriptions on destroy', () => {
        // Create mock subscriptions
        const mockFundDetailSubscription = new Subscription();
        const mockMemberShipSubscription = new Subscription();
        const mockAsnbOverviewSubscription = new Subscription();
        const mockAsnbSummarySubscription = new Subscription();

        jest.spyOn(mockFundDetailSubscription, 'unsubscribe');
        jest.spyOn(mockMemberShipSubscription, 'unsubscribe');
        jest.spyOn(mockAsnbOverviewSubscription, 'unsubscribe');
        jest.spyOn(mockAsnbSummarySubscription, 'unsubscribe');

        // Assign mock subscriptions to component properties
        component.fundDetailSubscription = mockFundDetailSubscription;
        component.memberShipSubscription = mockMemberShipSubscription;
        component.asnbOverviewSubscription = mockAsnbOverviewSubscription;
        component.asnbSummarySubscription = mockAsnbSummarySubscription;

        // Call ngOnDestroy
        component.ngOnDestroy();

        // Expect all unsubscribe methods to have been called
        expect(mockFundDetailSubscription.unsubscribe).toHaveBeenCalled();
        expect(mockMemberShipSubscription.unsubscribe).toHaveBeenCalled();
        expect(mockAsnbOverviewSubscription.unsubscribe).toHaveBeenCalled();
        expect(mockAsnbSummarySubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should load past transaction on fetchPastTransaction', () => {
        //mock store select to return asnbmemberlist
        const mockData: AsnbMember[] = [
            {
                name: 'Test',
                membershipNumber: '123',
                value: '123',
            },
            {
                name: 'Test2',
                membershipNumber: '123',
                value: '123',
            },
        ];

        const selectSpy = jest.spyOn(storeMock, 'select').mockReturnValue(of(mockData));

        component.ngOnInit();

        expect(selectSpy).toHaveBeenCalledWith(getASNBMemberList);

        //mock store select to return asnbmemberlist
        const mockFundId = '123';

        component.fetchPastTransaction(mockFundId);
    });

    it('should load past transaction on fetchPastTransaction for minor', () => {
        //mock store select to return asnbmemberlist
        const mockData: AsnbMember[] = [
            {
                name: 'Test',
                membershipNumber: '123',
                value: '123',
            },
            {
                name: 'Test2',
                membershipNumber: '123',
                value: '123',
            },
        ];

        const selectSpy = jest.spyOn(storeMock, 'select').mockReturnValue(of(mockData));

        component.ngOnInit();

        expect(selectSpy).toHaveBeenCalledWith(getASNBMemberList);

        //mock store select to return asnbmemberlist
        const mockFundId = '123';

        component.fetchPastTransaction(mockFundId);

        //check for selected asnb member whether it is minor
        const mockData2: AsnbMember = {
            name: 'Test2',
            membershipNumber: '123',
            value: '123',
        };
        const selectSpy2 = jest.spyOn(storeMock, 'select').mockReturnValue(of(mockData2));

        component.ngOnInit();

        expect(selectSpy2).toHaveBeenCalledWith(getSelectedMember);
    });

    it('should dispatch updateSelectedMember action when onChangeMemberShip is called', () => {
        const selectedMemberMockData = { name: 'Test', membershipNumber: '123', value: '123' };
        component.onChangeMemberShip(selectedMemberMockData);
        jest.spyOn(storeMock, 'dispatch');
        expect(storeMock.dispatch).toHaveBeenCalledWith(
            updateSelectedMember({ payload: selectedMemberMockData }),
        );
    });

    it('should dispatch updateCheckoutState action when onChangeMemberShip is called with minor details', () => {
        const selectedMemberMockData = {
            name: 'Test Minor',
            membershipNumber: '12345',
            value: '12345',
        };
        const checkoutMockData = {
            ...initialState.checkout,
            guardianDetails: { name: 'Test Guardian', unitHolderId: '123' },
        };
        jest.spyOn(storeMock, 'dispatch');
        const checkoutSelectSpy = jest
            .spyOn(storeMock, 'select')
            .mockReturnValue(of(checkoutMockData));

        component.onChangeMemberShip(selectedMemberMockData);

        expect(checkoutSelectSpy).toHaveBeenCalledWith(getCheckout);

        expect(storeMock.dispatch).toHaveBeenCalledWith(
            updateCheckoutState({
                payload: {
                    ...checkoutMockData,
                    minorDetails: { name: 'Test Minor', unitHolderId: '12345' },
                },
            }),
        );
        expect(component.minorDetails).toEqual({ name: 'Test Minor', unitHolderId: '12345' });
    });

    it('should dispatch updateCheckoutState action when onChangeMemberShip is called with guardian details', () => {
        const selectedMemberMockData = {
            name: 'Test Guardian',
            membershipNumber: '123',
            value: '',
        };
        const checkoutMockData = {
            ...initialState.checkout,
            guardianDetails: { name: 'Test Guardian', unitHolderId: '123' },
            minorDetails: { name: 'Test Minor', unitHolderId: '12345' },
        };
        jest.spyOn(storeMock, 'dispatch');
        const checkoutSelectSpy = jest
            .spyOn(storeMock, 'select')
            .mockReturnValue(of(checkoutMockData));

        component.onChangeMemberShip(selectedMemberMockData);

        expect(checkoutSelectSpy).toHaveBeenCalledWith(getCheckout);

        expect(storeMock.dispatch).toHaveBeenCalledWith(
            updateCheckoutState({
                payload: {
                    ...checkoutMockData,
                    minorDetails: undefined,
                },
            }),
        );
        expect(component.minorDetails).toBeUndefined();
    });

    it('shoud dispatch loadOperationHourDetails action on ngOnInit when object is empty', () => {
        jest.spyOn(storeMock, 'dispatch');
        fixture.detectChanges();
        expect(storeMock.dispatch).toHaveBeenCalledWith(loadOperationHourDetails());
    });
});
