import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { CsSearchFormComponent } from './cs-search-form.component';

describe('CsSearchFormComponent', () => {
  let component: CsSearchFormComponent;
  let fixture: ComponentFixture<CsSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsSearchFormComponent ],
      providers: [
        FormBuilder,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsSearchFormComponent);
    component = fixture.componentInstance;
    component.searchParams = {
      fullName: '',
      idNumber: '',
      cifNumber: ''
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
