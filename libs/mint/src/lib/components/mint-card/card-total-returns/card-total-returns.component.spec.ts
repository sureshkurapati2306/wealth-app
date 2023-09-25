import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CardTotalReturnsComponent } from './card-total-returns.component';

describe('CardTotalReturnsComponent', () => {
  let component: CardTotalReturnsComponent;
  let fixture: ComponentFixture<CardTotalReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardTotalReturnsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDialogModule, MatBottomSheetModule],
      providers: [
        // temporary workaround to pass on unit test
        {provide: MatDialogRef, useValue: {}},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTotalReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Not Empty', () => {
    const fixture = TestBed.createComponent(CardTotalReturnsComponent);
    //const comp = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

});
