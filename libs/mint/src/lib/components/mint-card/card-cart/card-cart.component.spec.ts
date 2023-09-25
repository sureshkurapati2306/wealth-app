import { DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardCartComponent } from './card-cart.component';

describe('CardCartComponent', () => {
  let component: CardCartComponent;
  let fixture: ComponentFixture<CardCartComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCartComponent],
      imports: [MatDialogModule, MatBottomSheetModule,
        ReactiveFormsModule, BrowserModule,BrowserAnimationsModule,
        HttpClientModule,
        FormsModule],
      providers: [MatBottomSheetModule,DecimalPipe,
        { provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
