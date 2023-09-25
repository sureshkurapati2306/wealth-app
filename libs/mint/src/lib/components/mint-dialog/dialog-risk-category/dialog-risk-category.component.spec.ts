import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogRiskCategoryComponent } from './dialog-risk-category.component';

describe('DialogRiskCategoryComponent', () => {
  let component: DialogRiskCategoryComponent;
  let fixture: ComponentFixture<DialogRiskCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRiskCategoryComponent ],
      imports: [MatDialogModule],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },{
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRiskCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
