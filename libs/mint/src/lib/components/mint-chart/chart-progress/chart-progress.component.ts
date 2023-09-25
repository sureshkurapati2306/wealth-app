import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AccountSummary } from '@cimb/shared/models';


@Component({
  selector: 'cimb-chart-progress',
  templateUrl: './chart-progress.component.html',
  styleUrls: ['./chart-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartProgressComponent {

  @Input() accountSummary: AccountSummary;
  
}
