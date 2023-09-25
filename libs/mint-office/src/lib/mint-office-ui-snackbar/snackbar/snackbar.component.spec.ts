import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';

import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

import { OverlayModule } from '@angular/cdk/overlay';


describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarComponent ],
      imports: [OverlayModule, MatSnackBarModule],
      providers: [
          {provide: MatSnackBarRef, useValue: {}},
          {provide: MAT_SNACK_BAR_DATA, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss snackbar', () => {
    expect(component.dismissSnackbar()).toBeUndefined();
  });
});
