import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { FilterDropdown, AsnbSearchFields } from '../../../core/models/asnb.model';

@Component({
    selector: 'cimb-office-transactions-filter',
    templateUrl: './transactions-filter.component.html',
    styleUrls: ['./transactions-filter.component.scss'],
})
export class TransactionsFilterComponent implements OnDestroy {
    transactionStats: FilterDropdown[] = [
        { value: 'Successful', viewValue: 'Successful' },
        { value: 'Pending', viewValue: 'Pending' },
        { value: 'Unsuccessful', viewValue: 'Unsuccessful' },
    ];

    transactionTypes: FilterDropdown[] = [
        { value: 'New Fund', viewValue: 'New Fund' },
        { value: 'Top-up', viewValue: 'Top Up' },
    ];

    transactionForm: FormGroup = this.fb.group({
        start: ['', Validators.compose([Validators.required])],
        end: ['', Validators.compose([Validators.required])],
        status: [],
        customerId: [],
        customerName: [],
        action: [],
    });

    @Input() loadingState = '';
    @Output() submitForm = new EventEmitter<AsnbSearchFields>();
    @Output() clearForm = new EventEmitter<boolean>();

    @ViewChild('searchForm') searchForm: FormGroupDirective;

    constructor(private fb: FormBuilder) {}

    submit(event: Event) {
        //prevent default submit event
        event.stopPropagation();

        const formValue = this.transactionForm.value;
        const searchParams: AsnbSearchFields = {
            startDate: formValue.start,
            endDate: formValue.end,
            status: formValue.status,
            customerId: formValue.customerId,
            customerName: formValue.customerName,
            action: formValue.action,
        };

        this.submitForm.emit(searchParams);
    }

    clear() {
        this.searchForm.resetForm();
        this.clearForm.emit(true);
    }

    ngOnDestroy() {
        this.clear();
    }
}
