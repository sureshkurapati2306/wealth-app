import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardRedeemValueComponent } from './dashboard-redeem-value.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';

describe('DashboardRedeemValueComponent', () => {
  let component: DashboardRedeemValueComponent;
  let fixture: ComponentFixture<DashboardRedeemValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardRedeemValueComponent],
      imports: [
        FormsModule,
        MatDialogModule,
        MatBottomSheetModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSliderModule,
        MatCheckboxModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRedeemValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
