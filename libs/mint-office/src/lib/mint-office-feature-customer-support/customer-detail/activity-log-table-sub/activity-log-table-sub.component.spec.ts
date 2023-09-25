import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../+state/ut-activity.reducer';
import { CustomerActivityLog, UnitTrustActivity } from '../../../core/models/customer-activity.model';
import * as Selectors from '../../+state/ut-activity.selectors';
import { ActivityLogTableSubComponent } from './activity-log-table-sub.component';

const customerActivityLog: CustomerActivityLog = {
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
};

const mockData: UnitTrustActivity[] = [{
  "referenceNo": "ABC",
  "utAccountNo": "A80091526",
  "fundName": "AMITTIKAL",
  "chargesAmount": 5.00,
  "totalInvestment": 500.00,
  "toFundName": "",
  "transactionUnit": 1000.500000
}];

const mockState: State = {
  referenceNo: null,
  currentEntity: mockData,
  status: 'pending',
  error: ''
};

let mockUtActivityRecord: MemoizedSelector<Record<string, unknown>, UnitTrustActivity[]>;

describe('ActivityLogTableSubComponent', () => {
  let component: ActivityLogTableSubComponent;
  let fixture: ComponentFixture<ActivityLogTableSubComponent>;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityLogTableSubComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState: mockState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    mockUtActivityRecord = store.overrideSelector(
      Selectors.selectUtActivityRecord('ABC'),
      null
    );
    fixture = TestBed.createComponent(ActivityLogTableSubComponent);
    component = fixture.componentInstance;
    component.row = customerActivityLog;
    fixture.detectChanges();
  });

  it('should create', () => {

    mockUtActivityRecord.setResult( mockData );

    store.refreshState();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
  
});
