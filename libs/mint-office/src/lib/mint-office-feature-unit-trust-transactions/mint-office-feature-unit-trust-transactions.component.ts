import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UnitTrustRejectionFields, UnitTrustSearchFields, UnitTrustTransaction } from '../core/models/unit-trust-transactions.model';
import * as UnitTrustTransactionsActions from './+state/unit-trust-transactions.actions';
import * as UnitTrustTransactionsSelectors from './+state/unit-trust-transactions.selectors';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogPromptCommentComponent } from '../mint-office-ui-dialog/dialog-prompt-comment/dialog-prompt-comment.component';
import { LocalDateToUtcPipe } from '../core/pipes/local-date-to-utc.pipe';
import { Actions, ofType } from '@ngrx/effects';
import { SnackBarService } from '../core/services/snack-bar.service';
import { Router } from '@angular/router';
import * as SMSDeliveryLogActions from 'libs/mint-office/src/lib/mint-office-feature-sms-delivery-log/+state/sms-delivery-log.actions';
import * as SMSDeliveryLogSelectors from 'libs/mint-office/src/lib/mint-office-feature-sms-delivery-log/+state/sms-delivery-log.selectors';

@Component({
  selector: 'cimb-office-unit-trust-transactions',
  templateUrl: './mint-office-feature-unit-trust-transactions.component.html',
  styleUrls: ['./mint-office-feature-unit-trust-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MintOfficeFeatureUnitTrustTransactionsComponent implements OnInit, OnDestroy {

  isSmsPage: boolean;
  titleHeader: string;

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'Unit Trust Transactions',
      url: null
    }
  ];

  genericUtDisplayedColumns: string[] = ['checkbox', 'no', 'refNo', 'txnDateTime', 'customerName', 'idNumber', 'fundName', 'utAccNumber', 'status', 'action'];
  switchingUtDisplayedColumns: string[] = ['checkbox', 'no', 'refNo', 'txnDateTime', 'customerName', 'idNumber', 'switchOutFund', 'switchInFund', 'utAccNumber', 'status', 'action'];

  utPurchaseRecords$: Observable<UnitTrustTransaction[]>;
  utRedemptionRecords$: Observable<UnitTrustTransaction[]>;
  utSwitchingRecords$: Observable<UnitTrustTransaction[]>;
  utLoadingState$: Observable<string>;
  utHasSearched$: Observable<boolean>;
  utSearchQuery$: Observable<UnitTrustSearchFields>;
  smsPurchaseRecords$: Observable<any[]>;
  smsRedemptionRecords$: Observable<any[]>;
  smsSwitchingRecords$: Observable<any[]>;

  cancelUtFailureSubscription: Subscription;
  cancelUtSuccessSubscription: Subscription;

  tabName = 'Purchase';

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private localDateToUtcPipe: LocalDateToUtcPipe,
    private actions$: Actions,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit() {

    this.utPurchaseRecords$ = this.store.select(UnitTrustTransactionsSelectors.selectUTPurchasingTransactions);
    this.utRedemptionRecords$ = this.store.select(UnitTrustTransactionsSelectors.selectUTRedemptionTransactions);
    this.utSwitchingRecords$ = this.store.select(UnitTrustTransactionsSelectors.selectUTSwitchingTransactions);

    this.utLoadingState$ = this.store.select(UnitTrustTransactionsSelectors.selectLoadUTLoading);
    this.utHasSearched$ = this.store.select(UnitTrustTransactionsSelectors.selectUTHasSearched);

    this.utSearchQuery$ = this.store.select(UnitTrustTransactionsSelectors.selectUTSearchQuery);

    this.cancelUtFailureSubscription = this.actions$
      .pipe(
        ofType(UnitTrustTransactionsActions.cancelUnitTrustTransactionsFailure),
      ).subscribe(data => {
        this.snackBarService.openSnackbar(data.error, 10000, 'warning');
      });

    this.cancelUtSuccessSubscription = this.actions$
      .pipe(
        ofType(UnitTrustTransactionsActions.cancelUnitTrustTransactionsSuccess),
      ).subscribe(() => {
        this.snackBarService.openSnackbar('You have cancelled this transaction successfully', 10000, 'success');
      });
    this.isSmsPage = this.router.url === '/sms-delivery-log' ? true : false;
    if (this.isSmsPage) {
      this.utPurchaseRecords$ = this.store.select(SMSDeliveryLogSelectors.selectSmsPurchasingTransactions);
      this.utRedemptionRecords$ = this.store.select(SMSDeliveryLogSelectors.selectSmsRedemptionTransactions);
      this.utSwitchingRecords$ = this.store.select(SMSDeliveryLogSelectors.selectSmsSwitchingTransactions);
      this.utHasSearched$ = this.store.select(SMSDeliveryLogSelectors.selectUTHasSearched);
      this.utLoadingState$ = this.store.select(SMSDeliveryLogSelectors.selectLoadSmsLoading);
      this.utHasSearched$.subscribe((result) => { console.log(result) })
      this.breadcrumbsPaths[0].label = 'SMS Delivery Log'
      this.titleHeader = "SMS Delivery Log"
      this.genericUtDisplayedColumns = ['checkbox', 'no', 'deliveryDateTime', 'idNumber', 'utAccNumber', 'smsDeliveryStatus', 'action'];
      this.switchingUtDisplayedColumns = ['checkbox', 'no', 'deliveryDateTime', 'idNumber', 'utAccNumber', 'smsDeliveryStatus', 'action'];
    }
    else {
      this.titleHeader = "Unit Trust Transactions"
    }


  }

  search(searchParams: UnitTrustSearchFields) {
    if (!this.isSmsPage) {
      this.store.dispatch(UnitTrustTransactionsActions.loadUnitTrustTransactions(
        { searchParams: searchParams }
      ));
    }
    if (this.isSmsPage) {
      this.store.dispatch(SMSDeliveryLogActions.loadSmsTransactions(
        { searchParams: searchParams }
      ));
    }

  }

  clear() {
    if (this.isSmsPage) {
      this.store.dispatch(SMSDeliveryLogActions.resetSmsDelivery());
    }
    else {
      this.store.dispatch(UnitTrustTransactionsActions.resetUnitTrustTransactions());
    }
  }

  clickCancelTransactions(rows: UnitTrustTransaction[]) {
    
    const dialogRef = this.dialog.open(DialogPromptCommentComponent, {
      panelClass: 'dialog-prompt',
      maxWidth: '520px',
      data: {
        title: 'Cancel transactions',
        description: '<p>Please provide comments for your action.</p>',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelTransactions(rows, result.comments);
      }
    });

  }

  cancelTransactions(rows: UnitTrustTransaction[], comments: string) {

    const now = new Date();

    const data: UnitTrustRejectionFields[] = rows.map(item => {
      return {
        transId: item.transId,
        rejectedDate: this.localDateToUtcPipe.transform(now),
        rejectedRemark: comments,
        rejectedName: 'testing'
      }
    });

    this.store.dispatch(UnitTrustTransactionsActions.cancelUnitTrustTransactions({
      payload: data
    }));

  }
  tabChanged(event) {

    switch (event.index) {
      case 1: {
        this.tabName = 'Redemption';
        break;
      }
      case 2: {
        this.tabName = 'Switching';
        break;
      }
      default: {
        this.tabName = 'Purchase';
        break;
      }
    }
  }

  ngOnDestroy() {
    this.cancelUtFailureSubscription?.unsubscribe();
    this.cancelUtSuccessSubscription?.unsubscribe();
  }

}
