import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogAsnbRedirectionComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-redirection/dialog-asnb-redirection.component';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
@Component({
    selector: 'cimb-dialog-asnb-consent',
    templateUrl: './dialog-asnb-consent.component.html',
    styleUrls: ['./dialog-asnb-consent.component.scss'],
})
export class DialogAsnbConsentComponent {
    @Output() handleOTPRequest: EventEmitter<any> = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { prospectusLink: string },
        public dialog: MatDialog,
    ) {}

    handleConsentASNBLink(isMobile: boolean) {
        this.handleOTPRequest.emit(isMobile);
    }

    redirectConfirmation(url: string): void {
        this.dialog.open(DialogAsnbRedirectionComponent, {
            backdropClass: 'asnb-redirection',
            data: {
                url: url,
            },
        });
    }

    asnbTermsAndConditionsModal() {
        const asnbTermsAndConditions =
            '<div class="asnb-modal-tnc">' +
        '<p class="first-tnc">' +
        '<strong>BY ACCESSING AND/OR USING THE SERVICES, YOU AGREE TO LINK YOUR ASNB ACCOUNT(S)' +
        'WITH THIS SERVICE AND BE BOUND BY THESE TERMS AND CONDITIONS WITHOUT' +
        'LIMITATION OR QUALIFICATION. IF YOU DO NOT ACCEPT ANY OR ALL OF THESE TERMS &' +
        'CONDITIONS, PLEASE IMMEDIATELY DISCONTINUE YOUR ACCESS AND/OR USE OF THE' +
        'SERVICES BY DEREGISTERING FROM THIS SERVICE. YOUR CONTINUED ACCESS AND/OR USE' +
        'OF THIS SERVICE WILL BE DEEMED AS YOUR ACCEPTANCE OF THESE TERMS & CONDITIONS' +
        'AND ANY AMENDMENTS THERETO.</strong>' +
      '</p>' +
      '<ol class="second-tnc">' +
        '<li><strong>Definitions</strong></li>' +
        '<p>' +
          'In this Terms and Conditions, unless the context requires otherwise, the' +
          'following words and expressions shall have the following meaning:' +
        '</p>' +
        '<div class="grid-container">' +
        '<p class="grid-title"><strong>Terms</strong></p>' +
        '<p class="grid-title"><strong>Definitions</strong></p>' +
          '<p>ASNB</p>' +
          '<p>' +
            'Amanah Saham Nasional Berhad (Registration no: 197901003200 (47457-V)).' +
          '</p>' +
          '<p>ASNB Funds</p>' +
          '<p>' +
            'Unit trust funds managed by ASNB that are made available by the Bank to' +
            'its customers on CIMB digital platform. There are 2 types of ASNB Funds:<br><br>' +
            'Fixed Price Fund – Any fixed price fund managed by ASNB namely, Amanah' +
            'Saham Bumiputera (ASB), or ASB 2, or ASB 3 Didik, or Amanah Saham Malaysia' +
            '(ASM), or ASM 2 Wawasan, or ASM 3 and will include any fixed price funds' +
            'managed by ASNB in the future.<br><br>Variable Price Fund – There are 2 types of' +
            'variable price fund namely Variable Historical Price Fund and Variable' +
            'Forward Price Fund. Variable Historical Price Fund is any historical price' +
            'fund managed by ASNB namely, Amanah Saham Nasional (ASN), or ASN Equity 2,' +
            'or ASN Equity 3, or ASN Imbang 1, or ASN Imbang 2, or ASN Sara 1 and will' +
            'include any historical price funds managed by ASNB in the future).' +
            'Variable Forward Price Fund is any forward price fund managed by ASNB' +
            'namely ASN Equity 5, or ASN Equity Global, or ASN Imbang 3 Global, or ASN' +
            'Sara 2 or ASN Sukuk and will include any forward price funds managed by' +
            'ASNB in the future).<br><br>Alternatively, you may refer to <a href="www.asnb.com.my" class="asnb-link" target="_blank" rel="noopener">www.asnb.com.my</a> to' +
            'view the ASNB Funds offered under by ASNB.' +
          '</p>' +
          '<p>Bank</p>' +
          '<p>CIMB Bank Berhad [197201001799 (13491-P)].</p>' +
          '<p>Cloud Services</p>' +
          '<p>' +
            'The on-demand availability of computer system resources, especially data' +
            'storage and computing resources (e.g., computing power, networks, servers,' +
            'storage, applications, and services) provided by a Cloud Service Provider' +
            'that can be rapidly provisioned and released with minimal management' +
            'effort or service provider’s interaction' +
          '</p>' +
          '<p>Cloud Service Provider</p>' +
          '<p>' +
            'A commercial organization that provides Cloud Services to ASNB employees' +
            'who use and access the Cloud Services subscribed by ASNB.' +
          '</p>' +
          '<p>PIDM</p>' +
          '<p>Perbadanan Insurans Deposit Malaysia.</p>' +
          '<p>Prospectus</p>' +
          '<p>' +
            'Document issued by ASNB consisting of information about ASNB Funds. There' +
            'are different types of prospectuses:<br><br>Master Prospectus/Fund Prospectus –' +
            'which consists of information about all ASNB Funds available at the time' +
            'of the issuance and about new funds launched by ASNB after the issuance of' +
            'Master Prospectus.<br><br>Supplementary Prospectus – which may consist new,' +
            'additional and/or amended information of the existing ASNB Funds stated in' +
            'the Master Prospectus/Fund Prospectus after the issuance of the Master' +
            'Prospectus/Fund Prospectus.' +
          '</p>' +
          '<p>Product Highlight Sheets or PHS</p>' +
          '<p>' +
            'Document that contains clear and concise information of the salient' +
            'features of the unlisted capital market product i.e. ASNB Fund.Document' +
            'that contains clear and concise information of the salient features of the' +
            'unlisted capital market product i.e. ASNB Fund.' +
          '</p>' +
          '<p>Services</p>' +
          '<p>' +
            'ASNB services that are made available by the Bank to its customers via' +
            'CIMB digital platform including but not limited to balance inquiry, fund' +
            'subscription, etc.' +
          '</p>' +
          '<p>Unit Holder</p>' +
          '<p>' +
            'Bank customer who is an existing/ registered as a holder of units in ASNB' +
            'Funds or is a parent/ legal guardian who opened Minor Account (Akaun' +
            'Bijak/ Remaja) for a dependant' +
          '</p>' +
        '</div>' +
        '<li>' +
          'The Services are made available to the Bank’s customers with existing' +
          'investments in ASNB Funds. Investments can be made to 3rd party ASNB' +
          'accounts.' +
        '</li>' +
        '<li>' +
          'The parent or legal guardian who is a Unit Holder and had opened a minor' +
          'account (Akaun Bijak/Remaja) with ASNB may use the Services to perform' +
          'transactions subject to such limits and conditions as may be fixed or' +
          'specified by ASNB from time to time at its absolute discretion.' +
        '</li>' +
        '<li>' +
          'You hereby declare that you have not been adjudicated a bankrupt nor has' +
          'there been any petition for bankruptcy (ies) filed against you or a judgment' +
          'against you that remains outstanding for more than thirty (30) days as at' +
          'the date herein.' +
        '</li>' +
        '<li>' +
          'You are aware and understand that the Bank is an Institutional Unit Trust' +
          'Advisor (IUTA) for the distribution of unit trust funds issued by ASNB.' +
        '</li>' +
        '<li>' +
          'You understand and acknowledge that ASNB Funds are unit trust funds and are' +
          'NOT deposits and therefore are not guaranteed by PIDM.' +
        '</li>' +
        '<li>' +
          '1. Any information provided herein is for reference only. ASNB should be the' +
          'main sources of information related to ASNB Funds and shall not be liable or' +
          'responsible for the accuracy of the information so given by the Bank.' +
        '</li>' +
        '<li>' +
          'Nothing in the Bank’s materials (printed or digital) which contain' +
          'information on ASNB Funds or investment reports may be construed by you as' +
          'investment advice and/or as a recommendation and/or an opinion on the' +
          'relevant ASNB Funds or investment.' +
        '</li>' +
        '<li>' +
          'You have read and understand the contents of the Prospectus as well as PHS.' +
          'A printed copy of the Prospectuses and PHS can be obtained from any ASNB' +
          'branch or ASNB agent. Before investing, you are advised to consider the' +
          'risks of investing as well as the fees and charges involved. Unit trust fund' +
          'prices and the income distribution payable, if any, may go down as well as' +
          'up. Past performance of a fund should not be taken as indicative of its' +
          'future performance.' +
        '</li>' +
        '<li>' +
          'Online transactions via CIMB digital platform are made available to all ASNB' +
          'Funds. The subscriptions are subject to the individual investment eligible' +
          'limit and fund availability. You are required to refer to ASNB website for' +
          'the latest update on ASNB Funds.' +
        '</li>' +
        '<li>' +
          'Valuation of ASNB Variable Price funds is based on the Net Asset Value (NAV)' +
          'of the fund. The information of the funds’ NAV and sales charges relating to' +
          'ASNB Variable Prices are available on ASNB website.' +
        '</li>' +
        '<li>' +
          'By using the Services, a Service fee is chargeable for ASNB Fixed Price' +
          'Funds by the Bank as stated in the table below. You will have to agree to' +
          'the service fee when confirming the online transaction before the' +
          'transaction instruction can be processed.' +
        '</li>' +
        '<table class="table table-tnc">' +
        '<thead>' +
          '<tr>' +
            '<th>Type of Fund</th>' +
            '<th>ASNB Sales Charge</th>' +
            '<th>Service Fee</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody>' +
          '<tr>' +
            '<td><strong>Fixed Price Fund</strong></td>' +
            '<td>None</td>' +
            '<td>RM 1.00 per Transaction</td>' +
          '</tr>' +
          '<tr>' +
            '<td>' +
                '<strong>Variable Price Fund</strong>' +
                '<ul>' +
                '<span class="list-vpf">Amanah Saham Nasional</span>' +
                '<span class="list-vpf">ASN Equity 2</span>' +
                '<span class="list-vpf">ASN Equity 3</span>' +
                '<span class="list-vpf">ASN Equity 5</span>' +
                '<span class="list-vpf">ASN Equity Global</span>' +
                '<span class="list-vpf">ASN Imbang 1</span>' +
                '<span class="list-vpf">ASN Imbang 2</span>' +
                '<span class="list-vpf">ASN Imbang 3 Global</span>' +
                '<span class="list-vpf">ASN Sara 1</span>' +
                '<span class="list-vpf">ASN Sara 2</span>' +
                '<span class="list-vpf">ASN Sukuk</span>' +
                '</ul>' +
            '</td>' +
            '<td>' +
                '<strong>&nbsp;</strong>' +
                '<ul>' +
                '<span class="list-vpf list-vpf-no-bullet">2.00%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">2.00%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">2.00%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">2.00%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">2.00%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">1.75%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">1.75%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">1.75%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">1.50%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">1.50%</span>' +
                '<span class="list-vpf list-vpf-no-bullet">1.00%</span>' +
                '</ul>' +
            '</td>' +
            '<td>N/A</td>' +
          '</tr>' +
          '<tbody>' +
        '</table>' +
        '<p class="disclaimer">Note: The ASNB Sales Charge is of Net Asset Value (“NAV”) per unit.</p>' +
        '<li>' +
          'Cooling-off refers to the right of a Unit Holder who is investing in any' +
          'ASNB Variable Price Fund for the first time, to obtain a refund of his' +
          'investment if he so requests within the Cooling-off Period. Unit Holders who' +
          'are eligible to exercise their cooling-off right may exercise it by' +
          'presenting the transaction receipt of initial investment to any ASNB Branch' +
          'or ASNB agent.' +
        '</li>' +
        '<li>' +
          'All the investments made are based on your independent judgment and at your' +
          'own risk. You are aware and agree that there are inherent risks in' +
          'conducting online transactions through the internet and you are solely' +
          'responsible for making your own assessment when accessing and using this' +
          'website.' +
        '</li>' +
        '<li>' +
          'Alternatively, in any other circumstance or event, you may opt to use other' +
          'methods of transactions to perform subscription, redemption, transfer,' +
          'switching, or any other non-financial transaction of ASNB Funds at any ASNB' +
          'branch or agent within Malaysia nationwide.' +
        '</li>' +
        '<li>' +
          'Unless notified otherwise, transactional services is available from 2am to' +
          '9pm daily (Sunday to Saturday, inclusive of public holidays), subject to' +
          'transaction cut-off times as stated below:<br>' +
          '<ul class="tnc-modal-cutoff">' +
          '<li>For ASNB Fixed Price Funds: No cut off time applied</li>' +
          '<li>For ASNB Variable Historical Price Funds, any' +
          'transaction after 4.00pm will be processed on the next business day</li>' +
          '<li>For ASNB Forward Price Funds, subscriptions will be updated within two (2) business' +
          'days for transactions before 4.00pm or up to three (3) business days for' +
          'transactions after 4.00pm</li>' +
          '</ul>' +
          'Non-transactional services, i.e. non-monetary' +
          'movements such as account linking maintenance, favourite account maintenance' +
          'and balance enquiry are available 24 hours a day, 7 days a week.' +
        '</li>' +
        '<li>' +
          'You undertake to ensure that the ASNB Fund’s account number and/or' +
          'applicable details are accurate when performing transactions on CIMB digital' +
          'platform. The Bank and ASNB shall not be held liable for any errors or' +
          'mistakes made by you in performing the transactions.' +
        '</li>' +
        '<li>' +
          'ASNB will process your application upon receipt of payment from the Bank' +
          'subject to these terms and conditions and any other related terms and' +
          'conditions by the Bank. You may check your application status via CIMB' +
          'and/or at myASNB Portal, or any ASNB branch or ASNB agent.' +
        '</li>' +
        '<li>' +
          'The reimbursement of any rejected application will only be undertaken by the' +
          'Bank upon receipt of the refund payment from ASNB.' +
        '</li>' +
        '<li>' +
          'You agree, and consent to the Bank disclosing details of your and/or your' +
          'beneficiary’s personal particulars such as name, NRIC number, relationship' +
          'with beneficiary, purpose of transaction, source of funds, and/or any' +
          'relevant information that is applicable under all relevant laws (“<strong>Required' +
          'Information</strong>”) to ASNB.' +
        '</li>' +
        '<li>' +
          'ASNB may enter into agreements with any third-party service provider,' +
          'locally or internationally, to provide Cloud Services and other services in' +
          'relation to these Services. In doing so, ASNB may be required to share your' +
          'and/or your beneficiary’s particulars with the Cloud Service Provider(s) for' +
          'the purpose of performing their services and ASNB will ensure that the Cloud' +
          'Service Provider(s) protects the confidentiality of the information and not' +
          'use it for any other purpose. By proceeding with these Services, you and' +
          'your beneficiary agree and consent that ASNB may use and disclose such' +
          'information to the Cloud Services Provider subscribed by ASNB.' +
        '</li>' +
        '<li>' +
          'The Bank agrees the Required Information provided to ASNB will be in' +
          'connection with the transaction performed only and for the purpose of ASNB' +
          'complying with its obligations under the law.' +
        '</li>' +
        '<li>' +
          'You agree that all details given are true and accurate and that the funds' +
          'used for investment in the ASNB Funds does not contravene the laws of' +
          'Malaysia including but not limited to the Anti-Money Laundering,' +
          'Anti-Terrorism Financing and Proceeds of Unlawful Activities Act 2001' +
          '(AMLATFPUAA 2001) and Foreign Account Tax Compliance Act (a federal law of' +
          'the United States). The Bank and ASNB reserve the right to terminate all' +
          'relationship(s) with you if you are found to have breached and/or are not in' +
          'compliance with any laws, regulations, and rules on AMLATFPUAA 2001 and Know' +
          'Your Customer Policy of the Bank and ASNB.<br><br>For any enquiries, please call' +
          'our Consumer Contact Centre at 03 6204 7788.<br><br>If you are dissatisfied with' +
          'the explanation or solution provided by our Consumer Contact Centre, you may' +
          'write to our Customer Resolution Unit (CRU) at Customer Resolution Unit, PO' +
          'Box 10338, GPO Kuala Lumpur, 50710 Wilayah Persekutuan and email address:' +
          '<u>cru@cimb.com</u>.' +
        '</li>' +
      '</ol>' +
      '</div>';

        this.dialog.open(DialogAlertComponent, {
            backdropClass: 'no-backdrop',
            panelClass: ['terms-modal', 'modal-v2'],
            maxWidth: '800px',
            autoFocus: false,
            data: {
                dialogHeading: 'ASNB TERMS AND CONDITIONS',
                dialogContent:
                    '<div class="content-scroller"><div class="content indent-content">' +
                    asnbTermsAndConditions +
                    '</div></div>',
            },
        });
    }
}
