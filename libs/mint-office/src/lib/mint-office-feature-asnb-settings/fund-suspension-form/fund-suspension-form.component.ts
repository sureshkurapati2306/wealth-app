import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getFundSuspensMap, getFundTypeMap } from '../+state/asnb-settings.selectors';
import { AsnbSettingsService } from '../../core/services/asnb-settings.service';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '../../core/services/snack-bar.service';
import * as MintOfficeActions from '../../core/+state/mint-office.actions';

@Component({
    selector: 'cimb-office-fund-suspension-form',
    templateUrl: './fund-suspension-form.component.html',
    styleUrls: ['./fund-suspension-form.component.scss'],
})
export class FundSuspensionFormComponent implements OnInit {
    breadcrumbsPaths: BreadcrumbsPath[] = [
        {
            label: 'ASNB Settings',
            url: '/asnb-settings',
        },
        {
            label: 'Edit Funds Suspension',
            url: null,
        },
    ];

    editScreen = true;
    hideEndButton = false;
    suspensionForm: FormGroup;
    startDateTimeError = false;
    endDateTimeError = false;
    now = moment().format('YYYY-MM-DDTHH:mm:ss');
    defaultTime = [];
    message = '';
    myTimePicker = 0;
    minValue: Date;
    maxValue: Date;
    defaultValue: Date;
    isSuspend = false;
    fundSuspensionMap;
    selectedData;
    minEndDate = moment().add(60, 'seconds').format('YYYY-MM-DDTHH:mm:ss');
    fundTypeMap$ = this.store.select(getFundTypeMap);

    @ViewChild('picker') picker: any;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store,
        private location: Location,
        private asnbSettingsService: AsnbSettingsService,
        private snackBarService: SnackBarService,
    ) {}

    ngOnInit() {
        const hour = moment(this.now).format('HH');
        const minutes = moment(this.now).format('mm');
        this.defaultTime = [hour, minutes];

        this.suspensionForm = this.fb.group(
            {
                startDateTime: ['', [Validators.required]],
                endDateTime: ['', [Validators.required]],
                isCheckedUntilFurtherNotice: [false],
                isFullySubscribed: [false],
                isFundSuspend: [false],
            },
            { validator: this.checkSuspendType },
        );

        this.store.select(getFundSuspensMap).subscribe((data) => {
            this.fundSuspensionMap = data;
        });

        this.route.params.subscribe((params) => {
            const id = params['id'];
            this.selectedData = this.fundSuspensionMap[id];

            const frmData = {
                startDateTime: moment(this.selectedData.startDate).format(),
                endDateTime:
                    this.selectedData.startDate !== this.selectedData.endDate
                        ? moment(this.selectedData.endDate).format()
                        : moment(this.selectedData.endDate).add(60, 'seconds').format(),
                isCheckedUntilFurtherNotice: Number(this.selectedData.noticeReason),
                ...this.getSuspendTypeValues(this.selectedData.suspensionReason),
            };

            this.suspensionForm.patchValue(frmData);
        });

        this.store.dispatch(
            MintOfficeActions.updateCimbFooterClass({
                className: 'with-cta',
            }),
        );
    }

    getSuspendTypeValues(status) {
        const suspendTypeValues = {
            '0': {
                isFullySubscribed: true,
                isFundSuspend: true,
            },
            '2': {
                isFullySubscribed: true,
                isFundSuspend: false,
            },
            '3': {
                isFullySubscribed: false,
                isFundSuspend: true,
            },
        };
        return suspendTypeValues[status] || {};
    }

    checkSuspendType(group: FormGroup) {
        const isFullySubscribed = group.controls.isFullySubscribed.value;
        const isFundSuspend = group.controls.isFundSuspend.value;
        const startDateControl = group.controls.startDateTime.value;
        const endDateControl = group.controls.endDateTime.value;

        if (!isFullySubscribed && !isFundSuspend) {
            return { checkboxRequired: true };
        }

        if (startDateControl && endDateControl) {
            const startDate = moment(startDateControl);
            const endDate = moment(endDateControl);
            if (startDate.isAfter(endDate)) {
                return { endDateInvalid: 'End date cannot be earlier than the start date' }; // Update the error message
            }
        }

        return null;
    }

    startDateChange(event: any) {
        this.minEndDate = moment(event.value).add(60, 'seconds').format('YYYY-MM-DDTHH:mm:ss');
    }

    endDateValidator(control: AbstractControl): { [key: string]: any } | null {
        const startDateControl = control.root.get('startDateTime');
        if (startDateControl && control.value) {
            const startDate = moment(startDateControl.value);
            const endDate = moment(control.value);
            if (startDate.isAfter(endDate)) {
                return { endDateInvalid: 'End date entered occurs before the start date.' }; // Update the error message
            }
        }

        return null;
    }

    handleUntilFurtherNotice(event: any) {
        const endDateControl = this.suspensionForm.get('endDateTime');

        if (event.checked) {
            endDateControl.clearValidators();
        } else {
            endDateControl.setValidators(Validators.required);
        }

        endDateControl.updateValueAndValidity();
    }

    createSuspension() {
        // for initial release only available edit fund suspension.
        const startDate = moment(this.suspensionForm.value.startDateTime).format(
            'YYYY-MM-DDTHH:mm:ss',
        );
        const endDate = moment(this.suspensionForm.value.endDateTime).format('YYYY-MM-DDTHH:mm:ss');
        const isCheckedFurtherNotice = this.suspensionForm.value.isCheckedUntilFurtherNotice;
        const isFullySubscribed = this.suspensionForm.value.isFullySubscribed;
        const isFundSuspend = this.suspensionForm.value.isFundSuspend;

        let suspensionReason = 0;

        if (isFullySubscribed && !isFundSuspend) {
            suspensionReason = 2;
        } else if (isFundSuspend && !isFullySubscribed) {
            suspensionReason = 3;
        }

        const payload = {
            fsId: this.selectedData.fsId,
            asnbFundId: this.selectedData.asnbFundId,
            startDate,
            ...(!isCheckedFurtherNotice ? { endDate, noticeReason: 0 } : { noticeReason: 1 }),
            suspensionReason,
        };

        this.asnbSettingsService
            .saveFundSuspensionList('put', payload)
            .pipe(
                catchError((error) => {
                    this.snackBarService.openSnackbar(error.error.errorMessage, 5000, 'danger');
                    throw error;
                }),
            )
            .subscribe(() => {
                this.snackBarService.openSnackbar(
                    'You have saved the changes successfully!',
                    5000,
                    'success',
                );

                this.router.navigate(['/asnb-settings'], {
                    replaceUrl: true,
                    queryParams: { tab: '1' },
                });
            });
    }

    backHandler() {
        this.location.back();
    }
}
