import { SelectionModel } from '@angular/cdk/collections';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DownloadService } from '../../core/services/json-to-csv.service';
import { EventService } from '../../core/services/event.service';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import  * as SmsDeliveryLogAction  from 'libs/mint-office/src/lib/mint-office-feature-sms-delivery-log/+state/sms-delivery-log.actions';
import * as moment from 'moment';

@Component({
  selector: 'cimb-office-ut-list-table',
  templateUrl: './ut-list-table.component.html',
  styleUrls: ['./ut-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UtListTableComponent implements OnInit, OnDestroy {
  resetCount: number;

  constructor(
    private router: Router,
    private downloadService: DownloadService,
    private eventService: EventService,
    private decimalPipe: DecimalPipe,
    private store: Store,
  ) { }

  utRows: UnitTrustTransaction[] = [];

  loadingState = '';

  dataSource = new MatTableDataSource<UnitTrustTransaction>(this.utRows);

  selection = new SelectionModel<UnitTrustTransaction>(true, []);
  
  expandedRow: UnitTrustTransaction | null;

  clickableCheckboxRows: UnitTrustTransaction[];


  @Input() displayedColumns: string[] = [];
  @Input() expandedDetail: 'expandedDetailDefaultUtTransactions' | 'expandedDetailSwitchingUtTransactions' | 'expandedDetailSmsDeliveryLog' = 'expandedDetailDefaultUtTransactions';
  @Input() set dataSourceRows(data: any[]) {
    this.utRows = data;
    this.dataSource = new MatTableDataSource<any>(this.utRows);
    this.filterClickableCheckboxRows();
  }
  @Input() set getLoadingState(data: string) {
    this.loadingState = data;
    if(this.loadingState == 'success') {
      this.selection.clear();
    }
  }
  @Input() hasSearched = false;

  @Input() isSMSPage: boolean;

  @Output() cancelTransactions = new EventEmitter<UnitTrustTransaction[]>();

  @Input() tabName : string;

  transactionStartDate: Date | string;

  transactionEndDate: Date | string;

  eventSubscription$: Subscription;

  csvHeader: {/**/};
  

  ngOnInit() {

    if(this.isSMSPage) {
      this.expandedDetail = 'expandedDetailSmsDeliveryLog';
    }

    this.eventSubscription$ = this.eventService.on().subscribe(
      (data: any) => {
        if(data) {

          //using datefns
          //const formattedStartDate = format(data.startDate, 'dd MMM yyyy');
          //const formattedEndDate = format(data.endDate, 'dd MMM yyyy')
          
          //using moment
          const formattedStartDate = moment(data.startDate).format('DD-MMM-YYYY');
          const formattedEndDate =moment(data.endDate).format('DD-MMM-YYYY');

          //pass start and end date to child
          this.transactionStartDate = formattedStartDate;

          this.transactionEndDate  = formattedEndDate;
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes?.tabName && changes?.tabName?.currentValue !== changes?.tabName?.previousValue) {
      this.resetCount = 0;
    } else if (changes?.tabName == undefined) {
      this.resetCount = 0;
    } else {
      this.resetCount = 1;
    }
  }

  goToDetailPage(row: UnitTrustTransaction) {
    this.router.navigate(['unit-trust-transactions', 'detail', row.transId]);

  }

  goToSmsDetailPage(row: any) {
    this.store.dispatch(SmsDeliveryLogAction.updateSelectedEntity(
      { selectedEntity: row }
    ));
    this.router.navigate(['sms-delivery-log', 'sms-detail']);

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.clickableCheckboxRows.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.clickableCheckboxRows);
  }

  /** Filter out rows where the checkbox are clickable based on certain record conditions. This is needed to properly handle the Select All/Unselect All master checkbox. */
  filterClickableCheckboxRows() {
    this.clickableCheckboxRows = this.dataSource.data.filter(item => item.transactionStatus == 'Processing' && item.processingStatus == 'N');
  }

  clickCancelTransactions() {
    this.cancelTransactions.emit(this.selection.selected)
  }

  download() {
    const data = [];
    const dateFormat = "DD-MMM-YYYY, hh:mma";

    const gerenatedDateTime = moment(new Date()).format(dateFormat);
    const today =moment(new Date()).format("DDMMYYYY"); 
    

    const metaData = "TCJ Unit Trust Online "+this.tabName+" Report \n\rGenerated at: "+gerenatedDateTime+"\n\rTransaction Period: "+this.transactionStartDate+" to "+this.transactionEndDate+"\n\r\n\r";

      let i = 1;
      let remark = '';
      let lastUpdatedDateTime: string;

      this.utRows.forEach(item => {
        const transactionDateTime =  item.transactionDatetime ? moment(item.transactionDatetime).format("DD-MMM-YYYY, hh:mma") : '-';
      
        if (item.transactionStatus === 'Cancelled') {
          lastUpdatedDateTime = moment(item.rejectedDate).format("DD-MMM-YYYY, HH:mm:ss"); 
        } else if (item.transactionStatus === 'Processing') {
          lastUpdatedDateTime =  moment(item.transactionDatetime).format("DD-MMM-YYYY, HH:mm:ss"); 
        } else {
          lastUpdatedDateTime = moment(item.transactionStatusDate).format("DD-MMM-YYYY");
        }
        const processingStatusDate = item.processingStatus === 'N' ? '-' : moment(item.processingStatusDate).format("DD-MMM-YYYY, hh:mma");

        if(item.rejectedRemark === "NA") {
          remark = '-';
        } else {
          remark = item.rejectedRemark;
        }

        if(this.tabName === 'Purchase') {
          this.csvHeader = {
            "No order": "No order",
            "Reference/Trx No": "Reference/Trx No",
            "E-manager Transaction Number": "E-manager Transaction Number",
            "Transaction Date & Time": "Transaction Date & Time",
            "Currency": "Currency",
            "Customer Name": "Customer Name",
            "ID Number": "ID Number",
            "Contact No": "Contact No",
            "Unit Trust Account Number": "Unit Trust Account Number",
            "Settlement Account Number": "Settlement Account Number",
            "Fund Name": "Fund Name",
            "Sales charges (% )": "Sales charges (% )",
            "Sales charges (Amount)": "Sales charges (Amount)",
            "Tax amount": "Tax amount",
            "Net Investment Amount":  "Net Investment Amount",
            "Total Amount Payable": "Total Amount Payable",
            "Transaction Status": "Transaction Status",
            "Last Updated Date & Time": "Last Updated Date & Time",
            "Comments for cancelled reason": "Comments for cancelled reason",
            "Remarks": "Remarks",
            "Batch Date & Time": "Batch Date & Time",
            "Staff Indicator": "Staff Indicator",
            "Document Indicator": "Document Indicator",
            "Higher Risk Fund Acknowledgment": "Higher Risk Fund Acknowledgment"
          }
          //create an array of object to pass data for JSON to CSV conversion
          data.push({
            "No order": i,
            "Reference/Trx No": item.referenceNo,
            "E-manager Transaction Number": item.referenceNo,
            "Transaction Date & Time": `"${transactionDateTime}"`,
            "Currency": item.transactionType === "01" || item.transactionType ==="02" ? "MYR" : "",
            "Customer Name": item.clientName,
            "ID Number": item.clientId,
            "Contact No": `"${item.contactNo}"`,
            "Unit Trust Account Number": item.utAccountNo,
            "Settlement Account Number": item.settlementAccount,
            "Fund Name": item.fundName,
            "Sales charges (% )":`"${this.decimalPipe.transform(item.chargesPercentage, "1.2-2")}"`,
            "Sales charges (Amount)": `"${this.decimalPipe.transform(item.chargesAmount, "1.2-2")}"`,
            "Tax amount":`"${this.decimalPipe.transform(item.taxAmount, "1.2-2")}"`,
            "Net Investment Amount": `"${this.decimalPipe.transform(item.netInvestment, "1.2-2")}"`,
            "Total Amount Payable": `"${this.decimalPipe.transform(item.payableAmount, "1.2-2")}"`,
            "Transaction Status": item.transactionStatus,
            "Last Updated Date & Time": `"${lastUpdatedDateTime}"`,
            "Comments for cancelled reason": item.transactionStatus === "Cancelled" ? remark : '-',
            "Remarks": item.statusRemark ? item.statusRemark : '-',
            "Batch Date & Time": `"${processingStatusDate}"`,
            "Staff Indicator": item.staffIndicator,
            "Document Indicator": item.documentInd === 'Y' ? 'Yes' : 'No',
            "Higher Risk Fund Acknowledgment": item.higherFundRiskAck === 'YES' ? 'YES' : 'N/A'
          })
        } else if(this.tabName === 'Redemption') {
          this.csvHeader = {
            "No order": "No order",
            "Reference/Trx No": "Reference/Trx No",
            "E-manager Transaction Number": "E-manager Transaction Number",
            "Transaction Date & Time": "Transaction Date & Time",
            "Currency": "Currency",
            "Customer Name": "Customer Name",
            "ID Number": "ID Number",
            "Contact No": "Contact No",
            "Unit Trust Account Number": "Unit Trust Account Number",
            "Settlement Account Number": "Settlement Account Number",
            "Fund Name": "Fund Name",
            "No of units redeemed": "No of units redeemed",
            "Redemption Amount Payable (indicative)": "Redemption Amount Payable (indicative)",
            "Transaction Status": "Transaction Status",
            "Last Updated Date & Time": "Last Updated Date & Time",
            "Comments for rejected reason": "Comments for rejected reason",
            "Remarks": "Remarks",
            "Batch Date & Time": "Batch Date & Time",
            "Document Indicator": "Document Indicator",
            "Higher Risk Fund Acknowledgment": "Higher Risk Fund Acknowledgment"
          }
          //create an array of object to pass data for JSON to CSV conversion
          data.push({
            "No order": i,
            "Reference/Trx No": item.referenceNo,
            "E-manager Transaction Number": item.referenceNo,
            "Transaction Date & Time": `"${transactionDateTime}"`,
            "Currency": item.transactionType === "01" || item.transactionType ==="02" ? "MYR" : "",
            "Customer Name": item.clientName,
            "ID Number": item.clientId,
            "Contact No": item.contactNo,
            "Unit Trust Account Number": item.utAccountNo,
            "Settlement Account Number": item.settlementAccount,
            "Fund Name": item.fundName,
            "No of units redeemed": `"${this.decimalPipe.transform(item.transactionUnit, "1.2-2")}"`,
            "Redemption Amount Payable (indicative)": `"${this.decimalPipe.transform(item.indicativeCharges, "1.2-2")}"`,
            "Transaction Status": item.transactionStatus,
            "Last Updated Date & Time": `"${lastUpdatedDateTime}"`,
            "Comments for rejected reason": item.transactionStatus === "Cancelled" ? remark : '-',
            "Remarks": item.statusRemark ? item.statusRemark : '-',
            "Batch Date & Time": item.transactionStatus === "Processing" ? '' : `"${processingStatusDate}"`,
            "Document Indicator": item.documentInd === 'Y' ? 'Yes' : 'No',
            "Higher Risk Fund Acknowledgment": 'N/A'
          })
        } else {
          const switchHeader = {
            "No order": "No order",
            "Reference/Trx No": "Reference/Trx No",
            "E-manager Transaction Number": "E-manager Transaction Number",
            "Transaction Date & Time": "Transaction Date & Time",
            "Customer Name": "Customer Name",
            "ID Number": "ID Number",
            "Contact No": "Contact No",
            "Unit Trust Account Number": "Unit Trust Account Number",
            "Switch Out Fund": "Switch Out Fund",
            "Switch in Fund": "Switch in Fund",
            "Indicative charges (% )": "Indicative charges (% )",
            "No of units switched": "No of units switched",
            "Transaction Status": "Transaction Status",
            "Last Updated Date & Time": "Last Updated Date & Time",
            "Comments for cancelled reason": "Comments for cancelled reason",
            "Remarks": "Remarks",
            "Batch Date & Time": "Batch Date & Time",
            "Document Indicator": "Document Indicator",
            "Higher Risk Fund Acknowledgment": "Higher Risk Fund Acknowledgment"

          }
          this.csvHeader = switchHeader;
          //create an array of object to pass data for JSON to CSV conversion
          data.push({
            "No order": i,
            "Reference/Trx No": item.referenceNo,
            "E-manager Transaction Number": item.referenceNo,
            "Transaction Date & Time": `"${transactionDateTime}"`,
            "Customer Name": item.clientName,
            "ID Number": item.clientId,
            "Contact No": item.contactNo,
            "Unit Trust Account Number": item.utAccountNo,
            "Switch Out Fund": item.fundName,
            "Switch in Fund": item.toFundName,
            "Indicative charges (% )":`"${this.decimalPipe.transform(item.chargesPercentage, "1.2-2")}"`,
            "No of units switched": `"${this.decimalPipe.transform(item.transactionUnit, "1.2-2")}"`,
            "Transaction Status": item.transactionStatus,
            "Last Updated Date & Time": `"${lastUpdatedDateTime}"`,
            "Comments for cancelled reason": item.rejectedRemark || '-',
            "Remarks": item.statusRemark ? item.statusRemark : '-',
            "Batch Date & Time": `"${processingStatusDate}"`,
            "Document Indicator": item.documentInd === 'Y' ? 'Yes' : 'No',
            "Higher Risk Fund Acknowledgment": item.higherFundRiskAck === 'Yes' ? 'Yes' : 'No'
          })
        }

        i++;
      });

    //call service for download
    this.downloadService.downloadFile(this.csvHeader, data, metaData,'TCJ Unit Trust Online ' + this.tabName + ' Report_' + today);
  }

  ngOnDestroy() {
    this.eventSubscription$.unsubscribe();
  }

}
