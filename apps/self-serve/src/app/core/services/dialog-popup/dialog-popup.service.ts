import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/self-serve/environment';


@Injectable({
  providedIn: 'root'
})
export class DialogPopupService {
  constructor(
    private http: HttpClient) {
  }

  getPopUpDetails(id: string): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl + environment.wealth}/pop-up/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console?.error(error);
        return throwError(error);
      })
    );
  }
  
}
