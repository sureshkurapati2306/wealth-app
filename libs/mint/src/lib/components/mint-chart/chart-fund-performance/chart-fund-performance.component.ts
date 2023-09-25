import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'cimb-chart-fund-performance',
  templateUrl: './chart-fund-performance.component.html',
  styleUrls: ['./chart-fund-performance.component.scss'],
})
export class ChartFundPerformanceComponent {
  @Input() past1Mnth: number;
  @Input() past3Mnth: number;
  @Input() addClass: string;

  Highcharts: typeof Highcharts = Highcharts;

  options = {
    chart: {
      type: 'areaspline',
      spacingTop: 30,
      spacingRight: 60,
      height: 284,
    },
    tooltip: {
      borderColor: '#567DCC',
      borderRadius: 5,
      shared: true,
      useHTML: true,
      headerFormat: '<small>{point.key}</small><table>',
      pointFormat:
        '<tr><td>NAV Price: </td>' +
        '<td style="text-align: right"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      valueDecimals: 2,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              enabled: false,
            },
          },
        },
      ],
    },
    accessibility: {
      description: '',
    },
    title: {
      text: '',
    },

    xAxis: {
      allowDecimals: true,
      title: {
        text: 'Date',
        align: 'high',
        rotation: 0,
        x: 35,
        offset: -8,
        style: {
          fontSize: 12 + 'px',
          fontWeight: 600,
          color: '#7B7D7E',
        },
      },
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%b',
        day: '%b  %e',
      },
      lineColor: '#D5D5D5',
      lineWidth: 1,
      minorTickLength: 0,
      tickLength: 0,
    },
    yAxis: {
      allowDecimals: true,
      title: {
        text: 'NAV Price',
        style: {
          fontSize: 12 + 'px',
          fontWeight: 600,
          color: '#7B7D7E',
        },
        useHTML: true,
        floating: true,
        align: 'high',
        rotation: 0,
        y: -20,
        offset: -30,
        marginBottom: 20,
      },
      lineColor: '#D5D5D5',
      lineWidth: 1,
      gridLineDashStyle: 'Dash',
      labels: {
        formatter: function () {
          return 'MYR ' + this.value;
        },
      },
    },
    plotOptions: {
      areaspline: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, new Highcharts.Color('#49CCB5').setOpacity(0.6).get('rgba')],
            [1, new Highcharts.Color('#fff').setOpacity(0.6).get('rgba')],
          ],
        },
        pointStart: 0.7,
        lineWidth: 0,
        threshold: null,
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            enabled: false,
            lineWidth: 0,
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        showInLegend: false,
        name: '',
        data: [
          [Date.UTC(2021, 1, 8), 0.74],
          [Date.UTC(2021, 1, 10), 0.72],
          [Date.UTC(2021, 1, 12), 0.82],
          [Date.UTC(2021, 1, 17), 0.71],
          [Date.UTC(2021, 1, 19), 0.75],
          [Date.UTC(2021, 1, 23), 0.84],
          [Date.UTC(2021, 1, 25), 0.74],
          [Date.UTC(2021, 2, 1), 0.84],
          [Date.UTC(2021, 2, 3), 0.8],
          [Date.UTC(2021, 2, 5), 0.89],
        ],
      },
    ],
  };
}
