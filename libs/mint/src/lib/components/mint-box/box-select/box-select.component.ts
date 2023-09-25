import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeatureList } from '@cimb/shared/models';

@Component({
  selector: 'cimb-box-select',
  templateUrl: './box-select.component.html',
  styleUrls: ['./box-select.component.scss']
})
export class BoxSelectComponent {

  @Input() featureList: FeatureList[];
  @Input() boxTitle: string;
  @Input() boxText: string;
  @Input() boxList: string;
  @Input() boxButtonLabel: string;

  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  buttonClickListener() {
    this.buttonClick.emit();
  }

}
