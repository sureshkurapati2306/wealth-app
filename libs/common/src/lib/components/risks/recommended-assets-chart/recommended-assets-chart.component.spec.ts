import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedAssetsChartComponent } from './recommended-assets-chart.component';

describe('RecommendedAssetsChartComponent', () => {
  let component: RecommendedAssetsChartComponent;
  let fixture: ComponentFixture<RecommendedAssetsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedAssetsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedAssetsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
