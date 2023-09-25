import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { getOperationHours } from '../+state/asnb-settings.selectors';
import { AsnbSettingsService } from '../../core/services/asnb-settings.service';

import { SnackBarService } from '../../core/services/snack-bar.service';
import { catchError } from 'rxjs/operators';

import * as MintOfficeActions from '../../core/+state/mint-office.actions';
@Component({
    selector: 'cimb-office-operation-hours-form',
    templateUrl: './operation-hours-form.component.html',
    styleUrls: ['./operation-hours-form.component.scss'],
})
export class OperationHoursFormComponent implements OnInit {
    operationHourForm: FormGroup;
    breadcrumbsPaths: BreadcrumbsPath[] = [
        {
            label: 'ASNB Settings',
            url: '/asnb-settings',
        },
        {
            label: 'Edit Operating Hours',
            url: null,
        },
    ];
    opId: null;

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private store: Store,
        private asnbSettingsService: AsnbSettingsService,
        private snackBarService: SnackBarService,
    ) {}

    ngOnInit(): void {
        this.operationHourForm = this.fb.group({
            startTime: ['', [Validators.required]],
            endTime: ['', [Validators.required]],
        });

        this.store.select(getOperationHours).subscribe((operationHours) => {
            const hours = operationHours[0];
            const frmData = {
                opId: hours.opId,
                startTime: hours.startTime,
                endTime: hours.endTime,
            };

            this.opId = hours.opId;

            this.operationHourForm.patchValue(frmData);
        });

        this.store.dispatch(
            MintOfficeActions.updateCimbFooterClass({
                className: 'with-cta',
            }),
        );
    }

    backHandler() {
        this.location.back();
    }

    saveOperationHours() {
        const startTime = this.operationHourForm.value.startTime;
        const endTime = this.operationHourForm.value.endTime;

        const payload = {
            opId: this.opId,
            startTime,
            endTime,
        };
        this.asnbSettingsService
            .saveOperationHours('put', payload)
            .pipe(
                catchError((error) => {
                    this.snackBarService.openSnackbar(error.error.errorMessage, 5000, 'danger');
                    throw error;
                }),
            )
            .subscribe((response) => {
                this.snackBarService.openSnackbar(
                    'You have saved the changes successfully!',
                    5000,
                    'success',
                );

                this.backHandler();
            });
    }
}
