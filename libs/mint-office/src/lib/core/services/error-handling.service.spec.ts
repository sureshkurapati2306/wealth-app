import { TestBed } from '@angular/core/testing';
import { ErrorHandlingService } from './error-handling.service';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartService', () => {
  let service: ErrorHandlingService;
  


  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ErrorHandlingService,],
      imports: [
        StoreModule.forRoot({}),MatSnackBarModule,MatDialogModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
  );

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlingService);
  });

 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GenericError:::should be created -- Count 0', () => {
    const error = {error:"Unauthorized",status:"401"}
    service.count = 0;
    service.genericMessage ="unauthorized";
    service.unauthorizedMesssage ="unauthorized";
    expect(service.GenericError(error)).toBeUndefined();
  });
  it('GenericError:::should be created -- Count 3', () => {
    const error = {error:"Unauthorized",status:"401"}
    service.count = 2;
    service.dialog=undefined;
    service.genericMessage ="unauthorized";
    expect(service.GenericError(error)).toBeUndefined();
  });
  it('handlingError:::should be created', () => {
    const error = {error:{error:"Unauthorized"},status:"401"}
    service.unauthorizedMesssage ="unauthorized";
    expect(service.handlingError(error)).toBeUndefined();
  });
  it('handlingError:::should be created - zero', () => {
    const error = {error:{error:"Unauthorized"},status:"0"}
    service.router.navigate(['/SystemDownTime']);
    expect(service.handlingError(error)).toBeUndefined();
  });
  it('opensnackbar:::should be created', () => {
    const message = null
    expect(service.opensnackbar(message)).toBeUndefined();
  });
  // it('should create:::snackbar', () => {
  //   jest.spyOn(service.snackbar,"open");
  //   const message ="There seems to be a slight issue. Please try again."
  //   expect(service.snackbar.openFromComponent).toHaveBeenCalled();
  //   // you can also use ".toHaveBeenCalledWith" with necessary params
  // });

  
});
