import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, mergeMap, switchMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

import * as BatchFileSchedulerActions from './batch-file-scheduler.actions';

import { BatchFileSchedulerService } from '../../core/services/batch-file-scheduler.service';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class BatchFileSchedulerEffects {
  
  //schedulers
  loadBatchFileSchedulers$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(BatchFileSchedulerActions.loadBatchFileSchedulers),
      switchMap(() => {
        this.store.dispatch(loadingBarActions.loadingBarShow());

        return this.BatchFileSchedulerService.getSchedulers().pipe(
          map((data: any) =>  BatchFileSchedulerActions.loadBatchFileSchedulersSuccess({ data })),
          catchError(error => of(BatchFileSchedulerActions.loadBatchFileSchedulersFailure({ error }))),
          finalize(() => {
            this.store.dispatch(loadingBarActions.loadingBarHide());
          })
        )
      }
        
      )
    );
  });
  //delete scheduler
  deleteBatchFileSchedulers$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(BatchFileSchedulerActions.deleteBatchFileScheduler),
        mergeMap(({id}) => {
          this.store.dispatch(loadingBarActions.loadingBarShow());

          return this.BatchFileSchedulerService.deleteScheduler(id).pipe(
            map(() => {
              this.snackBarService.openSnackbar('You have deleted a record successfully!', 3000, 'success');
              return BatchFileSchedulerActions.deleteBatchFileSchedulerSuccess({id})
            }),
            catchError(error => of(BatchFileSchedulerActions.deleteBatchFileSchedulerFailure({ error }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            },)
          );
        }
          
        )
        
    );
  });

  //add scheduler
  addScheduler$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BatchFileSchedulerActions.createBatchFileScheduler),
      switchMap((data: any) => {
        this.store.dispatch(loadingBarActions.loadingBarShow());
      
        return this.BatchFileSchedulerService
          .createScheduler(data)
          .pipe(
            map((data: any) => {
              this.snackBarService.openSnackbar(
                'You have saved the changes successfully!',
                1000,
                'success'
              )
              this.router.navigateByUrl('batch-file-scheduler')
              return BatchFileSchedulerActions.createBatchFileSchedulerSuccess(data)
            }),
            catchError((error) => {
              return of(BatchFileSchedulerActions.createBatchFileSchedulerFailure(error))
            }),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
             
      
            })
        )
      }

       
      )
    )
  });

  editScheduler$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BatchFileSchedulerActions.editBatchFileScheduler),
      switchMap((data: any) => {
        this.store.dispatch(loadingBarActions.loadingBarShow());
      
        return this.BatchFileSchedulerService
          .editScheduler(data.editScheduler, data.schedulerId)
          .pipe(
            map((data: any) => {
              this.snackBarService.openSnackbar(
                'You have saved the changes successfully!',
                1000,
                'success'
              )
              setTimeout(() => {
                this.router.navigateByUrl('batch-file-scheduler')
              }, 1000)
              return BatchFileSchedulerActions.editBatchFileSchedulerSuccess(data)
            }),
            catchError((error) => {
              return of(BatchFileSchedulerActions.editBatchFileSchedulerFailure(error))
            }),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            }))
      }))
  });

  //job
  loadJobs$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(BatchFileSchedulerActions.loadJobs),
      exhaustMap(() =>
        this.BatchFileSchedulerService.getJobs().pipe(
          map((jobs: any) =>  BatchFileSchedulerActions.loadJobsSuccess({ jobs })),
          catchError(error => of(BatchFileSchedulerActions.loadJobsFailure({ error }))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private BatchFileSchedulerService: BatchFileSchedulerService,
    private store: Store,
    private snackBarService: SnackBarService,
    private router: Router,
  ) {}

}
