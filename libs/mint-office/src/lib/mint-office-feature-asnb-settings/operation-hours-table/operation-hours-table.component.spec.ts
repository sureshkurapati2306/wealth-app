import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationHoursTableComponent } from './operation-hours-table.component';

describe('OperationHoursTableComponent', () => {
  let component: OperationHoursTableComponent;
  let fixture: ComponentFixture<OperationHoursTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationHoursTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationHoursTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
