import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WealthPortfolio } from '@cimb/shared/models';

@Component({
  selector: 'cimb-table-wealth',
  templateUrl: './table-wealth.component.html',
  styleUrls: ['./table-wealth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableWealthComponent {

  @Input() items: WealthPortfolio[] = []
  
}
