import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BatchDirectoryComponent } from './batch-directory.component';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { loadDownloadBatchFile, loadDownloadFileSuccess, loadIncomingFileList, loadIncomingFileListSuccess, loadOutgoingFileList, loadOutgoingFileListSuccess } from './+state/batch-directory.actions';
import { Subject, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

describe('BatchDirectoryComponent', () => {
  let component: BatchDirectoryComponent;
  let fixture: ComponentFixture<BatchDirectoryComponent>;
  let actions$: Actions;
  let store: Store<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatchDirectoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = jasmine.createSpyObj('Store', ['dispatch']);
    actions$ = jasmine.createSpyObj('Actions', ['pipe']);
    fixture = TestBed.createComponent(BatchDirectoryComponent);
    component = new BatchDirectoryComponent(store, actions$);
    actions$ = jasmine.createSpyObj('Actions', ['pipe']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch loadIncomingFileList and loadOutgoingFileList actions on ngOnInit', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(loadIncomingFileList());
    expect(store.dispatch).toHaveBeenCalledWith(loadOutgoingFileList());
  });

  it('should subscribe to loadIncomingFileListSuccess action and call setIncomingFileList', () => {
    const fileList = ['file1', 'file2'];

    spyOn(actions$, 'pipe').and.returnValue(of(loadIncomingFileListSuccess({ incomingFileName: { fileName: fileList } })));

    component.ngOnInit();

    expect(actions$.pipe).toHaveBeenCalledWith(
      ofType(loadIncomingFileListSuccess.type),
      takeUntil(component['_unsubscribeAll'])
    );
    expect(component.setIncomingFileList).toHaveBeenCalledWith({ incomingFileName: { fileName: fileList } });
  });

  it('should subscribe to loadOutgoingFileListSuccess action and call setOutgoingFileList', () => {
    const fileList = ['file1', 'file2'];

    spyOn(actions$, 'pipe').and.returnValue(of(loadOutgoingFileListSuccess({ outgoingFileName: { fileName: fileList } })));

    component.ngOnInit();

    expect(actions$.pipe).toHaveBeenCalledWith(
      ofType(loadOutgoingFileListSuccess.type),
      takeUntil(component['_unsubscribeAll'])
    );
    expect(component.setOutgoingFileList).toHaveBeenCalledWith({ outgoingFileName: { fileName: fileList } });
  });

  it('should subscribe to loadDownloadFileSuccess action and call fileDownloaded', () => {
    const file = 'file1';

    spyOn(actions$, 'pipe').and.returnValue(of(loadDownloadFileSuccess({ downloadFile: file })));

    component.ngOnInit();

    expect(actions$.pipe).toHaveBeenCalledWith(
      ofType(loadDownloadFileSuccess.type),
      takeUntil(component['_unsubscribeAll'])
    );
    expect(component.fileDownloaded).toHaveBeenCalledWith({ downloadFile: file });
  });

  it('should set incomingFileName and create MatTableDataSource', () => {
    const result = {
      incomingFileName: ['file1.txt', 'file2.txt', 'file3.txt']
    };

    component.setIncomingFileList(result);
    expect(component.incomingFileName).toEqual(result.incomingFileName);
    expect(component.dataSourceIncoming instanceof MatTableDataSource).toBe(true);
    expect(component.dataSourceIncoming.data).toEqual(result.incomingFileName);
  });

  it('should set outgoingFileName and create MatTableDataSource', () => {
    const result = {
      outgoingFileName: ['file4.txt', 'file5.txt', 'file6.txt']
    };

    component.setIncomingFileList(result);
    expect(component.outgoingFileName).toEqual(result.outgoingFileName);
    expect(component.dataSourceIncoming instanceof MatTableDataSource).toBe(true);
    expect(component.dataSourceIncoming.data).toEqual(result.outgoingFileName);
  });

  it('should dispatch the loadDownloadBatchFile action with the correct payload', () => {
    const dispatchMock = jasmine.createSpy('dispatch');
    const downloadBatchFileName = 'example.txt';
    const batchFileType = 'text';
    component.downloadBatchFile(downloadBatchFileName, batchFileType);
    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(
      loadDownloadBatchFile({
        downloadBatchFileName,
        batchFileType
      })
    );
  });

  it('should not dispatch the loadDownloadBatchFile action if downloadBatchFileName is undefined', () => {
    const dispatchMock = jasmine.createSpy('dispatch');
    const downloadBatchFileName = undefined;
    const batchFileType = 'text';
    component.downloadBatchFile(downloadBatchFileName, batchFileType);
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should not dispatch the loadDownloadBatchFile action if downloadBatchFileName is empty', () => {
    const dispatchMock = jasmine.createSpy('dispatch');
    spyOn(store, 'dispatch');
    const downloadBatchFileName = '';
    const batchFileType = 'text';
    component.downloadBatchFile(downloadBatchFileName, batchFileType);
    expect(dispatchMock).not.toHaveBeenCalled();
  });
  it('should call saveAs with the correct parameters', () => {
    const result = {
      downloadFile: {
        body: 'file contents',
        fileName: 'example.txt'
      }
    };
    const saveAsMock = jasmine.createSpy('saveAs');
    component.fileDownloaded(result);
    expect(saveAsMock).toHaveBeenCalledWith(
      result.downloadFile.body,
      result.downloadFile.fileName.split('.')[0] + '.zip'
    );
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const unsubscribeSubject = new Subject<void>();
    spyOn(unsubscribeSubject, 'next');
    spyOn(unsubscribeSubject, 'complete');

    component['_unsubscribeAll'] = unsubscribeSubject;
    component.ngOnDestroy();

    expect(unsubscribeSubject.next).toHaveBeenCalled();
    expect(unsubscribeSubject.complete).toHaveBeenCalled();
  });

  describe('ngOnChanges', () => {
    it('should reset resetCount to 0 when tabName changes', () => {
      component.resetCount = 1;

      const changes: SimpleChanges = {
        tabName: {
          currentValue: 'newTab',
          previousValue: 'oldTab',
          firstChange: false,
          isFirstChange: () => false
        }
      };

      component.ngOnChanges(changes);

      expect(component.resetCount).toBe(0);
    });

    it('should reset resetCount to 0 when tabName is undefined', () => {
      component.resetCount = 1;

      const changes = {
        tabName: undefined
      };

      component.ngOnChanges(changes);

      expect(component.resetCount).toBe(0);
    });

    it('should set resetCount to 1 when tabName does not change', () => {
      component.resetCount = 0;
      const changes: SimpleChanges = {
        tabName: {
          currentValue: 'newTab',
          previousValue: 'oldTab',
          firstChange: false,
          isFirstChange: () => false
        }
      };
      component.ngOnChanges(changes);
      expect(component.resetCount).toBe(1);
    });
  });
});
