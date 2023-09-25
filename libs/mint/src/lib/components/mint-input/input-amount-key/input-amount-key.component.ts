import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
    selector: 'cimb-input-amount-key',
    templateUrl: './input-amount-key.component.html',
    styleUrls: ['./input-amount-key.component.scss'],
})
export class InputAmountKeyComponent implements OnInit, OnChanges, OnDestroy {
    @Input() inputPlaceholder? = '';
    @Input() inputForm: FormGroup;
    @Input() inputFormControlName: string;
    @Input() isRequired?: boolean;
    @Input() isDisabled: boolean;
    @Input() errorMessageMaxAmount?: string;
    @Input() errorMessageMinAmount?: string;
    @Input() errorMessageRequired?: string;
    @Input() errorMessageRedeem?: string;
    @Input() numberPattern?: string = '\\d{1,3}(,\\d{3})*(\\.\\d+)?';
    @Input() isRoundNumber?: boolean = false;
    // @Input() numberPattern?: string;
    @Input() maxAmount?: number;
    @Input() minAmount?: number;
    @Input() redeemAmount?: number;
    @Input() flow: string;
    @Input() showMyrPrefix? = true;
    @Input() isAsnbFavouritePurchase? = false;
    @Output() focusoutEvent? = new EventEmitter<any>();
    @Output() changeValuEvent? = new EventEmitter<any>();
    @Input() isFormArray?: boolean = false;
    @Output() addFormArrayControl = new EventEmitter<any>();
    @Output() keyupEvent = new EventEmitter<any>();
    isFocus = false;
    isAnotherThanZero = false;
    vallidatorsArray = [];
    count = 0;
    inputKeyPress = '';

    inputFormControlSubscription: Subscription;

    ngOnInit(): void {
        if (
            this.inputForm &&
            this.inputForm.controls &&
            this.inputForm.controls[this.inputFormControlName].value
        ) {
            this.inputForm.controls[this.inputFormControlName].setValue(
                this.inputForm.controls[this.inputFormControlName].value.toString(),
            );
            this.callThousandCommaSeperatorAndTwoDecimal();
        }

        if (this.isRequired) {
            this.vallidatorsArray.push(Validators.required);
        }
        if (this.numberPattern) {
            this.vallidatorsArray.push(Validators.pattern(this.numberPattern));
        }

        if (this.vallidatorsArray && this.inputForm && this.inputForm.controls) {
            this.inputForm.controls[this.inputFormControlName].setValidators(this.vallidatorsArray);
        }

        //adds validation on first load
        //need to subscribe to inputForm to check for value changes and markAllAsTouched to input when passes thru conditions
        this.applyValidation();
        this.inputFormControlSubscription = this.inputForm
            .get(this.inputFormControlName)
            .valueChanges.subscribe(() => {
                if (!isNaN(parseFloat(this.inputForm.controls[this.inputFormControlName].value))) {
                    if (parseFloat(this.inputForm.controls[this.inputFormControlName].value) != 0) {
                        this.inputForm.markAllAsTouched();
                    }
                }
            });
    }

    onFocusOutEvent() {
        if (
            this.inputForm &&
            this.inputForm.controls &&
            this.inputForm.controls[this.inputFormControlName].value
        ) {
            if (parseFloat(this.inputForm.controls[this.inputFormControlName].value) === 0) {
                this.inputForm.controls[this.inputFormControlName].setValue(null);
                this.isFocus = false;
            } else {
                this.isFocus = true;
            }
        } else {
            this.isFocus = false;
        }
        this.focusoutEvent.emit(true);
    }

    onFocus() {
        if (!this.inputForm.controls[this.inputFormControlName].value) {
            this.inputForm.controls[this.inputFormControlName].setValue('0.00');
            if (this.showMyrPrefix) {
                this.showMyrPrefix = true;
            }
        }
        this.isFocus = true;
    }

    acceptNumbersOnly(event) {
        const regex = new RegExp('^[0-9]*$');
        const str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(str)) {
            return true;
        }
        return false;
    }

    replaceInvalidCharacters(event) {
        if (!this.isRoundNumber) {
            const newValue = event.target.value;
            const filteredString = newValue.replace(/[^0-9]/g, '');
            this.inputForm.controls[this.inputFormControlName].setValue(filteredString);
        }
    }

    onPaste(event) {
        event.preventDefault();
        return false;
    }

    ngOnChanges() {
        if (this.isFormArray) {
            this.addFormArrayControl.emit(this.inputForm);
        }
        this.changeValuEvent.emit(true);

        if (this.isDisabled) {
            this.inputForm.controls[this.inputFormControlName].disable();
        } else {
            this.inputForm.controls[this.inputFormControlName].enable();
        }
    }

    isFormValid() {
        if (this.inputForm && this.inputForm.controls) {
            return (
                !this.inputForm.controls[this.inputFormControlName].valid &&
                this.inputForm.controls[this.inputFormControlName].touched
            );
        }
    }

    applyValidation() {
        if (this.maxAmount) {
            if (this.count === 0) this.vallidatorsArray.push(ValidateMaxAmount(this.maxAmount));
            else ValidateMaxAmount(this.maxAmount);
        }
        if (this.minAmount) {
            if (this.count === 0) this.vallidatorsArray.push(ValidateMinAmount(this.minAmount));
            else ValidateMinAmount(this.minAmount);
        }

        if (this.redeemAmount) {
            if (this.count === 0)
                this.vallidatorsArray.push(redemptionUnitsExceed(this.redeemAmount));
            else redemptionUnitsExceed(this.redeemAmount);
        }

        if (
            this.vallidatorsArray &&
            this.inputForm &&
            this.inputForm.controls &&
            this.count === 0
        ) {
            this.inputForm.controls[this.inputFormControlName].setValidators(this.vallidatorsArray);
        }
        this.count++;
    }

    applyNumberFormatting(event: KeyboardEvent) {
        if (this.isRoundNumber) {
            this.updateValue(event);
            return;
        }

        if (!isNaN(parseFloat(this.inputForm.controls[this.inputFormControlName].value))) {
            if (parseFloat(this.inputForm.controls[this.inputFormControlName].value) != 0) {
                this.isAnotherThanZero = true;
                if (this.inputForm.controls[this.inputFormControlName].dirty) {
                    this.inputForm.markAllAsTouched();
                }
                this.applyValidation();
                if (
                    this.inputForm.controls[this.inputFormControlName].value.length > 4 &&
                    parseFloat(
                        this.inputForm.controls[this.inputFormControlName].value.substring(0, 5),
                    ) === 0
                ) {
                    if (
                        !isNaN(
                            parseFloat(
                                this.inputForm.controls[this.inputFormControlName].value.slice(-2),
                            ),
                        )
                    ) {
                        this.inputForm.controls[this.inputFormControlName].setValue(
                            this.inputForm.controls[this.inputFormControlName].value.slice(-2),
                        );
                    }
                }
                if (
                    this.inputForm &&
                    this.inputForm.controls &&
                    this.inputForm.controls[this.inputFormControlName].value
                ) {
                    this.inputForm.controls[this.inputFormControlName].setValue(
                        this.inputForm.controls[this.inputFormControlName].value.replaceAll(
                            ',',
                            '',
                        ),
                    );
                    this.inputForm.controls[this.inputFormControlName].setValue(
                        this.inputForm.controls[this.inputFormControlName].value.replaceAll(
                            '.',
                            '',
                        ),
                    );
                }
                this.keyupEvent.emit(true);
                this.callThousandCommaSeperatorAndTwoDecimal();
            } else {
                this.inputForm.controls[this.inputFormControlName].setValue('0.00');
            }
        } else {
            event.preventDefault();
            return false;
        }
    }

    callThousandCommaSeperatorAndTwoDecimal() {
        if (
            this.inputForm.controls[this.inputFormControlName].value &&
            this.inputForm.controls[this.inputFormControlName].value.length >= 6
        ) {
            if (this.inputForm.controls[this.inputFormControlName].value.indexOf('.') == -1) {
                const last2 = this.inputForm.controls[this.inputFormControlName].value.slice(-2);
                this.inputForm.controls[this.inputFormControlName].setValue(
                    this.inputForm.controls[this.inputFormControlName].value
                        .slice(0, -2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                        '.' +
                        last2,
                );
            }
        } else {
            if (parseFloat(this.inputForm.controls[this.inputFormControlName].value) > 0) {
                const val = (
                    this.inputForm.controls[this.inputFormControlName].value / 100
                ).toString();
                this.inputForm.controls[this.inputFormControlName].setValue(
                    parseFloat(val).toFixed(2).toString(),
                );
            } else {
                this.inputForm.controls[this.inputFormControlName].setValue(null);
            }
        }
    }

    updateValue(event: KeyboardEvent) {
        let { amount } = this.inputForm.value as { amount: string };
        if (amount) {
            const whole = amount.split('.')[0];
            amount = whole + getDecimal(amount);
            amount = amount.match(/[0-9]/g).join('');

            if (event.key === 'Backspace') {
                if (amount.length > 1) {
                    amount = amount.slice(0, -1);
                } else {
                    amount = '0';
                }
            }

            amount = parseInt(amount).toLocaleString(); // add commas
            if (!amount.includes('.00')) {
                amount = amount + '.00';
            }
            this.inputForm.controls[this.inputFormControlName].setValue(amount);
        } else {
            this.inputForm.controls[this.inputFormControlName].setValue('0.00');
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (this.isRoundNumber) {
            // Prevent long backspace press on round number
            if (event.key === 'Backspace') {
                event.preventDefault();
            }
        }
    }

    ngOnDestroy(): void {
        this.inputFormControlSubscription.unsubscribe();
    }
}

function ValidateMinAmount(minAmount: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value) {
            const val = control.value.toString().replaceAll(',', '');
            if (!(parseFloat(val) >= minAmount)) {
                return { invalidMinAmount: true };
            }
        }
        return null;
    };
}

function ValidateMaxAmount(maxAmount: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value) {
            const val = control.value.toString().replaceAll(',', '');
            if (!(parseFloat(val) <= maxAmount)) {
                return { invalidMaxAmount: true };
            }
        }
        return null;
    };
}

function redemptionUnitsExceed(holding: number): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value) {
            const val = control.value.toString().replaceAll(',', '');
            if (!(parseFloat(val) <= holding)) {
                return { redemptionUnitsExceed: true };
            }
        }
        return null;
    };
}

function getDecimal(amount: string): string {
    let decimal = amount.split('.')[1];

    if (decimal) {
        if (decimal.match(/00([0-9]+)/)) {
            const match = decimal.match(/00([0-9]+)/);
            decimal = match[1];
        } else if (decimal.match(/0([1-9]+)0/)) {
            const match = decimal.match(/0([1-9]+)0/);
            decimal = match[1];
        } else if (decimal.match(/([1-9]+)00/)) {
            const match = decimal.match(/([1-9]+)00/);
            decimal = match[1];
        } else {
            decimal = '';
        }
    }

    return decimal;
}
