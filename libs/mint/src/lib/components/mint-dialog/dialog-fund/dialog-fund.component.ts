import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';
import * as availableFundsSelector from '../../../../../../../apps/self-serve/src/app/modules/available-funds/+state/available-funds.selectors'
import {
  fundPerHistory
} from '../../../../../../../apps/self-serve/src/app/modules/available-funds/+state/available-funds.actions';
import { FundPerfHistory } from '../../../../../../../apps/self-serve/src/app/modules/available-funds/models/fund-performance-history.model'
import * as AvailableFundsAction from '../../../../../../../apps/self-serve/src/app/core/state/availableFunds/availableFunds.action';
import { DialogAlertComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-alert/dialog-alert.component';

export class DocumentDownloadParams {
  msUrl: any;
  documentName: any;
}
export class Documents {
  name: string;
  url: string;
}
@Component({
  selector: 'cimb-dialog-fund',
  templateUrl: './dialog-fund.component.html',
  styleUrls: ['./dialog-fund.component.scss']
})

export class DialogFundComponent implements OnInit, OnDestroy {
  pastFundPerfHistory: FundPerfHistory;
  documentDownloaded: boolean;
  showLoader: any;
  docName: any;
  isDialogPopUpOpened: boolean;
  getDocumentDownloadObservable: Observable<any>;
  getDocumentDownloadSubscription: Subscription;
  documentNames: Array<Documents> = [];
  assetType: any;
  salesCharge: any;
  compliance = 'Yes';
  disclaimer = 'Disclaimer: © 2020 Morningstar. All Rights Reserved. The information, data, analyses and opinions (“Information”) contained herein: (1) include the proprietary information of Morningstar and its content providers; (2) may not be copied or redistributed except as specifically authorised; (3) do not constitute investment advice; (4) are provided solely for informational purposes; (5) are not warranted to be complete, accurate or timely; and (6) may be drawn from fund data published on various dates. Morningstar is not responsible for any trading decisions, damages or other losses related to the Information or its use. Please verify all of the Information before using it and don’t make any investment decision except upon the advice of a professional financial adviser. Past performance is no guarantee of future results. The value and income derived from investments may go down as well as up.';
  price: any;
  past1Mnth: any;
  past3Mnth: any;
  addClass = "on-dialog";
  fundTitle: any;
  fundLabel: any;
  fundLabelClass: any;
  selectedFund: any
  fundDetailSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<DialogFundComponent>,
    private store: Store<fromStore.AppState>,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.data){
    this.selectedFund = this.data?.switchfundList;
    this.assetType = this.data?.switchfundList.class_name;
    this.salesCharge = this.data?.switchfundList.sales_charge;
    this.price = this.data?.switchfundList.nav_price;
    this.fundTitle = this.data?.switchfundList.fund_name;
    this.fundLabel = this.data?.switchfundList.class_name;
    this.fundLabelClass = this.data?.switchfundList.class_name.toLowerCase().replace(/\s+/g, '-'); // 'cash','local-equity','regional-equity','global-equity'
    this.fundDetailSub = this.data?.switchfundList.fundDetailSub;
    this.switchfundPerfHistory();
    this.populateFundDocumentNames()
  }
  }

  switchfundPerfHistory() {
    this.store.dispatch(fundPerHistory({ fundCode: this.data.switchfundList.fund_code }));
    this.store.select(availableFundsSelector.getFundPerHistory)
      .subscribe((result) => {
        if (result) {
          this.pastFundPerfHistory = result;
          this.past1Mnth = this.pastFundPerfHistory['thirtyDaysNavPriceHistory'];
          this.past3Mnth = this.pastFundPerfHistory['ninetyDaysNavPriceHistory'];
        }
      });
  }

  switchFundDocumentDownload(documentName): boolean {
    this.documentDownloaded = false;
    this.showLoader = true;
    const documentDownloadParams = new DocumentDownloadParams();
    this.docName = documentName;
    if (documentName != undefined) {
      if (
        this.selectedFund != undefined &&
        this.selectedFund.fund_document != undefined &&
        this.selectedFund.fund_document.length > 0
      ) {
        for (const docNameValue of this.selectedFund.fund_document) {
          if (this.docName == docNameValue.documentName) {
            documentDownloadParams.msUrl = docNameValue.msUrl
            documentDownloadParams.documentName = docNameValue.documentName;
          }
        }
      }
      this.downloadDocumentStatusCheck(documentDownloadParams, documentName);
    }
    this.store.dispatch(new AvailableFundsAction.GetDocument(documentDownloadParams));
    return true;
  }

  downloadDocumentStatusCheck(documentDownloadParams:any, documentName: any){
    this.store.dispatch(new AvailableFundsAction.StoreDocument(null));
      this.isDialogPopUpOpened = false;
      this.getDocumentDownloadObservable = this.store.select('availableFundsReducer');
      this.getDocumentDownloadSubscription = this.getDocumentDownloadObservable.subscribe(
        (data) => {
          if (
            data != undefined &&
            data.downloadedDocument != undefined &&
            data.downloadedDocument.status == '404' &&
            !this.isDialogPopUpOpened
          ) {
            this.isDialogPopUpOpened = true;
            this.alertOnErrorDocumentDownload()
          }
          this.switchFundDownloadDocumentCalc(data ,documentDownloadParams , documentName);
      });
  }
  switchFundDownloadDocumentCalc(data:any, documentDownloadParams:any, documentName:any ) {
    if (data != undefined && data.downloadedDocument != undefined) {
      if (data.downloadedDocument.status == undefined) {
        this.showLoader = false;
        if (
          documentDownloadParams.documentName == this.docName &&
          !this.documentDownloaded
        ) {
          this.documentDownloaded = true;
          this.switchFundDownloadDocument(data, documentName);
        }
      } else {
        this.showLoader = false;
      }
    }
  }

  switchFundDownloadDocument(data, documentName): boolean {
    if (data != undefined && data.downloadedDocument != undefined && documentName != '') {
      const response = data.downloadedDocument;
      const a = document.createElement('a');
      const file = new Blob([response], { type: 'application/pdf' });
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = documentName + '.pdf';
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    }
    return true;
  }

  populateFundDocumentNames() {
    if (
      this.selectedFund != undefined &&
      this.selectedFund.fund_document != undefined &&
      this.selectedFund.fund_document.length > 0
    ) {

      for (const newDocName of this.selectedFund.fund_document) {
        const document = new Documents();
        document.name = newDocName.documentName;
        document.url = newDocName.msUrl;
        this.documentNames.push(document)
      }
    }
  }

  alertOnErrorDocumentDownload() {
    this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-warning">',
        dialogHeading: 'Download Failed',
        dialogContent:
          '<p>Sorry this file appears to be missing. Please try again later or reach out <br/> to our customer support.</p>',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Okay',
      }
    });
  }

  ngOnDestroy(): void {
    this.fundDetailSub?.unsubscribe();
  }
}
