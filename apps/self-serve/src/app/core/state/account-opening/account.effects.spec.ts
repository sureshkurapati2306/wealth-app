import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { AccountOpeningEffects } from './account.effects';
import { AccountService } from '../../services/account-opening/account.service';
import { NxModule } from '@nrwl/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import * as AccountActions from './account.actions';

describe('Account Opening Effect', () => {
    let actions: Observable<Action>;
    let effects: AccountOpeningEffects;
    let service: AccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot(), HttpClientTestingModule],
            providers: [
                AccountOpeningEffects,
                provideMockActions(() => actions),
                provideMockStore(),
                {
                    provide: AccountService,
                },
            ],
        });
        service = TestBed.inject(AccountService);
        effects = TestBed.inject<AccountOpeningEffects>(AccountOpeningEffects);
    });

    it('should call effect', () => {
        expect(effects).toBeTruthy();
    });
});
