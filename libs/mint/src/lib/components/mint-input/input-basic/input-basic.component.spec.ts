import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputBasicComponent } from './input-basic.component';

describe('InputBasicComponent', () => {
  let component: InputBasicComponent;
  let fixture: ComponentFixture<InputBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputBasicComponent],
      imports: [MatInputModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
