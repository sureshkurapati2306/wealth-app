import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InvestmentComputationComponent } from './investment-computation.component';

describe('InvestmentComputationComponent', () => {
  let component: InvestmentComputationComponent;
  let fixture: ComponentFixture<InvestmentComputationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestmentComputationComponent],
      imports: [MatDialogModule, MatBottomSheetModule],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },{
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentComputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
