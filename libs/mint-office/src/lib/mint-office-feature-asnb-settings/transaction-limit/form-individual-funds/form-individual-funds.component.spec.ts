import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndividualFundsComponent } from './form-individual-funds.component';

describe('FormIndividualFundsComponent', () => {
  let component: FormIndividualFundsComponent;
  let fixture: ComponentFixture<FormIndividualFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIndividualFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIndividualFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
