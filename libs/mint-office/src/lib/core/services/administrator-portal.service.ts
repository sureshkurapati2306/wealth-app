import { Inject, Injectable } from '@angular/core';
import { Environment } from '../models/environment.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AdministratorTable, ListUser, UserRole } from '../models/administrator-portal.models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministratorPortalService {
  readonly environment: Environment;

  constructor(@Inject('environment') environment: Environment,
    private http: HttpClient) {
    this.environment = environment;
  }

  getUserRole(): Observable<UserRole[]> {
    return this.http
      .get<UserRole[]>(this.environment.apiUrl + 'authenticate/admin/users/roles')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  getListUser(pageIndex: number, search?: string): Observable<AdministratorTable> {
    const queryStrObj = {
      pageIndex,
      ...(search ? { search } : {})
    };
    const queryString = new HttpParams({ fromObject: queryStrObj }).toString();

    return this.http
      .get<AdministratorTable>(this.environment.apiUrl + 'authenticate/admin/users?' + queryString)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteUser(username: string, role: string): Observable<ListUser>  {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { role }
    };
    return this.http
      .delete<ListUser>(`${this.environment.apiUrl}/authenticate/admin/users/${username}/role`, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  createUser(username: string, role: string): Observable<ListUser> {
    const body = { role: role, username: username };

    return this
      .http
      .post<ListUser>(this.environment.apiUrl + 'authenticate/admin/users', body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
  }

  updateUser(username: string, role: string): Observable<ListUser> {
    return this
      .http
      .put<ListUser>(`${this.environment.apiUrl}/authenticate/admin/users/${username}/role`, { role })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
  }

}
