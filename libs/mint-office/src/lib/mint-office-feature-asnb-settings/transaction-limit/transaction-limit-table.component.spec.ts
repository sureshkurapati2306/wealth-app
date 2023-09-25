import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLimitTableComponent } from './transaction-limit-table.component';

describe('TransactionLimitTableComponent', () => {
  let component: TransactionLimitTableComponent;
  let fixture: ComponentFixture<TransactionLimitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionLimitTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLimitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
