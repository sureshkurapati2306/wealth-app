import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'cimb-dialog-portfolio',
  templateUrl: './dialog-portfolio.component.html',
  styleUrls: ['./dialog-portfolio.component.scss'],
})
export class DialogPortfolioComponent implements OnInit {
  rishProfile = '';
  rishProfileMessage = '';
  riskProfileRedoAllowed: true;
  showRedoRiskProfile: boolean;
  showLearnMore: boolean;

  casaIndicator: string;
  solePropIndicator: string;
  amlCheckResult: boolean;
  messages = '';
  portfoliolist = [];
  chartsData: Highcharts.Options;
  showChart = false;

  chartOptions: Highcharts.Options;

  Highcharts: typeof Highcharts = Highcharts;


  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<DialogPortfolioComponent>
  ) { }

  ngOnInit(): void {
    this.rishProfile = this.data?.rishProfile;
    this.rishProfileMessage = this.data?.rishProfileMessage;
    this.riskProfileRedoAllowed = this.data?.riskProfileRedoAllowed;
    this.showRedoRiskProfile = this.data?.showRedoRiskProfile;
    this.showLearnMore = this.data?.showLearnMore;

    this.chartOptions = this.data?.chartsData;
    this.messages = this.data?.messages;
    this.portfoliolist = this.data?.portfoliolist;
    this.showChart = this.data?.showChart;
    this.casaIndicator = this.data?.casaIndicator;
    this.solePropIndicator = this.data?.solePropIndicator;
    this.amlCheckResult = this.data?.amlCheckResult;
  }


  riskRedoClickEvent(): boolean {
    this.dialogRef.close({ page: 'risk-profile/questions' });
    return true;
  }
  learnMoreClickEvent(): boolean {
    this.dialogRef.close({ page: 'risk-profile/results' });
    return true;
  }


}
