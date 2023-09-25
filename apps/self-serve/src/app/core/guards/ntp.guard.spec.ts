import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { NTPGuard } from './ntp.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('NTPGuard', () => {
    let guard: NTPGuard;
  
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
            providers: [],
        });
        guard = TestBed.inject(NTPGuard);
      
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('canActivate being processed', () => {
        expect(guard.canActivate()).toBeUndefined;
    });

});
