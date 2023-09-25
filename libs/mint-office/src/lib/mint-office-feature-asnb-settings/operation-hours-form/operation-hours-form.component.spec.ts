import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationHoursFormComponent } from './operation-hours-form.component';

describe('OperationHoursFormComponent', () => {
  let component: OperationHoursFormComponent;
  let fixture: ComponentFixture<OperationHoursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationHoursFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationHoursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
