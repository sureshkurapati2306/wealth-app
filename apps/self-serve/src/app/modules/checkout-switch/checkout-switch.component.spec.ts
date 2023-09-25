import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { CheckoutSwitchComponent } from './checkout-switch.component';

describe('CheckoutSwitchComponent', () => {
  let component: CheckoutSwitchComponent;
  let fixture: ComponentFixture<CheckoutSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [CheckoutSwitchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('CheckoutSwitchComponent backButtonEvent -  clicked', () => {
    component.currentUrl="/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();
   
  });
});
