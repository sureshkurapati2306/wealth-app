import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ViewChild,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormGroupDirective,
    Validators,
} from '@angular/forms';
import { UnitTrustSearchFields } from '../../core/models/unit-trust-transactions.model';
import { EventService } from '../../core/services/event.service';

interface TransactionStat {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'cimb-office-ut-search-form',
    templateUrl: './ut-search-form.component.html',
    styleUrls: ['./ut-search-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtSearchFormComponent {
    // Daterangepicker
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });

    transactionStats: TransactionStat[] = [
        { value: 'All', viewValue: 'All' },
        { value: 'Successful', viewValue: 'Successful' },
        { value: 'Processing', viewValue: 'Processing' },
        { value: 'Unsuccessful', viewValue: 'Unsuccessful' },
        { value: 'Cancelled', viewValue: 'Cancelled' },
    ];

    myForm: FormGroup = this.fb.group({
        startDate: ['', Validators.compose([Validators.required])],
        endDate: ['', Validators.compose([Validators.required])],
        status: [],
        utAccNumber: [],
        customerName: [],
        idNumber: [],
    });

    @Input() set searchParams(data: UnitTrustSearchFields) {
        this.myForm.patchValue({
            startDate: data?.startDate,
            endDate: data?.endDate,
            status: data?.status,
            utAccNumber: data?.utAccNumber,
            customerName: data?.customerName,
            idNumber: data?.idNumber,
        });
    }
    @Input() loadingState = '';
    @Input() isSMSPage: boolean;

    @Output() submitForm = new EventEmitter<UnitTrustSearchFields>();
    @Output() clearForm = new EventEmitter<boolean>();

    @ViewChild('searchForm') searchForm: FormGroupDirective;

    constructor(private fb: FormBuilder, private eventService: EventService) {}

    submit(event: Event) {
        //prevent default submit event
        event.stopPropagation();

        const formValue = this.myForm.value;
        const searchParams: UnitTrustSearchFields = {
            startDate: formValue.startDate,
            endDate: formValue.endDate,
            status: formValue.status,
            utAccNumber: formValue.utAccNumber,
            customerName: formValue.customerName,
            idNumber: formValue.idNumber,
        };

        const transactionDatetime = {
            startDate: formValue.startDate,
            endDate: formValue.endDate,
        };

        this.submitForm.emit(searchParams);

        this.eventService.emit(transactionDatetime);
    }

    clear() {
        this.searchForm.resetForm();
        this.clearForm.emit(true);
    }
}
