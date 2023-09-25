import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogConcurrentSessionAlertComponent } from './dialog-concurrent-session-alert.component';

describe('DialogConcurrentSessionAlertComponent', () => {
  let component: DialogConcurrentSessionAlertComponent;
  let fixture: ComponentFixture<DialogConcurrentSessionAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConcurrentSessionAlertComponent ],
      imports: [ MatDialogModule],
      providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConcurrentSessionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
