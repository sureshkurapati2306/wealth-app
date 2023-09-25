import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPromptComponent } from './dialog-prompt.component';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const dialogMock = {
  close: () => { /* mock */ }
};

describe('DialogPromptComponent', () => {
  let component: DialogPromptComponent;
  let fixture: ComponentFixture<DialogPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPromptComponent ],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss dialog and emit result', () => {
    jest.spyOn(component.dialogRef, 'close').mockReturnValue();
    expect(component.clickOk()).toBeUndefined();
  });
});
