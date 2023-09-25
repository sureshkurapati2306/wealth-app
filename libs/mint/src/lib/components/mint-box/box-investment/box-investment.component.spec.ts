import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RouterTestingModule } from '@angular/router/testing';
import { WealthPortfolioBox } from '@cimb/shared/models';
import { provideMockStore } from '@ngrx/store/testing';

import { BoxInvestmentComponent } from './box-investment.component';
import { MatDialog } from '@angular/material/dialog';

const mockData: WealthPortfolioBox = {
  "name": "My Investment",
  "donutColor": "#36b37e",
  "items": [
    {
      "alcName": "My Investment",
      "alDesc": "Unit Trust Account",
      "alcSeq": 1,
      "alCode": "UTA",
      "alCategory": "Assets",
      "accountNumber": "A80093293",
      "accountStatus": "Active",
      "cardNumber": null,
      "amount": 7535.01,
      "currencyCode": "MYR",
      "nextPaymentDueDate": null
    }
  ],
  "status": false,
  "casaAvailability": false,
  "haveActiveCasa": false
};

describe('BoxInvestmentComponent', () => {
  let component: BoxInvestmentComponent;
  let fixture: ComponentFixture<BoxInvestmentComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxInvestmentComponent],
      providers: [
        provideMockStore({ initialState: {} }),
        {
          provide: MatBottomSheet,
          useValue: {
            open: () => { /* */ } 
          },
        }
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxInvestmentComponent);
    component = fixture.componentInstance;
    component.holdingDetails = mockData;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable account opening when customerType is NTP and enableApplyNowAtMyInvestmentDAshboard is true', () => {
    component.customerType = 'NTP';
    component.enableApplyNowAtMyInvestmentDAshboard = true;
    component.ngOnInit();
    expect(component.enableAccountOpening).toBe(true);
  });

  it('should disable account opening when customerType is not NTP', () => {
    component.customerType = 'existing';
    component.enableApplyNowAtMyInvestmentDAshboard = true;
    component.ngOnInit();
    expect(component.enableAccountOpening).toBe(false);
  });

  it('should disable account opening when enableApplyNowAtMyInvestmentDAshboard is false', () => {
    component.customerType = 'NTP';
    component.enableApplyNowAtMyInvestmentDAshboard = false;
    component.ngOnInit();
    expect(component.enableAccountOpening).toBe(false);
  });

  it('it should openBottomSheet with provided values', () => {
    expect(component.openBottomSheet('heading', 'content')).toBeUndefined();
  });

  it('it should openBottomSheet with default values', () => {
    expect(component.openBottomSheet()).toBeUndefined();
  });

  it('it should goToUtDashboard', () => {
    expect(component.goToUtDashboard('ABC123')).toBeUndefined();
  });

  it('should open dialog for AML check if AMLcheckResult is false', () => {
    dialog.open = jest.fn();
    const casa = true;
    const haveActiveCasa = true;
    component.applyNow(casa, haveActiveCasa);
    component.amlCheckResult = false;
    component.dHeading = 'Unable to Proceed';
    component.dContent = '<p>We regret to inform that we are unable to process your application. Thank you for your interest.</p><p><strong>For assistance, please visit any CIMB branch.</strong></p>';
    component.displayDialog(component.dHeading,component.dContent);
    expect(dialog.open).toBeCalledTimes(1);
  });
  it('should open dialog if No CASA available', () => {
    dialog.open = jest.fn();
    const casa = false;
    const haveActiveCasa = false;
    component.applyNow(casa, haveActiveCasa);
    component.dHeading = 'Unable to Proceed (No CASA)';
    component.dContent = '<p>To complete your transaction, open a current or savings account/-i with CIMB. You may apply via CIMB Clicks.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>';
    component.displayDialog(component.dHeading,component.dContent);
    expect(dialog.open).toBeCalledTimes(1);
  });
  it('should open dialog if No Active CASA available', () => {
    dialog.open = jest.fn();
    const casa = false;
    const haveActiveCasa = false;
    component.applyNow(casa, haveActiveCasa);
    component.dHeading = 'Unable to Proceed';
    component.dContent = '<p>You need to have an active current or savings account with CIMB to open a Unit Trust account.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>';
    component.displayDialog(component.dHeading,component.dContent);
    expect(dialog.open).toBeCalledTimes(1);
  });
  it('should open dialog if Proprietor user', () => {
    dialog.open = jest.fn();
    const casa = true;
    const haveActiveCasa = true;
    component.applyNow(casa, haveActiveCasa);
    component.dHeading = 'Unable to Transact <p><strong>(Sole Proprietor Customer)</strong></p>';
    component.dContent = '<br><p>For Unit Trust transactions as a sole proprietor customer, please visit any CIMB branch.</p>';
    component.displayDialog(component.dHeading,component.dContent);
    expect(dialog.open).toBeCalledTimes(1);
  });
});

