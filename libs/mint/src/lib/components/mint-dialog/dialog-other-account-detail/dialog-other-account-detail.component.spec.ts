import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { DialogOtherAccountDetailComponent } from './dialog-other-account-detail.component';

describe('DialogOtherAccountDetailComponent', () => {
  let component: DialogOtherAccountDetailComponent;
  let fixture: ComponentFixture<DialogOtherAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule,FormsModule, ReactiveFormsModule],
      declarations: [ DialogOtherAccountDetailComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOtherAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
