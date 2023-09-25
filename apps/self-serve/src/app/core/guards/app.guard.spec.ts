import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AppGuard } from './app.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../services/app.service';

describe('AppGuard', () => {
  let guard: AppGuard;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[StoreModule.forRoot({}),RouterTestingModule.withRoutes([]),],
    providers:[AppService]});
    guard = TestBed.inject(AppGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate being processed -  to be false',() => {
    guard.appService.isUserLoggedIn();
    expect(guard.canActivate()).toBeFalsy();
  });
  it('canActivate being processed -  to be true',() => {
    guard.appService.authToken = 'some string';
    expect(guard.appService.isUserLoggedIn()).toEqual(true);
    expect(guard.canActivate()).toBeTruthy();
  });
});
