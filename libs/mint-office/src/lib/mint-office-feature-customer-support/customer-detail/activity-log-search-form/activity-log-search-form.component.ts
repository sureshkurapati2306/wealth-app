import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomerActivityLogChannel, CustomerActivityLogModules, CustomerActivityLogSearchFields } from '../../../core/models/customer-activity.model';
import * as ActivityLogActions from '../../+state/activity-log.actions';

interface SelectOption {
  value: number;
  label: string;
}

@Component({
  selector: 'cimb-office-activity-log-search-form',
  templateUrl: './activity-log-search-form.component.html',
  styleUrls: ['./activity-log-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityLogSearchFormComponent implements OnInit {

  channelOptions: SelectOption[] = [];

  moduleOptions: SelectOption[] = [];
  
  // Daterangepicker
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  myForm: FormGroup = this.fb.group({
    startDate: ['', 
      Validators.compose([
        Validators.required,
      ])
    ],
    endDate: ['', 
      Validators.compose([
        Validators.required,
      ])
    ],
    modules: [[]],
    channels: [[]]
  });

  @Input() searchParams: CustomerActivityLogSearchFields;
  @Input() loadingState = '';
  @Input() modules: CustomerActivityLogModules[];
  @Input() channels: CustomerActivityLogChannel[];

  @Output() submitForm = new EventEmitter<CustomerActivityLogSearchFields>();

  constructor(
    private fb: FormBuilder, private store: Store
  ) { }

  ngOnInit(): void {
    this.modules.forEach(data => {
      const module = { value: data.moduleId, label: data.moduleName }
      this.moduleOptions.push(module);
    });
    this.channels.forEach(data => {
      const channel = { value: data.channelId, label: data.channelName }
      this.channelOptions.push(channel);
    });
    this.myForm.patchValue({
      startDate: this.searchParams?.startDate,
      endDate: this.searchParams?.endDate,
      modules: this.searchParams?.modules,
      channels: this.searchParams?.channels,
    });
    
  }

  submit(event: Event) {

    //prevent default submit event
    event.stopPropagation();

    const formValue = this.myForm.value;
    const searchParams : CustomerActivityLogSearchFields = {
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      modules: formValue.modules,
      channels: formValue.channels,
    };
    this.submitForm.emit(searchParams);

  }

  clear() {
    this.myForm.patchValue({
      startDate: '',
      endDate: '',
      modules: [],
      channels: []
    });
    this.store.dispatch(ActivityLogActions.resetActivityLogs());
  }

}
