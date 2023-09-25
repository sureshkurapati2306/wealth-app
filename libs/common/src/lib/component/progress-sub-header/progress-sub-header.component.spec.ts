import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ProgressSubHeaderComponent } from './progress-sub-header.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
// import { State } from '../../core/state/wealth-dashboard/wealth-dashboard.reducer';
// const mockState: State = {
//   riskProfile: riskrofileMockData,
//   accountSummary: accountSummaryMockData,
//   status: 'pending',
//   error: '',
// };

describe('ProgressSubHeaderComponent', () => {
  let component: ProgressSubHeaderComponent;
  let fixture: ComponentFixture<ProgressSubHeaderComponent>;
  let store: MockStore<any>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressSubHeaderComponent],
      imports: [MatBottomSheetModule,MatDialogModule,RouterTestingModule.withRoutes([]),],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({ initialState: {} }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProgressSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.pageTitle).toBeUndefined();
    expect(component.label).toBeUndefined();
    expect(component.isFundHoliday).toBeUndefined();
    expect(component.isBackButtonEnabled).toBeUndefined();
  });

  it('should call startInvestment', () => {
    component.startInvestment();
    expect(component).toBeTruthy();
  });  
});
