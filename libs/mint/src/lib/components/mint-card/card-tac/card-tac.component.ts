import { Component, EventEmitter, Input, Output, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { DialogTermsAndConditionComponent } from '../../mint-dialog/dialog-terms-and-condition/dialog-terms-and-condition.component';
import { timer, Subscription } from 'rxjs';
import { AnalyticService } from '@cimb/shared/services';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';
import { MediaMatcher } from '@angular/cdk/layout';
import { DialogAsnbServiceHoursComponent } from '../../mint-dialog/dialog-asnb-service-hours/dialog-asnb-service-hours.component';
// import { MintSnackbarComponent } from '../../mint-snackbar/mint-snackbar.component';

@Component({
    selector: 'cimb-card-tac',
    templateUrl: './card-tac.component.html',
    styleUrls: ['./card-tac.component.scss'],
})
export class CardTacComponent implements OnInit {
    @Input() mobileNumber: string | number = '+60 xxxxx0000';
    phoneNumber: string | number = '+60 xxxxx0000';
    @Output() confirmAndProceedEvent: EventEmitter<any> = new EventEmitter();
    @Output() requestTACEvent: EventEmitter<any> = new EventEmitter();
    @Output() fatcaDeclaratonErrorEvent: EventEmitter<any> = new EventEmitter();
    @Output() tagEntredCompletely: EventEmitter<any> = new EventEmitter();
    @Output() requestTagCanEnable: EventEmitter<any> = new EventEmitter();
    @Output() fatcaToggleEvent: EventEmitter<boolean> = new EventEmitter();

    @Output() tagErrorChange = new EventEmitter<boolean>();
    @Input() factaEnabled = true;
    @Input() tagError = false;
    @Input() disableConfirmButton = false;
    @Input() disableConfirmButtonPage = true;
    @Input() canEnableConfirmButton = false;
    @Input() showFactaInlineError = true;
    @Input() requestTagClicked = false;
    @Input() accountSelected = true;
    @Input() enableRequestNumber = false;
    @Input() flow = '';
    @Input() schedulerMsg = '';
    @Input() isTransaction = true;
    @Input() isASNB = false;
    @Input() autoRequestTAC = false;
    @Input() hideForAsnbCheckout = false;
    @Input() isForAsnbFatca = false;
    @Input() isForFavourite = false;

    submited = false;
    requestedClicked = false;
    fatcaToggle: string;
    timeLeft = 240;
    interval;
    tagErrMessage = '';

    @Input() set tagErrorMessage(msg: string) {
        this.tagErrMessage = msg;
    }

    otp = new FormControl('', [Validators.required, Validators.min(1)]);

    otp2 = new FormControl('', [Validators.required, Validators.min(1)]);

    otp3 = new FormControl('', [Validators.required, Validators.min(1)]);

    otp4 = new FormControl('', [Validators.required, Validators.min(1)]);

    otp5 = new FormControl('', [Validators.required, Validators.min(1)]);

    otp6 = new FormControl('', [Validators.required, Validators.min(1)]);

    isChecked = false;

    countDown: Subscription;
    counter400 = 180;
    counter = this.counter400;
    tick = 1000;

    disableOTPInput = true;

    customDeclaration =
        '<br>' +
        '<p>In this declaration, the “<strong>Bank</strong>” or “<strong>CIMB</strong>” refers to CIMB Bank Berhad or CIMB Islamic Bank Berhad, as the case  may  be,  being  the  licensed  financial  institution  offering  the  unit  trust  account  referred  to  in  this application.</p> ' +
        '<ul>' +
          '<li>I will exercise due care not to facilitate and/or utilize funds from proceeds of any unlawful activity to purchase any unit trust(s) through my account(s) with the Bank and undertake to provide the Bank with all relevant information and documents, as and when requested, for purpose of my identification and/or the source of my funds under the “Know Your Client” principle.</li>' +
          '<li>Unit trust scheme(s) is a principal at risk product (a non-principal protected/guaranteed investment) and the Bank shall not be liable to me for any direct, indirect or consequential loss that I suffer/incur arising from this investment.</li>' +
          '<li>Subject to the applicable local laws, I give my consent to the Bank, its parent or ultimate holding company or any of its licensed financial institution affiliates (including branches) to share my information with domestic or overseas governmental, supervisory or regulatory authorities where necessary to establish my tax liability in any relevant jurisdiction.</li>' +
          '<li>Where required by domestic or overseas governmental, supervisory or regulatory authorities, I understand and agree that the Bank may be required to obtain additional documents and/or forms, which I will sign, if I am subject to the relevant jurisdiction’s requirements.</li>' +
          '<li>There are fees and charges involved in buying and selling unit trust funds.</li>' +
          '<li>The prevailing market value and distributions payable (if any) may fluctuate.</li>' +
          '<li>A cooling-off right is only given to individual investors who are investing in any unit trust scheme(s) with the Bank for the first time. It excludes any individual registered with a body approved by the Securities Commission to deal in unit trusts.  I may only exercise my cooling-off right at any CIMB branch in Malaysia within six (6) business days from the transaction date.<br>[Cooling-off right refers to the one-time right of a unit holder to obtain a refund of the investment, if it is the unit holder’s first time investing in unit trust and requests for the refund within the cooling-off period.]</li>' +
          '<li>Past performance of all investment products is not an indication of its future performance.</li>' +
          '<li>I am allowed to subscribe, redeem and/or switch my unit trust scheme(s) via CIMB Clicks or at any CIMB branch in Malaysia.</li>' +
        '</ul>';

    investorSuitabilityAssessmentDeclaration =
        '<br>' +
    '<div>' +
        '<p>As an investor, I declare and acknowledge the following:</p> ' +
        '<ul>' +
            '<li>There is NO material change obtained from my previous risk assessment profile (if any).</li>' +
            '<li>For joint investment, and in the case where the principal holder’s risk profile and joint holders’ differ, the principal holder’s risk profile will be taken as a basis for recommendation (if any).</li>' +
            '<li>I may be advised by CIMB to perform the investor’s suitability assessment again in future.</li>' +
            '<li>I may receive a call from CIMB enquiring about my selection of investment product(s).</li>' +
            '<li>I have read, understood and retained  the Disclosure Document(s)* in English and Bahasa Malaysia (or English only for selected Disclosure Document(s)), which explained the specification(s)# of the investment(s) that I applied for.<br><br>[Disclosure Document(s) refer to product highlights sheet(s), product disclosure sheet(s), prospectus(es), information memorandum(s), disclosure document(s), product agreement(s), product terms and conditions, investment account terms and conditions, master agreement(s), risk disclosure document(s) and/or term sheet(s) in relation to investment products offered.]</li>' +
        '</ul>' +
    '</div>' +
    '<div>' +
        '<p>Applicable for Investors investing in investments with a higher risk rating than current risk profile</p>' +
        '<ul>' +
            '<li>I acknowledge that I have been advised the investment product(s) that I wish to purchase is deemed unsuitable for me because it carries a higher risk rating than my risk profile.</li>' +
            '<li>I am willing to undertake the risks involved and insist on my investment decision although the investment product(s) may not be suitable for me.</li>' +
            '<li>I am advised that my investment instruction will be taken as an “execution only” transaction, which means I do not rely on any advice, opinion or view from the sales personnel or CIMB.</li>' +
        '<ul>' +
    '</div>';

    customerRiskUndertakingacknowledgment =
        '<br>' +
        '<p><strong>(APPLICABLE TO CUSTOMERS 70 YEARS AND ABOVE, AND WHO MAY HAVE LIMITED APPRECIATION / UNDERSTANDING OF DISCLOSURE DOCUMENT(S) IN ENGLISH OR BAHASA MALAYSIA)</strong><p>' +
        '<p><strong>THIS UNDERTAKING IS MANDATORY FOR CUSTOMERS WHO UNDERTAKE THE RISKS OF INVESTMENT PRODUCTS AND WHO INVESTMENT INSTRUCTIONS ARE TAKEN AS “EXECUTION ONLY” TRANSACTION.</strong><p>' +
        '<ul>' +
            '<li>I acknowledge that the features, including but not limited to the tenure, fee(s), charge(s); and risk of the investment product(s) that I am investing in has been disclosed and made known to me, and I have evaluated the risks of the investment carefully.  In this regard, I accept the risks even though the investment product(s) may not be suitable for me.</li>' +
            '<li>I understand the investment may or may not generate positive returns and I agree that CIMB Bank Berhad or CIMB Islamic Bank Berhad (collectively known as the “Bank” or “CIMB”) will process my investment instruction as an “execution only” transaction which means I have not relied on any advice, opinion or view expressed by the Bank in coming to my decision to invest.</li>' +
            '<li>I also agree that if there are losses on the investment, I will not hold the Bank liable in any way.</li>' +
        '</ul>';

    customerRiskUndertakingAckowledgement =
        '<p>' +
        '<strong>' +
        '(APPLICABLE TO CUSTOMERS 70 YEARS AND ABOVE, AND WHO MAY HAVE LIMITED APPRECIATION / UNDERSTANDING OF DISCLOSURE DOCUMENT(S) IN ENGLISH OR BAHASA MALAYSIA)' +
        'THIS UNDERTAKING IS MANDATORY FOR CUSTOMERS WHO UNDERTAKE THE RISKS OF INVESTMENT PRODUCTS AND WHO INVESTMENT INSTRUCTIONS ARE TAKEN AS “EXCECUTION ONLY” TRANSACTION.' +
       '</strong>' +
     '</p>' +
     '<ul class="no-indent">' +
       '<li>' +
         'I acknowledge that the features, including but not limited to the tenure,' +
         'fee(s), charge(s); and risk of the investment product(s) that I am investing' +
         'in has been disclosed and made known to me, and I have evaluated the risks' +
         'of the investment carefully. In this regard, I accept the risks even though' +
         'the investment product(s) may not be suitable for me.' +
       '</li>' +
       '<li>' +
         'I understand the investment may or may not generate positive returns and I' +
         'agree that CIMB Bank Berhad or CIMB Islamic Bank Berhad (collectively known' +
         'as the “Bank” or “CIMB”) will process my investment instruction as an' +
         '“execution only” transaction which means I have not relied on any advice,' +
         'opinion or view expressed by the Bank in coming to my decision to invest.' +
       '</li>' +
       '<li>' +
         'I also agree that if there are losses on the investment, I will not hold the' +
         'Bank liable in any way.' +
       '</li>' +
     '</ul>';

    asnbCustomDeclaration =
        '<ol>' +
        '<li>I have read and understood the contents of the Deed of Trust, Master Prospectus and Supplementary Master Prospectus and accept the Terms & Conditions in relation to the application/purchase of the Amanah Saham Nasional Berhad ("ASNB") funds.</li>' +
        '<li>I understand that ASNB has the absolute right to cancel the online registration of the ASNB account and to cancel or withdraw any units so purchased if any statement in this application is subsequently discovered to be untrue or false.</li>' +
        '<li>I also understand that there will be a charge by the bank when I make an investment.</li>' +
        '<li>I agree that CIMB may disclose any information to ASNB relating to this purchase/investment of the ASNB funds including information on myself or my account.</li>' +
        '<li>I understand that moneys withdrawn from my current or savings/-i account(s) to purchase the ASNB. Funds are not protected by Perbadanan Insurans Deposit Malaysia (PIDM)</li>' +
        '</ol>';

    asnbTermsAndConditions =
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
              '.Bank customer who is an existing/ registered as a holder of units in ASNB' +
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

    mediaQueryList: MediaQueryList;
    userType: string;
    fatcaDeclaratonErrorMsg = 'ETP';

    constructor(
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private analyticService: AnalyticService,
        public store: Store<fromStore.AppState>,
        mediaMatcher: MediaMatcher,
    ) {
        this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
    }

    ngOnInit(): void {
        this.countDown = null;
        this.counter = 0;
        const mobileNo = this.mobileNumber?.toString();
        const mobileNoLength = mobileNo?.length;
        if (mobileNo) {
            this.phoneNumber = '+60 xxxxx' + mobileNo.substring(mobileNoLength - 4, mobileNoLength);
        }
        if (!this.factaEnabled && this.enableRequestNumber) {
            this.isChecked = true;
        } else {
            this.isChecked = false;
        }
        this.requestTagClicked = false;

        //disable OTP input if value is no
        if (this.flow === '002') {
            this.disableOTPInput = false;
        } else {
            if (this.fatcaToggle === 'no') {
                this.disableOTPInput = true;
            }
        }

        this.store.select('userReducer').subscribe((user) => {
            this.userType = user.userType;
        });

        this.store.select('landingPageReducer').subscribe((data) => {
            if (data.landingPageStatus.fatcaStatus === 'Y') {
                this.fatcaDeclaratonErrorMsg = 'NTP';
            }
        });
        if (this.autoRequestTAC) {
            this.requestTag();
        }
    }

    getErrorMessage() {
        if (this.otp6.hasError('min')) {
            return "You've entered the wrong SMS TAC. Please try again.";
        }
        return this.otp6.hasError('max')
            ? "You've entered the wrong SMS TAC. Please try again."
            : '';
    }

    customerDeclarationModal() {
        this.dialog.open(DialogAlertComponent, {
            backdropClass: 'no-backdrop',
            panelClass: ['terms-modal', 'modal-v2'],
            maxWidth: '800px',
            autoFocus: false,
            data: {
                dialogHeading: 'Customer Declaration',
                dialogContent: '<div class="content">' + this.customDeclaration + '</div>',
            },
        });
    }

    investorSuitabilityAssessmentDeclarationModal() {
        this.dialog.open(DialogAlertComponent, {
            backdropClass: 'no-backdrop',
            panelClass: ['terms-modal', 'modal-v2'],
            maxWidth: '800px',
            autoFocus: false,
            data: {
                dialogHeading: 'INVESTOR’S SUITABILITY ASSESSMENT DECLARATION',
                dialogContent:
                    '<div class="content">' +
                    this.investorSuitabilityAssessmentDeclaration +
                    '</div>',
            },
        });
    }
    customerRiskUndertakingacknowledgmentModal() {
        this.dialog.open(DialogAlertComponent, {
            backdropClass: 'no-backdrop',
            panelClass: ['terms-modal', 'modal-v2'],
            maxWidth: '800px',
            autoFocus: false,
            data: {
                dialogHeading: 'Customer Risk Undertaking Acknowledgment',
                dialogContent:
                    '<div class="content">' + this.customerRiskUndertakingacknowledgment + '</div>',
            },
        });
    }

    cimbGroupPrivacyNoticetModal() {
        window.open('https://www.cimb.com.my/en/personal/privacy-policy.html', '_blank');
    }

    termsAndConditionModal() {
        this.dialog.open(DialogTermsAndConditionComponent, {
            backdropClass: 'no-backdrop',
            panelClass: 'terms-modal',
            maxWidth: '800px',
            autoFocus: false,
        });
    }

    requestTag() {
        this.requestedClicked = true;
        this.clearAllTac();
        this.requestTagCanEnable.emit(true);
        this.disableOTPInput = false;
        this.tagError = true;
        this.tagErrMessage = '';

        if (this.counter === 0 || this.counter === this.counter400) {
            this.countDown = null;
            this.counter = this.counter400;
            this.isChecked = false;
            this.tick = 1000;
            clearInterval(this.interval);
            const source = timer(0, this.tick);
            this.countDown = source.subscribe(() => {
                if (this.counter === 0) {
                    this.counter = this.counter400;
                    this.enableRequestTacAndStopTimer();
                } else {
                    this.counter = this.counter - 1;
                    if (this.counter === 150) {
                        this.enableRequestTac(false);
                    }
                }
            });
        }
        this.requestTACEvent.emit();
    }

    clearAllTac() {
        this.otp.setValue('');
        this.otp2.setValue('');
        this.otp3.setValue('');
        this.otp4.setValue('');
        this.otp5.setValue('');
        this.otp6.setValue('');
        this.submited = false;
        this.tagEntredCompletely.emit(false);
        this.disableConfirmButton = false;
    }

    enableRequestTac(enable: boolean) {
        if (enable) {
            this.isChecked = enable;
        }
    }

    enableRequestTacAndStopTimer() {
        if (this.countDown) {
            this.countDown.unsubscribe();
        }
        this.countDown = null;
        this.isChecked = true;
        this.counter = 0;
        // display timeout error

        this.tagError = true;
        this.tagErrMessage = 'SMS TAC has expired. Please request and submit a new one.';
        //this.disableConfirmButton = false;
    }

    confirmAndProceed() {
        const opt =
            this.otp.value +
            this.otp2.value +
            this.otp3.value +
            this.otp4.value +
            this.otp5.value +
            this.otp6.value;
        this.submited = true;
        this.confirmAndProceedEvent.emit(opt);
    }

    // cannot find any use of this function
    errorModal() {
        this.dialog.open(DialogAlertComponent, {
            panelClass: 'dialog-transaction-issue',
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-danger">',
                dialogHeading: 'Unexpected Issue',
                dialogContent:
                    '<p>We have encountered an unexpected issue. Please try again later. If this issue persists, please<strong><a class="go_to_consumer_contact_centre_link" > contact us to report this issue.</a></strong></p>',
                dialogButtonCancel: false,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Okay',
            },
        });
        this.analyticService.loadPopUpAnalytics('Unexpected Issue');
    }

    // cannot find any use of this function
    unableToProceedModal() {
        this.dialog.open(DialogAlertComponent, {
            panelClass: ['dialog-transaction-issue', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-danger">',
                dialogHeading: 'Unable to Proceed',
                dialogContent:
                    "<p>For foreign tax residents, please visit your nearest <strong>CIMB Bank's branch</strong> for assistance.</p>",
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Cancel',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Go to Dashboard',
            },
        });
        this.analyticService.loadPopUpAnalytics('Unable to Proceed');
    }

    // cannot find any use of this function
    pendingTransactionModal() {
        this.dialog.open(DialogAlertComponent, {
            panelClass: ['dialog-pending-cart', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-warning">',
                dialogHeading: 'Pending Transaction in Cart',
                dialogContent:
                    '<p>You currently have a pending switch transaction in your shopping cart. Adding a Redeem transaction to your cart will clear your cart. <br /><br />Do you want to continue?</p>',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Cancel',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Yes, clear cart and continue',
            },
        });
        this.analyticService.loadPopUpAnalytics('Pending Transaction in Cart');
    }

    // cannot find any use of this function
    autotab(current, to) {
        if (current.getAttribute && current.value.length === current.getAttribute('maxlength')) {
            to.focus();
        }
    }

    toggleShow(event) {
        const value = event && event.value ? event.value : 'no';
        this.isChecked = value === 'yes' ? true : false;
        this.fatcaToggleEvent.emit(this.isChecked);

        if (!this.isChecked) {
            this.disableConfirmButton = false;
            this.fatcaDeclaratonErrorPopUp();
            this.disableOTPInput = true;
            this.requestedClicked = false;
            this.showFactaInlineError = true;
        } else {
            this.showFactaInlineError = false;
            if (this.requestedClicked) {
                this.disableOTPInput = false;
            }
        }
    }

    onDigitInput(event) {
        this.submited = false;
        this.tagErrorChange.emit(this.submited);
        const opt =
            this.otp.value +
            this.otp2.value +
            this.otp3.value +
            this.otp4.value +
            this.otp5.value +
            this.otp6.value;
        if (opt) {
            if (opt.length >= 6) {
                this.tagEntredCompletely.emit(true);
            } else {
                this.tagEntredCompletely.emit(false);
            }
            if (opt.length >= 6 && this.requestedClicked && this.canEnableConfirmButton) {
                this.disableConfirmButton = true;
            } else {
                this.disableConfirmButton = false;
            }
        }

        let element;
        if (event.code !== 'Backspace') element = event.srcElement.nextElementSibling;

        if (event.code === 'Backspace') element = event.srcElement.previousElementSibling;

        if (element == null) return;
        else element.focus();
    }

    // cannot find any use of this function
    fatcaDeclaratonError() {
        const dialogRefNTP = this.dialog.open(DialogAlertComponent, {
            panelClass: 'dialog-transaction-issue',
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogHeading: 'FATCA/CRS Declaration',
                dialogContent:
                    '<p> I confirm that I am solely/only a tax resident of Malaysia and do not have any foreign tax residency nor US residency status (tax or otherwise).</p>',
                dialogFooterContent:
                    '<b>Note:</b> For foreign tax residents, please visit any CIMB branch for assistance.',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'No',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Yes',
            },
        });
        dialogRefNTP.afterClosed().subscribe((result) => {
            if (result === 'Yes') {
                this.fatcaDeclaratonErrorEvent.emit();
            }
        });
    }

    fatcaDeclaratonErrorPopUp() {
        let dialogContentText: string;
        let btnCancel: boolean;
        let btnProceedtext: string;
        let panelClassName: string | [string, string];

        if (this.fatcaDeclaratonErrorMsg === 'NTP') {
            panelClassName = 'dialog-transaction-issue';
            dialogContentText =
                'We regret to inform that we are unable to process your application. <br> Thank you for your interest. <br><br><b>For assistance, please visit any CIMB branch.</b>';
            btnCancel = false;
            btnProceedtext = 'Close';
        } else {
            panelClassName = ['dialog-pending-cart', 'dialog-inverse-button'];
            dialogContentText =
                '<p>For foreign tax residents, please visit your nearest<strong> CIMB branch</strong> for assistance.</p>';
            btnCancel = true;
            btnProceedtext = 'Go to Dashboard';
        }
        const dialogRefETP = this.dialog.open(DialogAlertComponent, {
            panelClass: panelClassName,
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-warning">',
                dialogHeading: 'Unable to Proceed',
                dialogContent: dialogContentText,
                dialogButtonCancel: btnCancel,
                dialogButtonCancelText: 'Close',
                dialogButtonProceed: true,
                dialogButtonProceedText: btnProceedtext,
            },
        });
        this.analyticService.loadPopUpAnalytics('Unable to Proceed');
        dialogRefETP.afterClosed().subscribe((result) => {
            if (result === 'Go to Dashboard') {
                this.fatcaDeclaratonErrorEvent.emit();
            } else {
                this.showFactaInlineError = true;
                this.resetTimer();
            }
        });
    }

    goToConsumerContactCentreLink() {
        window.open('https://www.cimb.com.my/en/personal/help-support/contact-us.html', '_blank');
    }

    resetTimer() {
        this.counter = 0;
        this.countDown.unsubscribe();
        this.isChecked = false;
        this.otp.reset();
        this.otp2.reset();
        this.otp3.reset();
        this.otp4.reset();
        this.otp5.reset();
        this.otp6.reset();
    }
    asnbCustomerDeclarationModal() {
        this.dialog.open(DialogAsnbServiceHoursComponent, {
            backdropClass: 'no-backdrop',
            panelClass: ['terms-modal', 'modal-v2'],
            maxWidth: '800px',
            autoFocus: false,
        });
    }

    customerRiskUndertakingAckowledgementModal() {
        this.dialog.open(DialogAlertComponent, {
            backdropClass: 'no-backdrop',
            panelClass: ['terms-modal', 'modal-v2', 'asnb-checkout-dialog'],
            maxWidth: '800px',
            autoFocus: false,
            data: {
                dialogHeading: 'CUSTOMER RISK UNDERTAKING ACKNOWLEDGEMENT',
                dialogContent:
                    '<div class="content indent-content">' +
                    this.customerRiskUndertakingAckowledgement +
                    '</div>',
            },
        });
    }

    asnbTermsAndConditionsModal() {
        this.dialog.open(DialogAlertComponent, {
            backdropClass: 'no-backdrop',
            panelClass: ['terms-modal', 'modal-v2', 'asnb-checkout-dialog'],
            maxWidth: '800px',
            autoFocus: false,
            data: {
                dialogHeading: 'ASNB TERMS AND CONDITIONS',
                dialogContent:
                    '<div class="content-scroller"><div class="content indent-content">' +
                    this.asnbTermsAndConditions +
                    '</div></div>',
            },
        });
    }
}

@Pipe({
    name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
    transform(value: number): string {
        const hours: number = Math.floor(value / 3600);
        const minutes: number = Math.floor((value % 3600) / 60);
        return (
            (hours >= 0.01 ? ('00' + hours).slice(-2) + ':' : '') +
            ('00' + minutes).slice(-2) +
            ':' +
            ('00' + Math.floor(value - minutes * 60)).slice(-2)
        );
    }
}
