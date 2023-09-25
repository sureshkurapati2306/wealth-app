import { Component, Input } from '@angular/core';
import { FundDetail, SummaryInvoiceItem } from '../../models';

@Component({
    selector: 'cimb-asnb-summary-card-template',
    templateUrl: './asnb-summary-card-template.component.html',
    styleUrls: ['./asnb-summary-card-template.component.scss'],
})
export class AsnbSummaryCardTemplateComponent {
    @Input() heading: string;
    @Input() fund?: FundDetail;
    @Input() invoiceItems: SummaryInvoiceItem[] = [];
    @Input() totalAmount?: number;
}
