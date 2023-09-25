import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSliderComponent } from './dashboard-slider.component';

import {MatSliderModule} from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('DashboardSliderComponent', () => {
  let component: DashboardSliderComponent;
  let fixture: ComponentFixture<DashboardSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSliderComponent],
      imports: [MatSliderModule, MatInputModule, MatCheckboxModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
