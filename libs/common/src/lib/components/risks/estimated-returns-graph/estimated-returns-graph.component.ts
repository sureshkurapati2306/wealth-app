import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'cimb-estimated-returns-graph',
    templateUrl: './estimated-returns-graph.component.html',
    styleUrls: ['./estimated-returns-graph.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstimatedReturnsGraphComponent {
    @Input() name: any;
}
