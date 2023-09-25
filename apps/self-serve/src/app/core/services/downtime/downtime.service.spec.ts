import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@cimb/core';
import { environment } from '@env/self-serve/environment';

import { DowntimeService } from './downtime.service';

import { ASNBDowntimeMaintenance } from '../../../modules/asnb/mocks/data';
import { StoreModule } from '@ngrx/store';
import * as AsnbSelectors from '../../../modules/asnb/+state/asnb.selectors';
import { ASNBScheduledDowntimeInfo, ScheduledMaintenance } from '../../../modules/asnb/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getASNBDowntimeScheduledMaintenance } from '../../state/wealth-dashboard/wealth-dashboard.selectors';

describe('DowntimeService', () => {
    let service: DowntimeService;
    let httpMock: HttpTestingController;
    let httpRequest;
    let mockStore: MockStore;

    const endpoint: string = environment.apiUrl;

    const mockASNBDowntimeScheduledMaintenance: any = ASNBDowntimeMaintenance;

    const mockState: any = {
        ASNBDowntimeScheduledMaintenance: mockASNBDowntimeScheduledMaintenance,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                StoreModule.forRoot({}),
                HttpClientTestingModule,
            ],
            providers: [HttpService, DowntimeService, provideMockStore()],
        });
        service = TestBed.inject(DowntimeService);
        httpMock = TestBed.inject(HttpTestingController);
        mockStore = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getDowntime()', () => {
        const mockDowntimeResponse = {
            dataPresent: 'string',
            endDate: null,
            endTime: null,
            startDate: null,
            startTime: null,
        };
        it('should call downtime api to get latest downtime', () => {
            const userName = 'yoges123'
            service.getDowntime(userName).subscribe((response) => {
                expect(response).toEqual(mockDowntimeResponse);
            });
            httpRequest = httpMock.expectOne(
                `${endpoint + environment.wealth}/current-date-schedule-downtime?code=`+ userName,
            );
            httpRequest.flush(mockDowntimeResponse);
            expect(service).toBeTruthy();
        });

        it('should call getASNBScheduledDowntime', () => {
            const result = AsnbSelectors.getASNBDowntimeScheduledMaintenance.projector(mockState);

            expect(result).toStrictEqual(mockState.ASNBDowntimeScheduledMaintenance);
        });
    });

    it('should return null when no scheduled maintenance', (done) => {
        const mockScheduledMaintenance: ScheduledMaintenance = {
            dataPresent: 'No',
            startTime: '',
            startDate: '',
            endTime: '',
            endDate: '',
        };
        mockStore.overrideSelector(getASNBDowntimeScheduledMaintenance, mockScheduledMaintenance);

        service.getASNBScheduledDowntime().subscribe((output) => {
            expect(output).toBeNull();
            done();
        });
    });

    it('should return the correct scheduled downtime info for ongoing downtime', (done) => {
        Date.now = jest.fn(() => new Date('2023-01-01T13:00:00.000+08:00').getTime());
        const mockScheduledMaintenance: ScheduledMaintenance = {
            dataPresent: 'Yes',
            startTime: '12:00:00',
            startDate: '2023-01-01',
            endTime: '14:00:00',
            endDate: '2023-01-01',
        };
        mockStore.overrideSelector(getASNBDowntimeScheduledMaintenance, mockScheduledMaintenance);

        const expectedDownTimeInfo: ASNBScheduledDowntimeInfo = {
            scheduledMaintenance: mockScheduledMaintenance,
            maintenanceStartTime: '12:00:00 PM',
            maintenanceEndTime: '2:00:00 PM',
            hasScheduledMaintenance: true,
        };

        service.getASNBScheduledDowntime().subscribe((output) => {
            expect(output).toEqual(expectedDownTimeInfo);
            done();
        });
    });

    it('should return the correct scheduled downtime info for future downtime', (done) => {
        Date.now = jest.fn(() => new Date('2023-01-01T12:00:00.000+08:00').getTime());
        const mockScheduledMaintenance: ScheduledMaintenance = {
            dataPresent: 'Yes',
            startTime: '13:00:00',
            startDate: '2023-01-01',
            endTime: '14:00:00',
            endDate: '2023-01-01',
        };
        mockStore.overrideSelector(getASNBDowntimeScheduledMaintenance, mockScheduledMaintenance);

        const expectedDownTimeInfo: ASNBScheduledDowntimeInfo = {
            scheduledMaintenance: mockScheduledMaintenance,
            maintenanceStartTime: '1:00:00 PM',
            maintenanceEndTime: '2:00:00 PM',
            hasScheduledMaintenance: false,
        };

        service.getASNBScheduledDowntime().subscribe((output) => {
            expect(output).toEqual(expectedDownTimeInfo);
            done();
        });
    });
});
