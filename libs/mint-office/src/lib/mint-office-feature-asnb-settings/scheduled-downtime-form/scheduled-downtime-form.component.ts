import { Component, ViewChild } from '@angular/core';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector: 'cimb-office-scheduled-downtime-form',
	templateUrl: './scheduled-downtime-form.component.html',
	styleUrls: ['./scheduled-downtime-form.component.scss']
})
export class ScheduledDowntimeFormComponent {
	breadcrumbsPaths: BreadcrumbsPath[] = [
		{
			label: 'Schedule Downtime',
			url: '/asnb-settings',
		},
		{
			label: 'Add Schedule Downtime',
			url: null,
		},
	];
	schedulerForm: FormGroup;

		now = moment().utcOffset('+0800');

		defaultTime = [];

		base64File: string = null;

		filename: string = null;

		@ViewChild('picker') picker: any;

		maxChars = 100;

	constructor(
				private fb: FormBuilder,
		) {
        this.schedulerForm = this.fb.group({
                startDateTime: ['', Validators.required],
                endDateTime: ['', Validators.required],
                document: ['', Validators.required],
                remarks: ['']
        });
	}
	convertDateToMoment(date: Date) {
		return date ? moment(date) : moment();
	}
	onFileSelect(e: any): void {
        try {
            const file = e.target.files[0];
            const fReader = new FileReader()
            fReader.readAsDataURL(file)
            fReader.onloadend = (_event: any) => {
                this.filename = file.name;
                this.base64File = _event.target.result;
            }
        } catch (error) {
            this.filename = null;
            this.base64File = null;
            console.log('no file was selected...');
        }
	}

}
