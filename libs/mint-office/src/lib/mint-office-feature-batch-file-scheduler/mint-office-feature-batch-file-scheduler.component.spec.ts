import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { MintOfficeFeatureBatchFileSchedulerComponent } from './mint-office-feature-batch-file-scheduler.component';

import * as fromBatchFileScheduler from './+state/batch-file-scheduler.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BatchFileScheduler } from '../core/models/batchfilescheduler.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { environment } from '../../../../../apps/wealth-backoffice/src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockData:BatchFileScheduler[] = [
  {
    "endDate": "2022-03-09T18:30:00",
    "jobId": 1003,
    "schedulerDate": "2022-03-18T17:28:38",
    "schedulerName": "mhh",
    "schedulerOccurrence": "R",
    "schedulerStatus": "U",
    "schedulerType": "Daily",
  },
  {
    "endDate": "2022-03-09T18:30:00",
    "jobId": 1003,
    "schedulerDate": "2022-03-18T17:28:38",
    "schedulerName": "mhh",
    "schedulerOccurrence": "R",
    "schedulerStatus": "o",
    "schedulerType": "Daily",
  },
  {
    "endDate": "2022-03-09T18:30:00",
    "jobId": 1003,
    "schedulerDate": "2022-03-18T17:28:38",
    "schedulerName": "mhh",
    "schedulerOccurrence": "R",
    "schedulerStatus": "C",
    "schedulerType": "Daily",
  }
]


describe('MintOfficeFeatureBatchFileSchedulerComponent', () => {
  let component: MintOfficeFeatureBatchFileSchedulerComponent;
  let fixture: ComponentFixture<MintOfficeFeatureBatchFileSchedulerComponent>;


  const Environment: typeof environment = { production: false, apiUrl: 'test'}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeFeatureBatchFileSchedulerComponent ],
      imports: [
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterTestingModule, 
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromBatchFileScheduler.batchFileSchedulerFeatureKey, fromBatchFileScheduler.reducer),
        HttpClientTestingModule
      ],
      providers: [
        {
          // Provide custom MdI18 provider
          provide: MatPaginatorIntl
        },
        {
          provide: 'environment', useValue: Environment
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeFeatureBatchFileSchedulerComponent);
    component = fixture.componentInstance;
    component.filteredTableData = new MatTableDataSource<any>(mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show paginator', () => {
    component.filteredTableData.paginator = component.paginator;
    fixture.detectChanges();
    expect(component.showPaginator()).toBeUndefined();
  })


  it('should search by filter', () => {
    expect(component.searchFilter()).toBeUndefined();
  })

  it('should check if search key is empty', () => {
    const value = "";
    expect(component.checkSearchKey(value)).toBeUndefined();
  })
  it('should toggle filter by not empty status', () => {
    const value = "All";
    expect(component.toggleFilterStatus(value)).toBeUndefined();
  })

  it('should navigate to a page', () => {
    expect(component.goToPage()).toBeUndefined();
  });
  it('should open a dialog', ()=> {
    const id = 1;
    expect(component.openDialog(id)).toBeUndefined();
  });

  it('should paginate', fakeAsync(() => {
    expect(component.showFilterPagination(component.filteredTableData.paginator)).toBeUndefined();
  }));

  
});
