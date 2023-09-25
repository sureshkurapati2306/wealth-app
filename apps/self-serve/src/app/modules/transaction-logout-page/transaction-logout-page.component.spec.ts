import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TransactionLogoutPageComponent } from './transaction-logout-page.component';
import { Actions } from '@ngrx/effects';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Idle } from '@ng-idle/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

class MockIdle {
    stop() {
        /* mock */
    }
}
describe('LogoutPageComponent', () => {
    let component: TransactionLogoutPageComponent;
    let fixture: ComponentFixture<TransactionLogoutPageComponent>;
    let store: MockStore;
    let actions$: Actions;
    let idle: Idle;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                RouterTestingModule,
                StoreModule.forRoot({}),
            ],
            declarations: [TransactionLogoutPageComponent],
            providers: [
                { provide: Idle, useClass: MockIdle },
                provideMockStore(),
                provideMockActions(() => actions$),
            ],
        }).compileComponents();

        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionLogoutPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should call component', () => {
        expect(component).toBeTruthy();
    });
});
