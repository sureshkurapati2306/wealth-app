import { Component, Input } from '@angular/core';

interface ButtonToggle {
  value: number;
  label: string;
}

@Component({
  selector: 'cimb-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss']
})

export class FilterSortComponent {

  @Input() filterName = '';
  @Input() filters: ButtonToggle[] = [];

}
