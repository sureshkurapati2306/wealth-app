import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'cimb-ut-subheader',
  templateUrl: './ut-subheader.component.html',
  styleUrls: ['./ut-subheader.component.scss']
})
export class UtSubheaderComponent {

  @Input() name = '';
  @Input() lastUpdated = '';
  @Output() wealthDashboardClickEvent: EventEmitter<any> = new EventEmitter();
 

  onWealthDashbaordClick(){
    this.wealthDashboardClickEvent.emit()
  }
}
