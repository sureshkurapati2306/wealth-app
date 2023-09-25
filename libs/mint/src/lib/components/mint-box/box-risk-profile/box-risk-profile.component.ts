import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '@env/self-serve/environment';
import { MatDialog} from '@angular/material/dialog';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { AnalyticService } from '@cimb/shared/services';

@Component({
  selector: 'cimb-box-risk-profile',
  templateUrl: './box-risk-profile.component.html',
  styleUrls: ['./box-risk-profile.component.scss'],
})
export class BoxRiskProfileComponent {
  @Output() riskRedoClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() learnMoreClickEvent: EventEmitter<any> = new EventEmitter();
  @Input() rishProfile = '';
  @Input() rishProfileMessage = '';
  @Input() casaIndicator;
  @Input() solePropIndicator;
  @Input() amlCheckResult;
  @Input() riskProfileRedoAllowed: true;
  @Input() eligibleForRedoProfilling?: boolean;
  @Input() showRedoRiskProfile: boolean;
  @Input() showLearnMore: boolean;
  r2Enabled = environment.r2Enabled;
  constructor(public dialog: MatDialog, public analyticService: AnalyticService) {

  }

  onRedoRiskProfilingClick() {
    if(this.casaIndicator === 'Y') {
      const casa_heading = 'Unable to Transact (No CASA)';
      const casa_content = '<p>To complete your transaction, open a current or savings account/-i with CIMB. You may apply via CIMB Clicks.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>';
      const casa_proceedText = 'Okay'
      this.applyNoCASASopePropAML(casa_heading, casa_content, casa_proceedText);
      this.analyticService.loadPopUpAnalytics('Unable to Transact (No CASA)');
    }
    //Sole prop indicator
    else if (this.solePropIndicator === 'P' ) {
      const soleProp_heading = 'Unable to Transact <p><strong>(Sole Proprietor Customer)</strong></p>';
      const soleProp_content = '<br><p>For Unit Trust transactions as a sole proprietor customer, please visit any CIMB branch.</p>';
      const soleProp_proceedText = 'Okay';
      this.applyNoCASASopePropAML(soleProp_heading, soleProp_content, soleProp_proceedText);
      this.analyticService.loadPopUpAnalytics('Unable to Transact <br> (Sole Proprietor Customer)');
    }
    // Under AML watch list
    else if(!this.amlCheckResult ) {
      const aml_heading = 'Unable to Proceed';
      const aml_content = '<p>We regret to inform that we are unable to process your application. Thank you for your interest.</p><p><strong>For assistance, please visit any CIMB branch.</strong></p>';
      const aml__proceedText = 'Close';
      this.applyNoCASASopePropAML(aml_heading, aml_content, aml__proceedText);
      this.analyticService.loadPopUpAnalytics('Unable to Proceed');
    }
    else {
      this.riskRedoClickEvent.emit();
    }
  }
  applyNoCASASopePropAML(heading: string, content: string, proceedText: string) {
    this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogHeading: heading,
        dialogContent: content,
        dialogButtonProceed: true,
        dialogButtonProceedText: proceedText,
        dialogImage:
          '<em class="icon-danger"></em>',
     },
    });
  }
  onLearnMoreClick() {
    this.learnMoreClickEvent.emit();
  }
}
