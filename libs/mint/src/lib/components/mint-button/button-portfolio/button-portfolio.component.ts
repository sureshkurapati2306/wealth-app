import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import { DialogPortfolioComponent } from '../../mint-dialog/dialog-portfolio/dialog-portfolio.component';

@Component({
  selector: 'cimb-button-portfolio',
  templateUrl: './button-portfolio.component.html',
  styleUrls: ['./button-portfolio.component.scss'],
})
export class ButtonPortfolioComponent implements OnInit {
  @Input() rishProfile = '';
  @Input() rishProfileMessage = '';
  @Input() riskProfileRedoAllowed: true;
  @Input() messages = '';
  @Input() showRedoRiskProfile: boolean;
  @Input() showLearnMore: boolean;
  @Input() casaIndicator;
  @Input() solePropIndicator;
  @Input() amlCheckResult;
  Highcharts: typeof Highcharts = Highcharts;

  @Input() chartsData: Highcharts.Options;
  @Input() portfoliolist =[];
  @Input() showChart: true;

  @Output() navigateEvent: EventEmitter<any> = new EventEmitter();


  chartOptions: Highcharts.Options;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.chartOptions = this.chartsData;
  }

  dialogPortfolio() {
    this.chartOptions = this.chartsData;
    const dialogRef = this.dialog.open(DialogPortfolioComponent, {
      panelClass: 'full-width',
      maxWidth: '772px',
      autoFocus: false,
      data: {
        rishProfile: this.rishProfile,
        rishProfileMessage: this.rishProfileMessage,
        riskProfileRedoAllowed: this.riskProfileRedoAllowed,
        showRedoRiskProfile: this.showRedoRiskProfile,
        showLearnMore: this.showLearnMore,
        casaIndicator: this.casaIndicator,
        solePropIndicator: this.solePropIndicator,
        amlCheckResult: this.amlCheckResult,

        messages: this.messages,
        chartsData: this.chartOptions ,
        portfoliolist: this.portfoliolist,
        showChart: this.showChart,
      },
    });

    dialogRef.afterClosed().subscribe(page => {
      this.navigateEvent.emit(page);
    });
  }
}
