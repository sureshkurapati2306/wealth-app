import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPositionComponent } from './financial-position.component';

describe('FinancialPositionComponent', () => {
  let component: FinancialPositionComponent;
  let fixture: ComponentFixture<FinancialPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialPositionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
