import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPortfolioComponent } from './chart-portfolio.component';

describe('ChartPortfolioComponent', () => {
  let component: ChartPortfolioComponent;
  let fixture: ComponentFixture<ChartPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartPortfolioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
