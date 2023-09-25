import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFundPerformanceComponent } from './chart-fund-performance.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HighchartsChartModule } from 'highcharts-angular';

describe('ChartFundPerformanceComponent', () => {
  let component: ChartFundPerformanceComponent;
  let fixture: ComponentFixture<ChartFundPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartFundPerformanceComponent],
      imports: [MatButtonToggleModule, HighchartsChartModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFundPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.past1Mnth).toBeUndefined();
  });

});
