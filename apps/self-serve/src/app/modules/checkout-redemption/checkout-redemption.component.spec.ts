import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { CheckoutRedemptionComponent } from './checkout-redemption.component';

describe('CheckoutRedemptionComponent', () => {
 
  let component: CheckoutRedemptionComponent;
  let fixture: ComponentFixture<CheckoutRedemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [CheckoutRedemptionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('CheckoutRedemptionComponent backButtonEvent -  clicked', () => {
    component.currentUrl="/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();
   
  });
});
