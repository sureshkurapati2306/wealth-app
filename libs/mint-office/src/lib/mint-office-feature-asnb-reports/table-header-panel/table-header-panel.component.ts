import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
    AsnbTransactionItem,
    AsnbLinkAccountResponse,
    AsnbSearchLinkAccount,
    AsnbSearchFields,
    AsnbSearchFavourite,
    AsnbFavouriteResponse,
} from '../../core/models/asnb.model';
import { DownloadService } from '../../core/services/json-to-csv.service';
import * as moment from 'moment';

@Component({
    selector: 'cimb-office-table-header-panel',
    templateUrl: './table-header-panel.component.html',
    styleUrls: ['./table-header-panel.component.scss'],
})
export class TableHeaderPanelComponent {
    constructor(private downloadService: DownloadService, private decimalPipe: DecimalPipe) {}

    @Input() tabName: string;
    @Input() filter: AsnbSearchLinkAccount | AsnbSearchFields | AsnbSearchFavourite;
    @Input() hasSearched: boolean;
    @Input() reportData:
        | AsnbTransactionItem[]
        | AsnbLinkAccountResponse[]
        | AsnbFavouriteResponse[];

    downloadReport() {
        const dateFormat = 'DD-MMM-YYYY, hh:mma';
        const generatedDateTime = moment(new Date()).format(dateFormat);
        const metaData =
            'TCJ ASNB ' +
            this.tabName +
            ' Report \n\rGenerated at: ' +
            generatedDateTime +
            '\n\r\n\r';
        const today = moment(new Date()).format('DDMMYYYY');
        let csvHeader = {};
        const data = [];
        switch (this.tabName) {
            case 'Transactions':
                csvHeader = {
                    id: 'No.',
                    transactionDateTime: 'Transaction Date and Time',
                    bankRefNo: 'Bank Reference No.',
                    asnbRefNo: 'ASNB Reference No.',
                    custName: 'Customer Name',
                    custID: 'Customer ID',
                    action: 'Action',
                    fundName: 'Fund Name',
                    status: 'Status',
                    memberNo: 'Membership Number',
                    custIDType: 'Customer ID Type',
                    contactNo: 'Contact No.',
                    settlementAcc: 'Settlement Account',
                    amount: 'Amount',
                    bankCharges: 'Bank Charges',
                    salesCharges: 'Sales Charges',
                    salesPercentage: 'Sales Percentage %',
                    netInvestmentAmount: 'Net Investment Amount',
                    transactionType: 'Transaction Type',
                    minorName: 'Minor Name',
                    minorMemberNo: 'Minor Membership Number',
                    thirdPartyName: 'Beneficiary Name',
                    thirdPartyAsnbAccountNo: 'Beneficiary Membership No',
                    remarks: 'Error Message',
                };

                this.reportData.forEach((item) => {
                    data.push({
                        id: item.seqNo,
                        transactionDateTime: moment(item.transactionDatetime).format(
                            'DD MMM YYYY hh:mma',
                        ),
                        bankRefNo: item.transId,
                        asnbRefNo: item.txnNum,
                        custName: item.clientName,
                        custID: item.clientId,
                        action: item.transactionType,
                        fundName: item.fundName,
                        status: item.transactionStatus,
                        memberNo: item.clientAsnbAccountNo,
                        custIDType: item.clientIdTypeDesc,
                        contactNo: item.phoneNo || 'N/A',
                        settlementAcc: item.settlementAccount || 'N/A',
                        amount: item.totalInvestment,
                        bankCharges: item.chargesAmount,
                        salesCharges: this.getSalesCharges(item),
                        salesPercentage:
                            item.salesPercentage === null
                                ? 'N/A'
                                : this.decimalPipe.transform(item.salesPercentage, '1.2-2'),
                        netInvestmentAmount:
                            item.netInvestmentAmount === null
                                ? 'N/A'
                                : this.decimalPipe.transform(item.netInvestmentAmount, '1.2-2'),
                        transactionType: item.asnbInvestmentType,
                        minorName: item.minorName,
                        minorMemberNo: item.minorAsnbAccountNo,
                        thirdPartyName: item.thirdPartyName,
                        thirdPartyAsnbAccountNo: item.thirdPartyAsnbAccountNo,
                        remarks: item.remarks,
                    });
                });
                break;
            case 'Link Account':
                csvHeader = {
                    id: 'No.',
                    transactionDateTime: 'Transaction Date and Time',
                    action: 'Action',
                    custName: 'Customer Name',
                    custID: 'Customer ID',
                    memberNo: 'Membership No.',
                    memberIDType: 'Membership ID Type',
                };

                this.reportData.forEach((item) => {
                    //create an array of object to pass data for JSON to CSV conversion
                    data.push({
                        id: item.id,
                        transactionDateTime: moment(item.transactionDateAndTime).format(
                            'DD MMM YYYY hh:mma',
                        ),
                        action: item.isAsnbAccountLink ? 'Link' : 'Delink',
                        custName: item.customerName,
                        custID: item.customerId,
                        memberNo: item.membershipNumber,
                        memberIDType: item.membershipIdTypeDesc,
                    });
                });
                break;
            case 'Add Favourite':
                csvHeader = {
                    id: 'No.',
                    transactionDateTime: 'Transaction Date and Time',
                    bankRefNo: 'Bank Reference No.',
                    clientName: 'Customer Name',
                    clientId: 'Customer ID',
                    transactionType: 'Action',
                    beneAsnbAcctNo: 'Membership No.',
                    clientIdType: 'Membership ID Type',
                    nickname: 'Beneficiary Nickname',
                    beneClientIdType: 'Beneficiary Members ID Type',
                    beneClientId: 'Beneficiary ID No.',
                    fundName: 'Fund Name',
                    relationship: 'Relationship',
                    transactionStatus: 'Status',
                    remarks: 'Error Message',
                };

                this.reportData.forEach((item) => {
                    data.push({
                        id: item.seqNo,
                        transactionDateTime: moment(item.transactionDatetime).format(
                            'DD MMM YYYY hh:mma',
                        ),
                        bankRefNo: item.transId,
                        clientName: item.clientName,
                        clientId: item.clientId,
                        transactionType: item.transactionType,
                        beneAsnbAcctNo: item.beneAsnbAcctNo,
                        clientIdType: item.clientIdType,
                        nickname: item.nickname,
                        beneClientIdType: item.beneClientIdType,
                        beneClientId: item.beneClientId,
                        fundName: item.fundName,
                        relationship: item.relationship,
                        transactionStatus: item.transactionStatus,
                        remarks: item.remarks,
                    });
                });
                break;
        }

        //call service for download
        this.downloadService.downloadFile(
            csvHeader,
            data,
            metaData,
            'TCJ ASNB ' + this.tabName + ' Report_' + today,
        );
    }

    getSalesCharges(row: AsnbTransactionItem) {
        if (row.fundType === 'fixed') {
            return row.salesCharge === 0
                ? '0.00'
                : this.decimalPipe.transform(row.salesCharge, '1.2-2');
        } else if (row.transactionStatus === 'Successful' && row.salesCharge !== 0) {
            return this.decimalPipe.transform(row.salesCharge, '1.2-2');
        } else {
            return 'N/A';
        }
    }
}
