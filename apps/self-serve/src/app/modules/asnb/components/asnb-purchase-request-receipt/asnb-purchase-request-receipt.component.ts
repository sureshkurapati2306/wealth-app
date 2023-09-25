import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
    AsnbFavourite,
    AsnbTransactionStatusMembershipDetail,
    FundDetail,
    SummaryInvoiceItem,
    TransactionStatus,
} from '../../models';
import * as fromStore from '../../../../core/state/reducers';
import {
    getCheckoutReceipt,
    getExternalUrlList,
    getReceiptMembership,
} from '../../+state/asnb.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DialogAsnbRedirectionComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-redirection/dialog-asnb-redirection.component';
import { DialogAsnbServiceHoursComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-service-hours/dialog-asnb-service-hours.component';
import { AsnbService } from '../../services/asnb.service';

@Component({
    selector: 'cimb-asnb-purchase-request-receipt',
    templateUrl: './asnb-purchase-request-receipt.component.html',
    styleUrls: ['./asnb-purchase-request-receipt.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsnbPurchaseRequestReceiptComponent implements OnInit {
    fund: FundDetail = { id: '', name: '', type: null };
    transactionSummaryItems: SummaryInvoiceItem[] = [];
    prospectusLink = '';
    fundPriceLink = '';
    status: TransactionStatus = 'Pending';
    membershipName = '';
    membershipDetails: AsnbTransactionStatusMembershipDetail[] = [];
    rawTimestamp = '';
    totalAmount = 0;
    errorCode: string | null = null;
    errorMessage: string | null = null;
    receiptFirstHalfItems: AsnbTransactionStatusMembershipDetail[] = [];
    receiptSecondHalfItems: AsnbTransactionStatusMembershipDetail[] = [];
    isFavouritePurchase = false;

    favouriteDetails: AsnbFavourite = null;

    constructor(
        private router: Router,
        private store: Store<fromStore.AppState>,
        public dialog: MatDialog,
        private asnbService: AsnbService,
    ) {}

    ngOnInit(): void {
        this.store.select(getReceiptMembership).subscribe((data) => {
            this.membershipName = data.favouriteDetails?.transId
                ? data.favouriteDetails.beneName
                : data.name;
            let maskedMembershipNumber = '';
            if (data.favouriteDetails?.transId) {
                maskedMembershipNumber = (
                    data.favouriteDetails.asnbAccountNo.slice(0, 8).replace(/./g, 'X') +
                    data.favouriteDetails.asnbAccountNo.slice(8)
                )
                    .replace(/(.{4})/g, '$1 ')
                    .trim();
            } else {
                maskedMembershipNumber =
                    data.unitHolderId.slice(0, 8).replace(/./g, 'X') + data.unitHolderId.slice(8);
            }

            this.membershipDetails.push({
                label: 'ASNB membership number',
                value: maskedMembershipNumber,
            });
            this.receiptFirstHalfItems.push(
                ...[
                    {
                        label: 'Transfer to',
                        value: data.favouriteDetails?.transId
                            ? data.favouriteDetails.beneName
                            : data.name,
                    },
                    {
                        label: 'ASNB membership number',
                        value: maskedMembershipNumber,
                    },
                ],
            );
        });

        this.store.select(getCheckoutReceipt).subscribe((data) => {
            if (data.favouriteDetails?.transId) {
                this.isFavouritePurchase = true;
            }

            const transactionStatus = this.getTransactionStatus(
                data.transactionStatus,
                data.salesCharge,
            );
            this.rawTimestamp = data.timeStamp;
            this.totalAmount = data.total;
            if (data.errorCode) this.errorCode = data.errorCode;
            if (data.errorMessage) this.errorMessage = data.errorMessage;
            this.status = transactionStatus;
            this.fund.id = data.fundId;
            this.fund.name = data.fundName;
            this.fund.type = data.fundType;
            this.transactionSummaryItems = [
                {
                    name: 'Units allotted',
                    amount: this.handleDisplayValue(data.unitsAlloted, data.unitsAlloted),
                    decimalFormat: '1.2-2',
                    hideCurrency: true,
                    isNotAvailable: data.unitsAlloted === null,
                },
                {
                    name: 'NAV price',
                    amount: this.handleDisplayValue(data.navPrice, data.navPrice),
                    decimalFormat: '1.4-4',
                    isNotAvailable: data.navPrice === null,
                },
            ];

            let membershipIdDetatils = [];

            if (data.favouriteDetails?.transId) {
                membershipIdDetatils = [
                    {
                        label: 'Member’s ID type',
                        value: data.favouriteDetails.memberIdType,
                    },
                    {
                        label: 'ID number',
                        value: this.formatIdNumber(data.favouriteDetails.beneClientId),
                    },
                ];
            } else {
                membershipIdDetatils = [
                    { label: 'NRIC', value: data.identificationNumber.toUpperCase() },
                ];
            }
            this.membershipDetails.push(
                ...[
                    ...membershipIdDetatils,
                    ...(data.relationship
                        ? [{ label: 'Relationship', value: data.relationship }]
                        : []),
                    ...(data.reason ? [{ label: 'Reason', value: data.reason }] : []),
                    { label: 'Settlement account', value: data.bankAccountNumber },
                    {
                        label: 'Bank reference no',
                        value: `[Ref ${data.transactionId}]`,
                    },
                    {
                        label: 'ASNB reference no',
                        value: this.handleDisplayValue(
                            transactionStatus === 'Successful' ||
                                transactionStatus === 'Accepted For Processing',
                            `[Ref ${data.asnbReferenceNo}]`,
                        ),
                    },
                ],
            );
            this.receiptFirstHalfItems.unshift(
                {
                    label: 'Bank reference no',
                    value: `REF ${data.transactionId}`,
                },
                {
                    label: 'ASNB reference no',
                    value: this.handleDisplayValue(
                        transactionStatus === 'Successful' ||
                            transactionStatus === 'Accepted For Processing',
                        `[Ref ${data.asnbReferenceNo}]`,
                    ),
                },
            );

            let receiptMemberShipId = [];

            if (data.favouriteDetails?.transId) {
                receiptMemberShipId = [
                    {
                        label: data.favouriteDetails.memberIdType,
                        value: this.formatIdNumber(data.favouriteDetails.beneClientId),
                    },
                ];
            } else {
                receiptMemberShipId = [
                    { label: 'NRIC', value: data.identificationNumber.toUpperCase() },
                ];
            }

            this.receiptFirstHalfItems.push(
                ...receiptMemberShipId,
                ...[
                    ...(data.relationship
                        ? [{ label: 'Relationship', value: data.relationship }]
                        : []),
                    ...(data.reason ? [{ label: 'Reason for transfer', value: data.reason }] : []),
                    { label: 'Settlement account', value: data.bankAccountNumber },
                ],
            );

            this.receiptSecondHalfItems = [
                { label: 'Fund name', value: data.fundName },
                {
                    label: 'NAV price',
                    value: this.handleDisplayValue(
                        data.navPrice,
                        `MYR ${data.navPrice?.toFixed(4)}`,
                    ),
                },
                {
                    label: 'Unit allotted',
                    value: this.handleDisplayValue(
                        data.unitsAlloted,
                        data.unitsAlloted?.toFixed(2),
                    ),
                },
                {
                    label: 'Sales Charge',
                    value: this.handleDisplayValue(
                        data.salesCharge,
                        `MYR ${parseFloat(data.salesCharge)?.toFixed(2)}`,
                    ),
                },
                { label: 'Bank Charge', value: `MYR ${data.bankCharge?.toFixed(2)}` },
                {
                    label: 'Total Net Investment Amount',
                    value: this.handleDisplayValue(data.amount, `MYR ${data.amount?.toFixed(2)}`),
                },
            ];
        });

        this.store.select(getExternalUrlList).subscribe((data) => {
            if (data.prospectus) this.prospectusLink = data.prospectus;
            if (data.fundPrice) this.fundPriceLink = data.fundPrice;
        });
    }

    handleDisplayValue<displayType>(
        data: number | string | boolean | null,
        displayValue: displayType,
        displayEmpty = 'N/A',
    ) {
        if (data === null || data === false) {
            return displayEmpty;
        } else {
            return displayValue;
        }
    }
    formatIdNumber(number: string) {
        const maskedNumber = number.replace(/\d(?=\d{4})/g, 'X');
        return maskedNumber.slice(0, 6) + '-' + maskedNumber.slice(6, 8) + '-' + number.slice(-4);
    }

    goToDashboard() {
        this.router.navigate(['/asnb-dashboard']);
        if (this.isFavouritePurchase) {
            this.asnbService.updateTabIndex(1);
        }
    }

    redirectConfirmation(url: string): void {
        this.dialog.open(DialogAsnbRedirectionComponent, {
            backdropClass: 'asnb-redirection',
            data: { url: url },
        });
    }

    openServiceHoursDialog() {
        this.dialog.open(DialogAsnbServiceHoursComponent, {
            backdropClass: 'no-backdrop',
            panelClass: ['terms-modal', 'modal-v2'],
            maxWidth: '800px',
            autoFocus: false,
        });
    }

    getTransactionStatus(transactionStatus: string, salesCharge: string | null): TransactionStatus {
        if (transactionStatus === '5000') {
            return 'Pending';
        } else if (transactionStatus === '000' && salesCharge === null) {
            return 'Accepted For Processing';
        } else if (transactionStatus === '000') {
            return 'Successful';
        } else {
            return 'Unsuccessful';
        }
    }
}
