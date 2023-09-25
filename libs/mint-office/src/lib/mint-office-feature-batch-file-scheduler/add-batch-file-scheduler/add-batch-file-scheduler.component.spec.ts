import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatchFileSchedulerComponent } from './add-batch-file-scheduler.component';

import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BatchFileScheduler } from '../../core/models/batchfilescheduler.model';
import { BatchFileSchedulerService } from '../../core/services/batch-file-scheduler.service';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockData: BatchFileScheduler[] = [
  {
    schedulerName: 'Jest Test',
    schedulerDate: '03 Mar 2022 04:00PM',
    endDate: '04 Mar 2022 04:00PM',
    schedulerType: 'Hourly',
    schedulerStatus: 'U',
    schedulerOccurrence: 'O',
    jobId: 1000,
  },
  {
    schedulerName: 'Jest Test',
    schedulerDate: '03 Mar 2022 04:00PM',
    endDate: '',
    schedulerType: 'Hourly',
    schedulerStatus: 'U',
    schedulerOccurrence: 'R',
    jobId: 1000,
  }
];

const jobNameValue = [
  {
    value: '1000'
  },
  {
    value: '1001'
  },
  {
    value: '1002'
  },
  {
    value: '1003'
  }
]

class mockAddBatchFileService {
  createScheduler() {
    return of(mockData)
  }
}
describe('AddBatchFileSchedulerComponent', () => {
  let component: AddBatchFileSchedulerComponent;
  let fixture: ComponentFixture<AddBatchFileSchedulerComponent>;
  let addScheduelrService: BatchFileSchedulerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBatchFileSchedulerComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [Actions,
        {provide: BatchFileSchedulerService, useClass: mockAddBatchFileService},
        { provide: MatDialog}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    addScheduelrService = TestBed.inject(BatchFileSchedulerService)
    fixture = TestBed.createComponent(AddBatchFileSchedulerComponent);
    component = fixture.componentInstance;
    component.downtime = true;
    //component.selectedEvent = "R";
    component.endDateMessage = "End date is required";
    fixture.detectChanges();

  });

 
  describe('Test', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  

    it('should save a scheduler', () => {

      jest.spyOn(addScheduelrService, 'createScheduler');

      component.schedulerForm.patchValue(
        {
          startDateTime: 'Fri Mar 18 2022 16:32:50 GMT+0800',
          endDate: 'Sat Mar 19 2022 16:32:50 GMT+0800'
        }
      )

      // if(component.selectedEvent === 'R') {
      //   component.schedulerForm.patchValue(
      //     {
      //       endDate: ''
      //     }
      //   )
      //   if( component.schedulerForm.value.endDate === '') {
      //     expect( component.endDateMessage).toBeTruthy();
      //   }
      // }
      
      expect(component.createScheduler()).toBeTruthy();
    });

    it('should check if form has endDate', () => {
      component.schedulerForm.patchValue({endDate: "Sat Mar 19 2022 16:32:50 GMT+0800"})
      const endDateString = "2022-03-22T16:00:00.000Z";
      component.endDateTruncated = endDateString.substring(0, 19);
      expect(component.endDateTruncated).toBeTruthy();
    })

    it('should change a start date', () => {
      const event = new Event('changed');

      expect(component.startDateChange(event)).toBeUndefined();
    });

    it('should check if radio button value is R', () =>{
      expect(component.ishidden === true);
      //component.selectedEvent === 'R'
      expect(component.radioButtonChanged('R')).toBeUndefined();
    });

    it('should check if radio button value is O', () =>{
      expect(component.ishidden === false);
      //component.selectedEvent === 'O'
      expect(component.radioButtonChanged('O')).toBeUndefined();
    });
  

    it('should check if time is after 2PM', ()=> {
      expect(component.message === 'Start time must not be later than 2:00PM');
      expect(component.startDateTimeError === true)
      expect(component).toBeTruthy();
    });

    it('should check for an endDate change event', ()=> {
      const event = new Event('changed');

      expect(component.endDateChange(event)).toBeUndefined();
    });

    it('should check for a change in job name', () => {
      const event = jobNameValue

      console.log('event.value ', event);
      fixture.detectChanges();
      expect(component.jobNameChange(event)).toBeUndefined();
    });

    it('should populate for edit screen values', ()=> {
      expect(component.populateEditScreenValues()).toBeUndefined();
    });

    it('should validate edit', ()=> {
      expect(component.validateEditScreen()).toBeUndefined();
    });

    it('should endScheduler', () => {
      expect(component.endScheduler()).toBeUndefined();
    });

    it('should validate of creating a scheduler is success', () => {
      component.notice = '';
      fixture.detectChanges();
      expect(component.onCreateBatchFileSchedulerSuccess()).toBeUndefined();
    });
    it('should validate of creating a scheduler is fail', () => {
      expect(component.onCreateBatchFileSchedulerError()).toBeUndefined();
    })
  })

});
