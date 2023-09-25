import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { capitalize } from 'lodash-es';
import { donutGraphConfig } from './graph.config';

@Component({
    selector: 'cimb-recommended-assets-chart',
    templateUrl: './recommended-assets-chart.component.html',
    styleUrls: ['./recommended-assets-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedAssetsChartComponent implements OnInit {
    @Input() data: any;
    @Input() name: string;
    @Output() riskProfileAssetAllocation: EventEmitter<any> = new EventEmitter()
    graphData: any;

    options = donutGraphConfig;
    chartType = ChartType.PieChart;
    columns = ['className', 'recommendedValue'];

    ngOnInit(): void {
        this.transformData();
    }

    transformData() {
        const result = this.data.filter((risk) => risk.riskName === this.name.toUpperCase());
        this.graphData = result.map((a) => [capitalize(a.className), a.recommendedValue]);
        result.map((riskProfileAssetAllocation) => {
            const allocation = riskProfileAssetAllocation.riskProfileAssetAllocation;
            this.riskProfileAssetAllocation.emit(allocation);
        });
    }
}
