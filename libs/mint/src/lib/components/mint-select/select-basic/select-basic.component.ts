import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';

interface Title {
  value: number;
  text: string;
}

export interface AccountList {
  name: string;
  isActive: boolean;
  hasJointAccount: boolean;
}


@Component({
  selector: 'cimb-select-basic',
  templateUrl: './select-basic.component.html',
  styleUrls: ['./select-basic.component.scss'],
})
export class SelectBasicComponent {
  @ViewChild(MatSelect) select: MatSelect;

  @Input() selectOption: Title[] = [];
  @Input() selectPlaceholder: string;
  @Input() selectInline: boolean;
  @Input() inputLabel: string;
  @Input() panelClass: string | string[];
  @Input() overlayPanelClass: string;
  @Input() hasLabel = true;
  @Input() selectedValue;
  @Input() isPaymentAccount = false;
  @Input() accountOpeningFields = true;

  @Input() accounts: AccountList[];
  @Output() selectedValueEventEmitter =  new EventEmitter<string>();

  isInActiveSelected = false;
  isJointAccountSelected = false;
  getSelectedValue(event:any){
    const account = event.source.selected.value; //event.source.selected.viewValue;
    this.selectedValueEventEmitter.emit(account);
  }

  getAccount(ev: any, element) {
    const account = ev.source.selected.viewValue;
    
    const funds = element.filter((item) => {
      return item.name ===account;
    });


    funds.forEach((item) => {
      if (item.isActive ===false) {
        this.isInActiveSelected = true;
      }
      if (item.hasJointAccount ===true) {
        this.isJointAccountSelected = true;
      }
    });
  }
  closeSelect() {
    this.select.close();
  }
}
