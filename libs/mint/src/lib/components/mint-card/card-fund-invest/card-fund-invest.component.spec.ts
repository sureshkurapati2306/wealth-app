import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CardFundInvestComponent } from './card-fund-invest.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';

describe('CardFundInvestComponent', () => {
  let component: CardFundInvestComponent;
  let fixture: ComponentFixture<CardFundInvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFundInvestComponent],
      imports: [MatBottomSheetModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFundInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.price).toBeUndefined();
  });

});
