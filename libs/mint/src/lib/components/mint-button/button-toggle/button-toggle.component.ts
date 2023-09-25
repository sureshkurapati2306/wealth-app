import { Component, EventEmitter, Input,  OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface ButtonToggle {
  value: number;
  label: string;
}

@Component({
  selector: 'cimb-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss']
})
export class ButtonToggleComponent implements OnInit {

  @Input() toggles: ButtonToggle[] = [];
  @Input() inputLabel?: string;
  @Input() isRequired: boolean;
  @Output() changeEvent = new EventEmitter<string>();
  @Input() toggleFormControlName: string;
  @Input() toggleForm: FormGroup;
  @Input() errorMessage: string ;

  ngOnInit(): void {
    this.isRequired = false;
    if (this.toggleForm) {
      this.toggleForm.addControl(this.toggleFormControlName, new FormControl('', []));
    }
    if (this.isRequired && this.toggleForm && this.toggleForm.controls ) {
      this.toggleForm.controls[this.toggleFormControlName].setValidators(Validators.required);
    }

  }

  isFormValid() {
    if(this.toggleForm && this.toggleForm.controls){
      return !this.toggleForm.controls[this.toggleFormControlName].valid && this.toggleForm.controls[this.toggleFormControlName].touched;
    }
  }

}
