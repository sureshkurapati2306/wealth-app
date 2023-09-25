import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { CardPaymentAccountComponent } from './card-payment-account.component';

import { ReactiveFormsModule } from '@angular/forms';

describe('CardPaymentAccountComponent', () => {
  let component: CardPaymentAccountComponent;
  let fixture: ComponentFixture<CardPaymentAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPaymentAccountComponent],
      imports: [MatAutocompleteModule, MatInputModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPaymentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
