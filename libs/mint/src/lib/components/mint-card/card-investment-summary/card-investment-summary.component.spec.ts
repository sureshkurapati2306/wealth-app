import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInvestmentSummaryComponent } from './card-investment-summary.component';

describe('CardInvestmentSummaryComponent', () => {
  let component: CardInvestmentSummaryComponent;
  let fixture: ComponentFixture<CardInvestmentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardInvestmentSummaryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInvestmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => { 
    expect(component.cardTitle).toBeUndefined();
    expect(component.totalInvestmentItems).toBeUndefined();
    expect(component.redemptionUnits).toBeUndefined();
    expect(component.redemptionAmount).toBeUndefined();
    expect(component.isNeededOnPage).toBeTruthy();
  });

});
