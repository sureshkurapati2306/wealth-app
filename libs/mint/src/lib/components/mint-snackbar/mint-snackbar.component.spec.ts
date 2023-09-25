import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { MintSnackbarComponent } from './mint-snackbar.component';

describe('MintSnackbarComponent', () => {
  let component: MintSnackbarComponent;
  let fixture: ComponentFixture<MintSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MintSnackbarComponent],
      imports: [MatSnackBarModule],
      providers: [{
        provide: MAT_SNACK_BAR_DATA,
        useValue: {}
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
