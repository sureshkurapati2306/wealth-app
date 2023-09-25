import { Injectable } from '@angular/core';
import { environment } from '@env/self-serve/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from '@cimb/core';

@Injectable({
    providedIn: 'root',
})
export class HealthService {
    private _healthCheck: ReplaySubject<string> = new ReplaySubject<string>(1);

    constructor(private http: HttpService, private router: Router) {}

    get healthCheck$(): Observable<string> {
        return this._healthCheck.asObservable();
    }

    get(): Observable<string> {
        const endpoint = environment.apiUrl;
         /* istanbul ignore next */  //Used to ignore the next line in spec. Dont remove this line.
        return this.http.get(endpoint, environment.wealth+ `/health/version`).pipe(
            tap((healthCheck) => {
                this._healthCheck.next(healthCheck);
            }),
            retry(2),
            catchError(async () => {
                this.router.navigate([`SystemDownTime`]);
            }),
        );
    }
}
