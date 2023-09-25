import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { AccountOpeningResolver } from './opening-account.resolver';
import { provideMockActions } from '@ngrx/effects/testing';

describe('AccountOpeningResolver', () => {
    let actions: Observable<Action>;
    let resolver: AccountOpeningResolver;
    let store: MockStore<any>;
    let fixture: ComponentFixture<AccountOpeningResolver>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AccountOpeningResolver,
                provideMockActions(() => actions),
                provideMockStore(),
                {
                    provide: AccountOpeningResolver,
                },
            ],
        });
        resolver = TestBed.inject(AccountOpeningResolver);
        store = TestBed.inject(MockStore);
    });

    it('should create', () => {
        expect(resolver).toBeTruthy();
    });

    it('should call resolve', () => {
        jest.spyOn(store, 'select').mockImplementation((selector) => {
            if (selector == 'clicks') {
                return of({
                    cifNumber: '10280000511148',
                    customerIDNumber: '690629135086',
                    customerIDType: '3',
                    debitCardNumber: '5196032215004728',
                    customerIDTypeDesc: 'New IC',
                    customerType: 'ETP',
                });
            }
        });

        resolver.resolve();

        store.select('clicks').subscribe((data) => {
            fixture.detectChanges();
            expect(resolver.resolve()).toHaveBeenCalledTimes(3);
        });
    });
});
