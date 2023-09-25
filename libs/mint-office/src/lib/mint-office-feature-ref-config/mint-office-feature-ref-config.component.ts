import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { UnitTrustTransaction, RefConfigSearchFields } from '../core/models/unit-trust-transactions.model';
import * as UnitTrustTransactionsActions from './+state/ref-config.actions';
import * as UnitTrustTransactionsSelectors from './+state/ref-config.selectors';

@Component({
  selector: 'cimb-office-mint-office-feature-ref-config',
  templateUrl: './mint-office-feature-ref-config.component.html',
  styleUrls: ['./mint-office-feature-ref-config.component.scss']
})
export class MintOfficeFeatureRefConfigComponent implements OnInit {

  titleHeader: string;

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'Ref Config',
      url: null
    }
  ];

  genericUtDisplayedColumns: string[] = ['Config Id', 'Config Name', 'Config Value', 'action'];
  switchingUtDisplayedColumns: string[] = ['Config Id', 'Config Name', 'Config Value', 'action'];

  utPurchaseRecords$: Observable<UnitTrustTransaction[]>;
  utPurchaseRecords: any[];
  tabName = 'Purchase';
  isSmsPage = false;
  searchData: RefConfigSearchFields;

  constructor(private store: Store,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.titleHeader = 'Ref Config Table';
    this.utPurchaseRecords$ = this.store.select(UnitTrustTransactionsSelectors.selectUTPurchasingTransactions);
    this.utPurchaseRecords$.subscribe((result) => {
      if (Array.isArray(result))
        this.utPurchaseRecords = result.filter((val) => {
          return (val['configId'] == this.searchData.configId || this.searchData.configId == null || this.searchData.configId == '') &&
            (val['configName'] == this.searchData.configName || this.searchData.configName == null || this.searchData.configName == '') &&
            (val['configValue'] == this.searchData.configValue || this.searchData.configValue == null || this.searchData.configValue == '')
        })
      this.ref.detectChanges();
    });
  }

  search(searchParams: RefConfigSearchFields) {
    this.searchData = searchParams;
    this.store.dispatch(UnitTrustTransactionsActions.loadRefConfig(
    ));

  }

  clear() {
    this.utPurchaseRecords = []
  }
}
