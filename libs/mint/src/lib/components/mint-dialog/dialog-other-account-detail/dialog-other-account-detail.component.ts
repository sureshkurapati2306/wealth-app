import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'cimb-dialog-other-account-detail',
    templateUrl: './dialog-other-account-detail.component.html',
    styleUrls: ['./dialog-other-account-detail.component.scss'],
})
export class DialogOtherAccountDetailComponent implements OnInit {
    oterDetailForm: FormGroup;
    isRequired: boolean;
    errorMessage: string;
    selectedValue;
    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DialogOtherAccountDetailComponent>
    ) {
        dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.isRequired = true;
        this.errorMessage = 'This field is required';
        this.oterDetailForm = this.fb.group({});
        if (this.oterDetailForm) {
            this.oterDetailForm.addControl(
                this.data.oterDetailFormControlName,
                new FormControl(this.data.formControlValue, [])
            );
        }
        if (
            this.data.isRequired &&
            this.oterDetailForm &&
            this.oterDetailForm.controls
        ) {
            this.oterDetailForm.controls[
                this.data.oterDetailFormControlName
            ].setValidators([Validators.required]);
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }

    updateDialog() {
        if (this.oterDetailForm) {
            this.oterDetailForm.markAllAsTouched();
            if (this.oterDetailForm.valid) {
                this.dialogRef.close(this.oterDetailForm.value);
            }
        }
    }
    getValueOnOtherAccDetailDialog(event) {
        this.selectedValue = event;
    }

    checkFieldHasValue() {
        if (this.oterDetailForm && this.oterDetailForm.controls) {
            return Object.values(this.oterDetailForm.controls).some(
                ({ value }) => !!value || value === 0
            );
        }
    }
}
