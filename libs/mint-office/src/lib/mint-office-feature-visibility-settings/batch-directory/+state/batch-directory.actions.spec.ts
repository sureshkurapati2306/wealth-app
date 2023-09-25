import { Action } from '@ngrx/store';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';
import * as BatchDirectoryActions from './batch-directory.actions';


describe('BatchDirectoryActions', () => {

    let actions: Observable<Action>;

    it('should create an action loadIncomingFileList', () => {
        const action = BatchDirectoryActions.loadIncomingFileList();
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });

    it('should create an action loadIncomingFileListSuccess', () => {
        const action = BatchDirectoryActions.loadIncomingFileListSuccess({ incomingFileName: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });

    it('should create an action loadIncomingFileListError', () => {
        const action = BatchDirectoryActions.loadIncomingFileListError({ error: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });

    it('should create an action loadOutgoingFileList', () => {
        const action = BatchDirectoryActions.loadOutgoingFileList();
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action loadOutgoingFileListSuccess', () => {
        const action = BatchDirectoryActions.loadOutgoingFileListSuccess({ outgoingFileName: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action loadOutgoingFileListFailure', () => {
        const action = BatchDirectoryActions.loadOutgoingFileListFailure({ error: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action loadDownloadBatchFile', () => {
        const action = BatchDirectoryActions.loadDownloadBatchFile({ downloadBatchFileName: null, batchFileType: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action loadDownloadFileSuccess', () => {
        const action = BatchDirectoryActions.loadDownloadFileSuccess({ downloadFile: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();
    });
    it('should create an action loadDownloadFileFailure', () => {
        const action = BatchDirectoryActions.loadDownloadFileFailure({ error: null });
        actions = hot('a', { a: action });
        expect({ ...actions }).toBeTruthy();

    });
});