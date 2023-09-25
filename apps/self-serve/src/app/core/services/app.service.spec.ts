import { TestBed } from '@angular/core/testing';
import { NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, StoreModule.forRoot({})],
        });

        service = TestBed.inject(AppService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Returns true if auth token exists
    it('should return true when auth token exists', () => {
        // Arrange
        service.authToken = 'token';

        // Act
        const result = service.isUserLoggedIn();

        // Assert
        expect(result).toBe(true);
    });

    // Sets previousUrl to a non-null string value
    it('should set previousUrl to a non-null string value', () => {
        const previousUrl = 'example.com';
        service.setPreviousUrl(previousUrl);
        expect(service.getPreviousUrl()).toBe(previousUrl);
    });

    // Returns the value of 'previousUrl' BehaviorSubject.
    it("should return the value of 'previousUrl' BehaviorSubject", () => {
        service.setPreviousUrl('example.com');
        expect(service.getPreviousUrl()).toBe('example.com');
    });

    // Returns an array of URLs when there is a history of visited URLs.
    it('should return an array of URLs when there is a history of visited URLs', () => {
        service.setURLs({ urlAfterRedirects: 'url1', id: 1, url: 'url1' } as NavigationEnd);
        service.setURLs({ urlAfterRedirects: 'url2', id: 2, url: 'url2' } as NavigationEnd);
        service.setURLs({ urlAfterRedirects: 'url3', id: 3, url: 'url3' } as NavigationEnd);
        expect(service.getURLs()).toEqual(['url1', 'url2', 'url3']);
    });

    // Add a new URL to route history when it doesn't exist
    it("should add a new URL to route history when it doesn't exist", () => {
        const event = { urlAfterRedirects: 'new-url', id: 1, url: 'url1' };

        service.setURLs(event);

        expect(service.getURLs()).toContain('new-url');
    });

    it('should update _routeHistory correctly', () => {
        const request: NavigationEnd = {
            urlAfterRedirects: 'dashboard',
            id: 1,
            url: 'dashboard',
        };

        service.setURLs(request);
        expect(service._routeHistory).toEqual(['dashboard']);
    });

    it('should update _routeHistory correctly after redirecting back to previous page', () => {
        const requestDashboard: NavigationEnd = {
            urlAfterRedirects: 'dashboard',
            id: 1,
            url: 'dashboard',
        };
        const requestTransaction: NavigationEnd = {
            urlAfterRedirects: 'transaction',
            id: 2,
            url: 'transaction',
        };

        service.setURLs(requestDashboard);
        service.setURLs(requestTransaction);
        service.setURLs(requestDashboard);
        expect(service._routeHistory).toEqual(['dashboard']);
    });

});
