import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { MobileTooltipComponent } from './mobile-tooltip.component';

describe('MobileTooltipComponent', () => {
  let component: MobileTooltipComponent;
  let fixture: ComponentFixture<MobileTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileTooltipComponent],
      imports: [MatBottomSheetModule],
      providers: [{
        provide: MAT_BOTTOM_SHEET_DATA,
        useValue: {}
      }]

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
