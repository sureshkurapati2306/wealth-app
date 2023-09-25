import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { RegistrationLayoutComponent } from './registration-layout.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('RegistrationLayoutComponent', () => {
  let component: RegistrationLayoutComponent;
  let fixture: ComponentFixture<RegistrationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        MatDialogModule
      ],
      providers: [MatDialog],
      declarations: [RegistrationLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RegistrationLayoutComponent ngOnInit -  Called', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });
  it('RegistrationLayoutComponent logoutEvent storeTransaction length zero', () => {
    component.storeTransaction = [];
    expect(component.logoutEvent()).toBeUndefined();
  });
  it('RegistrationLayoutComponent logoutEvent storeTransaction null', () => {

    expect(component.logoutEvent()).toBeUndefined();
  });

  it('RegistrationLayoutComponent updateData defined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    const data = { totalAmount: 1000.00, totalFundsCount: 1 }
    component.cartData = data;
    component.storeTransaction = { "name": "eeee" };
    fixture.detectChanges();
    expect(component.cartData).toEqual(data);
    expect(component.storeTransaction).toEqual({ "name": "eeee" });
    expect(component.loadData()).toBeTruthy();
    expect(component.updateData(data)).toBeTruthy();
    expect(component.totalAmountVal).toEqual(1000);
  });

  it('RegistrationLayoutComponent ngOnDestroy', () => {
    expect(component.ngOnDestroy()).toBeUndefined();
  });

  it('RegistrationLayoutComponent updateData called', () => {
    const data = { totalAmount: 1000.00, totalFundsCount: 1, flowText: 'topup', totalUnitVal: 0.5, cartFooterToggle: true, showCartIconValue: true }
    component.cartData = data;
    component.updateData(data);
    expect(component.updateData(data)).toBeTruthy();
    component.updateData(data);
    fixture.detectChanges();
    expect(component.cartData).toBe(data);
  });

  it('RegistrationLayoutComponent updateData empty called', () => {
    const data = '';
    component.cartData = data;
    component.updateData(data);
    expect(component.updateData(data)).toBeTruthy();
    component.updateData(data);
    fixture.detectChanges();
    expect(component.cartData).toBe(data);
  });

  it('RegistrationLayoutComponent ngOnInit -  users check defined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    const users = { "user": { "customer_name": "Ali Amir bin Ahmad", "userType": "ETP", "customer_id": "750702105695", "customer_id_type": "SOLO_PROP", "debit_card_no": 12121212121212, "dashbordData": 1, "lastSeen": "4 Sept 2020, 10:30AM", "story": "WJ-85", "sole_prop": "N", "invertment_indicator": "N", "casa_indicator": "N", "risk_profile": "AGGRESIVE", "customer_mobile_no": "0169958471" }, "loadInitialData": false, "loadCount": -1, "dashboardData": "", "dashboardScreenData": "", "unitTrustAccount": "A80091526", "unitTrustAccountList": [{ "default_ind": "Y", "ut_account_no": "A80091526" }, { "default_ind": "N", "ut_account_no": "A80039444" }, { "default_ind": "N", "ut_account_no": "A80070829" }, { "default_ind": "N", "ut_account_no": "A80111221" }, { "default_ind": "N", "ut_account_no": "A80111253" }, { "default_ind": "N", "ut_account_no": "E00000100" }] };
    component.userData = users;
    component.userType = "ETP";
    component.customerName = "Ali Amir bin Ahmad";
    fixture.detectChanges();
    expect(component.userData).toBe(users);
    expect(component.userType).toEqual("ETP");
    expect(component.customerName).toEqual("Ali Amir bin Ahmad");
  });

  it('RegistrationLayoutComponent viewMyCartClick -  clicked', () => {
    expect(component.viewMyCartClick()).toBeTruthy();
  });

  it('RegistrationLayoutComponent logoutEvent -  clicked', () => {
    const userData = { customer_id: '111', customer_id_type: '111' };
    component.userData = userData;

    component.storeTransaction = [{ "name": "eeee" }]
    expect(component.logoutEvent()).toBeUndefined();
  });

  it('RegistrationLayoutComponent pageRedirectEvent Wealth Dashboard-  clicked', () => {
    const event = "My Wealth Dashboard";
    component.currentRoute = '/wealthdashboard'
    expect(component.pageRedirectEvent(event)).toBeTruthy();
  });

  it('RegistrationLayoutComponent pageRedirectEvent Not Wealth Dashboard-  clicked', () => {
    const event = "My Wealth Dashboard";
    component.currentRoute = '/dashboard'
    expect(component.pageRedirectEvent(event)).toBeTruthy();
  });

  it('RegistrationLayoutComponent pageRedirectEvent Dashboard-  clicked', () => {
    const event = "Unit Trust";
    component.currentRoute = '/dashboard'
    expect(component.pageRedirectEvent(event)).toBeTruthy();
  });

  it('RegistrationLayoutComponent pageRedirectEvent Not Dashboard-  clicked', () => {
    const event = "Unit Trust";
    component.currentRoute = '/wealthdashboard'
    expect(component.pageRedirectEvent(event)).toBeTruthy();
  });

  it('RegistrationLayoutComponent pageRedirectEvent UT Dashboard-  clicked', () => {
    const event = "UT Dashboard";
    component.currentRoute = '/dashboard'
    expect(component.pageRedirectEvent(event)).toBeTruthy();
  });

  it('RegistrationLayoutComponent pageRedirectEvent UT Dashboard-  currentRoute', () => {
    const event = "/dashboard";
    component.currentRoute = '/dashboard'
    expect(component.currentRoute).toEqual(event);
  });

  it('RegistrationLayoutComponent pageRedirectEvent dashboard;tab=0 -  clicked', () => {
    const event = "Unit Trust";
    component.currentRoute = '/dashboard;tab=0'
    expect(component.pageRedirectEvent(event)).toBeTruthy();
  });
});
