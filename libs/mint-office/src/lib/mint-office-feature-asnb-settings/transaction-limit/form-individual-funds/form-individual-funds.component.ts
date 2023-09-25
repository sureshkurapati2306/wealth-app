import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BreadcrumbsPath } from '../../../core/models/breadcrumbs-path.model';

@Component({
    selector: 'cimb-office-form-individual-funds',
    templateUrl: './form-individual-funds.component.html',
    styleUrls: ['./form-individual-funds.component.scss'],
})
export class FormIndividualFundsComponent implements OnInit {
    individualFundLimitForm: FormGroup;
    breadcrumbsPaths: BreadcrumbsPath[] = [
        {
            label: 'ASNB Settings',
            url: '/asnb-settings',
        },
        {
            label: 'Edit Individual Funds Limit',
            url: null,
        },
    ];

    constructor(private fb: FormBuilder, private location: Location) {}

    ngOnInit(): void {
        this.individualFundLimitForm = this.fb.group({
            minInvestment: ['', [Validators.required]],
            maxInvestment: ['', [Validators.required]],
        });

        const frmData = {
            minInvestment: '10.00',
            maxInvestment: '100.00',
        };

        this.individualFundLimitForm.patchValue(frmData);
    }

    backHandler() {
        this.location.back();
    }

    saveIndividualFundLimit() {
        // Save All Fund Limits
    }
}
