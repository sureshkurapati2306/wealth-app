import { Component, Input } from '@angular/core';

@Component({
  selector: 'cimb-table-legend',
  templateUrl: './table-legend.component.html',
  styleUrls: ['./table-legend.component.scss'],
})
export class TableLegendComponent {
  @Input() items = [];
}
