import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { State } from '../../+state/activity-log.reducer';
import { CustomerActivityLog } from '../../../core/models/customer-activity.model';
import { CustomerActivityLogComponent } from './customer-activity-log.component';

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

describe('CustomerActivityLogComponent', () => {
  let component: CustomerActivityLogComponent;
  let fixture: ComponentFixture<CustomerActivityLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerActivityLogComponent ],
      providers: [
        provideMockStore({ initialState: mockState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search', () => {
    expect(component.search({
      startDate: null,
      endDate: null,
      modules: [],
      channels: []
    })).toBeUndefined();
  });
});
