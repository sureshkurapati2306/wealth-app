import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Idle } from '@ng-idle/core';
import { AppComponent, scrollFactory } from './app.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { Router, Event } from '@angular/router';
import { AppService } from '../app/core/services/app.service';
import { of } from 'rxjs';
import { path } from './shared/config';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let mockStore: Partial<Store>;
    let mockRouter: Partial<Router>;
    let mockAppService: Partial<AppService>;
    let mockIdle: Idle;
    let setTimeoutMock: jest.Mock<number>;

    beforeEach(async () => {
        setTimeoutMock = jest.fn();
        (window as any).setTimeout = setTimeoutMock;

        mockStore = {
            select: jest.fn().mockReturnValue(of({ storeTransaction: 'mocked data' })),
            dispatch: jest.fn(),
        };

        mockRouter = {
            events: of(new Event('') as unknown as Event),
            navigate: jest.fn(),
        };

        mockAppService = {
            getLoadingSpinnerState: jest.fn().mockReturnValue(of(false)),
            setPreviousUrl: jest.fn(),
            setURLs: jest.fn(),
            logoutUser: jest.fn(),
            redirectProcess: jest.fn(),
            setTimeoutTimer: jest.fn(),
        };

        mockIdle = {
            setIdle: jest.fn(),
            setTimeout: jest.fn(),
            setInterrupts: jest.fn(),
            onIdleStart: { pipe: jest.fn(() => ({ subscribe: jest.fn() })) },
            onIdleEnd: { pipe: jest.fn(() => ({ subscribe: jest.fn() })) },
            onTimeout: { pipe: jest.fn(() => ({ subscribe: jest.fn() })) },
            onTimeoutWarning: { pipe: jest.fn(() => ({ subscribe: jest.fn() })) },
            watch: jest.fn(),
            stop: jest.fn(),
        } as any;

        await TestBed.configureTestingModule({
            imports: [OverlayModule, MatDialogModule],
            declarations: [AppComponent],
            providers: [
                { provide: Store, useValue: mockStore },
                { provide: Router, useValue: mockRouter },
                { provide: AppService, useValue: mockAppService },
                { provide: Idle, useValue: mockIdle },
                Overlay,
                MatDialog,
                { provide: 'MAT_MENU_SCROLL_STRATEGY', useFactory: scrollFactory, deps: [Overlay] },
                { provide: 'MAT_AUTOCOMPLETE_SCROLL_STRATEGY', useFactory: scrollFactory, deps: [Overlay] },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should call logoutEvent on page unload', () => {
        const appService = TestBed.inject(AppService);
        const spyOnLogoutUser = jest.spyOn(appService, 'logoutUser');
        const spyOnRedirectProcess = jest.spyOn(appService, 'redirectProcess');

        // Simulate window:beforeunload event
        window.dispatchEvent(new Event('beforeunload'));

        expect(spyOnLogoutUser).toHaveBeenCalled();
        expect(spyOnRedirectProcess).toHaveBeenCalled();
    });

    it('should reset idle state and start watching on ngOnInit', () => {
        const spyOnIdleWatch = jest.spyOn(component['idle'], 'watch');
        component.idleState = 'IDLE';
        component.timedOut = true;

        component.ngOnInit();

        // Expect the idleService watch method to have been called
        expect(spyOnIdleWatch).toHaveBeenCalled();
        // Expect the component state to be reset
        expect(component.idleState).toBe('NOT_IDLE');
        expect(component.timedOut).toBe(false);
    });

    it('should load data from store `cartReducer`', () => {
        // Call the method
        component.loadData();

        // Expect the storeTransaction property to have the expected value
        expect(component.storeTransaction).toBe('mocked data');
    });

    it('should start inactivity timeout on visibility change when hidden', () => {
        const startInactivityTimeoutSpy = jest.spyOn(component as any, 'startInactivityTimeout');
        const event = new Event('visibilitychange');
        Object.defineProperty(document, 'hidden', { value: true });

        document.dispatchEvent(event);

        expect(startInactivityTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(setTimeoutMock).toHaveBeenCalled();
        expect(setTimeoutMock).toHaveBeenCalledWith(expect.any(Function), component['durationThreshold']);
    });

    it('should clear inactivity timeout on visibility change when visible', () => {
        const clearInactivityTimeoutSpy = jest.spyOn(component as any, 'clearInactivityTimeout');
        const event = new Event('visibilitychange');
        Object.defineProperty(document, 'hidden', { value: false });

        document.dispatchEvent(event);

        expect(clearInactivityTimeoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should clear inactivity timeout on focus change', () => {
        const clearInactivityTimeoutSpy = jest.spyOn(component as any, 'clearInactivityTimeout');
        const event = new Event('focus');

        window.dispatchEvent(event);

        expect(clearInactivityTimeoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should call logoutEvent after inactivity timeout', () => {
        jest.useFakeTimers();
        const logoutEventSpy = jest.spyOn(component as any, 'logoutEvent');
        Object.defineProperty(document, 'hidden', { value: true });

        component['startInactivityTimeout']();

        jest.runAllTimers();

        expect(logoutEventSpy).toHaveBeenCalledTimes(1);
    });

    it('should clear inactivity timeout', () => {
        jest.useFakeTimers();
        const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
        const inactivityTimeoutId = 123;
        component['inactivityTimeout'] = inactivityTimeoutId;

        component['clearInactivityTimeout']();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(clearTimeoutSpy).toHaveBeenCalledWith(inactivityTimeoutId);
    });

    // Tests that if the user is not on the logout page or transaction logout page, the user is logged out and redirected to the appropriate page
    it('should logout user and redirect to logout page when user is not on logout page or transaction logout page', () => {
        // Mock dependencies
        const router = TestBed.inject(Router);
        const appServiceMock = jest.spyOn(component['appService'], 'logoutUser');
        const routerNavigateMock = jest.spyOn(router, 'navigate');
        const stopAllServiceMock = jest.spyOn(component, 'stopAllService');

        // Set up test data
        component.currentpage = 'some-page';
        component.storeTransaction = [/* some data */];

        // Call the method
        component.logoutEvent();

        // Assertions
        expect(appServiceMock).toHaveBeenCalled();
        expect(routerNavigateMock).toHaveBeenCalledWith([path.LOGOUT]);
        expect(stopAllServiceMock).toHaveBeenCalled();
    });

    // Tests that if the user is logged out due to inactivity, the user is redirected to the transaction logout page
    it('should redirect to transaction logout page when user is logged out due to inactivity', () => {
        // Mock dependencies
        const router = TestBed.inject(Router);
        const appServiceMock = jest.spyOn(component['appService'], 'logoutUser');
        const routerNavigateMock = jest.spyOn(router, 'navigate');
        const stopAllServiceMock = jest.spyOn(component, 'stopAllService');

        // Set up test data
        component.currentpage = 'some-page';
        component.timedOut = true;

        // Call the method
        component.logoutEvent();

        // Assertions
        expect(appServiceMock).toHaveBeenCalled();
        expect(routerNavigateMock).toHaveBeenCalledWith([path.TRANSACTION_LOGOUT, { isTimeout: true }]);
        expect(stopAllServiceMock).toHaveBeenCalled();
    });

    it('should call stopAllService on logoutEvent', () => {
        const spyOnStopAllService = jest.spyOn(component, 'stopAllService');

        component.logoutEvent();

        expect(spyOnStopAllService).toHaveBeenCalled();
    });

    it('should stop all services on stopAllService', () => {
        const spyOnIdleStop = jest.spyOn(component['idle'], 'stop');
        const spyOnDestroyNext = jest.spyOn(component['destroy$'], 'next');
        const spyOnDestroyComplete = jest.spyOn(component['destroy$'], 'complete');

        component.stopAllService();

        expect(spyOnIdleStop).toHaveBeenCalled();
        expect(spyOnDestroyNext).toHaveBeenCalled();
        expect(spyOnDestroyComplete).toHaveBeenCalled();
    });

});
