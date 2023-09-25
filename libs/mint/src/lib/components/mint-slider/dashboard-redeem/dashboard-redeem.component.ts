import { Component, Input } from '@angular/core';

@Component({
  selector: 'cimb-dashboard-redeems',
  templateUrl: './dashboard-redeem.component.html',
  styleUrls: ['./dashboard-redeem.component.scss'],
})
export class DashboardRedeemComponent {
  @Input() checkboxLabel: string;

  value = 0;
  toggle() {
    if (this.value < 100) {
      this.value = 100;
    } else {
      this.value = 0;
    }
  }
}
