import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogSelectTransactionComponent } from './dialog-select-transaction.component';

describe('DialogSelectTransactionComponent', () => {
  let component: DialogSelectTransactionComponent;
  let fixture: ComponentFixture<DialogSelectTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSelectTransactionComponent],
      imports: [MatDialogModule, MatMenuModule, RouterTestingModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
        { provide: MatDialogRef, useValue: {} },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
