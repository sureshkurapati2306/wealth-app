import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { CardFundDocumentComponent } from './card-fund-document.component';

describe('CardFundDocumentComponent', () => {
  let component: CardFundDocumentComponent;
  let fixture: ComponentFixture<CardFundDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFundDocumentComponent],
      imports: [MatDialogModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFundDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
