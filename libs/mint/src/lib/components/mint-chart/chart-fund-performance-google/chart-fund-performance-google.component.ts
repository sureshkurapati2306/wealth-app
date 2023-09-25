import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { areaGraphConfig1Mnths, areaGraphConfig3Mnths } from './graph.config-fund-performance';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'cimb-chart-fund-performance-google',
  templateUrl: './chart-fund-performance-google.component.html',
  styleUrls: ['./chart-fund-performance-google.component.scss']
})
export class ChartFundPerformanceGoogleComponent implements OnInit {

  @Input() past1Mnth: any;
  @Input() past3Mnth: any;
  @Input() addClass: string;
  @Input() dataChart: any;
  @Input() switchFundPopup: any;

  graphData: any;
  past1MnthPrc: any
  past3MnthPrc: any
  options: any;
  chartType = ChartType.LineChart;
  columns = ['', ''];
  renderChart: boolean;
  mediaQueryList: MediaQueryList
  myFormatters = [
    {
      formatter: new google.visualization.NumberFormat({ fractionDigits: 4 }),
      colIndex: 1
    },
  ];

  constructor(mediaMatcher: MediaMatcher) {
    this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
    if (this.mediaQueryList.matches) {
      areaGraphConfig1Mnths.hAxis.showTextEvery = 6;
      areaGraphConfig3Mnths.hAxis.showTextEvery = 15;
    }
  }


  ngOnInit(): void {
    if (this.dataChart) {
      this.past1MnthPrc = this.dataChart.one_month;
      this.past3MnthPrc = this.dataChart.three_month;
    }

    this.options = areaGraphConfig1Mnths;
    this.graphData = this.past1Mnth ? this.past1Mnth : this.showChart(false);
    if (this.past1Mnth) {
      this.toogleData('1mnth');
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.past1Mnth?.currentValue != '' || changes.past3Mnth?.currentValue != '') {
      this.toogleData('1mnth');
    }
  }
  toogleData(data: any) {
    if (this.past1Mnth == '' || this.past3Mnth == '') {
      this.showChart(false);
    }

    if (data == '1mnth' && this.past1Mnth != '') {
      this.showChart(true);
      this.options = areaGraphConfig1Mnths;
      this.graphData = this.past1Mnth;
    } else if (data == '3mnth' && this.past3Mnth != '') {
      this.showChart(true);
      this.options = areaGraphConfig3Mnths;
      this.graphData = this.past3Mnth;
    }
  }
  showChart(showChart: boolean) {
    if (showChart) {
      this.renderChart = true
    } else {
      this.renderChart = false
    }
  }
}
