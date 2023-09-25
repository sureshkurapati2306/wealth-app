import { createAction, props } from "@ngrx/store";
import { BatchFileList } from "../../../core/models/batch-directory.models";

export const loadIncomingFileList = createAction(
    '[BackupFile Incoming/API CALL] Load Incoming File List',
);

export const loadIncomingFileListSuccess = createAction(
    '[BackupFile Incoming File Success/API RETURN] File List Success',
    props<{ incomingFileName: BatchFileList }>(),
);

export const loadIncomingFileListError = createAction(
    '[BackupFile Incoming File Error/API RETURN] File List Error',
    props<{ error: any }>(),
);

export const loadOutgoingFileList = createAction(
    '[BackupFile Outgoing/API CALL] Load Outgoing File List',
);

export const loadOutgoingFileListSuccess = createAction(
    '[BackupFile Outgoing File Success/API RETURN] File List Success',
    props<{ outgoingFileName: BatchFileList }>(),
);

export const loadOutgoingFileListFailure = createAction(
    '[BackupFile Outgoing File Failure/API RETURN] File List Failure',
    props<{ error: any }>(),
);

export const loadDownloadBatchFile = createAction(
    '[Download Batch File/API RETURN] Download Batch File Success',
    props<{ downloadBatchFileName: any, batchFileType: string }>(),
);

export const loadDownloadFileSuccess = createAction(
    '[Download Batch File Success/API RETURN] File Downloaded Success',
    props<{ downloadFile: string }>(),
);

export const loadDownloadFileFailure = createAction(
    '[Download Batch File Failure/API RETURN] File Downloaded Failure',
    props<{ error: any }>(),
);