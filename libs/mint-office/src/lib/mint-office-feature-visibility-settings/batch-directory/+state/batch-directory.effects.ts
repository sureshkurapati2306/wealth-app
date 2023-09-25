import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BatchDirectoryService } from "../../../core/services/batch-directory.service";
import * as BatchDirectoryActions from './batch-directory.actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import { loadingBarActions } from "@cimb/mint-office";

@Injectable()
export class BatchDirectoryEffects {
    getIncomingFileList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BatchDirectoryActions.loadIncomingFileList),
            switchMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());
                return this.batchDirectoryService.getIncomingFileList().pipe(
                    map((result) => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                        return BatchDirectoryActions.loadIncomingFileListSuccess({ incomingFileName: result })
                    }),
                    catchError((error) => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                        return of(BatchDirectoryActions.loadIncomingFileListError({ error }))
                    }
                    )
                )
            }
            )
        )
    );

    getOutgoingFileList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BatchDirectoryActions.loadOutgoingFileList),
            switchMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());
                return this.batchDirectoryService.getOutgoingFileList().pipe(
                    map((result) => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                        return BatchDirectoryActions.loadOutgoingFileListSuccess({ outgoingFileName: result })
                    }),
                    catchError((error) => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                        return of(BatchDirectoryActions.loadOutgoingFileListFailure({ error }))
                    })
                )
            }
            )
        )
    );

    downloadBatchFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BatchDirectoryActions.loadDownloadBatchFile),
            switchMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());
                return this.batchDirectoryService.downloadBatchFile(action.downloadBatchFileName, action.batchFileType).pipe(
                    map((result) => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                        result['fileName'] = action.downloadBatchFileName;
                        return BatchDirectoryActions.loadDownloadFileSuccess({ downloadFile: result })
                    }),
                    catchError((error) => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                        return of(BatchDirectoryActions.loadDownloadFileFailure({ error }))
                    })
                )
            }
            )
        )
    )

    constructor(
        private readonly actions$: Actions,
        private batchDirectoryService: BatchDirectoryService,
        private store: Store,
    ) { }

}