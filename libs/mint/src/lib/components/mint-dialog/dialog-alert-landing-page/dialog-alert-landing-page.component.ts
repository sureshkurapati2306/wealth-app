import {
  Component,
  ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'cimb-dialog-alert-landing-page',
  templateUrl: './dialog-alert-landing-page.component.html',
  styleUrls: ['./dialog-alert-landing-page.component.scss']
})
export class DialogAlertLandingPageComponent implements OnInit {
  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialogRef: MatDialogRef<DialogAlertLandingPageComponent>,
      private elementRef: ElementRef,
      private router: Router,
  ) { }

  riskProfileActive = false;
  riskProfileCompleted = false;
  selectInvestActive = false;
  selectInvestCompleted = false;
  openAccountActive = false;
  openAccountCompleted = false;
  confirmPurchaseActive = false;
  confirmPurchaseCompleted = false;



  topHeading = 'Invest in Unit Trusts'
  secondHeading = 'Complete Your First Investment'
  dialogImage = '';
  dialogHeading = '';
  dialogHeadingSubText = '';
  dialogContent = '';
  dialogButtonCancel = false;
  dialogButtonProceed = false;
  dialogButtonCancelText = '';
  dialogButtonProceedText = '';
  dialogClickAction = '';
  dialogFooter = null;
  dialogFooterSubText = null;
  dialogFooterContent = null;
  uiLoaded = false;
  dialogShowCloseButtonCancel = false;
  dialogSecondButton = false;
  dialogSecondButtonText = null;
  isOpenAccountCompleted = false;
  proceedButtonRedirection = null;
  secondButtonRedirection = null;


  ngOnInit(): void {
      this.dialogImage = this.data?.dialogImage;
      this.dialogHeading = this.data?.dialogHeading;
      this.dialogHeadingSubText = this.data?.dialogHeadingSubText;
      this.dialogContent = this.data?.dialogContent;
      this.dialogButtonCancel = this.data?.dialogButtonCancel;
      this.dialogButtonProceed = this.data?.dialogButtonProceed;
      this.dialogButtonCancelText = this.data?.dialogButtonCancelText;
      this.dialogButtonProceedText = this.data?.dialogButtonProceedText;
      this.dialogClickAction = this.data?.dialogClickAction;
      this.dialogFooter = this.data?.dialogFooter;
      this.dialogFooterSubText = this.data?.dialogFooterSubText;
      this.dialogFooterContent = this.data?.dialogFooterContent;
      this.dialogShowCloseButtonCancel = this.data?.dialogShowCloseButtonCancel;
      this.dialogSecondButton = this.data?.dialogSecondButton;
      this.dialogSecondButtonText = this.data?.dialogSecondButtonText;
      this.isOpenAccountCompleted= this.data?.isOpenAccountCompleted;
      this.proceedButtonRedirection = this.data?.proceedButtonRedirection;
      this.secondButtonRedirection = this.data?.secondButtonRedirection;
      


      if(this.data?.progressStep == 1){
        this.riskProfileActive = true;
      }
      if(this.data?.progressStep == 2){
        this.riskProfileCompleted = true;
        this.selectInvestActive = true;
        if(this.isOpenAccountCompleted){
          this.openAccountCompleted = true;
        }
      }
      if(this.data?.progressStep == 3){
        this.riskProfileCompleted = true;
        this.openAccountActive = true;
        this.selectInvestCompleted = true
      }
      if(this.data?.progressStep == 4){
        this.riskProfileCompleted = true;
        this.confirmPurchaseActive = true;
        this.selectInvestCompleted = true;
        this.openAccountCompleted = true;
      }
  }
  proceed() {
    this.dialogRef.close();
    this.router.navigate([this.proceedButtonRedirection]);
  }
  secondButtonAction() {
    this.dialogRef.close();
    this.router.navigate([this.secondButtonRedirection]);
  }
}

