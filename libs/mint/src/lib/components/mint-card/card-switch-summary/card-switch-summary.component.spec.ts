import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { switchCartItemsMockData } from '@cimb/shared/services';

import { CardSwitchSummaryComponent } from './card-switch-summary.component';

describe('CardSwitchSummaryComponent', () => {
  let component: CardSwitchSummaryComponent;
  let fixture: ComponentFixture<CardSwitchSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSwitchSummaryComponent],
      imports: [ MatInputModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSwitchSummaryComponent);
    component = fixture.componentInstance;
    component.item = switchCartItemsMockData[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call remove()', () => {
    expect(component.remove()).toBeUndefined();
  });
});
