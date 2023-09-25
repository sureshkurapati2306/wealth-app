import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { TabDashboardComponent } from './tab-dashboard.component';

describe('TabDashboardComponent', () => {
  let component: TabDashboardComponent;
  let fixture: ComponentFixture<TabDashboardComponent>;
  let matTabChangeEventMock:MatTabChangeEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabDashboardComponent],
      imports: [MatDialogModule, MatMenuModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should  loadAdobeAnalytics method called', () => {
    component.tabChanged(matTabChangeEventMock);
    component.tabClickCount=1;
    component.selectedTabIndex=1;
    expect(component.loadAdobeAnalytics).toBeCalled();
  });
  it('should run ngOnChanges', () => {

    component.ngOnChanges({
      myHoldings: new SimpleChange(undefined, [], true),
      myHoldingsLength: new SimpleChange(undefined, 10, true),
    });

    expect(component).toBeTruthy();
  });

  it('should send out redeem values for cart', ()=> {
      const obj = {
        "amount": "800.00",
        "flow": "001",
        "fund_code": "CBT40A",
        "unit": 800,
        "index": 1
    }
    expect(component.updateAmountInRedeemEvt(obj)).toBeUndefined();
  })
});
