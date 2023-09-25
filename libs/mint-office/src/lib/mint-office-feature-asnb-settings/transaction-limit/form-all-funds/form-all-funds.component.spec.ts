import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAllFundsComponent } from './form-all-funds.component';

describe('FormAllFundsComponent', () => {
  let component: FormAllFundsComponent;
  let fixture: ComponentFixture<FormAllFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAllFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAllFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
