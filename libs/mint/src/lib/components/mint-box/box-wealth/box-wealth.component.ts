import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AccountSummary, WealthPortfolio } from '@cimb/shared/models';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'cimb-box-wealth',
  templateUrl: './box-wealth.component.html',
  styleUrls: ['./box-wealth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxWealthComponent implements OnInit {
  @Input() messages = '';
  portfolioList: WealthPortfolio[] = [];
  @Input() chartsData: Highcharts.Options;
  @Input() showChart = false;
  @Input() set accountSummary(data: AccountSummary) {

    this._accountSummary = data;

    this.portfolioList = [
      {
        name: "Assets",
        amount: this._accountSummary.totalAsset,
        classHexa: "#36b37e"
      },
      {
        name: "Liabilities",
        amount: this._accountSummary.totalLiability,
        classHexa: "#567dcc"
      }
    ];

  }

  _accountSummary: AccountSummary;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options;
  
  ngOnInit(): void {
    this.chartOptions = this.chartsData;
  }
}
