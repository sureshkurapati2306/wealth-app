import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'cimb-dashboard-slider',
  templateUrl: './dashboard-slider.component.html',
  styleUrls: ['./dashboard-slider.component.scss'],
})
export class DashboardSliderComponent implements OnInit {

  @Input() checkboxLabel: string;
  @Input() disabled: boolean;
  @Input() maxUnit;
  @Input() minUnit;
  @Input() sliderStep=1;
  @Output() redeemSliderValueChange: EventEmitter<any> = new EventEmitter();
  middleAmount : number;
  @Input() value= 0;
  @Input() holding= 0;
  @Input() isRedeemAll = false;

  ngOnInit(): void {
    if(typeof this.maxUnit === 'string') {
      this.maxUnit = parseFloat(this.maxUnit);
    }
    if(typeof this.minUnit === 'string') {
      this.minUnit = parseFloat(this.minUnit);
    }
    if(this.maxUnit){
      this.middleAmount = this.maxUnit / 2;
    }
  }

  toggle(event) {
    if(event) {
      if(event.checked) {
        this.value = this.maxUnit;
        this.redeemSliderValueChange.emit(this.value);
      } else {
        this.value = 0.00;
        this.redeemSliderValueChange.emit(this.value);
      }
    }

    //do not remove, might use for future
    // if (this.value < this.maxUnit) {
    //   this.value = this.maxUnit;
    //   this.redeemSliderValueChange.emit(this.value);
    // } else {
    //   this.value = 0;
    //   this.redeemSliderValueChange.emit(this.value);
    // }

  }

  onInputChange(event: MatSliderChange) {
    this.redeemSliderValueChange.emit(event.value);
  }
}
