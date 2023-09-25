import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { RefSearchFormComponent } from './ref-search-form.component';

describe('RefSearchFormComponent', () => {
  let component: RefSearchFormComponent;
  let fixture: ComponentFixture<RefSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefSearchFormComponent ],
      providers: [ FormBuilder ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefSearchFormComponent);
    component = fixture.componentInstance;
    component.searchParams = {
      // status: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    const ev = new Event('click');
    expect(component.submit(ev)).toBeUndefined();
  }));
  
  it('should clear', () => {
    expect(component.clear()).toBeUndefined();
  });
});
