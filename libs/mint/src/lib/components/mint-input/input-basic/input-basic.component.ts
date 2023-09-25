import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cimb-input-basic',
    templateUrl: './input-basic.component.html',
    styleUrls: ['./input-basic.component.scss'],
})
export class InputBasicComponent implements OnInit, OnChanges {
    @Input() inputLabel? = '';
    @Input() inputPlaceholder = '';
    @Input() inputForm: FormGroup;
    @Input() inputFormControlName: string;
    @Input() isRequired?: boolean;
    @Input() errorMessage?: string;
    @Input() emailPattern?: string;
    @Input() pattern?: string;
    @Input() maxLength?: number;
    @Input() minLength?: number;
    @Input() isForAsnb = false;
    @Output() focusoutEvent? = new EventEmitter<any>();
    @Output() changeValuEvent? = new EventEmitter<any>();

    ngOnInit(): void {
        if (this.inputForm) {
            this.inputForm.addControl(this.inputFormControlName, new FormControl('', []));
        }
        const vallidatorsArray = [];
        if (this.isRequired) {
            vallidatorsArray.push(Validators.required);
        }
        if (this.emailPattern) {
            vallidatorsArray.push(Validators.pattern(this.emailPattern));
        }
        if (this.pattern) {
            vallidatorsArray.push(Validators.pattern(this.pattern));
        }
        if (this.maxLength) {
            vallidatorsArray.push(Validators.maxLength(this.maxLength));
        }
        if (this.minLength) {
            vallidatorsArray.push(Validators.minLength(this.minLength));
        }
        this.inputForm.controls[this.inputFormControlName].setValidators(vallidatorsArray);
    }

    onFocusOutEvent() {
        this.focusoutEvent.emit(true);
    }

    ngOnChanges() {
        this.inputForm.markAllAsTouched();
        this.changeValuEvent.emit(true);
    }

    isFormValid() {
        if (this.inputForm && this.inputForm.controls) {
            return (
                !this.inputForm.controls[this.inputFormControlName].valid &&
                this.inputForm.controls[this.inputFormControlName].touched && 
                this.inputForm.controls[this.inputFormControlName].dirty
            );
        }
    }
}
