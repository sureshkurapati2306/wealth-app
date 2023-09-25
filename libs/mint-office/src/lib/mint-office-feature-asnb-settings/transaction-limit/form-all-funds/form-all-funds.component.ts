import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BreadcrumbsPath } from '../../../core/models/breadcrumbs-path.model';
@Component({
    selector: 'cimb-office-form-all-funds',
    templateUrl: './form-all-funds.component.html',
    styleUrls: ['./form-all-funds.component.scss'],
})
export class FormAllFundsComponent implements OnInit {
    allFundLimitForm: FormGroup;
    breadcrumbsPaths: BreadcrumbsPath[] = [
        {
            label: 'ASNB Settings',
            url: '/asnb-settings',
        },
        {
            label: 'Edit All Funds Limit',
            url: null,
        },
    ];

    constructor(private fb: FormBuilder, private location: Location) {}

    ngOnInit(): void {
        this.allFundLimitForm = this.fb.group({
            minAmount: ['', [Validators.required]],
            subsequentMin: ['', [Validators.required]],
        });

        const frmData = {
            fid: 1,
            minAmount: '1.00',
            subsequentMin: '10.00',
        };

        this.allFundLimitForm.patchValue(frmData);
    }

    backHandler() {
        this.location.back();
    }

    saveAllFundLimit() {
        // Save All Fund Limits
    }
}
