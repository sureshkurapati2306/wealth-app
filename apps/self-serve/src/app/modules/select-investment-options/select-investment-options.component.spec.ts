import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AvailableFundsComponent } from '../available-funds/available-funds.component';
import { InvestmentGoalsComponent } from '../investment-goals/investment-goals.component';
import { StoreModule } from '@ngrx/store';
import { SelectInvestmentOptionsComponent } from './select-investment-options.component';

describe('SelectInvestmentOptionsComponent', () => {
  let component: SelectInvestmentOptionsComponent;
  let fixture: ComponentFixture<SelectInvestmentOptionsComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([
          { path: 'available-funds', component: AvailableFundsComponent},
          { path: 'investment-goals', component: InvestmentGoalsComponent},
        ]),
      ],
      declarations: [AvailableFundsComponent,InvestmentGoalsComponent, SelectInvestmentOptionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInvestmentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SelectInvestmentOptionsComponent guideButtonClick -  clicked', () => {
    expect(component.guideButtonClick()).toBeTruthy();
  });
  it('SelectInvestmentOptionsComponent searchButtonClick -  clicked', () => {
    expect(component.searchButtonClick()).toBeTruthy();
  });
  it('SelectInvestmentOptionsComponent backButtonEvent -  clicked', () => {
    component.currentUrl="/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();
   
  });
  it('should call clickToSubmitAAData On Load', () => {
    //const customerIDNumber = '800'
    component.customerType = 'ntp';
    component.clickToSubmitAAData('On Load');
    expect(component).toBeTruthy();
  });
  it('should call clickToSubmitAAData Click1', () => {
    //const customerIDNumber = '800'
    component.customerType = 'ntp';
    component.clickToSubmitAAData('Click1');
    expect(component).toBeTruthy();
  });
  it('should call clickToSubmitAAData Click2', () => {
    //const customerIDNumber = '800'
    component.customerType = 'ntp';
    component.clickToSubmitAAData('Click2');
    expect(component).toBeTruthy();
  });
});
