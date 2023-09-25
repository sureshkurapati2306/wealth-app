import { Component, Input, OnInit } from '@angular/core';
import { AsnbTransactionStatusMembershipDetail, TransactionStatus } from '../../models';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content } from 'pdfmake/interfaces';

@Component({
    selector: 'cimb-asnb-transaction-status-card-template',
    templateUrl: './asnb-transaction-status-card-template.component.html',
    styleUrls: ['./asnb-transaction-status-card-template.component.scss'],
})
export class AsnbTransactionStatusCardTemplateComponent implements OnInit {
    @Input() status!: TransactionStatus;
    @Input() heading!: string;
    @Input() receiptHeading!: string;
    @Input() membershipName!: string;
    @Input() membershipDetails!: AsnbTransactionStatusMembershipDetail[];
    @Input() rawTimestamp!: string;
    @Input() receiptFirstHalfItems!: AsnbTransactionStatusMembershipDetail[];
    @Input() receiptSecondHalfItems!: AsnbTransactionStatusMembershipDetail[];
    @Input() errorCode: string | null = null;
    @Input() errorMessage: string | null = null;
    @Input() totalAmount: number | null = null;
    @Input() hideNotAvailableDisclaimer = false;

    timestamp = '';
    receiptDate = '';

    constructor() {
        const pdf = pdfMake;
        pdf.vfs = pdfFonts.pdfMake.vfs;
    }

    ngOnInit(): void {
        this.timestamp = moment(this.rawTimestamp)
            .utcOffset('+0800')
            .format('D MMM YYYY [at] hh:mm A');
        this.receiptDate = moment(this.rawTimestamp).utcOffset('+0800').format('YYMMDD');
    }

    generatePdf() {
        const fileName = `CIMBMyWealth [${this.receiptDate}].pdf`;
        const firstHalfItems = this.getReceiptItems(this.receiptFirstHalfItems);
        const secondHalfItems = this.getReceiptItems(this.receiptSecondHalfItems);
        const pdf = pdfMake.createPdf({
            info: { title: fileName },
            pageMargins: [50, 10],
            content: [
                {
                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAAAUCAYAAABbAAUtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAaoSURBVHgB7Vq9chNXFD5rO4mSBlEmDWvKNDg1BauBMjPIM5TJWCpSSxQJgkarBmQobOcFLM+kZMamh9GqSJlEeQGyPAGiimFibc6ncy66Wu2fjAgB/M3cWe3d+3vOd37utZ0mUblEtEFLQJcooDN8FFhT0vRpOXDoDB8FVugMZzgF3glxWkQuCsIkneE/BeSe1wZ6ydPNmv1yudmky40G5eFhvU5Pg4AWBS+6zY8a6eJLUhfyo8P5UU/b4NskdJ4QbT4gGmo96tyI6Gib6GaBOZBzrcfHjCHkcmDmThjL13H8lO8u5hoTje4T7VIObhNVeU9uvC2P4/HDi89jxj/m9txhRMvBXzxuJSsfLcn6WNRUT2sz43F+5eU9D0M677qZ5cb+PpXKxZ0F2KuK92me8Xjf/4mFGqtzV2dZDxK4nEQ1VdBzMII2/RPmiRcPc98i2qFkgITttPm0f5uFmG9tNNFE2ZExi87jcZ/GEkkzB56zVsQLxTEXquBNQJ4sgDzfHx5SUSiDPX0dsPA2SYhQIWF+h63wiIqjnVLvU44QHPFWmLfi6JwgY5pr1jbtlG8gTEAFwXI4csSIPJouGPPiPaR54sCYBvQWoXtwaUGsxStAGpDnh372Qeui59HVdpuedDqZ7VRIW/raibnjkE53hPda4toDax7XmicVbMFD0+8OW3Kknk5Pl0FC+0f82AexbMvnvhtjUfoeKbHgNVkRW9tiGBRru8OdNz/n+SORyWSul0oa7rfH9ddj01/i+o69R27T5Lrr/ByB1F3ru16tgAgY06WMUOxzWw6BhzzOBpedluxtYOuHQ2tT14R5hzC6royZnBwjf8kjBHDN9ycEykFNn2FarnBKxL2AT8XgmuQ8soh2rLlUAgKU0kQvU4zlPbDrvuB3Fm41HnK0bbgrRIUHuWK+KXGDz0S5ngkbd4TIbmyOiTWz0jbVc9bsMFuW8c6DhNpmQvof0+/pOjregf7umQ/Yx1jmR31didI3nnktZUB6zKRY39igixvZd4M3uN3P1Sodj1LD8AWSDf1JSwCsTIUNIddgTTFvE1B6TgLsmx/RtK6elUdAAQne4AqS91VLKT6PwWsJDBm0DpaNtVW0Gda/ZXmwK6ygm6bvWPruqlcKjYW31AC3LQJzXd0RZXYwli/j2QQfcpumrnHGMLRt0KJZL2zJZmTPxe2HvI/nn4ish6nEOY9SrVIe/qaJtaYCMT2S53NaApSAz7g04GKbkjfA5U7CiuYk3gJDot+lrO/wBi81ee2KsGsQ7ANRTNyyYKGHvC4fyjwWIoRGMSVRwOS2viXt3VdTpQ1WhKC7djhTVCMhV81UGNnaYRaE/JT7rqhn4DbnIloccUP3ZW4yB5bUe5xvSciTBTDhFyq2gGj21PRGYEH5jsT4Miu1H6nynFg4SQGOog6KunvKOqkBvoSYobWHLUdymzmAIBDqp1MFw9sE9lg09YooA8vbTeqbcvqCJ3pkDX3OmSbSk6L7PjjR/shJWDZ/rMg6XTpF0muQZ+iJHucql68pHw+pkBvpkQi6jHicdQdTFD4L6rZY9o4ztfge3HprgXHusWW3pjmCm9N84kk49+iNRXH1tIaR5BjXW1Pvtx5rYuc5PVMJ0vG+RiVJSsuvZj3OM657sW15HBuas+3w2jbtE2orpf2bYo44X3G5Rvl4wuVpgXbq2gP+6alll9lC9lbFSlwuNcTpe5KgFYYq3RwlQ7JOF1kYT0ME6enEIKScfbBScSnZd5SkaW1x/cDhqO1IeBkktEUe1IBnimIEjEQO8FKDWN7V43IIgiTNjdA0lufrXEZzvwuUg/EpbvBniIPQ9F2BTiDMY1oIEE6flCirMStAsshH2RcL3uW8Hpc3vnc/R/EGK9YpxCZNkb/sw5PoBV4myf1pkrxDCZ7JkBA5SwIJIINGNBumjAGirn9LcrmRXihe4m+Vu5JvYaz9lqzvAkLrioTYLCC04jhe1hvwQjqYIc6XXH4r0Ol3WgwQjk/0zbHkILAm13xTAezFFvwsYZjQtLfGhTAP7Ct8HS+pf1IdlHf0Mv0o3zm25lNPMvPvI1DMPwn5jt7LeJROyM44geyaPHechLuXrtzy1mh6VMfabE9b0Xsej3+HvK8K3xt5J7PzoL39Xjd9VnStOGCcUPKaTV9Hk8I+LQHdgv9WYRJRXujobvr9yXuNlig+6mbkQu8z1ugd4EP/hy+9KYZnXacPFO+EOB8q9Iq+YW5cuwXzrvcRhULLGYpB/1aEm+LR7lv8i/b/Af8CqJU/0wIsrCEAAAAASUVORK5CYII=',
                    alignment: 'center',
                    width: 90,
                    marginBottom: 10,
                },
                {
                    canvas: [
                        {
                            type: 'line',
                            x1: -50,
                            x2: 600,
                            y1: 0,
                            y2: 0,
                            lineColor: '#d9d9d9',
                        },
                    ],
                },
                {
                    text: this.status,
                    alignment: 'center',
                    color: this.getReceiptStatusColor(),
                    fontSize: 21,
                    bold: true,
                    marginTop: 50,
                },
                {
                    text: this.getErrorCodeAndMessage(),
                    alignment: 'center',
                    color: '#ff5630',
                    fontSize: 12,
                },
                {
                    text: this.receiptHeading,
                    alignment: 'center',
                    fontSize: 10,
                },
                {
                    text: this.totalAmount
                        ? ['MYR ', { text: this.totalAmount.toFixed(2), bold: true }]
                        : undefined,
                    alignment: 'center',
                    fontSize: 18,
                },
                {
                    text: this.timestamp,
                    alignment: 'center',
                    fontSize: 10,
                    marginBottom: 35,
                },
                ...firstHalfItems,
                {
                    canvas: [
                        {
                            type: 'line',
                            x1: 0,
                            x2: 500,
                            y1: 0,
                            y2: 0,
                            lineColor: '#d9d9d9',
                        },
                    ],
                    marginTop: 10,
                    marginBottom: 10,
                },
                ...secondHalfItems,
                {
                    text: this.hideNotAvailableDisclaimer
                        ? undefined
                        : [
                              'If the value is labeled as',
                              { text: ` 'N/A' `, bold: true },
                              `(not available), the fund's value has yet to be calculated and processed.`,
                          ],
                    style: 'label',
                    marginTop: 35,
                },
            ],
            styles: {
                label: {
                    fontSize: 10,
                    margin: [0, 2],
                },
                value: {
                    bold: true,
                    margin: [0, 2],
                    alignment: 'right',
                    fontSize: 10,
                },
            },
            defaultStyle: {
                color: '#333739',
                lineHeight: 1.5,
            },
        });
        pdf.download(fileName);
    }

    getErrorCodeAndMessage(): string | undefined {
        if (this.errorCode) return `Error code: ${this.errorCode} [${this.errorMessage}]`;
        return undefined;
    }

    getReceiptStatusColor(): string {
        if (this.status === 'Pending' || this.status === 'Accepted For Processing') {
            return '#ffab00';
        } else if (this.status === 'Successful') {
            return '#36b37e';
        } else {
            return '#ff5630';
        }
    }

    getReceiptItems(items: AsnbTransactionStatusMembershipDetail[]): Content[] {
        return items.map<Content>((item) => ({
            columns: [
                { text: item.label, style: 'label' },
                { text: item.value, style: 'value' },
            ],
        }));
    }
}
