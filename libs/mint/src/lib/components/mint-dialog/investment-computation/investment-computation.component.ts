import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'cimb-investment-computation',
  templateUrl: './investment-computation.component.html',
  styleUrls: ['./investment-computation.component.scss'],
})
export class InvestmentComputationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<InvestmentComputationComponent>
  ) {}

  dialogHeading = '';
  dialogContent = '';

  ngOnInit(): void {
    this.dialogHeading = this.data?.dialogHeading;
    this.dialogContent = this.data?.dialogContent;
  }
  cancel() {
    this.dialogRef.close('cancel');
  }
}
