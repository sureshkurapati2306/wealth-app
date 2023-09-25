import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { CustomerActivityLog } from '../../../core/models/customer-activity.model';
import { Customer } from '../../../core/models/customer.model';
import * as UtActivityActions from '../../+state/ut-activity.actions';

@Component({
  selector: 'cimb-office-activity-log-table',
  templateUrl: './activity-log-table.component.html',
  styleUrls: ['./activity-log-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ActivityLogTableComponent {

  constructor(
    private store: Store
  ) { }

  logRows: CustomerActivityLog[] = [];

  loadingState = '';

  dataSource = new MatTableDataSource<CustomerActivityLog>(this.logRows);
  
  columnsToDisplay: string[] = ['position', 'dateTime', 'module', 'event', 'channel', 'status'];

  expandedRow: CustomerActivityLog | null;

  statusLabels = {
    S: 'Successful',
    U: 'Unsuccessful',
    F: 'Failed'
  };

  @Input() set dataSourceRows(data: CustomerActivityLog[]) {
    this.logRows = data;
    this.dataSource = new MatTableDataSource<CustomerActivityLog>(this.logRows);
  }
  @Input() set getLoadingState(data: string) {
    this.loadingState = data;
  }
  @Input() hasSearched = false;
  @Input() customer: Customer;

  clickRow(rowData: CustomerActivityLog): void {
    if (rowData?.eventId === 11) {
      this.store.dispatch(UtActivityActions.loadUtActivitySMSDelivery({
        referenceNo: rowData.referenceNo
      }));
    } else if(rowData?.eventId === 5 || rowData?.eventId === 6 || rowData?.eventId === 7) {
      this.store.dispatch(UtActivityActions.loadUtActivity({
        referenceNo: rowData.referenceNo
      }));
    } else {
      this.store.dispatch(UtActivityActions.resetUtActicity());
    }
  }

}
