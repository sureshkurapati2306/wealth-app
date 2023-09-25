import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AssetLiability } from '@cimb/shared/models';

@Component({
  selector: 'cimb-box-product-wealth',
  templateUrl: './box-product-wealth.component.html',
  styleUrls: ['./box-product-wealth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxProductWealthComponent {
  @Output() riskRedoClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() learnMoreClickEvent: EventEmitter<any> = new EventEmitter();
  @Input() rishProfile = '';
  @Input() rishProfileMessage = '';
  @Input() riskProfileRedoAllowed: true;

  myProducts: string[] = [];

  @Input() set assetLiabilities(data: AssetLiability[]) {
    this.myProducts = data.map(al => al.alcName);
  }
  
  onRedoRiskProfilingClick() {
    this.riskRedoClickEvent.emit();
  }

  onLearnMoreClick() {
    this.learnMoreClickEvent.emit();
  }
}
