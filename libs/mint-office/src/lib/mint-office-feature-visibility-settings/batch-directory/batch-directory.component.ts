import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import { loadDownloadBatchFile, loadDownloadFileSuccess, loadIncomingFileList, loadIncomingFileListSuccess, loadOutgoingFileList, loadOutgoingFileListSuccess } from './+state/batch-directory.actions';

@Component({
  selector: 'cimb-office-batch-directory',
  templateUrl: './batch-directory.component.html',
  styleUrls: ['./batch-directory.component.scss']
})
export class BatchDirectoryComponent implements OnInit, OnChanges, OnDestroy {

  incomingFileName: string[];
  outgoingFileName: string[];
  displayedCol: string[] = ['file name', 'Download'];
  dataSourceIncoming = new MatTableDataSource<any>();
  dataSourceOutgoing = new MatTableDataSource<any>();
  pageSizeOptions = [20];
  resetCount: number;
  _unsubscribeAll: Subject<void> = new Subject<void>();


  constructor(private store: Store,
    private actions$: Actions) {
    this.actions$
      .pipe(ofType(loadIncomingFileListSuccess.type), takeUntil(this._unsubscribeAll))
      .subscribe(this.setIncomingFileList);

    this.actions$
      .pipe(ofType(loadOutgoingFileListSuccess.type), takeUntil(this._unsubscribeAll))
      .subscribe(this.setOutgoingFileList);

    this.actions$
      .pipe(ofType(loadDownloadFileSuccess.type), takeUntil(this._unsubscribeAll))
      .subscribe(this.fileDownloaded);
  }

  ngOnInit(): void {
    this.store.dispatch(loadIncomingFileList());
    this.store.dispatch(loadOutgoingFileList());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes?.tabName && changes?.tabName?.currentValue !== changes?.tabName?.previousValue) {
      this.resetCount = 0;
    } else if (changes?.tabName == undefined) {
      this.resetCount = 0;
    } else {
      this.resetCount = 1;
    }
  }

  setIncomingFileList = (result: any) => {
    this.incomingFileName = result['incomingFileName'];
    this.dataSourceIncoming = new MatTableDataSource<any>(this.incomingFileName);
  }

  setOutgoingFileList = (result: any) => {
    this.outgoingFileName = result['outgoingFileName'];
    this.dataSourceOutgoing = new MatTableDataSource<any>(this.outgoingFileName);
  }

  fileDownloaded = (result: any) => {
    saveAs(result['downloadFile']['body'], result['downloadFile']['fileName'].split('.')[0] + '.zip');
  }

  downloadBatchFile(downloadBatchFileName: string, batchFileType:string): void {
    if (downloadBatchFileName != undefined && downloadBatchFileName != '') {
      this.store.dispatch(loadDownloadBatchFile({ downloadBatchFileName, batchFileType }));
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
