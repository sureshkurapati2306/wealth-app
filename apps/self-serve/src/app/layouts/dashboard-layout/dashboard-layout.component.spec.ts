import { CartComponent } from './../../modules/cart/cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';

describe('DashboardLayoutComponent', () => {
    let component: DashboardLayoutComponent;
    let fixture: ComponentFixture<DashboardLayoutComponent>;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([{ path: 'cart', component: CartComponent }]),
                HttpClientTestingModule,
                StoreModule.forRoot({}),
                MatDialogModule,
                BrowserAnimationsModule,
            ],
            providers: [MatDialog, Location],
            declarations: [CartComponent, DashboardLayoutComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // it('DashboardLayoutComponent load constructor ', () => {
    //   const url= '/dashboard'
    //   expect(location.path()).toEqual(url);
    // });
    it('DashboardLayoutComponent loadData -  clicked', () => {
        const data = {
            totalFundsCount: 0,
            totalAmount: 0,
        };
        expect(component.updateData(data)).toBeTruthy();
        expect(component.loadData()).toBeTruthy();
    });

    it('DashboardLayoutComponent updateData defined', () => {
        expect(component.ngOnInit()).toBeUndefined();
        expect(component.loadData()).toBeTruthy();
        const data = {
            totalFundsCount: 0,
            totalAmount: 0,
        };
        fixture.detectChanges();
        expect(component.updateData(data)).toBeTruthy();
        expect(component.totalAmountVal).toEqual(0.00);
        expect(component.totalFundsCountVal).toBeUndefined();
    });

    it('DashboardLayoutComponent updateData undefine defined', () => {
        expect(component.ngOnInit()).toBeUndefined();
        expect(component.loadData()).toBeTruthy();
        const data = {
            totalFundsCount: 0,
            totalAmount: 0,
        };
        component.cartData = data;
        fixture.detectChanges();
        expect(component.updateData(data)).toBeTruthy();
        expect(component.totalAmountVal).toEqual(0.00);
        expect(component.totalFundsCountVal).toBeUndefined();
    });

    it('DashboardLayoutComponent updateData - flow 002', () => {
        expect(component.ngOnInit()).toBeUndefined();
        expect(component.loadData()).toBeTruthy();
        const data = {
            totalFundsCount: 0,
            totalAmount: 0,
            flow: '002'
        };
        fixture.detectChanges();
        expect(component.updateData(data)).toBeTruthy();
        expect(component.totalAmountVal).toEqual(0.00);
        expect(component.totalFundsCountVal).toBeUndefined();
    });

    it('DashboardLayoutComponent updateData - flow 003', () => {
        expect(component.ngOnInit()).toBeUndefined();
        expect(component.loadData()).toBeTruthy();
        const data = {
            totalFundsCount: 0,
            totalAmount: 0,
            flow: '003'
        };
        fixture.detectChanges();
        expect(component.updateData(data)).toBeTruthy();
        expect(component.totalAmountVal).toEqual(0.00);
        expect(component.totalFundsCountVal).toBeUndefined();
    });

    it('DashboardLayoutComponent viewMyCartClick -  clicked', () => {
        expect(component.viewMyCartClick()).toBeTruthy();
    });

    it('DashboardLayoutComponent pageRedirectEvent Wealth Dashboard-  clicked', () => {
        const event = 'My Wealth Dashboard';
        component.currentRoute = '/wealthdashboard';
        expect(component.pageRedirectEvent(event)).toBeTruthy();
    });

    it('DashboardLayoutComponent pageRedirectEvent Not Wealth Dashboard-  clicked', () => {
        const event = 'My Wealth Dashboard';
        component.currentRoute = '/dashboard';
        expect(component.pageRedirectEvent(event)).toBeTruthy();
    });

    it('DashboardLayoutComponent pageRedirectEvent Not Dashboard-  clicked', () => {
        const event = 'Unit Trust';
        component.currentRoute = '/wealthdashboard';
        expect(component.pageRedirectEvent(event)).toBeTruthy();
    });

    it('DashboardLayoutComponent pageRedirectEvent UT Dashboard-  clicked', () => {
        const event = 'UT Dashboard';
        component.currentRoute = '/dashboard';
        expect(component.pageRedirectEvent(event)).toBeTruthy();
    });
    it('DashboardLayoutComponent pageRedirectEvent UT Dashboard-  currentRoute', () => {
        const event = '/dashboard';
        component.currentRoute = '/dashboard';
        expect(component.currentRoute).toEqual(event);
    });

    it('DashboardLayoutComponent openRiskProfile -  clicked true', () => {
        expect(component.openRiskProfile('Incomplete profile. Please update now, for us to recommend investments suitable to your current risk profile.')).toBeTruthy();
    });
});
