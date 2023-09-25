import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { Observable } from 'rxjs';

import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
    let actions: Observable<Action>;
    let effects: AuthEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NxModule.forRoot(), 
                HttpClientTestingModule, 
                RouterTestingModule.withRoutes([])],
            providers: [AuthEffects, provideMockActions(() => actions), provideMockStore()],
        });

        effects = TestBed.inject(AuthEffects);
    });

    describe('AuthEffects', () => {
        it('should work', async () => {
            expect(effects).toBeTruthy();
        });
    });

});
