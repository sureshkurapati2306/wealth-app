import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cimb-dialog-risk-category',
  templateUrl: './dialog-risk-category.component.html',
  styleUrls: ['./dialog-risk-category.component.scss']
})
export class DialogRiskCategoryComponent implements OnInit {
  dialogContent = '';
  riskName = '';
  riskClass = '';
  hishRiskFundsList = [];
  buttonLabel = '';
  highRiskCount: number;
  flow = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<DialogRiskCategoryComponent>
  ) {}
  ngOnInit(): void {
    this.dialogContent = this.data?.dialogContent;
    this.buttonLabel = this.data?.dialogButtonProceedText;
    this.riskName = this.data?.riskName;
    this.riskClass = this.data?.riskClass;
    this.hishRiskFundsList = this.data?.hishRiskFundsList;
    this.highRiskCount = this.data?.highRiskCount;
    this.flow = this.data?.flow;
  }
  proceed():void {
    this.dialogRef.close('YES');
  }
  cancel():void {
    this.dialogRef.close('cancel');
  }
}
