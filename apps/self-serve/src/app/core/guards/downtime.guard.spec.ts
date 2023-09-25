import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { DowntimeService } from '../services/downtime/downtime.service';

import { DowntimeGuard } from './downtime.guard';

describe('DowntimeGuard', () => {
    let guard: DowntimeGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
            providers: [DowntimeService, HttpClient, HttpHandler],
        });
        guard = TestBed.inject(DowntimeGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('canActivate being processed', () => {
        guard.checkDowntime();
        expect(guard.canActivate()).toBeTruthy();
    });
});
