import { Injectable } from '@angular/core';
import { HttpService } from '@cimb/core';
import { map } from 'rxjs/operators';
import { environment } from '@env/self-serve/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ClicksService {
    constructor(private http: HttpService) {}

    getClicksCustomer(code: string): Observable<any> {
        const endpoint = environment.apiUrl;
        return this.http
            .get(endpoint, environment.wealth + `/v2/clicks/loading-tcj?code=${code}`)
            .pipe(map((response) => response));
    }
}
