import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDowntimeTableComponent } from './scheduled-downtime-table.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScheduledDowntimeTableComponent', () => {
  let component: ScheduledDowntimeTableComponent;
  let fixture: ComponentFixture<ScheduledDowntimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledDowntimeTableComponent ],
      imports: [RouterTestingModule, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDowntimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
