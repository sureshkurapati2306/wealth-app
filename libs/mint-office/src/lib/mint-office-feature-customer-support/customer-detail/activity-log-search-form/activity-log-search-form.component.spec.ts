import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

import { ActivityLogSearchFormComponent } from './activity-log-search-form.component';
import { State } from '../../+state/activity-log.reducer';
import { CustomerActivityLog } from '../../../core/models/customer-activity.model';

const mockData: CustomerActivityLog[] = [
  {
    "auditId": 733,
    "clientId": "NA",
    "mobileNo": "NA",
    "auditDate": "2022-01-24T00:06:10.000+00:00",
    "otp": "NA",
    "referenceNo": "1006043-01",
    "moduleName": "Risk Profile",
    "eventName": "Risk Profile with Audit",
    "channelName": "Web Browser",
    "statusInd": "S",
    "browserName": "Chrome",
    "osVersion": "Win10",
    "ipAddress": "12.1.2.1",
    "statusRemark": null
  },
  {
      "auditId": 739,
      "clientId": "NA",
      "mobileNo": "NA",
      "auditDate": "2022-01-25T00:03:42.000+00:00",
      "otp": "NA",
      "referenceNo": "NA",
      "moduleName": "Risk Profile",
      "eventName": "Risk Profile with Audit",
      "channelName": "Web Browser",
      "statusInd": "S",
      "browserName": "Chrome",
      "osVersion": "Win10",
      "ipAddress": "12.1.2.1",
      "statusRemark": null
  }
];

const mockState: State = {
  entities: mockData,
  hasSearched: false,
  searchQuery: {
    startDate: null,
    endDate: null,
    modules: [],
    channels: []
  },
  status: 'pending',
  error: ''
};

describe('ActivityLogSearchFormComponent', () => {
  let component: ActivityLogSearchFormComponent;
  let fixture: ComponentFixture<ActivityLogSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityLogSearchFormComponent ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState: mockState }),
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {
    const ev = new Event('click');
    expect(component.submit(ev)).toBeUndefined();
  }));
  
  it('should clear', () => {
    expect(component.clear()).toBeUndefined();
  });

});
