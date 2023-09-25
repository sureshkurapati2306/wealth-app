import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { InvesmentOptionsResolver } from './select-investment-options.resolver';
import { provideMockActions } from '@ngrx/effects/testing';

describe('InvesmentOptionsResolver', () => {
    let actions: Observable<Action>;
    let resolver: InvesmentOptionsResolver;
    let store: MockStore<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InvesmentOptionsResolver,
                provideMockActions(() => actions),
                provideMockStore(),
                {
                    provide: InvesmentOptionsResolver,
                },
            ],
        });
        resolver = TestBed.inject(InvesmentOptionsResolver);
        store = TestBed.inject(MockStore);
    });

    it('should create', () => {
        resolver.resolve();
        expect(resolver).toBeTruthy();
    });

    it('should unsubscribe all observables', () => {
        const nextSpy = jest.spyOn(resolver._unsubscribeAll, 'next');
        const completeSpy = jest.spyOn(resolver._unsubscribeAll, 'complete');
    
        resolver.unSubscribe();
    
        expect(nextSpy).toHaveBeenCalled();
        expect(completeSpy).toHaveBeenCalled();
      });
});
