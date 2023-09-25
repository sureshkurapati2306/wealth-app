import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'cimb-dialog-form',
    templateUrl: './dialog-form.component.html',
    styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
    stateOptions: any[] = [];
    countryLongName = 'countryLongName';
    countryErrorMessage = 'This field is required. Please  select a value from the list.';
    selectLabelCountry = 'COUNTRY';
    selectPlaceholderCountry = 'Select Country';
    selectedCountry: any;

    inputLabelAddressLine1 = 'Address Line 1';
    inputLabelAddressLine2 = 'Address Line 2';
    inputLabelAddressLine3 = 'Address Line 3 (Optional)';
    inputLabelAddressLine4 = 'Address Line 4 (Optional)';
    addressErrorRequired = 'This field is required.';
    optionalAddressError = 'Maximum allowed length is 40.';

    inputLabelPostCode = 'Post Code';
    inputPlaceholderAddressLine1 = 'Line 1';
    inputPlaceholderAddressLine2 = 'Line 2';
    inputPlaceholderAddressLine3 = 'Line 3';
    inputPlaceholderAddressLine4 = 'Line 4';
    inputPlaceholderPostCode = 'Post Code';

    inputLabelState = 'State';
    inputPlaceholderState = 'State';

    emailPlaceholder = 'Email';

    isStateDisabled: boolean;
    isPostCodeValueChnge: boolean;

    requiredForm: FormGroup;
    emailPattern = '(?![0-9_])[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    mobilePattern = '^[0-9]*$';
    emailError = "Please enter your email address in this format \n 'yourname@example.com'";
    emailRequiredError = "Please enter email address.";
    emailMaxLengthError = "Email can't be more than 50 letters";
    postCodeErrorRequired = 'This field is required.';
    postCodeErrorMaxLength = 'Maximum allowed length is 10.';
    postCodeErrorFormat = 'Please enter valid postcode format.';
    stateError = 'Please select your Mailing Address State from the list';
    stateErrorNonMY = 'This field is required.';
    stateErrorMaxLength = 'Maximum allowed length is 10.';
    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DialogFormComponent>,
    ) {
        dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.isStateDisabled = false;
        this.isPostCodeValueChnge = false;
        if (this.data.isEmailDialog) {
            this.requiredForm = this.fb.group({
                email: [this.data.dialogEmail, []],
            });
        } else {
            this.requiredForm = this.fb.group({
                country: [this.data.country, []],
                addrLine1: [this.data.addrLine1, []],
                addrLine2: [this.data.addrLine2, []],
                addrLine3: [this.data.addrLine3, []],
                addrLine4: [this.data.addrLine4, []],
                postcode: [this.data.postcode, []],
                state: [this.data.state, []],
            });
            this.selectedCountry = this.data.country;
            this.stateOptions = this.data.stateList;
        }
    }

    checkFieldHasValue() {
        if (this.requiredForm && this.requiredForm.controls) {
            return Object.values(this.requiredForm.controls).some(
                ({ value }) => !!value || value === 0,
            );
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }

    getSelectedCountry(value) {
        if (value === 'MY') {
            this.isStateDisabled = true;
        } else {
            this.isStateDisabled = false;
        }

        this.selectedCountry = value;
        if (this.requiredForm) {
            this.requiredForm.controls['addrLine1'].reset();
            this.requiredForm.controls['addrLine2'].reset();
            this.requiredForm.controls['addrLine3'].reset();
            this.requiredForm.controls['addrLine4'].reset();
            this.requiredForm.controls['postcode'].reset();
            this.requiredForm.controls['state'].reset();
        }
    }

    updateDialog() {
        if (!this.isStateDisabled) {
            this.requiredForm.markAllAsTouched();
        } else {
            if (this.requiredForm && this.requiredForm.controls) {
                Object.keys(this.requiredForm.controls).forEach((key) => {
                    if (key != 'state') {
                        this.requiredForm.get(key).markAsTouched();
                    }
                });
            }
        }
        if (this.requiredForm && this.requiredForm.valid) {
            this.dialogRef.close(this.requiredForm.value);
        }
    }

    checkMandatoryFieldValid(controls: string) {

        if(controls === 'email') {
            if(!this.requiredForm.controls[controls].value || this.requiredForm.controls[controls].value.trim() === "") {
                return this.emailRequiredError;
            }

            if(this.requiredForm.controls[controls].value.length >= 50) {
                return this.emailMaxLengthError
            }

            if(!this.requiredForm.controls[controls].valid) {
                return this.emailError;
            }
        }

        if (controls === 'addrLine1' || controls === 'addrLine2') {
            if (!this.requiredForm.controls[controls].value) {
                return this.addressErrorRequired;
            }

            if (this.requiredForm.controls[controls].value.length >= 40) {
                return this.optionalAddressError;
            }
        }

        if (controls === 'postcode') {
            if (!this.requiredForm.controls[controls].value) {
                return this.postCodeErrorRequired;
            }

            if (isNaN(this.requiredForm.controls[controls].value)) {
                return this.postCodeErrorFormat;
            }

            if (this.requiredForm.controls[controls].value.length >= 10) {
                return this.postCodeErrorMaxLength;
            }
        }

        if (controls === 'state') {
            if (!this.requiredForm.controls[controls].value) {
                return this.stateErrorNonMY;
            }       
        }
    }
}
