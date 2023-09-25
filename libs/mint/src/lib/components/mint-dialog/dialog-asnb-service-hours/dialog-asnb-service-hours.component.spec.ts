import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAsnbServiceHoursComponent } from './dialog-asnb-service-hours.component';

describe('DialogAsnbServiceHoursComponent', () => {
  let component: DialogAsnbServiceHoursComponent;
  let fixture: ComponentFixture<DialogAsnbServiceHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAsnbServiceHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAsnbServiceHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
