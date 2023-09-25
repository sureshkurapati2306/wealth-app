import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UnitTrustRejectionFields, UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';
import * as UnitTrustTransactionsActions from '../+state/unit-trust-transactions.actions';
import * as UnitTrustTransactionsSelectors from '../+state/unit-trust-transactions.selectors';
import * as MintOfficeActions from '../../core/+state/mint-office.actions';

import { SnackBarService } from '../../core/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPromptCommentComponent } from '../../mint-office-ui-dialog/dialog-prompt-comment/dialog-prompt-comment.component';
import { DialogMessageComponent } from '../../mint-office-ui-dialog/dialog-message/dialog-message.component';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { filter, tap } from 'rxjs/operators';
import { LocalDateToUtcPipe } from '../../core/pipes/local-date-to-utc.pipe';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'cimb-office-unit-trust-detail',
  templateUrl: './unit-trust-detail.component.html',
  styleUrls: ['./unit-trust-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitTrustDetailComponent implements OnInit, OnDestroy {
  
  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'Unit Trust Transactions',
      url: '/unit-trust-transactions'
    }
  ];

  utRecord$: Observable<UnitTrustTransaction>;
  utRecord: UnitTrustTransaction;
  cancelButtonDisabled = true;
  cancelUtFailureSubscription: Subscription;
  cancelUtSuccessSubscription: Subscription;
  
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    private localDateToUtcPipe: LocalDateToUtcPipe,
    private actions$: Actions, 
  ) { }

  ngOnInit(): void {
    
    const transId =  this.route.snapshot.params.id;

    this.store.dispatch(UnitTrustTransactionsActions.loadUnitTrustTransactionDetail({
      transId: parseInt(transId)
    }));

    //add class to cimb-footer to increase footer margin
    this.store.dispatch(MintOfficeActions.updateCimbFooterClass({
      className: 'with-cta'
    }));

    this.utRecord$ = this.store.select(UnitTrustTransactionsSelectors.selectUnitTrustDetail)
      .pipe(
        filter(data => {
          if(!data) {
            this.router.navigate(['unit-trust-transactions']);
          }
          return !!data;  //!!data will return true if valid and false if invalid or underfined, don't proceed if false
        }),
        tap(data => {

          this.utRecord = data;

          this.breadcrumbsPaths = [
            ...this.breadcrumbsPaths,
            {
              label: `Reference No: ${this.utRecord?.referenceNo}`,
              url: null
            }
          ];

          if(this.utRecord?.transactionStatus == 'Processing' && this.utRecord?.processingStatus == 'N') {
            this.cancelButtonDisabled = false;
          } else {
            this.cancelButtonDisabled = true;
          }

        })
      );

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

  }

  openGenericDialog() {
    this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'Cancel transaction',
        description: '<p>Please provide comments for your action.</p>',
      },
    });
  }

  clickCancelTransaction() {
    
    const dialogRef = this.dialog.open(DialogPromptCommentComponent, {
      panelClass: 'dialog-prompt',
      maxWidth: '520px',
      data: {
        title: 'Cancel transaction',
        description: '<p>Please provide comments for your action.</p>',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.cancelTransaction(result.comments);
      }
    });
    
  }

  cancelTransaction(comments: string) {

    const now = new Date();

    const data: UnitTrustRejectionFields[] = [{
      transId: this.utRecord.transId,
      rejectedDate: this.localDateToUtcPipe.transform(now),
      rejectedRemark: comments,
      rejectedName: 'testing'
    }];

    this.store.dispatch(UnitTrustTransactionsActions.cancelUnitTrustTransactions({
      payload: data
    }));

  }

  ngOnDestroy() {
    this.cancelUtFailureSubscription?.unsubscribe();
    this.cancelUtSuccessSubscription?.unsubscribe();

    //remove class from cimb-footer to reset footer margin
    this.store.dispatch(MintOfficeActions.updateCimbFooterClass({
      className: ''
    }));
  }
  
}
