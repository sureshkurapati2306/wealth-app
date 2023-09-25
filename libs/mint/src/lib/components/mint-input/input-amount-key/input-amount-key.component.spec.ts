import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAmountKeyComponent } from './input-amount-key.component';

describe('InputAmountKeyComponent', () => {
  let component: InputAmountKeyComponent;
  let fixture: ComponentFixture<InputAmountKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAmountKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAmountKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call replaceInvalidCharacters()', () => {
    expect(component.replaceInvalidCharacters('123')).toBeTruthy();
  });
});
