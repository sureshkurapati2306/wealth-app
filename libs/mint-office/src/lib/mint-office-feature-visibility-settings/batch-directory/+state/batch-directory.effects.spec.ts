import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { BatchDirectoryEffects } from './batch-directory.effects';
import * as BatchDirectoryActions from './batch-directory.actions';
import { BatchDirectoryService } from "../../../core/services/batch-directory.service";
import { Environment } from '../../../core/models/environment.model';
import { BatchFileList } from '../../../core/models/batch-directory.models';

describe('BatchDirectoryEffects', () => {
    let effects: BatchDirectoryEffects;
    let actions$: Actions;
    let batchDirectoryService: Partial<BatchDirectoryService>;

    const mockData: BatchFileList = {
        fileName: ['Test Title', 'file2', 'file3', 'file4', 'file5']
    };
    const apiUrl = '/';

    const environment: Environment = { production: false, apiUrl: apiUrl };

    beforeEach(() => {
        actions$ = of(BatchDirectoryActions.loadIncomingFileList());
        batchDirectoryService = {
            environment: environment,
        };
        effects = new BatchDirectoryEffects(
            actions$,
            batchDirectoryService as BatchDirectoryService,
        );
    });

    describe('loadDashboardPopup$', () => {
        it('should dispatch loadIncomingFileListSuccess action on success', () => {
            const response = mockData;
            jest.spyOn(batchDirectoryService, 'getIncomingFileList').mockReturnValue(of(response));

            effects.getIncomingFileList$.subscribe((action) => {
                expect(action).toEqual(BatchDirectoryActions.loadIncomingFileListSuccess({ incomingFileName: response }));
            });
        });

        it('should dispatch loadOutgoingFileListSuccess action on success', () => {
            const response = mockData;
            jest.spyOn(batchDirectoryService, 'getOutgoingFileList').mockReturnValue(of(response));

            effects.getOutgoingFileList$.subscribe((action) => {
                expect(action).toEqual(BatchDirectoryActions.loadOutgoingFileListSuccess({ outgoingFileName: response }));
            });
        });

        it('should dispatch loadDownloadBatchFile action on success', () => {
            const response = {
                body: {
                    size: 4023,
                    type: "application/octet-stream"
                },
                fileName: 'pqr.txt',
                headers: '',
                ok: true,
                status: 200,
                statusText: "OK",
                type: 4,
                url: "https//:google.com"
            };
            jest.spyOn(batchDirectoryService, 'downloadBatchFile').mockReturnValue(of(response));

            effects.downloadBatchFile$.subscribe((action) => {
                expect(action).toEqual(BatchDirectoryActions.loadDownloadBatchFile({ downloadBatchFileName: response.fileName, batchFileType: response.body.type }));
            });
        });
    });
});
