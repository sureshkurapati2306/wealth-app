import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { WhitelistingTable } from '../models/user-whitelisting.models'
import { Environment } from '../models/environment.model';

@Injectable({
  providedIn: 'root'
})
export class WhitelistingUserService {
  private endpoint: string;
  readonly environment: Environment;
  constructor(@Inject('environment') environment: Environment,
  private http: HttpClient) {
    this.endpoint = environment.apiUrl;
  }

  getWhitelistingListUser(search: string, pageIndex?: number): Observable<WhitelistingTable> {
    const queryStrObj = {
      pageIndex,
      search
    };
    const queryString = new HttpParams({ fromObject: queryStrObj }).toString();
    return this.http
      .get<WhitelistingTable>(this.endpoint + 'wealth/whitelisted-users?' + queryString)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteWhitelistingUser(id: number) {
    return this.http
      .delete(this.endpoint + 'wealth/whitelisted-users?id=' + id)
      .pipe(
        delay(1000),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  uploadWhiteListingCsvFile(file: File): Observable<any> {
    
    const formData: FormData = new FormData();
    formData.append( 'file', new Blob([file], { type: 'text/csv' }), file.name);
  
    const headers = new HttpHeaders({
      'Accept': '*/*'
    });  
    return this.http.post<any>(this.endpoint + 'wealth/whitelisted-users', formData, { headers });
  }
  

}
