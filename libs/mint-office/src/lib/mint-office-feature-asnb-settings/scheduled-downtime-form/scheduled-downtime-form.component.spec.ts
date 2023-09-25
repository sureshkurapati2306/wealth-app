import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDowntimeFormComponent } from './scheduled-downtime-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ScheduledDowntimeFormComponent', () => {
  let component: ScheduledDowntimeFormComponent;
  let fixture: ComponentFixture<ScheduledDowntimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledDowntimeFormComponent ],
      imports: [
        RouterTestingModule, 
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDowntimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
