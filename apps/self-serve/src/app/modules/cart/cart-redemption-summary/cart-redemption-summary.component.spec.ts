import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartRedemptionSummaryComponent } from './cart-redemption-summary.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('CartRedemptionSummaryComponent', () => {
  let component: CartRedemptionSummaryComponent;
  let fixture: ComponentFixture<CartRedemptionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [CartRedemptionSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartRedemptionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('CartRedemptionSummaryComponent backButtonEvent -  clicked', () => {
    component.currentUrl="/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();
   
  });
});
