import {  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
export class PurchaseDetail {
  transId: string;
  fundName: string;
  transactionDt : string
  displayFlag : boolean
}

@Component({
  selector: 'cimb-list-transaction-history',
  templateUrl: './list-transaction-history.component.html',
  styleUrls: ['./list-transaction-history.component.scss'],
})

export class ListTransactionHistoryComponent implements OnChanges{

  @Input() purchaseDetailData;
  @Input() selectedUnittrustAccountNumber;
  @Input() selectedAccount;
  @Input() currentPageNumber = 1;
  @Input() itemsPerPage = 10;

  @Output() isEmptyTransactionHistory = new EventEmitter<boolean>();
  

  purchaseDetailDataAllStatus : any;
  selectedAccountNumber : any;
  isFilteredFundsNotAvailable = true;
  isFilerByStatusFundsNotAvailable : boolean;
  isSortBySuccessfulStatus : boolean;
  isSortByUnsuccessfulStatus : boolean;
  isSortByProcessingStatus : boolean;
  isSortByCancelStatus : boolean;
  isSortByAllStatus : boolean;
  

  isSortBySuccessfulClicked : boolean;
  isSortByUnSuccessfulClicked : boolean;
  isSortByProcessingClicked : boolean;
  isSortByCancelClicked: boolean
  isSortByAllStatusClicked : boolean;
  stopSpinnerWhenNoData = true

  @Input() isTransactionDataLoaded = false;

  ngOnChanges(changes: SimpleChanges) {

    if(this.selectedUnittrustAccountNumber == undefined) {
      this.selectedAccountNumber = this.selectedAccount
    } else {
      this.selectedAccountNumber = this.selectedUnittrustAccountNumber
        this.isSortBySuccessfulStatus = false;
        this.isSortByUnsuccessfulStatus = false;
        this.isSortByProcessingStatus = false;
        this.isSortByCancelStatus =false;
        this.isSortByAllStatus = true;

        this.isSortBySuccessfulClicked = false;
        this.isSortByUnSuccessfulClicked = false;
        this.isSortByProcessingClicked = false;
        this.isSortByCancelClicked =false;
        this.isSortByAllStatusClicked = false;
    }

    if(changes.purchaseDetailData != undefined && this.selectedUnittrustAccountNumber == undefined) {
    
      this.purchaseDetailData = changes.purchaseDetailData.currentValue;
      this.purchaseDetailDataAllStatus = changes.purchaseDetailData.currentValue;

    }
    //default filter by account number selected
    if(this.purchaseDetailData != undefined) {
         this.filterByUnitTrustAccountNumber(this.purchaseDetailDataAllStatus);
    } 
    if (!this.purchaseDetailData){
      this.stopSpinnerWhenNoData = false; 
      this.isTransactionDataLoaded = false;
    }
    if(this.isFilteredFundsNotAvailable) {
      this.isSortByAllStatus = false
    } else {
      this.isSortByAllStatus = true
    }

    this.isEmptyTransactionHistory.emit(this.isFilteredFundsNotAvailable);
  }

  filterByUnitTrustAccountNumber(dataToFilterOnUnitTrustAccNo) {
    const purchseDetailfilterdByAccNo : any =[];

    //Check whether funds available after filter by status, so to show Filer by status tab
    if(dataToFilterOnUnitTrustAccNo.length == 0) {
      this.isFilerByStatusFundsNotAvailable = true
    } else {
      this.isFilerByStatusFundsNotAvailable = false
    }

      if(dataToFilterOnUnitTrustAccNo != undefined && dataToFilterOnUnitTrustAccNo.length >0)
      for(let i=0;i<dataToFilterOnUnitTrustAccNo.length; i++) {
        if(dataToFilterOnUnitTrustAccNo[i].utAccountNo === this.selectedAccountNumber) {
          purchseDetailfilterdByAccNo.push(dataToFilterOnUnitTrustAccNo[i])
        }
      }
      if(purchseDetailfilterdByAccNo.length == 0) {
        this.isFilteredFundsNotAvailable = true;
      } else {
        this.isFilteredFundsNotAvailable = false;
        this.isTransactionDataLoaded = false;
      }
      this.populateDisplayFlagForPurchaseDetail(purchseDetailfilterdByAccNo)
  }

  sortBySuccessfulStatus() {
    this.isSortBySuccessfulStatus = true;
    this.isSortByUnsuccessfulStatus = false;
    this.isSortByProcessingStatus = false;
    this.isSortByCancelStatus = false;
    this.isSortByAllStatus = false;

    const purchseDetailSuccessfulData : any =[];
    for(let i=0;i<this.purchaseDetailDataAllStatus.length; i++) {
      if(this.purchaseDetailDataAllStatus[i].transactionStatus === 'Successful') {
        purchseDetailSuccessfulData.push(this.purchaseDetailDataAllStatus[i])
      }
    }

    //Check whether there are filtered funds based on status are there,
    //Once sorted filter by unit trust account number
    if(purchseDetailSuccessfulData.length == 0) {
      this.isFilerByStatusFundsNotAvailable = true;
      this.isFilteredFundsNotAvailable = true;
      this.populateDisplayFlagForPurchaseDetail(purchseDetailSuccessfulData)
    } else {
      this.isFilerByStatusFundsNotAvailable = false;
      this.filterByUnitTrustAccountNumber(purchseDetailSuccessfulData)
    }
  }

  sortByAllUnsuccessfulStatus() {
    this.isSortByUnsuccessfulStatus = true;
    this.isSortBySuccessfulStatus = false;
    this.isSortByProcessingStatus = false;
    this.isSortByCancelStatus = false;
    this.isSortByAllStatus = false;

    const purchseDetailUnsuccessfulData : any =[];
    for(let i=0;i<this.purchaseDetailDataAllStatus.length; i++) {
       if(this.purchaseDetailDataAllStatus[i].transactionStatus === 'Unsuccessful') {
        purchseDetailUnsuccessfulData.push(this.purchaseDetailDataAllStatus[i])
      }
    }

    //Check whether there are filtered funds based on status are there,
    //Once sorted filter by unit trust account number
    if(purchseDetailUnsuccessfulData.length == 0) {
      this.isFilerByStatusFundsNotAvailable = true;
      this.isFilteredFundsNotAvailable = true;
      this.populateDisplayFlagForPurchaseDetail(purchseDetailUnsuccessfulData)
    } else {
      this.isFilerByStatusFundsNotAvailable = false;
      this.filterByUnitTrustAccountNumber(purchseDetailUnsuccessfulData)
    }
  }

  sortByCancelStatus() {
    this.isSortByCancelStatus = true;
    this.isSortByUnsuccessfulStatus = false;
    this.isSortBySuccessfulStatus = false;
    this.isSortByProcessingStatus = false;
    this.isSortByAllStatus = false;

    const purchseDetailCancelData : any =[];
    for(let i=0;i<this.purchaseDetailDataAllStatus.length; i++) {
       if(this.purchaseDetailDataAllStatus[i].transactionStatus === 'Cancelled' ) {
            purchseDetailCancelData.push(this.purchaseDetailDataAllStatus[i])
      }
    }

    //Check whether there are filtered funds based on status are there,
    //Once sorted filter by unit trust account number
    if(purchseDetailCancelData.length == 0) {
      this.isFilerByStatusFundsNotAvailable = true;
      this.isFilteredFundsNotAvailable = true;
      this.populateDisplayFlagForPurchaseDetail(purchseDetailCancelData)
    } else {
      this.isFilerByStatusFundsNotAvailable = false;
      this.filterByUnitTrustAccountNumber(purchseDetailCancelData)
    }
  }

  sortByAllProcessingStatus() {
    this.isSortByProcessingStatus = true
    this.isSortBySuccessfulStatus = false;
    this.isSortByUnsuccessfulStatus = false;
    this.isSortByCancelStatus = false
    this.isSortByAllStatus = false;

    const purchseDetailProcessingData : any =[];
    for(let i=0;i<this.purchaseDetailDataAllStatus.length; i++) {
      if(this.purchaseDetailDataAllStatus[i].transactionStatus === 'Transaction Pending' ||
          this.purchaseDetailDataAllStatus[i].transactionStatus === 'Processing') {
        purchseDetailProcessingData.push(this.purchaseDetailDataAllStatus[i])
      }
    }
     //Check whether there are filtered funds based on status are there,
    //Once sorted filter by unit trust account number
    if(purchseDetailProcessingData.length == 0) {
      this.isFilerByStatusFundsNotAvailable = true;
      this.isFilteredFundsNotAvailable = true;
      this.populateDisplayFlagForPurchaseDetail(purchseDetailProcessingData)
    } else {
      this.isFilerByStatusFundsNotAvailable = false;
      this.filterByUnitTrustAccountNumber(purchseDetailProcessingData)
    }
  }

  sortByAllStatus() {
    this.isSortByAllStatus = true
    this.isSortBySuccessfulStatus = false;
    this.isSortByUnsuccessfulStatus = false;
    this.isSortByCancelStatus = false
    this.isSortByProcessingStatus = false;

    if(this.purchaseDetailDataAllStatus.length == 0) {
      this.isFilerByStatusFundsNotAvailable = true;
      this.isFilteredFundsNotAvailable = true;
      this.populateDisplayFlagForPurchaseDetail(this.purchaseDetailDataAllStatus)
    } else {
      this.isFilerByStatusFundsNotAvailable = false;
      this.filterByUnitTrustAccountNumber(this.purchaseDetailDataAllStatus)
    }
  }

  populateDisplayFlagForPurchaseDetail(purchseDetailSortedData) {
    const tempPurchaseDetailList : any =[];

    let purchaseArray : PurchaseDetail[]
    const purchaseMap : Map<string,PurchaseDetail[]> = new Map<string, PurchaseDetail[]>(); ;

    this.purchaseDetailData = purchseDetailSortedData;
    this.purchaseDetailData.sort((a, b) =>
          new Date(b.transactionDatetime).getTime() - new Date(a.transactionDatetime).getTime()
      );
    //Iterate over the purchase detail and get the list of funds assigend to repective transaction date row
    for(let i=0;i< this.purchaseDetailData.length; i ++) {
       purchaseArray = []
      if(purchaseMap.size == 0 || !purchaseMap.has(this.purchaseDetailData[i].transactionDt)) {
        purchaseArray.push(this.purchaseDetailData[i])
        purchaseMap.set(this.purchaseDetailData[i].transactionDt , purchaseArray)
      } else {
        purchaseMap.forEach((value: PurchaseDetail[], key: string) => {
          if(key == this.purchaseDetailData[i].transactionDt) {
            value.push(this.purchaseDetailData[i])
          }
        });
      }
    }

    //Iterate over the map tp set display flag for first element in the
    //list in order to show only one header

    purchaseMap.forEach((value: PurchaseDetail[], key: string) => {
      for(let i=0; i< value.length; i++) {
        if(key == value[i].transactionDt) {
          if(i == 0) {
            value[i].displayFlag = true
          } else {
            value[i].displayFlag = false
          }
          tempPurchaseDetailList.push(value[i])
        }

      }

    });

    //sort by latest date
    tempPurchaseDetailList.sort((a, b) =>
          new Date(b.transactionDatetime).getTime() - new Date(a.transactionDatetime).getTime()

        );

    this.purchaseDetailData = tempPurchaseDetailList;
  }


}
