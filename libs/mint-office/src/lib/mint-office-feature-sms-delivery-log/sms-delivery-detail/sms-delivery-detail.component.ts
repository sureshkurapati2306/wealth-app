import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as SmsDeliveryLogSelectors from '../+state/sms-delivery-log.selectors';
import * as MintOfficeActions from '../../core/+state/mint-office.actions';

import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../mint-office-ui-dialog/dialog-message/dialog-message.component';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cimb-office-sms-delivery-detail',
  templateUrl: './sms-delivery-detail.component.html',
  styleUrls: ['./sms-delivery-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsDeliveryDetailComponent implements OnInit, OnDestroy {
  
  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'SMS Delivery Log',
      url: '/sms-delivery-log'
    }
  ];

  smsRecord$: Observable<any>;
  smsRecord: any;

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.smsRecord = {
      contactNumber: null,
      clientId: null,
      utAccountNo: null,
      smsContent: null

    }
  
    this.store.dispatch(MintOfficeActions.updateCimbFooterClass({
      className: 'with-cta'
    }));

    this.smsRecord$ = this.store.select(SmsDeliveryLogSelectors.selectSelectedData)
    .pipe(
          tap(data => {
            this.smsRecord = data;
          }));
  
    this.smsRecord$.subscribe();
  }

  openGenericDialog() {
    this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'Cancel transaction',
        description: '<p>Please provide comments for your action.</p>',
      },
    });
  }

  ngOnDestroy() {
    this.store.dispatch(MintOfficeActions.updateCimbFooterClass({
      className: ''
    }));
  }
  
}
