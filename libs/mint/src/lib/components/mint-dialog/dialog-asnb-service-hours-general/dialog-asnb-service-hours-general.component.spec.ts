import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAsnbServiceHoursGeneralComponent } from './dialog-asnb-service-hours-general.component';
import { operationHourResponse } from 'apps/self-serve/src/app/modules/asnb/models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DialogAsnbServiceHoursGeneralComponent', () => {
    let component: DialogAsnbServiceHoursGeneralComponent;
    let fixture: ComponentFixture<DialogAsnbServiceHoursGeneralComponent>;

    const mockOperationHours: operationHourResponse = {
        startTime: '00:00',
        endTime: '23:59',
    };
    const expectedOperationHours: operationHourResponse = {
        startTime: '12:00AM',
        endTime: '11:59PM',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogAsnbServiceHoursGeneralComponent],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: mockOperationHours }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogAsnbServiceHoursGeneralComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set operationHours correctly on ngOnInit', () => {
        component.ngOnInit();

        expect(component.operationHours).toEqual(expectedOperationHours);
    });

    it('should return invalid output when convertTime is called with invalid input', () => {
        component.operationHours.startTime = component.convertTime('Test');

        expect(component.operationHours.startTime).toEqual('Invalid time format');
    });
});
