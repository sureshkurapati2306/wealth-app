import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';

import { CardNoticeComponent } from './card-notice.component';

describe('CardNoticeComponent', () => {
  let component: CardNoticeComponent;
  let fixture: ComponentFixture<CardNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardNoticeComponent],
      imports: [MatInputModule]
      
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.accountName).toBeUndefined();
    expect(component.unitTrustAccount).toBeUndefined();
    expect(component.paymentAccount).toBeUndefined();
    expect(component.referenceNumber).toBeUndefined();
    expect(component.status).toBeUndefined();
    expect(component.dateTime).toBeUndefined();
    expect(component.transactionMessage).toBeUndefined();
  });

});
