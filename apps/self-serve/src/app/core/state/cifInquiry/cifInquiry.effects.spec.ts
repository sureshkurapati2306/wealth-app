// import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { CifInquiryEffects } from './cifInquiry.effects';
import { AccountService } from '../../services/account-opening/account.service';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { Store } from './cifInquiry.reducer';

import * as CifInquiryActions from './cifInquiry.actions';
import { catchError } from 'rxjs/operators';

const mockState: Store = {
    cardNum: '',
    phoneType: '',
    phoneNumber: '',
    cifInquiryCalled: false,
};

class MockAccountService {
    getCifInquiry() {
        /* mock */
    }
}

describe('CifInquiryEffects', () => {
    let actions$: Observable<any>;
    let effects: CifInquiryEffects;
    let service: AccountService;
    let store: MockStore<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CifInquiryEffects,
                provideMockActions(() => actions$),
                provideMockStore(),
                {
                    provide: AccountService,
                    useClass: MockAccountService,
                },
            ],
        });
        store = TestBed.inject(MockStore);
        effects = TestBed.inject<CifInquiryEffects>(CifInquiryEffects);
        service = TestBed.inject(AccountService);
    });

    it('should call effect', () => {
        expect(effects).toBeTruthy();
    });

    it('should call GetCifInquiryData', (done) => {
        const mockReturnData = { cardNum: '1234', phoneType: 'Home', phoneNumber: '0123456789' };
        const spy = jest.spyOn(service, 'getCifInquiry').mockReturnValue(of(mockReturnData));

        actions$ = of(new CifInquiryActions.GetCifInquiryParam());

        effects.GetCifInquiryData.subscribe((action) => {
            expect(action).toEqual(new CifInquiryActions.GetCifInquiryResponse(mockReturnData));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should call GetCifInquiryData failed', (done) => {
        const spy = jest
            .spyOn(service, 'getCifInquiry')
            .mockReturnValue(of(catchError((error) => 'Mock error')));

        effects.GetCifInquiryData.subscribe((action) => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
