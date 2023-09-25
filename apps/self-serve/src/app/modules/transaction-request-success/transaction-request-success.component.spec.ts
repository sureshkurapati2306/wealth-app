import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRequestSuccessComponent } from './transaction-request-success.component';

describe('TransactionRequestSuccessComponent', () => {
  let component: TransactionRequestSuccessComponent;
  let fixture: ComponentFixture<TransactionRequestSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionRequestSuccessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRequestSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
