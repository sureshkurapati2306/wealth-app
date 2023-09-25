import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideMockStore } from '@ngrx/store/testing';
import { State } from '../../+state/activity-log.reducer';
import { CustomerActivityLog } from '../../../core/models/customer-activity.model';
import { TablePaginatorComponent } from '../../../mint-office-ui-paginator/table-paginator/table-paginator.component';
import { ActivityLogTableComponent } from './activity-log-table.component';

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

export const mockState: State = {
  entities: mockData,
  hasSearched: true,
  searchQuery: {
    startDate: new Date(2022, 0, 1),
    endDate: new Date(2022, 4, 31),
    modules: ['Purchase', 'Risk Profile'],
    channels: []
  },
  status: 'success',
  error: ''
};

describe('ActivityLogTableComponent', () => {
  let component: ActivityLogTableComponent;
  let fixture: ComponentFixture<ActivityLogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityLogTableComponent, TablePaginatorComponent ],
      imports: [
        MatPaginatorModule
      ],
      providers: [
        provideMockStore({ initialState: mockState }),
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogTableComponent);
    component = fixture.componentInstance;
    component.dataSourceRows = mockData;
    component.getLoadingState = 'success';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clickRow', () => {
    expect(component.clickRow(mockData[0])).toBeUndefined();
  });
  
});
