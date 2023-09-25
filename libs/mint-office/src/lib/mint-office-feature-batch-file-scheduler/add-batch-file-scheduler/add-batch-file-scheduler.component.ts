import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../+state/batch-file-scheduler.reducer';
import * as BatchFileSchedulerActions from '../+state/batch-file-scheduler.actions';
import * as BatchFileSchedulerSelector from '../+state/batch-file-scheduler.selectors';
import { Job } from '../../core/models/job.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import * as MintOfficeActions from '../../core/+state/mint-office.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogPromptComponent } from '../../mint-office-ui-dialog/dialog-prompt/dialog-prompt.component';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'cimb-office-add-batch-file-scheduler',
    templateUrl: './add-batch-file-scheduler.component.html',
    styleUrls: ['./add-batch-file-scheduler.component.scss'],
})
export class AddBatchFileSchedulerComponent implements OnInit {
    breadcrumbsPaths: BreadcrumbsPath[] = [
        {
            label: 'Batch File Scheduler',
            url: '/batch-file-scheduler',
        },
        {
            label: 'Add Batch File Scheduler',
            url: null,
        },
    ];

    jobs: Job;

    ishidden = false;

    schedulerForm: FormGroup;

    startDatetIme!: Date;

    isOneTime = false;

    now = moment().utcOffset('+0800');

    message = '';

    editErrmsg: string;

    endDateMessage = '';

    enabled = false;

    endDateTruncated: string;

    startDateTimeError = false;

    endDateError = false;

    createBatchFileSchedulerError!: Subscription;

    createBatchFileSchedulerSuccess!: Subscription;

    notice: string;

    minEndDate = moment().add(1, 'days');

    @ViewChild('picker') picker: any;

    jobs$ = this.store.select(BatchFileSchedulerSelector.selectJobListing);

    downtime = false;

    notDowntime = false;

    editData: any;

    editScreen = false;

    disableEndButton = true;

    hideEndButton = true;

    defaultTime = [];

    disableSave = false;

    jobId: string | number;

    constructor(
        private store: Store<State>,
        private fb: FormBuilder,
        private action$: Actions,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private dialog: MatDialog,
    ) {}

    ngOnInit() {
        const hour = this.now.format('HH');
        const minutes = this.now.format('mm');
        this.defaultTime = [hour, minutes];

        //dipatch action from store
        this.store.dispatch(BatchFileSchedulerActions.loadJobs());

        this.schedulerForm = this.fb.group({
            schedulerName: ['', [Validators.required, Validators.maxLength(30)]],
            schedulerType: ['', Validators.required],
            jobId: ['', Validators.required],
            startDateTime: ['', Validators.required],
            schedulerOccurrence: ['O', Validators.required],
            endDate: [''],
        });

        const url = this.router.url;
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        if (url.indexOf('/edit-batch-file-scheduler') > 0) {
            this.store
                .select(BatchFileSchedulerSelector.selectBatchFileSchedulerForEdit)
                .pipe(
                    tap((data: any) => {
                        if (data) {
                            this.editData = data;
                        }
                    }),
                )
                .subscribe();
            this.hideEndButton = false;

            const currentMlyTime = moment(moment().utcOffset('+0800')).format(
                'DD MMM yyyy HH:mm:ss',
            );
            const startDateDiff = moment(currentMlyTime).diff(
                this.editData.schedulerDate,
                'minutes',
            );
            const endDateDiff = moment(currentMlyTime).diff(this.editData.endDate, 'minutes');
            if (this.editData.schedulerStatus === 'O' || (startDateDiff >= 0 && endDateDiff < 0)) {
                this.disableEndButton = false;
            }
            this.populateEditScreenValues();
            this.editScreen = true;
        } else {
            this.editScreen = false;
        }

        this.onCreateBatchFileSchedulerError();

        this.onCreateBatchFileSchedulerSuccess();

        //add class to cimb-footer to increase footer margin
        this.store.dispatch(
            MintOfficeActions.updateCimbFooterClass({
                className: 'with-cta',
            }),
        );
    }

    onCreateBatchFileSchedulerError() {
        this.createBatchFileSchedulerError = this.action$
            .pipe(ofType(BatchFileSchedulerActions.createBatchFileSchedulerFailure))
            .subscribe((data) => {
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                if (data.error.details) {
                    this.notice = data.error.details;

                    this.cdr.detectChanges();
                }
            });
    }

    onCreateBatchFileSchedulerSuccess() {
        this.createBatchFileSchedulerSuccess = this.action$
            .pipe(ofType(BatchFileSchedulerActions.createBatchFileSchedulerSuccess))
            .subscribe(() => {
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                this.notice = '';
            });
    }

    jobNameChange(event: any) {
        if (event.value == '1003' || event.value == '1004') {
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
            this.downtime = true;
            this.notDowntime = false;
            this.ishidden = false;
            this.schedulerForm.patchValue({ schedulerOccurrence: 'O' });
            this.jobId = event.value;
        } else {
            this.downtime = false;
            this.notDowntime = true;
        }
    }

    radioButtonChanged(value: string) {
        if (value === 'R') {
            this.ishidden = true;
            this.schedulerForm.patchValue({ schedulerOccurrence: value });
        } else {
            this.ishidden = false;
            this.schedulerForm.patchValue({ schedulerOccurrence: value });
            this.schedulerForm.patchValue({ endDate: '' });
        }
    }

    async createScheduler() {
        // handle start date and time
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        const startDate = this.schedulerForm.value.startDateTime.format();
        const startDateTruncated = startDate.substring(0, 19);

        // recheck the start date and time
        const param = {
            value: this.startDatetIme
        }
        await this.startDateChange(param);

        // handle end date and time
        const endDate = this.schedulerForm?.value?.endDate;
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        if (endDate) {
            const endDateString: string = endDate.format();
            this.endDateTruncated = endDateString.substring(0, 19);
        }

        //check end date when occurence is "Reoccuring"
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        if (this.schedulerForm.value.schedulerOccurrence === 'R') {
            if (this.schedulerForm.value.endDate === '') {
                this.endDateMessage = 'End date is required';
            }
        }

        //get form values
        const newScheduler: any = {
            schedulerName: this.schedulerForm.value.schedulerName,
            schedulerDate: startDateTruncated,
            endDate: this.endDateTruncated,
            schedulerType: this.schedulerForm.value.schedulerType,
            schedulerStatus: 'U',
            schedulerOccurrence: this.schedulerForm.value.schedulerOccurrence,
            jobId: this.schedulerForm.value.jobId,
        };

        // validation and warning
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        const startDay = moment().diff(startDate, 'days');
        const endHour = moment(startDate).diff(endDate, 'hours');

        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        if (startDay > -30 && this.downtime === true && this.editScreen) {
            const dialogRef = this.dialog.open(DialogPromptComponent, {
                panelClass: ['custom-dialog'],
                maxWidth: '520px',
                autoFocus: false,
                data: {
                    title: 'This scheduled downtime will last for less than 30 days, are you sure?',
                    icon: 'icon-danger-1',
                    description: 'Please confirm if you want to proceed.',
                    btnCancelLabel: 'Cancel',
                    btnOkLabel: 'Confirm',
                },
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result.result === 'ok') {
                    if (endHour > -24 && this.downtime === true && this.editScreen) {
                        this.confirmation24HourPrompt(newScheduler);
                    } else {
                        const request: any = {
                            editScheduler: newScheduler,
                            schedulerId: this.editData.schedulerId,
                        };

                        return this.store.dispatch(
                            BatchFileSchedulerActions.editBatchFileScheduler(request),
                        );
                    }
                }
            });
        } else if (endHour > -24 && this.downtime === true && this.editScreen) {
            this.confirmation24HourPrompt(newScheduler);
        } else {
            if (this.schedulerForm.valid && !this.startDateTimeError) {
                if (this.editScreen) {
                    const request: any = {
                        editScheduler: newScheduler,
                        schedulerId: this.editData.schedulerId,
                    };

                    return this.store.dispatch(
                        BatchFileSchedulerActions.editBatchFileScheduler(request),
                    );
                } else {
                    return this.store.dispatch(
                        BatchFileSchedulerActions.createBatchFileScheduler(newScheduler),
                    );
                }
            }
        }
    }

    confirmation24HourPrompt(newScheduler) {
        const dialogRef = this.dialog.open(DialogPromptComponent, {
            panelClass: ['custom-dialog'],
            maxWidth: '520px',
            autoFocus: false,
            data: {
                title: 'This scheduled downtime will last for less than 24 hours, are you sure?',
                icon: 'icon-danger-1',
                description: 'Please confirm if you want to proceed.',
                btnCancelLabel: 'Cancel',
                btnOkLabel: 'Confirm',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result.result === 'ok') {
                const request: any = {
                    editScheduler: newScheduler,
                    schedulerId: this.editData.schedulerId,
                };

                return this.store.dispatch(
                    BatchFileSchedulerActions.editBatchFileScheduler(request),
                );
            }
        });
    }

    async startDateChange(event: any) {
        if (!this.schedulerForm.value.endDate) {
            //Populate end time field only if it's blank
            this.schedulerForm.controls['endDate'].reset();

            this.schedulerForm.patchValue({ endDate: this.schedulerForm.value.startDateTime });
        }

        const selectedDate = moment(event.value).toDate();

        this.startDatetIme = selectedDate;

        this.isOneTime = true;

        const dateTime = moment(moment().utcOffset('+0800')).format('DD MMM yyyy HH:mm:ss');

        const minutes = moment(dateTime).diff(event?.value, 'minutes');

        const formatDateTime = moment(event?.value).format('DD MMM yyyy 14:00:00');

        const dateTimeAfter2PM = moment(event?.value).isAfter(formatDateTime);

        const startDay = moment().diff(event?.value, 'days');

        const dateAfterEndDate = moment(event?.value).isBefore(
            new Date(this.schedulerForm.value.startDateTime),
        );
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        if (this.jobId !== '1004') {
            if (dateTimeAfter2PM && this.downtime !== true) {
                this.message = 'Start time must not be later than 2:00PM';
                this.startDateTimeError = true;
            } else if (minutes >= -30) {
                this.message =
                    'Start date & time must not be less than 30 minutes from current time';
                this.startDateTimeError = true;
            } else if (dateAfterEndDate) {
                this.message = 'Start date & time must be earlier than the end date';
                this.startDateTimeError = true;
            } else if (startDay <= -30 && this.downtime === true) {
                this.message =
                    'Next downtime scheduler date should be less than 30 days from the current scheduler date';
                this.startDateTimeError = true;
            } else {
                this.message = '';
                this.startDateTimeError = false;
                this.endDateMessage = '';
                this.endDateError = false;
            }
        } else {
            this.startDateTimeError = false;
        }
    }

    endDateChange(event: any) {
        this.isOneTime = true;

        const dateBeforeStartDateTime = moment(this.startDatetIme).isAfter(event.value);
        const dateTime = moment(moment().utcOffset('+0800')).format('DD MMM yyyy HH:mm:ss');
        const minutes = moment(dateTime).diff(event.value, 'minutes');
        const endHour = moment(this.startDatetIme).diff(event.value, 'hours');
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        if (this.startDatetIme === undefined) {
            this.message = 'Please select a start date and time';
            this.startDateTimeError = true;
        } else if (dateBeforeStartDateTime) {
            this.endDateMessage = 'End Date must be later than the start date & time';
            this.endDateError = true;
        } else if (minutes >= -30) {
            this.endDateMessage =
                'Start date & time must not be less than 30 minutes from current time';
            this.endDateError = true;
        } else if (endHour <= -24 && this.downtime === true) {
            this.endDateMessage =
                'Scheduler end time should be less than 24 hours from the starting time';
            this.endDateError = true;
        } else {
            this.endDateMessage = '';
            this.endDateError = false;
        }
    }

    populateEditScreenValues() {
        this.schedulerForm.controls['schedulerName'].setValue(this.editData?.schedulerName);
        this.schedulerForm.controls['schedulerType'].setValue(this.editData?.schedulerType);
        this.schedulerForm.controls['jobId'].setValue(this.editData?.jobId.toString());
        this.schedulerForm.controls['startDateTime'].setValue(moment(this.editData?.schedulerDate));
        this.schedulerForm.controls['endDate'].setValue(moment(this.editData?.endDate));
        this.startDatetIme = this.editData?.schedulerDate;
        const evnt = {
            value: this.editData?.jobId,
        };
        this.jobNameChange(evnt);
        this.validateEditScreen();
    }

    endScheduler() {
        const dialogRef = this.dialog.open(DialogPromptComponent, {
            panelClass: ['dialog-transaction-issue', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: 'End the Scheduler',
                description: '<p>You are about to end the sheduler. Please confirm</p>',
                icon: 'icon-danger-1',
                btnCancelLabel: 'Cancel',
                btnOkLabel: 'Confirm',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
            if (result?.result === 'ok') {
                const endScheduler: any = {
                    schedulerName: this.editData.schedulerName,
                    schedulerDate: this.editData.schedulerDate,
                    endDate: this.editData.endDate,
                    schedulerType: this.editData.schedulerType,
                    schedulerStatus: 'P',
                    schedulerOccurrence: this.editData.schedulerOccurrence,
                    jobId: this.editData.jobId.toString(),
                };
                const request: any = {
                    editScheduler: endScheduler,
                    schedulerId: this.editData.schedulerId,
                };

                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                return this.store.dispatch(
                    BatchFileSchedulerActions.editBatchFileScheduler(request),
                );
            }
        });
    }

    validateEditScreen() {
        const validate = moment(moment().utcOffset('+0800')).format('DD MMM yyyy HH:mm:ss');
        const minutesBeforeStartScheduler = moment(validate).diff(
            this.schedulerForm.value.startDateTime,
            'minutes',
        );
        const minutesBeforeEndScheduler = moment(validate).diff(
            this.schedulerForm.value.endDate,
            'minutes',
        );
        const schedulerStarted =
            moment(validate).isAfter(this.schedulerForm.value.startDateTime) &&
            moment(validate).isBefore(this.schedulerForm.value.endDate);
        if (minutesBeforeStartScheduler >= -30 || schedulerStarted) {
            this.schedulerForm.controls['schedulerName'].disable();
            this.schedulerForm.controls['jobId'].disable();
            this.schedulerForm.controls['startDateTime'].disable();
            if (schedulerStarted) {
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
                this.message =
                    'No more changes could be made since the downtime scheduler is ongoing';
                this.editErrmsg =
                    'No more changes could be made since the downtime scheduler is ongoing';
                this.disableSave = true;
            } else {
                this.message =
                    'No changes could be made since start time is less than 30 minutes away from the current time';
                this.editErrmsg =
                    'No changes could be made since start time is less than 30 minutes away from the current time';
                this.disableSave = true;
            }
        }

        if (minutesBeforeEndScheduler >= -30) {
            this.schedulerForm.controls['endDate'].disable();
            this.endDateMessage =
                'No changes could be made since end time is less than 30 minutes away from the current time';
            this.disableSave = true;
        }
    }

    convertDateToMoment(date: Date) {
        return date ? moment(date) : moment();
    }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnDestroy() {
        this.createBatchFileSchedulerError.unsubscribe();
        this.createBatchFileSchedulerSuccess.unsubscribe();

        //remove class from cimb-footer to reset footer margin
        this.store.dispatch(
            MintOfficeActions.updateCimbFooterClass({
                className: '',
            }),
        );
    }
}
