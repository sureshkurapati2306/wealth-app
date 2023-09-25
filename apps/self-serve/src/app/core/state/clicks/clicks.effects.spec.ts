import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as ClicksActions from './clicks.actions';
import { ClicksEffects } from './clicks.effects';

describe('ClicksEffects', () => {
    let actions: Observable<Action>;
    let effects: ClicksEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot(), HttpClientTestingModule],
            providers: [ClicksEffects, provideMockActions(() => actions), provideMockStore()],
        });

        effects = TestBed.inject(ClicksEffects);
    });

    describe('ClicksEffects', () => {
        it('should work', async () => {
            expect(effects).toBeTruthy();
        });
    });

    // describe('init$', () => {
    //     it('should work', () => {
    //         actions = hot('-a-|', { a: ClicksActions.init() });

    //         const expected = hot('-a-|', { a: ClicksActions.loadClicksSuccess({ clicks:  }) });

    //         expect(effects.init$).toBeObservable(expected);
    //     });
    // });
});
