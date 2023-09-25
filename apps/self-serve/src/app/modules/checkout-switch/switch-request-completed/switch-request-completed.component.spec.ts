import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { SwitchRequestCompletedComponent } from './switch-request-completed.component';

describe('SwitchRequestCompletedComponent', () => {
  let component: SwitchRequestCompletedComponent;
  let fixture: ComponentFixture<SwitchRequestCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [SwitchRequestCompletedComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchRequestCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('SwitchRequestCompletedComponent backButtonEvent -  clicked', () => {
    component.currentUrl="/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();
   
  });
});
