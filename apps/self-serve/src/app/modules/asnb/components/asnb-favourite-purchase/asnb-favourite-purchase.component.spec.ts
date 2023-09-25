import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbFavouritePurchaseComponent, getFundType } from './asnb-favourite-purchase.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AsnbService } from '../../services/asnb.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    asnbFavouriteDetails,
    checkoutMockData,
    fundTypeMap,
    transactionLimit,
    transferReasons,
} from '../../mocks/data';
import { createOrder, loadSofSowList, loadTransferReasonList } from '../../+state/asnb.actions';
import {
    getPurchaseFavouriteDetails,
    getTransferReasonList,
    getTransactionLimit,
    getCheckout,
    getFundTypesMap,
} from '../../+state/asnb.selectors';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AsnbSourceOfFundWealthComponent } from '../asnb-source-of-fund-wealth/asnb-source-of-fund-wealth.component';

describe('AsnbFavouritePurchaseComponent', () => {
    let component: AsnbFavouritePurchaseComponent;
    let fixture: ComponentFixture<AsnbFavouritePurchaseComponent>;
    let mockAsnbService: Partial<AsnbService>;
    let mockStore: MockStore;
    let mockMatDialog: Partial<MatDialog>;

    beforeEach(async () => {
        mockAsnbService = {
            updateTabIndex: jest.fn(),
        };

        mockMatDialog = {
            open: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [AsnbFavouritePurchaseComponent],
            providers: [
                { provide: AsnbService, useValue: mockAsnbService },
                provideMockStore(),
                { provide: MatDialog, useValue: mockMatDialog },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbFavouritePurchaseComponent);
        component = fixture.componentInstance;
        component.favouriteData = asnbFavouriteDetails;
        component.fundTypeMap = fundTypeMap;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update favouriteData when favouriteData$ emits', () => {
        mockStore.overrideSelector(getPurchaseFavouriteDetails, asnbFavouriteDetails);
        mockStore.refreshState();

        component.ngOnInit();
        expect(component.favouriteData).toEqual(asnbFavouriteDetails);
    });

    it('should update fundTypeMap when fundTypeMap$ emits', () => {
        mockStore.overrideSelector(getFundTypesMap, fundTypeMap);
        mockStore.refreshState();

        component.ngOnInit();
        expect(component.fundTypeMap).toEqual(fundTypeMap);
    });

    it('should update transferReasons when transferReason$ emits', () => {
        mockStore.overrideSelector(getTransferReasonList, transferReasons);
        mockStore.refreshState();

        component.ngOnInit();
        expect(component.transferReasons).toEqual(transferReasons);
        expect(component.selectedTransferReason).toEqual(transferReasons[0].id);
    });

    it('should update currentTransactionLimit when transactionLimit$ emits', () => {
        mockStore.overrideSelector(getTransactionLimit, transactionLimit);
        mockStore.refreshState();

        component.ngOnInit();
        expect(component.currentTransactionLimit).toEqual(
            transactionLimit.maxLimit - transactionLimit.currentLimit,
        );
    });

    it('should update amount and button state on form value change', () => {
        component.currentTransactionLimit = 1000;
        component.amount = component.currentTransactionLimit - 1;
        const amountFormControl = component.fundTopUpForm.get('amount');

        amountFormControl.setValue('1000');
        expect(component.amount).toBe(1000);
        expect(component.isButtonEnabled).toBe(true);

        amountFormControl.setValue('');
        expect(component.amount).toBe(0);
        expect(component.isButtonEnabled).toBe(false);
    });

    it('should dispatch actions when component initializes', () => {
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

        component.ngOnInit();

        expect(dispatchSpy).toHaveBeenCalledWith(loadSofSowList());
        expect(dispatchSpy).toHaveBeenCalledWith(loadTransferReasonList());
    });

    it('should unsubscribe from the subscription on ngOnDestroy', () => {
        const favouriteDataUnsubSpy = jest.spyOn(component.favouriteDataSub, 'unsubscribe');
        const transferReasonUbsubSpy = jest.spyOn(component.transferReasonSub, 'unsubscribe');
        const transactionLimitUnsubSpy = jest.spyOn(component.transactionLimitSub, 'unsubscribe');

        component.ngOnDestroy();

        expect(favouriteDataUnsubSpy).toHaveBeenCalledTimes(1);
        expect(transferReasonUbsubSpy).toHaveBeenCalledTimes(1);
        expect(transactionLimitUnsubSpy).toHaveBeenCalledTimes(1);
    });

    it('should call asnbService.updateTabIndex with the correct argument when redirectEvent is called', () => {
        const mockAsnbServiceSpy = jest.spyOn(mockAsnbService, 'updateTabIndex');

        component.redirectEvent();

        expect(mockAsnbServiceSpy).toHaveBeenCalledTimes(1);
        expect(mockAsnbServiceSpy).toHaveBeenCalledWith(1);
    });

    it('should update selectedTransferReason when onTransferReasonSelect is called', () => {
        const selectedItem = { id: 'SAV', value: 'Savings' };
        component.onTransferReasonSelect(selectedItem);

        expect(component.selectedTransferReason).toEqual(selectedItem.id);
    });

    it('should run dispatchCreateOrder when onSubmit is called with amount less than sofCheckAmount', () => {
        const dispatchCreateOrderSpy = jest.spyOn(component, 'dispatchCreateOrder');

        component.amount = component.sofCheckAmount - 1;
        component.onSubmit();

        expect(dispatchCreateOrderSpy).toHaveBeenCalledTimes(1);
    });

    it('should run dispatchCreateOrder when onSubmit is called with amount more than sofCheckAmount', () => {
        const dispatchCreateOrderSpy = jest.spyOn(component, 'dispatchCreateOrder');

        const afterClosedResponse = { sof: 'sof', sow: 'sow' };
        jest.spyOn(mockMatDialog, 'open').mockReturnValue({
            afterClosed: () => of(afterClosedResponse),
        } as MatDialogRef<AsnbSourceOfFundWealthComponent>);

        component.amount = component.sofCheckAmount + 1;
        component.sourceOfWealthAndFund$ = of([{ id: 'id', value: 'value' }]);
        component.onSubmit();

        expect(mockMatDialog.open).toHaveBeenCalledTimes(1);
        expect(dispatchCreateOrderSpy).toHaveBeenCalledTimes(1);
    });

    it('should not run dispatchCreateOrder when onSubmit is called with amount more than sofCheckAmount', () => {
        const dispatchCreateOrderSpy = jest.spyOn(component, 'dispatchCreateOrder');

        const afterClosedResponse = undefined;
        jest.spyOn(mockMatDialog, 'open').mockReturnValue({
            afterClosed: () => of(afterClosedResponse),
        } as MatDialogRef<AsnbSourceOfFundWealthComponent>);

        component.amount = component.sofCheckAmount + 1;
        component.sourceOfWealthAndFund$ = of([{ id: 'id', value: 'value' }]);
        component.onSubmit();

        expect(mockMatDialog.open).toHaveBeenCalledTimes(1);
        expect(dispatchCreateOrderSpy).not.toHaveBeenCalled();
    });

    it('should run store dispatch createOrder when dispatchCreateOrder is called', () => {
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        mockStore.overrideSelector(getCheckout, checkoutMockData);
        mockStore.refreshState();

        component.dispatchCreateOrder(checkoutMockData);

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toBeCalledWith(createOrder({ payload: checkoutMockData }));
    });

    it('should return the fund type as fixed price for fixed', () => {
        const result = getFundType('fixed');
        expect(result).toStrictEqual('fixed price');
    });

    it('should return the fund type as variable price for variable', () => {
        const result = getFundType('variable');
        expect(result).toStrictEqual('variable price');
    });
});
