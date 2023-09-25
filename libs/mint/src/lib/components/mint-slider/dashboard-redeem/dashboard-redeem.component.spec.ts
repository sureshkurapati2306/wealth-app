import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRedeemComponent } from './dashboard-redeem.component';

import {MatSliderModule} from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('DashboardRedeemComponent', () => {
  let component: DashboardRedeemComponent;
  let fixture: ComponentFixture<DashboardRedeemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardRedeemComponent],
      imports: [MatSliderModule, MatInputModule, MatCheckboxModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
