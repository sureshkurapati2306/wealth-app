import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { AsnbDowntimeMaintenanceComponent } from './asnb-downtime-maintenance.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ScheduledMaintenance } from '../../models';
import { getASNBDowntimeScheduledMaintenance } from '../../+state/asnb.selectors';

describe('AsnbDowntimeMaintenanceComponent', () => {
    let component: AsnbDowntimeMaintenanceComponent;
    let fixture: ComponentFixture<AsnbDowntimeMaintenanceComponent>;
    let mockStore: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            declarations: [AsnbDowntimeMaintenanceComponent],
            providers: [provideMockStore()],
        }).compileComponents();

        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbDowntimeMaintenanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update properties when getASNBDowntimeScheduledMaintenance is called with data', () => {
        const mockScheduledMaintenance: ScheduledMaintenance = {
            dataPresent: 'Yes',
            startTime: '13:43:13',
            startDate: '2023-08-16',
            endTime: '14:30:13',
            endDate: '2023-08-16',
        };
        mockStore.overrideSelector(getASNBDowntimeScheduledMaintenance, mockScheduledMaintenance);

        component.getASNBDowntimeScheduledMaintenance();

        expect(component.scheduledMaintenance).toEqual(mockScheduledMaintenance);
        expect(component.maintenanceStartTime).toEqual('01:43 PM');
        expect(component.maintenanceEndTime).toEqual('02:30 PM');
    });
});
