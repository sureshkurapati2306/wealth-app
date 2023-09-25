import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHoldingsComponent } from './chart-holdings.component';

const mockData = [
  {
      "element": [
          {
              "name": "My Investment",
              "value": 4.4
          },
          {
              "name": "My Money",
              "value": 95.6
          }
      ]
  }
];

const mockZeroData = [
  {
      "element": [
          {
              "name": "My Investment",
              "value": 0
          },
          {
              "name": "My Money",
              "value": 0
          }
      ]
  }
];

describe('ChartHoldingsComponent', () => {
  let component: ChartHoldingsComponent;
  let fixture: ComponentFixture<ChartHoldingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartHoldingsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartHoldingsComponent);
    component = fixture.componentInstance;
    component.holdingData = mockData;
    component.donutColor = ['#36b37e', '#72caa5'];
    component.pieHole = 0.45;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnChanges with non-zero data', () => {

    component.ngOnChanges({
      holdingData: new SimpleChange(undefined, mockData, true),
    });

    expect(component).toBeTruthy();
  });

  it('should ngOnChanges with zero data', () => {

    component.ngOnChanges({
      holdingData: new SimpleChange(mockData, mockZeroData, true),
    });

    expect(component).toBeTruthy();
  });

  it('should ngOnChanges undefined data', () => {

    component.ngOnChanges({
      holdingData: undefined
    });

    expect(component).toBeTruthy();
  });

});
