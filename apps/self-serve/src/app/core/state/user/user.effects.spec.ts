import { Observable, of } from 'rxjs';
import { UserEffects } from './user.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AccountService } from '../../services/account-opening/account.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
// import { environment } from '../../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockUserService {
    getUTAccount() {
        /* mock */
    }
}

describe('UserEffects', () => {
    let actions$: Observable<any>;
    let effects: UserEffects;
    let service: AccountService;
    let store: MockStore<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UserEffects,
                provideMockActions(() => actions$),
                provideMockStore(),
                {
                    provide: AccountService,
                    useClass: MockUserService,
                },
            ],
        });

        store = TestBed.inject(MockStore);
        effects = TestBed.inject<UserEffects>(UserEffects);
        service = TestBed.inject(AccountService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    // it('should call GetUserTypeApiData effect', () => {
    //     const mockClientId = '123456';
    //     const mockUrl =
    //         environment.apiUrl + environment.ut + '/ut-account-client/?clientId=' + mockClientId;

    //     const spy = jest.spyOn(service, 'getUTAccount').mockReturnValue(of(mockReturnData));
    // });
});
