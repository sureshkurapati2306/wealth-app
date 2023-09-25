import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbAvailableFundsComponent } from './asnb-available-funds.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { getAllFundsListing, getEligibleFunds } from '../../+state/asnb.selectors';
import { availableFunds } from '../../mocks/data';
import { delay } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { AsnbEligibleFunds } from '../../models';

jest.mock('rxjs/operators', () => {
    const operators = jest.requireActual('rxjs/operators');
    operators.delay = jest.fn(() => (s) => s); // <= mock delay
    return operators;
});

describe('AsnbAvailableFundsComponent', () => {
    let component: AsnbAvailableFundsComponent;
    let fixture: ComponentFixture<AsnbAvailableFundsComponent>;
    let mockDialog: Partial<MatDialog>;

    let router: Router;
    let mockStore: Partial<Store>;

    beforeEach(async () => {
        mockStore = {
            select: jest.fn().mockReturnValue(of({})),
            dispatch: jest.fn(),
        };

        mockDialog = {
            open: jest.fn().mockReturnValue({
                afterClosed: jest.fn().mockReturnValue(of(true)),
            }),
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
            declarations: [AsnbAvailableFundsComponent],
            providers: [
                { provide: Store, useValue: mockStore },
                { provide: Router, useValue: router },
                { provide: MatDialog, useValue: mockDialog },
                HttpClient,
                HttpHandler,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbAvailableFundsComponent);
        router = TestBed.inject(Router);
        component = fixture.componentInstance;
        fixture.componentInstance.availableFunds = availableFunds;
        fixture.componentInstance.noEligibleFunds = false;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should geEligibleFunds', () => {
        expect(component.geEligibleFunds()).toBeUndefined();
    });

    it('should getAllFunds', () => {
        const mockData = availableFunds;

        const selectSpy = jest.spyOn(mockStore, 'select').mockReturnValue(of(mockData));
        fixture.detectChanges();
        expect(delay).toHaveBeenCalledWith(4000); // Success!
        expect(selectSpy).toHaveBeenCalledWith(getAllFundsListing);
        expect(component.getAllFunds()).toBeUndefined();
    });

    it('should backButtonEvent', () => {
        expect(component.backButtonEvent()).toBeUndefined();
    });

    it('should show pop up with rejection message when eligible funds is empty and with reject code and message', () => {
        //geteligiblefunds from store
        const mockData: AsnbEligibleFunds = {
            eligibleFunds: [],
            rejectCode: '100',
            rejectMessage: 'Rejection Message',
        };

        const selectSpy = jest.spyOn(mockStore, 'select').mockReturnValue(of(mockData));
        fixture.detectChanges();
        expect(selectSpy).toHaveBeenCalledWith(getEligibleFunds);


        component.geEligibleFunds();
        expect(component.noEligibleFunds).toBeTruthy();
    });

    it('should assign eligible funds when there is eligible funds', () => {
        //geteligiblefunds from store
        const mockData: AsnbEligibleFunds = {
            eligibleFunds: ['ASB1', 'ASB2', 'ASB3'],
        };

        const selectSpy = jest.spyOn(mockStore, 'select').mockReturnValue(of(mockData));
        fixture.detectChanges();
        expect(selectSpy).toHaveBeenCalledWith(getEligibleFunds);


        component.geEligibleFunds();
        expect(component.noEligibleFunds).toBeFalsy();
    });

    it('should assign eligible funds when there is no eligible funds and no error', () => {
        //geteligiblefunds from store
        const mockData: AsnbEligibleFunds = {
            eligibleFunds: [],
        };

        const selectSpy = jest.spyOn(mockStore, 'select').mockReturnValue(of(mockData));
        fixture.detectChanges();
        expect(selectSpy).toHaveBeenCalledWith(getEligibleFunds);


        component.geEligibleFunds();
        expect(component.noEligibleFunds).toBeTruthy();
    });

    //show pop up with rejection message
});
