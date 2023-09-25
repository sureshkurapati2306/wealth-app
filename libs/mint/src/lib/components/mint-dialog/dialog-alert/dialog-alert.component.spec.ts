import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogAlertComponent } from './dialog-alert.component';

describe('DialogAlertComponent', () => {
  let component: DialogAlertComponent;
  let fixture: ComponentFixture<DialogAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAlertComponent],
      imports: [MatDialogModule],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },{
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
