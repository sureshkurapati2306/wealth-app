import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    static buildQueryParams(source: any): HttpParams {
        let target: HttpParams = new HttpParams();
        Object.keys(source).forEach((key: string) => {
            const value: string | number | boolean | Date = source[key];
            if (typeof value !== 'undefined' && value !== null && value !== '') {
                target = target.append(key, value.toString());
            }
        });
        return target;
    }
}
