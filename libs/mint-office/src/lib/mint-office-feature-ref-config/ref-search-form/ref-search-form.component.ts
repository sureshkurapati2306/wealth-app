import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefConfigSearchFields } from '../../core/models/unit-trust-transactions.model';

interface TransactionStat {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'cimb-office-ref-config-search-form',
  templateUrl: './ref-search-form.component.html',
  styleUrls: ['./ref-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefSearchFormComponent {

  // Daterangepicker
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  transactionStats: TransactionStat[] = [
    {value: 'All', viewValue: 'All'},
    {value: 'Successful', viewValue: 'Successful'},
    {value: 'Processing', viewValue: 'Processing'},
    {value: 'Unsuccessful', viewValue: 'Unsuccessful'},
    {value: 'Cancelled', viewValue: 'Cancelled'},
  ];

  myForm: FormGroup = this.fb.group({
    configId: [],
    configName: [],
    configValue: [],
  });

  @Input() set searchParams(data: RefConfigSearchFields) {

    this.myForm.patchValue({
      configId: data?.configId,
      configName: data?.configName,
      configValue: data?.configValue,
    });
    
  }
  @Input() isSMSPage: boolean;

  @Output() submitForm = new EventEmitter<RefConfigSearchFields>();
  @Output() clearForm = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  submit(event: Event) {

    //prevent default submit event
    event.stopPropagation();

    const formValue = this.myForm.value;
    
    const searchParams : RefConfigSearchFields = {
      configId: formValue.configId,
      configName: formValue.configName,
      configValue: formValue.configValue,
    };

    console.log(searchParams)
    this.submitForm.emit(searchParams);


  }

  addRefConfig() {

    this.router.navigate(['add-ref-config'] , {relativeTo: this.route});

  }

  clear() {
    this.clearForm.emit(true);
  }

}
