import { Component, Input } from '@angular/core';

@Component({
  selector: 'cimb-mat-spinner-overlay',
  templateUrl: './mat-spinner-overlay.component.html',
  styleUrls: ['./mat-spinner-overlay.component.scss']
})
export class MatSpinnerOverlayComponent {
  @Input() diameter: 100;
  @Input() mode : "indeterminate";
  @Input() strokeWidth : 10;
  @Input() overlay: false;
  @Input() color: "primary";

}
