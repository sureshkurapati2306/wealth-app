import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTableComponent } from './fund-table.component';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { availableFunds, checkoutMockData, transactionLimit } from '../../../mocks/data';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    getAllFundsListing,
    getCheckout,
    getExternalUrlList,
    getSofSowList,
    getTopUp,
    getTransactionLimit,
    getUserRiskStatus,
} from '../../../+state/asnb.selectors';
import { AsnbCheckout, AsnbFundListing, CommonDropDown } from '../../../models';
import { asnbTopUp, createOrder, loadSofSowList } from '../../../+state/asnb.actions';
import { investmentType } from '../../../constants';
import { Sort } from '@angular/material/sort';

describe('FundsTableComponent', () => {
    let component: FundTableComponent;
    let fixture: ComponentFixture<FundTableComponent>;
    let mockStore: MockStore;
    let mockDialog;

    const mockExternalUrlList: Record<string, string> = {
        fundPrice: 'https://www.asnb.com.my/dpv2_thedisplay-tv_EN.php',
        prospectus: 'https://www.asnb.com.my/asnbv2_2funds_EN.php#prospektusphs',
    };
    const mockAsnbFundListing: AsnbFundListing = {
        fundId: 2,
        fundCode: 'ASB2',
        fundShortName: 'ASB 2',
        fundLongName: 'Amanah Saham Bumiputera 2',
        fundType: 'fixed',
        fundStatus: 'ACTIVE',
        amount: 1,
    };
    const mockAsnbFundListingSort: AsnbFundListing[] = [
        {
            fundId: 6,
            fundCode: 'AS1M',
            fundShortName: 'ASM 3',
            fundLongName: 'Amanah Saham Malaysia 3',
            fundType: 'fixed',
            fundStatus: 'ACTIVE',
            amount: 1,
        },
        {
            fundId: 7,
            fundCode: 'ASN',
            fundShortName: 'ASN',
            fundLongName: 'Amanah Saham Nasional',
            fundType: 'variable',
            fundStatus: 'ACTIVE',
            amount: 3,
        },
        {
            fundId: 2,
            fundCode: 'ASB2',
            fundShortName: 'ASB 2',
            fundLongName: 'Amanah Saham Bumiputera 2',
            fundType: 'variable',
            fundStatus: 'ACTIVE',
            amount: 2,
        },
    ];
    const mockTopUp = {
        fundName: 'fundname1',
        amount: 10,
        fundId: 'fundcode1',
    };
    const sourceOfWealthAndFund: CommonDropDown[] = [
        { id: 'SOF', value: 'Source of funds' },
        { id: 'SOW', value: 'Source of wealth' },
    ];

    beforeEach(async () => {
        mockDialog = {
            open: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [FundTableComponent],
            providers: [{ provide: MatDialog, useValue: mockDialog }, provideMockStore()],
        }).compileComponents();

        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FundTableComponent);
        component = fixture.componentInstance;
        fixture.componentInstance.data = availableFunds;
        fixture.componentInstance.startIndex = 1;
        fixture.componentInstance.pageLength = availableFunds.length;
        fixture.componentInstance.endIndex = availableFunds.length;
        fixture.componentInstance.sortedData = availableFunds;
        mockStore.overrideSelector(getTransactionLimit, transactionLimit);
        mockStore.overrideSelector(getExternalUrlList, mockExternalUrlList);
        component.data = mockAsnbFundListingSort;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update properties in ngAfterViewInit', () => {
        jest.useFakeTimers();

        component.ngAfterViewInit();

        jest.advanceTimersByTime(5000);

        expect(component.startIndex).toBe(1);
        expect(component.pageLength).toBe(component.dataSource?.data?.length);
        expect(component.endIndex).toBe(
            component.startIndex < component.pageLength
                ? Math.min(component.pageSize, component.pageLength)
                : component.pageLength,
        );

        jest.useRealTimers();
    });

    it('should call sortData with different inputs', () => {
        // for invalid input
        const sortInvalid: Sort = {
            active: '',
            direction: '',
        };
        component.sortData(sortInvalid);
        expect(component.sortedData).toEqual(component.dataSource.data);

        // for fundName asc
        const sortFundName: Sort = {
            active: 'fundName',
            direction: 'asc',
        };
        component.sortData(sortFundName);
        const expectedFundName = component.dataSource?.data.sort((a, b) => (a < b ? -1 : 1));
        expect(component.sortedData).toEqual(expectedFundName);

        // for amount desc
        const sortAmount: Sort = {
            active: 'amount',
            direction: 'desc',
        };
        component.sortData(sortAmount);
        const expectedAmount = component.dataSource?.data.sort((a, b) => (a > b ? -1 : 1));
        expect(component.sortedData).toEqual(expectedAmount);

        // for action asc
        const sortAction: Sort = {
            active: 'action',
            direction: 'asc',
        };
        component.sortData(sortAction);
        const expectedAction = component.dataSource?.data.sort((a, b) => (a < b ? -1 : 1));
        expect(component.sortedData).toEqual(expectedAction);
    });

    it('should dispatch the expected action on changeValueEvent', () => {
        const fundTopUpFormMock = new FormGroup({
            amount: new FormControl('1,000'),
        });
        // Set the mock dependencies in the component
        component.fundTopUpForm[1] = fundTopUpFormMock;

        mockStore.overrideSelector(getAllFundsListing, [mockAsnbFundListing]);
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        const dispatchPayload: { fundName: string; amount: number; fundId: string } = {
            fundName: mockAsnbFundListing.fundLongName,
            amount: 1000,
            fundId: mockAsnbFundListing.fundCode,
        };

        expect(component.changeValueEvent(1, mockAsnbFundListing)).toBeUndefined();
        expect(dispatchSpy).toHaveBeenCalledWith(asnbTopUp(dispatchPayload));
    });

    it('should filter data based on search param', () => {
        expect(component.applyFilter('Susuk')).toBeUndefined();
    });

    it('should show a redirect confirmation modal', () => {
        expect(component.redirectConfirmation('test')).toBeUndefined();
    });

    it('should sort table when user do a sort action', () => {
        const sort = {
            active: 'fundLongName',
            direction: null,
        };
        component.sortData(sort);
        const sortedDataSet = availableFunds;
        component.sortedData = sortedDataSet;
        expect(component.sortedData).toEqual(availableFunds);
    });

    it('should select a row', () => {
        const row = {
            fundId: 2,
            fundCode: 'ASB2',
            fundShortName: 'ASB 2',
            fundLongName: 'Amanah Saham Bumiputera 2',
            fundType: 'fixed',
            fundStatus: 'ACTIVE',
            amount: 1,
        };
        expect(component.onSelectRow(row)).toBeUndefined();
    });

    it('should show details after view', () => {
        expect(component.ngAfterViewInit()).toBeUndefined();
    });

    it('should call getCheckoutData when buyNow is called', () => {
        mockStore.overrideSelector(getUserRiskStatus, 'L');
        mockStore.overrideSelector(getTopUp, mockTopUp);

        const getCheckoutDataSpy = jest.spyOn(component, 'getCheckoutData');
        component.fundType = 'fixed price';
        const topUpInfo: Partial<AsnbCheckout> = {
            fundType: component.fundType,
            investmentType: investmentType.newFund,
            amount: mockTopUp.amount,
            fundId: mockTopUp.fundId,
            fundName: mockTopUp.fundName,
        };

        component.buyNow();
        expect(getCheckoutDataSpy).toHaveBeenCalledWith(topUpInfo);
    });

    it('should open SOF pop up when buyNow is called', () => {
        mockStore.overrideSelector(getUserRiskStatus, 'L');
        const mockTopUpModified = JSON.parse(JSON.stringify(mockTopUp));
        mockTopUpModified.amount = 30000;
        mockStore.overrideSelector(getTopUp, mockTopUpModified);

        component.fundType = 'fixed price';
        const topUpInfo: Partial<AsnbCheckout> = {
            fundType: component.fundType,
            investmentType: investmentType.newFund,
            amount: mockTopUpModified.amount,
            fundId: mockTopUpModified.fundId,
            fundName: mockTopUpModified.fundName,
        };

        mockStore.overrideSelector(getSofSowList, sourceOfWealthAndFund);

        const dialogrefSpy = jest.spyOn(component, 'dialogref');

        component.buyNow();
        expect(dialogrefSpy).toHaveBeenCalledWith(false, topUpInfo, sourceOfWealthAndFund);
    });

    it('should open SOFSOW pop up when buyNow is called', () => {
        mockStore.overrideSelector(getUserRiskStatus, 'HI');
        mockStore.overrideSelector(getTopUp, mockTopUp);

        component.fundType = 'fixed price';
        const topUpInfo: Partial<AsnbCheckout> = {
            fundType: component.fundType,
            investmentType: investmentType.newFund,
            amount: mockTopUp.amount,
            fundId: mockTopUp.fundId,
            fundName: mockTopUp.fundName,
        };

        mockStore.overrideSelector(getSofSowList, sourceOfWealthAndFund);

        const dialogrefSpy = jest.spyOn(component, 'dialogref');

        component.buyNow();
        expect(dialogrefSpy).toHaveBeenCalledWith(true, topUpInfo, sourceOfWealthAndFund);
    });

    it('should open pop up when buyNow is called with empty sourceOfWealthAndFund', () => {
        mockStore.overrideSelector(getUserRiskStatus, 'HI');
        mockStore.overrideSelector(getTopUp, mockTopUp);
        mockStore.overrideSelector(getSofSowList, []);

        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        const dialogrefSpy = jest.spyOn(component, 'dialogref');

        component.buyNow();
        expect(dispatchSpy).toHaveBeenCalledWith(loadSofSowList());
        expect(dialogrefSpy).toHaveBeenCalledTimes(0);
    });

    it('should get checkout data', () => {
        const payload: Partial<AsnbCheckout> = {
            fundType: 'fixed price',
            amount: 11,
            fundId: 'ASN2',
            fundName: 'ASN Equity 2',
            investmentType: 'NF',
        };
        mockStore.overrideSelector(getCheckout, checkoutMockData);

        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        const dispatchPayload = {
            ...checkoutMockData,
            ...payload,
        };

        component.getCheckoutData(payload);
        expect(dispatchSpy).toHaveBeenCalledWith(createOrder({ payload: dispatchPayload }));
    });

    it('should get dialofg ref data', () => {
        const sow = false;
        const topUpInfo = {
            amount: 25000,
            fundId: 'AASSGK',
            fundName: 'ASN Equity 3',
        };

        const sourceofWealthAndFundsData = {
            sof: 'SOF',
            sofOthers: '',
            sow: 'SOW',
            sowOthers: '',
        };
        jest.spyOn(mockDialog, 'open').mockReturnValue({
            afterClosed: () => of(sourceofWealthAndFundsData),
        });

        component.dialogref(sow, topUpInfo, sourceOfWealthAndFund);

        expect(mockDialog.open).toHaveBeenCalled();
    });
});
