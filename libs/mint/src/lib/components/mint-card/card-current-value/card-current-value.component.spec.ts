import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { CardCurrentValueComponent } from './card-current-value.component';

describe('CardCurrentValueComponent', () => {
  let component: CardCurrentValueComponent;
  let fixture: ComponentFixture<CardCurrentValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCurrentValueComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatBottomSheetModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCurrentValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
