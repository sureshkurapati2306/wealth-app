import { Component, Input } from '@angular/core';
import { AssetClassLst } from '@cimb/shared/models';

@Component({
  selector: 'cimb-table-asset-class',
  templateUrl: './table-asset-class.component.html',
  styleUrls: ['./table-asset-class.component.scss']
})
export class TableAssetClassComponent {

  @Input() tableData: AssetClassLst[];

}
