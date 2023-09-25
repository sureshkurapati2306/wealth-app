import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';

import { CardTotalInvestedComponent } from './card-total-invested.component';

describe('CardTotalInvestedComponent', () => {
  let component: CardTotalInvestedComponent;
  let fixture: ComponentFixture<CardTotalInvestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardTotalInvestedComponent],
      imports: [ MatInputModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTotalInvestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
