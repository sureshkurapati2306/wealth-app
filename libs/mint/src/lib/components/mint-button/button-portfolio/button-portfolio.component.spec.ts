import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { ButtonPortfolioComponent } from './button-portfolio.component';

describe('ButtonPortfolioComponent', () => {
  let component: ButtonPortfolioComponent;
  let fixture: ComponentFixture<ButtonPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonPortfolioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDialogModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
