import { SelectionModel } from '@angular/cdk/collections';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RefConfigAction from 'libs/mint-office/src/lib/mint-office-feature-ref-config/+state/ref-config.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogPromptComponent } from '../../mint-office-ui-dialog/dialog-prompt/dialog-prompt.component';
import * as UnitTrustTransactionsActions from '../+state/ref-config.actions';

@Component({
  selector: 'cimb-office-ref-config-list-table',
  templateUrl: './ref-config-list-table.component.html',
  styleUrls: ['./ref-config-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RefConfigListTableComponent implements OnInit {

  constructor(
    private router: Router,
    private eventService: EventService,
    private store: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  utRows: any[] = [];

  loadingState = '';

  dataSource = new MatTableDataSource<any>(this.utRows);

  selection = new SelectionModel<any>(true, []);

  expandedRow: any | null;

  clickableCheckboxRows: any[];


  @Input() displayedColumns: string[] = [];
  @Input() expandedDetail: 'expandedDetailDefaultUtTransactions' | 'expandedDetailSwitchingUtTransactions' | 'expandedDetailSmsDeliveryLog' | 'expandedDetailRefConfig' = 'expandedDetailDefaultUtTransactions';
  @Input() set dataSourceRows(data: any[]) {
    this.utRows = data;
    this.dataSource = new MatTableDataSource<any>(this.utRows);
  }

  hasSearched = true;

  @Input() isSMSPage: boolean;

  @Output() cancelTransactions = new EventEmitter<any[]>();

  @Input() tabName: string;

  eventSubscription$: Subscription;


  ngOnInit() {
    this.expandedDetail = 'expandedDetailRefConfig';
    this.hasSearched = true;
    this.loadingState = 'success';

  }

  goToDetailPage(row: UnitTrustTransaction) {
    this.router.navigate(['unit-trust-transactions', 'detail', row.transId]);

  }

  deleteRefConfig(item) {
    const currentId = item.configId;

    const dialogRef = this.dialog.open(DialogPromptComponent, {
      panelClass: 'custom-dialog',
      maxWidth: '520px',
      autoFocus: false,
      data: {
        title: 'Delete Ref Log?',
        icon: 'icon-danger-1',
        description: 'This will remove the ref log immediately and you can’t undo this action.',
        btnCancelLabel: 'Cancel',
        btnOkLabel: 'Delete'
      }
    });

    //subscribe to modal once button is clicked
    dialogRef.afterClosed().subscribe((result) => {
      /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
      if (result.result === 'ok') {
        this.store.dispatch(UnitTrustTransactionsActions.deleteRefConfig({ deleteItem: currentId }))
      }
    })
  }


  editRefConfig(row) {
    console.log(row)
    this.store.dispatch(
      RefConfigAction.openRefConfig({ editItem: row }));
    this.router.navigate(['edit-ref-config'], { relativeTo: this.route });
  }


}
