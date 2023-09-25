import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs';
@Component({
  selector: 'cimb-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  
  @Input() recommendedData: Highcharts.PointOptionsType[] = [];

  @Input() holdingData: Highcharts.PointOptionsType[] = [];

  @Input() recommendedList: Record<string, unknown>;

  @Input() holdingList: Record<string, unknown>;

  update = false;

  donutChart: Highcharts.Chart;

  Highcharts: typeof Highcharts = Highcharts;

  changesSubject = new Subject<boolean>();


  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: null,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    plotOptions: {
      series: {
        point: {
          events: {},
        },
      },
      pie: {
        size: '100%',
        borderWidth: 0,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: false,
        innerSize: '80%',
      },
    },
    tooltip: {
      valueSuffix: '%',
    },
    series: [
      {
        type: 'pie',
        showInLegend: false,
        name: 'Holdings',
        data: [
          {
            name: '',
            y: 100.0,
          },
        ],
        colors: ['#DDDEDE'],
      },
      {
        type: 'pie',
        size: '65%',
        showInLegend: false,
        name: 'Recommended',
        data: [
          {
            name: '',
            y: 100.0,
          },
        ],
        colors: ['#DDDEDE'],
      },
    ],
  };

  ngOnInit(): void {

    this.donutChart = Highcharts.chart('donutChart',this.chartOptions);
    
  }
  ngOnChanges(changes: SimpleChanges): void {
 
    this.changesSubject.next(true);

    if(changes) {

      if(this.holdingData && this.recommendedData) {
        this.donutChart?.series[0].setData(
          this.holdingData
         )
         this.donutChart?.series[1].setData(
          this.recommendedData
        )
      }
  
    }
    
  }
}
