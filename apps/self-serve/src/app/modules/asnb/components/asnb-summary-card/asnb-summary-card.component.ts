import { Component, Input, OnInit } from '@angular/core';
import { FundDetail, SummaryInvoiceItem } from '../../models';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../core/state/reducers';
import { getCheckout } from '../../+state/asnb.selectors';

@Component({
    selector: 'cimb-asnb-summary-card',
    templateUrl: './asnb-summary-card.component.html',
})
export class AsnbSummaryCardComponent implements OnInit {
    @Input() showFund?: boolean;
    invoiceItems: SummaryInvoiceItem[] = [];
    totalAmount = 0;
    fund: FundDetail = { id: '', name: '', type: null };

    constructor(private store: Store<fromStore.AppState>) {}

    ngOnInit(): void {
        this.store.select(getCheckout).subscribe((data) => {
            this.totalAmount = data.total;
            this.invoiceItems = [
                {
                    name: `Total sales charge (${data.salesChargePercentage}%)`,
                    amount: data.salesCharge ?? 'N/A',
                    decimalFormat: '1.2-2',
                    isNotAvailable: data.salesCharge === null,
                },
                {
                    name: 'Total bank charge',
                    amount: data.bankCharge,
                    decimalFormat: '1.2-2',
                },
                {
                    name: 'Total net investment amount',
                    amount: data.amount ?? 'N/A',
                    decimalFormat: '1.2-2',
                    isNotAvailable: data.amount === null,
                },
            ];
            this.fund.id = data.fundId;
            this.fund.name = data.fundName;
            this.fund.type = data.fundType;
        });
    }
}
