import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cimb-box-loan-cards',
  templateUrl: './box-loan-cards.component.html',
  styleUrls: ['./box-loan-cards.component.scss'],
})
export class BoxLoanCardsComponent implements OnInit {
  @Input() liabilitiesDetails;
  toolTip;

  ngOnInit(): void {
    this.toolTip ="data";
}
}
