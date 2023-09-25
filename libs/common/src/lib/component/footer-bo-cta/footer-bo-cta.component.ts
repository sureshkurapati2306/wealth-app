import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cimb-footer-bo-cta',
  templateUrl: './footer-bo-cta.component.html',
  styleUrls: ['./footer-bo-cta.component.scss']
})
export class FooterBoCtaComponent {

  @Input() btnLabel = 'Save';
  @Input() disabled =  false;

  @Output() clickEvent = new EventEmitter<boolean>();

  onClick(): void {
    this.clickEvent.emit(true);
  }

}
