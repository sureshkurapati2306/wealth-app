import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'cimb-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss'],
})
export class SubheaderComponent {
  @Input() name = '';
  @Input() lastUpdated = '';
  currentRoute = '';
  constructor(private location:Location) {
    if(location.path() != ''){
      this.currentRoute = location.path();
    } 
}
}
