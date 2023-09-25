import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'cimb-dialog-concurrent-session-alert',
  templateUrl: './dialog-concurrent-session-alert.component.html',
  styleUrls: ['./dialog-concurrent-session-alert.component.scss']
})
export class DialogConcurrentSessionAlertComponent implements OnInit {
 

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    public dialogRef: MatDialogRef<DialogConcurrentSessionAlertComponent>) { }

    dialogImage = '';
    dialogHeading = '';
    dialogHeadingSubText = '';
    dialogContent = '';
    dialogButtonCancel = false;
    dialogButtonProceed = false;
    dialogButtonCancelText = '';
    dialogButtonProceedText = '';
    dialogClickAction = '';

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
  }
  proceed() {
    this.dialogRef.close('proceed');
  }
  cancel() {
    this.dialogRef.close('cancel');
  }

}

