import { Inject, Injectable } from '@angular/core';
import { Environment } from '../models/environment.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BatchDirectoryService {
    readonly environment: Environment;
    constructor(
        @Inject('environment') environment: Environment,
        private http: HttpClient
    ) {
        this.environment = environment;
    }

    getIncomingFileList(): Observable<any> {
        return this.http
            .get(this.environment.apiUrl + 'monitor/sc/files/incoming')
    }

    getOutgoingFileList(): Observable<any> {
        return this.http
            .get(this.environment.apiUrl + 'monitor/sc/files/outgoing')
    }

    downloadBatchFile(fileName, batchType): Observable<any> {
        const batchFileType = batchType === 'incoming' ? 'incoming' : 'outgoing'
        return this.http
            .get(this.environment.apiUrl + 'monitor/sc/files/download/' + batchFileType + '/' + fileName, { observe: 'response', responseType: 'blob' })
    }
}