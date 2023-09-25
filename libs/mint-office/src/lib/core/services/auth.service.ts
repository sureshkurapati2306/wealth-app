import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Auth, AuthData, AuthKey } from '../models/auth.model';
import { Environment } from '../models/environment.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    readonly environment: Environment;
    private authKeyURL: string;
    private authAPIUrl: string;
    private delSessionAPIURL: string;

    constructor(@Inject('environment') environment: Environment, private http: HttpClient) {
        this.environment = environment;
        this.authKeyURL = this.environment.apiUrl + 'authenticate/v2/pre-authentication';
        this.authAPIUrl = this.environment.apiUrl + 'authenticate/v3/token/login';
        this.delSessionAPIURL = this.environment.apiUrl + 'validate/session-mgmt/';
    }

  getKey(): Observable<AuthKey> {
    return this.http
    .get<AuthKey>(this.authKeyURL)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  login(data: Auth): Observable<AuthData> {
    return this.http
    .post<AuthData>( this.authAPIUrl, data)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

    delSession(sessionId: number): Observable<number> {
        return this.http.delete<number>(this.delSessionAPIURL + sessionId).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                return throwError(error);
            }),
        );
    }
}
