import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UtActivitySelectors from '../../+state/ut-activity.selectors';
import { CustomerActivityLog, SmsDeliveryLog, UnitTrustActivity } from '../../../core/models/customer-activity.model';

@Component({
  selector: 'cimb-office-activity-log-table-sub',
  templateUrl: './activity-log-table-sub.component.html',
  styleUrls: ['./activity-log-table-sub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityLogTableSubComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  @Input() row: CustomerActivityLog = null;

  utActivityRecord$: Observable<UnitTrustActivity[]>;
  smsDeliveryLogRecord$: Observable<SmsDeliveryLog[]>;
  loadingState$: Observable<string>;

  ngOnInit(): void {

    this.utActivityRecord$ = this.store.select(UtActivitySelectors.selectUtActivityRecord(this.row?.referenceNo));

    this.smsDeliveryLogRecord$ = this.store.select(UtActivitySelectors.selectSMSDeliveryLogRecord());

    this.loadingState$ = this.store.select(UtActivitySelectors.selectLoadUtActivityLoading);
    
  }

}
