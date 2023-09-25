import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSwitchInvestmentComponent } from './card-switch-investment.component';

describe('CardSwitchInvestmentComponent', () => {
  let component: CardSwitchInvestmentComponent;
  let fixture: ComponentFixture<CardSwitchInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSwitchInvestmentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSwitchInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.cardTitle).toBeUndefined();
    expect(component.switchOutAssetType).toBeUndefined();
    expect(component.switchOutFundName).toBeUndefined();
    expect(component.switchOutUnits).toBeUndefined();
    expect(component.switchOutAmount).toBeUndefined();
    expect(component.switchInAssetType).toBeUndefined();
    expect(component.switchInFundName).toBeUndefined();
    expect(component.switchInUnits).toBeUndefined();
    expect(component.switchInAmount).toBeUndefined();
    expect(component.switchingFee).toBeUndefined();
    expect(component.netSwitchInAmount).toBeUndefined();
  });

});
