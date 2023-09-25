import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'cimb-box-portfolio',
  templateUrl: './box-portfolio.component.html',
  styleUrls: ['./box-portfolio.component.scss'],
})
export class BoxPortfolioComponent implements OnInit {
  @Input() messages = '';
  @Input() portfoliolist = [];
  @Input() chartsData: Highcharts.Options;
  @Input() showChart = false;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options;
  

  ngOnInit(): void {
    this.chartOptions = this.chartsData;
  }
}
