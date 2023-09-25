import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'cimb-chart-portfolio',
  templateUrl: './chart-portfolio.component.html',
  styleUrls: ['./chart-portfolio.component.scss'],
})
export class ChartPortfolioComponent implements OnInit {
  @Input() chartsListData: Highcharts.Options;
  @Input() displayChart = false;
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options;
  

  ngOnInit(): void {
    this.chartOptions = this.chartsListData;
  }
}
