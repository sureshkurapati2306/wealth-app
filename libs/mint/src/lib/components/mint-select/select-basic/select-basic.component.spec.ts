import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SelectBasicComponent } from './select-basic.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SelectBasicComponent', () => {
  let component: SelectBasicComponent;
  let fixture: ComponentFixture<SelectBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectBasicComponent],
      imports: [ MatInputModule, MatSelectModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
