import { Component, Input } from '@angular/core';

@Component({
  selector: 'cimb-alert-warning',
  templateUrl: './alert-warning.component.html',
  styleUrls: ['./alert-warning.component.scss'],
})
export class AlertWarningComponent {
  @Input() message = '';

}
