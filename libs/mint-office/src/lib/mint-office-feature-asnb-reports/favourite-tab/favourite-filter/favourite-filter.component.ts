import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormGroupDirective,
    Validators,
} from '@angular/forms';

import { FilterDropdown, AsnbSearchFavourite } from '../../../core/models/asnb.model';

@Component({
    selector: 'cimb-office-favourite-filter',
    templateUrl: './favourite-filter.component.html',
    styleUrls: ['./favourite-filter.component.scss'],
})
export class FavouriteFilterComponent implements OnDestroy {
    favouriteStatuses: FilterDropdown[] = [
        { value: 'Successful', viewValue: 'Successful' },
        { value: 'Unsuccessful', viewValue: 'Unsuccessful' },
    ];

    favouriteTypes: FilterDropdown[] = [
        { value: 'Add Favourite', viewValue: 'Add Favourite' },
        { value: 'Remove Favourite', viewValue: 'Remove Favourite' },
    ];

    favouriteForm: FormGroup = this.fb.group({
        favouriteStartDate: ['', Validators.compose([Validators.required])],
        favouriteEndDate: ['', Validators.compose([Validators.required])],
        status: [],
        favouriteCustomerId: [],
        favouriteCustomerName: [],
        action: [],
    });

    @Input() loadingState = '';
    @Output() submitForm = new EventEmitter<AsnbSearchFavourite>();
    @Output() clearForm = new EventEmitter<boolean>();

    @ViewChild('searchForm') searchForm: FormGroupDirective;

    constructor(private fb: FormBuilder) {}

    submit(event: Event) {
        event.stopPropagation();

        const formValue = this.favouriteForm.value;
        const searchParams: AsnbSearchFavourite = {
            startDate: formValue.favouriteStartDate,
            endDate: formValue.favouriteEndDate,
            status: formValue.status,
            customerId: formValue.favouriteCustomerId,
            customerName: formValue.favouriteCustomerName,
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
