import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardCartSwitchComponent } from './card-cart-switch.component';
import { CommonModule } from '@angular/common'; 

describe('CardCartSwitchComponent', () => {
  let component: CardCartSwitchComponent;
  let fixture: ComponentFixture<CardCartSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCartSwitchComponent],
      imports: [MatDialogModule, BrowserAnimationsModule, MatButtonModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCartSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
