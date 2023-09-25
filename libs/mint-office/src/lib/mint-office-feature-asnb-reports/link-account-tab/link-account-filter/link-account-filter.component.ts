import { 
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    OnDestroy
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormGroupDirective,
    Validators,
} from '@angular/forms';

import { FilterDropdown, AsnbLinkAccountSearchFields } from '../../../core/models/asnb.model';

@Component({
    selector: 'cimb-office-link-account-filter',
    templateUrl: './link-account-filter.component.html',
    styleUrls: ['./link-account-filter.component.scss'],
})
export class LinkAccountFilterComponent implements OnDestroy {
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });

    linkAccountTypes: FilterDropdown[] = [
        { value: 'Link', viewValue: 'Link' },
        { value: 'Delink', viewValue: 'Delink' },
    ];

    linkAccountForm: FormGroup = this.fb.group({
        linkAccountStartDate: ['', Validators.compose([Validators.required])],
        linkAccountEndDate: ['', Validators.compose([Validators.required])],
        action: [],
        customerId: [],
        customerName: [],
    });

    @Input() loadingState = '';
    @Output() submitForm = new EventEmitter<AsnbLinkAccountSearchFields>();
    @Output() clearForm = new EventEmitter<boolean>();

    @ViewChild('searchForm') searchForm: FormGroupDirective;

    constructor(private fb: FormBuilder) {}

    submit(event: Event) {
        event.stopPropagation();

        const formValue = this.linkAccountForm.value;
        const searchParams: AsnbLinkAccountSearchFields = {
            startDate: formValue.linkAccountStartDate,
            endDate: formValue.linkAccountEndDate,
            action: formValue.action,
            customerId: formValue.customerId,
            customerName: formValue.customerName,
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
