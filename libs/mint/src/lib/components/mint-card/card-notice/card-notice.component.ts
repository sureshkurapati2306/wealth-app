import { Component, Input } from '@angular/core';

@Component({
  selector: 'cimb-card-notice',
  templateUrl: './card-notice.component.html',
  styleUrls: ['./card-notice.component.scss'],
})
export class CardNoticeComponent {
  @Input() accountName: string;
  @Input() accountNric: string;
  @Input() unitTrustAccount: string;
  @Input() paymentAccount: number;
  @Input() referenceNumber: string | number;
  @Input() status: string;
  @Input() dateTime: string;
  @Input() transactionMessage: string;
  @Input() transactionStatusName: string;
  @Input() flow = '001';
}
