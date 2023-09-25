import { Component, Input } from '@angular/core';

@Component({
  selector: 'cimb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() menuOptions: any;

  selectedItem: number = null;
  selected(item, i: number) {
    this.selectedItem = i;
  }
}
