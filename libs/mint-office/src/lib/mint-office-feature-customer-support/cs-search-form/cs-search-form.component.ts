import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerSearchFields } from '../../core/models/customer.model';

@Component({
  selector: 'cimb-office-cs-search-form',
  templateUrl: './cs-search-form.component.html',
  styleUrls: ['./cs-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsSearchFormComponent {

  myForm: FormGroup = this.fb.group({
    fullName: [],
    idNumber: [],
    cifNumber: []
  });

  @Input() set searchParams(data: CustomerSearchFields) {
    this.myForm.patchValue({
      fullName: data?.fullName,
      idNumber: data?.idNumber,
      cifNumber: data?.cifNumber
    });
  }
  @Input() loadingState = '';

  @Output() submitForm = new EventEmitter<CustomerSearchFields>();
  @Output() clearForm = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder
  ) { }

  submit(event: Event) {

    //prevent default submit event
    event.stopPropagation();

    const formValue = this.myForm.value;
    
    const searchParams : CustomerSearchFields = {
      fullName: formValue.fullName,
      idNumber: formValue.idNumber,
      cifNumber: formValue.cifNumber,
    };

    this.submitForm.emit(searchParams);

  }

  clear() {
    this.clearForm.emit(true);
  }

}
