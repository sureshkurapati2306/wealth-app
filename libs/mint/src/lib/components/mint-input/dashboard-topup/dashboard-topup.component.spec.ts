import { DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { DashboardTopupComponent } from './dashboard-topup.component';

describe('DashboardTopupComponent', () => {
  let component: DashboardTopupComponent;
  let fixture: ComponentFixture<DashboardTopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTopupComponent],
      imports: [ MatDialogModule, MatInputModule, ReactiveFormsModule],
      providers:[DecimalPipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
