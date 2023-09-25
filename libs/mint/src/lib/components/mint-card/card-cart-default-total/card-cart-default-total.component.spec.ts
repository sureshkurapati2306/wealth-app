import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { CardCartDefaultTotalComponent } from './card-cart-default-total.component';

describe('CardCartDefaultTotalComponent', () => {
  let component: CardCartDefaultTotalComponent;
  let fixture: ComponentFixture<CardCartDefaultTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCartDefaultTotalComponent],
      imports: [MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCartDefaultTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.totalFund).toBeUndefined();
    expect(component.totalSalesCharge).toBeUndefined();
    expect(component.totalNetInvestmentAmount).toBeUndefined();
    expect(component.totalAmount).toBeUndefined();
    expect(component.totalRedemptionAmount).toBeUndefined();
    expect(component.isForCartSwitching).toBeUndefined();
    expect(component.totalSwitchOutUnits).toBeUndefined();
    expect(component.totalSwitchInUnits).toBeUndefined();
  });
  
});
