import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as CartActions from './cart.actions';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog'
import { CartEffects } from './cart.effects';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

function mockError() {
    return new HttpErrorResponse({
      error: 'error',
      headers: new HttpHeaders(),
      status: 404
    });
  }

describe('CartEffects', () => {

    let actions: Observable<Action>;
    let effects: CartEffects;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot(), RouterTestingModule, HttpClientModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
            providers: [
                CartEffects,
                provideMockActions(() => actions),
                provideMockStore(),
            ],
        });

        effects = TestBed.inject(CartEffects);
        http = TestBed.inject(HttpClient);
    });

    describe('CartEffects', () => {
        it('should work', async () => {
            expect(effects).toBeTruthy();
        });
    });

    describe('RequestOtpApi', () => {
        it('Should call RequestOtpApi', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(of(mockError));
            const action = new CartActions.RequestOtpApi('9090909090');
            actions = hot('a', { a: action });
            effects.getOtpApi.subscribe((result) => {
                expect(true).toEqual(
                   new CartActions.RequestOtpSuccess(JSON.stringify(result)),
                );
            });
        });
        it('Should call RequestOtpApi With error', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(throwError(mockError));
            const action = new CartActions.RequestOtpApi('9090909090');
            actions = hot('a', { a: action });
            effects.getOtpApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.RequestOtpFail(JSON.stringify(result)),
                );
            });
        });


    });

    describe('verifyOtpApi', () => {
        it('Should call verifyOtpApi', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(of(mockError));
            const action = new CartActions.VerifyOTPApi('9090909090');
            actions = hot('a', { a: action });
            effects.verifyOtpApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.VerifyOtpSuccess(JSON.stringify(result)),
                );
            });
        });
        it('Should call verifyOtpApi with an error', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(throwError(mockError));
            const action = new CartActions.VerifyOTPApi('9090909090');
            actions = hot('a', { a: action });
            effects.verifyOtpApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.VerifyOtpFail(JSON.stringify(result)),
                );
            });
        });
    });

    describe('CreateCart', () => {
        it('Should call CreateCart', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(of(mockError));
            const action = new CartActions.CreateCart('payload' , null, '1','100', '1000','001', true, 'source', '10001');
            actions = hot('a', { a: action });
            effects.createCartApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.GetCartByClientIdSuccess(JSON.stringify(result)),
                );
            });
        });

        it('Should call CreateCart with error', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(throwError(mockError));
            const action = new CartActions.CreateCart('payload' , null, '1','100', '1000','001', true, 'source', '10001');
            actions = hot('a', { a: action });
            effects.verifyOtpApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.CreateCartFail(JSON.stringify(result)),
                );
            });
        });
    });

    describe('PostAllTransaction', () => {
        it('Should call PostAllTransaction', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(of(mockError));
            const action = new CartActions.PostAllTransaction('9090909090' , '111111');
            actions = hot('a', { a: action });
            effects.postAllTransactionApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.PostAllTransactionSuccess(JSON.stringify(result),'9090909090' ),
                );
            });
        });

        it('Should call PostAllTransaction with error', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(throwError(mockError));
            const action = new CartActions.PostAllTransaction('9090909090' , '111111');
            actions = hot('a', { a: action });
            effects.postAllTransactionApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.PostAllTransactionFail(JSON.stringify(result)),
                );
            });
        });
    });

    describe('updateCartByClientIdApi', () => {
        it('Should call updateCartByClientIdApi', () => {
            jest.spyOn(http, 'put').mockReturnValueOnce(of(mockError));
            const action = new CartActions.UpdateCartByClientId('10001' ,'payload', null, '1','100', '1000','001', true, '10001');
            actions = hot('a', { a: action });
            effects.updateCartByClientIdApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.GetCartByClientIdSuccess(JSON.stringify(result)),
                );
            });
        });
        it('Should call updateCartByClientIdApi with error', () => {
            jest.spyOn(http, 'put').mockReturnValueOnce(throwError(mockError));
            const action = new CartActions.UpdateCartByClientId('10001' ,'payload', null, '1','100', '1000','001', true, '10001');
            actions = hot('a', { a: action });
            effects.updateCartByClientIdApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.UpdateCartByClientIdFail(JSON.stringify(result)),
                );
            });
        });
    });

    describe('GetCartByClientId', () => {
        it('Should call GetCartByClientId', () => {
            jest.spyOn(http, 'get').mockReturnValueOnce(of(mockError));
            const action = new CartActions.GetCartByClientId('10001');
            actions = hot('a', { a: action });
            effects.getCartByClientId.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.GetCartByClientIdSuccess(JSON.stringify(result)),
                );
            });
        });

        it('Should call GetCartByClientId with error', () => {
            jest.spyOn(http, 'get').mockReturnValueOnce(throwError(mockError));
            const action = new CartActions.GetCartByClientId('10001');
            actions = hot('a', { a: action });
            effects.getCartByClientId.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.GetCartByClientIddFail(null),
                );
            });
        });
    });

    describe('SwitchCart', () => {
        it('Should call SwitchCart', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(of(mockError));
            const action = new CartActions.SwitchCart('payload' , null, '1','100', '1000','001', true, 'source', '10001');
            actions = hot('a', { a: action });
            effects.switchCartApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.GetCartByClientIdSuccess(JSON.stringify(result)),
                );
            });
        });
        it('Should call SwitchCart with error', () => {
            jest.spyOn(http, 'post').mockReturnValueOnce(throwError(mockError));
            const action = new CartActions.SwitchCart('payload' , null, '1','100', '1000','001', true, 'source', '10001');
            actions = hot('a', { a: action });
            effects.switchCartApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.SwitchCartFail(JSON.stringify(result)),
                );
            });
        });
    });

    describe('DeleteCart', () => {
        it('Should call DeleteCart', () => {
            jest.spyOn(http, 'delete').mockReturnValueOnce(of(mockError));
            const action = new CartActions.DeleteCart('10001');
            actions = hot('a', { a: action });
            effects.deleteFullCartApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.GetCartByClientIdSuccess(JSON.stringify(result)),
                );
            });
        });

        it('Should call DeleteCart', () => {
            jest.spyOn(http, 'delete').mockReturnValueOnce(throwError(mockError));
            const action = new CartActions.DeleteCart('10001');
            actions = hot('a', { a: action });
            effects.deleteFullCartApi.subscribe((result) => {
                expect(true).toEqual(
                    new CartActions.DeleteCartFail(JSON.stringify(result)),
                );
            });
        });
    });




});
