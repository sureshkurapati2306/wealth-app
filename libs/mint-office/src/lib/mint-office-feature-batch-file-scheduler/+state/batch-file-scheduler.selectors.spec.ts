import * as fromBatchFileScheduler from './batch-file-scheduler.reducer';
import { selectBatchFileSchedulerState } from './batch-file-scheduler.selectors';
import * as SchedulerSelector from './batch-file-scheduler.selectors';


const mockData = {
  schedulers: [
      {
          "schedulerId": 366,
          "schedulerName": "1",
          "schedulerDate": "2022-08-31T23:28:00",
          "endDate": "2022-08-31T23:28:00",
          "schedulerType": "Monthly",
          "schedulerStatus": "U",
          "schedulerOccurrence": "O",
          "jobId": 1003,
          "jobName": "Downtime scheduler",
          "createdBy": null,
          "modifiedBy": null,
          "createdDate": "2022-08-29T23:30:51",
          "modifiedDate": "2022-08-29T23:30:51"
      },
      {
          "schedulerId": 367,
          "schedulerName": "2",
          "schedulerDate": "2022-08-31T11:30:00",
          "endDate": "2022-08-31T11:30:00",
          "schedulerType": "Monthly",
          "schedulerStatus": "U",
          "schedulerOccurrence": "O",
          "jobId": 1001,
          "jobName": "Txrn scheduler",
          "createdBy": null,
          "modifiedBy": null,
          "createdDate": "2022-08-29T23:31:25",
          "modifiedDate": "2022-08-29T23:31:25"
      },
      {
          "schedulerId": 369,
          "schedulerName": "6",
          "schedulerDate": "2022-08-30T11:50:00",
          "endDate": "2022-08-31T00:00:00",
          "schedulerType": "Daily",
          "schedulerStatus": "U",
          "schedulerOccurrence": "R",
          "jobId": 1002,
          "jobName": "Status scheduler",
          "createdBy": null,
          "modifiedBy": null,
          "createdDate": "2022-08-29T23:48:35",
          "modifiedDate": "2022-08-29T23:48:35"
      },
      {
          "schedulerId": 365,
          "schedulerName": "asd",
          "schedulerDate": "2022-08-26T09:21:00",
          "endDate": "2022-08-26T09:21:00",
          "schedulerType": "Daily",
          "schedulerStatus": "U",
          "schedulerOccurrence": "O",
          "jobId": 1000,
          "jobName": "Daily scheduler",
          "createdBy": null,
          "modifiedBy": null,
          "createdDate": "2022-08-25T21:21:24",
          "modifiedDate": "2022-08-25T21:21:24"
      },
      {
          "schedulerId": 364,
          "schedulerName": "erewr",
          "schedulerDate": "2022-08-26T07:53:00",
          "endDate": "2022-08-26T07:53:00",
          "schedulerType": "Daily",
          "schedulerStatus": "U",
          "schedulerOccurrence": "R",
          "jobId": 1000,
          "jobName": "Daily scheduler",
          "createdBy": null,
          "modifiedBy": null,
          "createdDate": "2022-08-25T20:53:51",
          "modifiedDate": "2022-08-25T20:53:51"
      }
  ],
  jobs: [
    {
        "jobId": 1000,
        "jobCode": "DAILY BATCH",
        "jobName": "Daily scheduler",
        "createdBy": null,
        "modifiedBy": null,
        "createdDate": "2022-02-10T08:51:11",
        "modifiedDate": "2022-02-10T08:51:11"
    },
    {
        "jobId": 1001,
        "jobCode": "TXRN BATCH",
        "jobName": "Txrn scheduler",
        "createdBy": null,
        "modifiedBy": null,
        "createdDate": "2022-02-10T08:51:11",
        "modifiedDate": "2022-02-10T08:51:11"
    },
    {
        "jobId": 1002,
        "jobCode": "STATUS BATCH",
        "jobName": "Status scheduler",
        "createdBy": null,
        "modifiedBy": null,
        "createdDate": "2022-02-10T08:51:11",
        "modifiedDate": "2022-02-10T08:51:11"
    },
    {
        "jobId": 1003,
        "jobCode": "DOWNTIME",
        "jobName": "Downtime scheduler",
        "createdBy": null,
        "modifiedBy": null,
        "createdDate": "2022-02-10T08:51:11",
        "modifiedDate": "2022-02-10T08:51:11"
    }
  ],
  error: '',
  schedulerEdit: ''
}
const mockState: fromBatchFileScheduler.State = {
  schedulers: mockData.schedulers,
  jobs: mockData.jobs,
  error: mockData.error,
  schedulerEdit: mockData.schedulerEdit,
}
describe('BatchFileScheduler Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBatchFileSchedulerState({
      [fromBatchFileScheduler.batchFileSchedulerFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select scheduler listing', () => {
    const result = SchedulerSelector.selectBatchFileSchedulerListing.projector(mockState.schedulers);

    expect(result).toBeUndefined();
  });

  it('should select job listing', () => {
    const result = SchedulerSelector.selectJobListing.projector(mockState.jobs);

    expect(result).toBeUndefined();
  });

  it('should select scheduler for edit', () => {
    const result = SchedulerSelector.selectBatchFileSchedulerForEdit.projector(mockState.schedulerEdit);

    expect(result).toBeUndefined();
  });
});
