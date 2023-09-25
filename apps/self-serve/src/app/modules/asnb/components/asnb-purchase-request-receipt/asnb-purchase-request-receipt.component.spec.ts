import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AsnbPurchaseRequestReceiptComponent } from './asnb-purchase-request-receipt.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AsnbService } from '../../services/asnb.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    getCheckoutReceipt,
    getExternalUrlList,
    getMembership,
    getReceiptMembership,
} from '../../+state/asnb.selectors';
import { FundType } from '../../models';

describe('AsnbPurchaseRequestReceiptComponent', () => {
    let component: AsnbPurchaseRequestReceiptComponent;
    let fixture: ComponentFixture<AsnbPurchaseRequestReceiptComponent>;
    let mockStore: MockStore;
    let router: Router;
    let asnbServiceMock: Partial<AsnbService>;
    let mockMatDialog: Partial<MatDialog>;

    beforeEach(async () => {
        asnbServiceMock = {
            updateTabIndex: jest.fn(),
        };

        mockMatDialog = {
            open: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [AsnbPurchaseRequestReceiptComponent],
            providers: [
                { provide: Store, useValue: mockStore },
                provideMockStore(),
                { provide: AsnbService, useValue: asnbServiceMock },
                { provide: MatDialog, useValue: mockMatDialog },
            ],
        }).compileComponents();

        router = TestBed.inject(Router);
        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbPurchaseRequestReceiptComponent);
        component = fixture.componentInstance;
    });

    it('should set the component properties correctly when purchase for own account', () => {
        const mockFavouriteDetails = {
            no: 0,
            nickname: '',
            beneName: '',
            fundCode: '',
            fundDesc: '',
            beneClientId: '',
            relationship: '',
            memberIdType: '',
            asnbAccountNo: '',
            transId: '',
        };

        const membershipData = {
            name: 'Test Name',
            unitHolderId: '222233334444',
            favouriteDetails: mockFavouriteDetails,
        };

        const receiptData: any = {
            investmentType: 'TP',
            stageTableId: '',
            guardianDetails: {
                unitHolderId: '',
                name: '',
            },
            favouriteDetails: mockFavouriteDetails,
            fundId: '123',
            fundName: 'Fund Name',
            fundType: 'fixed price' as FundType,
            amount: 500,
            bankCharge: 10,
            total: 510,
            transactionStatus: '000',
            timeStamp: '',
            identificationNumber: 'xxxxxx-xx-9999',
            unitsAlloted: 100,
            navPrice: 1.2345,
            transactionId: '7001234',
            bankAccountNumber: '1234',
            asnbReferenceNo: '45678',
            salesCharge: '',
            salesChargePercentage: '',
            reason: 'Saving',
            relationship: 'Friend',
            errorCode: '179',
            errorMessage: 'Error Message',
        };

        const urlListData = { prospectus: 'Link 1', fundPrice: 'Link 2' };

        mockStore.overrideSelector(getReceiptMembership, membershipData);
        mockStore.overrideSelector(getCheckoutReceipt, receiptData);
        mockStore.overrideSelector(getExternalUrlList, urlListData);
        mockStore.refreshState();

        component.ngOnInit();

        expect(component.isFavouritePurchase).toBe(false);
        expect(component.fund.id).toBe('123');
        expect(component.fund.name).toBe('Fund Name');
        expect(component.fund.type).toBe('fixed price');

        expect(component.transactionSummaryItems).toEqual([
            {
                name: 'Units allotted',
                amount: 100,
                decimalFormat: '1.2-2',
                hideCurrency: true,
                isNotAvailable: false,
            },
            {
                name: 'NAV price',
                amount: 1.2345,
                decimalFormat: '1.4-4',
                isNotAvailable: false,
            },
        ]);
        expect(component.prospectusLink).toBe('Link 1');
        expect(component.fundPriceLink).toBe('Link 2');
        expect(component.errorCode).toBe('179');
        expect(component.errorMessage).toBe('Error Message');
        expect(component.membershipName).toBe('Test Name');
        expect(component.membershipDetails).toStrictEqual([
            {
                label: 'ASNB membership number',
                value: 'XXXXXXXX4444',
            },
            { label: 'NRIC', value: 'XXXXXX-XX-9999' },
            { label: 'Relationship', value: 'Friend' },
            { label: 'Reason', value: 'Saving' },
            { label: 'Settlement account', value: '1234' },
            {
                label: 'Bank reference no',
                value: '[Ref 7001234]',
            },
            {
                label: 'ASNB reference no',
                value: '[Ref 45678]',
            },
        ]);
    });

    it('should set the component properties correctly when purchase for favourite', () => {
        const mockFavouriteDetails = {
            no: 0,
            nickname: 'Hello',
            beneName: 'Hello World',
            fundCode: '456',
            fundDesc: 'Fund Name',
            beneClientId: '111122223333',
            relationship: 'Siblings',
            memberIdType: 'New IC',
            asnbAccountNo: '444455556666',
            transId: '7005678',
        };

        const membershipData = {
            name: 'Test Name',
            unitHolderId: '222233334444',
            favouriteDetails: mockFavouriteDetails,
        };

        const receiptData: any = {
            investmentType: 'TP',
            stageTableId: '',
            guardianDetails: {
                unitHolderId: '',
                name: '',
            },
            favouriteDetails: mockFavouriteDetails,
            fundId: '123',
            fundName: 'Fund Name',
            fundType: 'fixed price' as FundType,
            amount: 500,
            bankCharge: 10,
            total: 510,
            transactionStatus: '000',
            timeStamp: '',
            identificationNumber: 'xxxxxx-xx-9999',
            unitsAlloted: 100,
            navPrice: 1.2345,
            transactionId: '7001234',
            bankAccountNumber: '1234',
            asnbReferenceNo: '45678',
            salesCharge: '',
            salesChargePercentage: '',
            reason: 'Saving',
            relationship: 'Friend',
            errorCode: '179',
            errorMessage: 'Error Message',
        };

        const urlListData = { prospectus: 'Link 1', fundPrice: 'Link 2' };

        mockStore.overrideSelector(getReceiptMembership, membershipData);
        mockStore.overrideSelector(getCheckoutReceipt, receiptData);
        mockStore.overrideSelector(getExternalUrlList, urlListData);
        mockStore.refreshState();

        component.ngOnInit();

        expect(component.isFavouritePurchase).toBe(true);
        expect(component.fund.id).toBe('123');
        expect(component.fund.name).toBe('Fund Name');
        expect(component.fund.type).toBe('fixed price');

        expect(component.transactionSummaryItems).toEqual([
            {
                name: 'Units allotted',
                amount: 100,
                decimalFormat: '1.2-2',
                hideCurrency: true,
                isNotAvailable: false,
            },
            {
                name: 'NAV price',
                amount: 1.2345,
                decimalFormat: '1.4-4',
                isNotAvailable: false,
            },
        ]);
        expect(component.prospectusLink).toBe('Link 1');
        expect(component.fundPriceLink).toBe('Link 2');
        expect(component.errorCode).toBe('179');
        expect(component.errorMessage).toBe('Error Message');
        expect(component.membershipName).toBe('Hello World');
        expect(component.membershipDetails).toStrictEqual([
            {
                label: 'ASNB membership number',
                value: 'XXXX XXXX 6666',
            },
            { label: 'Member’s ID type', value: 'New IC' },
            { label: 'ID number', value: 'XXXXXX-XX-3333' },
            { label: 'Relationship', value: 'Friend' },
            { label: 'Reason', value: 'Saving' },
            { label: 'Settlement account', value: '1234' },
            {
                label: 'Bank reference no',
                value: '[Ref 7001234]',
            },
            {
                label: 'ASNB reference no',
                value: '[Ref 45678]',
            },
        ]);
    });

    it('should navigate to the dashboard with tab 0', () => {
        const navigateSpy = jest.spyOn(router, 'navigate');

        component.goToDashboard();

        expect(navigateSpy).toHaveBeenCalledWith(['/asnb-dashboard']);
    });

    it('should return pending status on getTransactionStatus', () => {
        const result = component.getTransactionStatus('5000', null);
        expect(result).toBe('Pending');
    });

    it('should return processing status on getTransactionStatus', () => {
        const result = component.getTransactionStatus('000', null);
        expect(result).toBe('Accepted For Processing');
    });

    it('should return success status on getTransactionStatus', () => {
        const result = component.getTransactionStatus('000', '0.00');
        expect(result).toBe('Successful');
    });

    it('should return unsuccessful status on getTransactionStatus', () => {
        const result = component.getTransactionStatus('999', null);
        expect(result).toBe('Unsuccessful');
    });

    it('should navigate to "/asnb-dashboard" when fatcaDeclaratonEvent is called', () => {
        const navigateSpy = jest.spyOn(router, 'navigate');
        const updateTabSpy = jest.spyOn(asnbServiceMock, 'updateTabIndex');

        component.isFavouritePurchase = false;
        component.goToDashboard();
        expect(navigateSpy).toHaveBeenCalledWith(['/asnb-dashboard']);
        expect(updateTabSpy).toHaveBeenCalledTimes(0);

        component.isFavouritePurchase = true;
        component.goToDashboard();
        expect(navigateSpy).toHaveBeenCalledWith(['/asnb-dashboard']);
        expect(updateTabSpy).toHaveBeenCalledWith(1);
    });

    it('should return correct output whe handleDisplayValue is called', () => {
        const nullOutput = component.handleDisplayValue(null, 10);

        expect(nullOutput).toBe('N/A');

        const falseOutput = component.handleDisplayValue(false, 'false');

        expect(falseOutput).toEqual('N/A');

        const zeroOutput = component.handleDisplayValue(0, 0);

        expect(zeroOutput).toBe(0);

        const validNumberOutput = component.handleDisplayValue(10, 10);

        expect(validNumberOutput).toBe(10);

        const trueOutput = component.handleDisplayValue(true, 'true');

        expect(trueOutput).toEqual('true');
    });
});
