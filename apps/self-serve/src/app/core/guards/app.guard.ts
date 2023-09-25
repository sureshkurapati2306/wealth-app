import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AppService } from '../services/app.service';

@Injectable({
    providedIn: 'root',
})
export class AppGuard implements CanActivate {
    constructor(public appService: AppService) {}
    canActivate() {
        if (this.appService.isUserLoggedIn()) {
            return true;
        }

        return this.appService.redirectProcess();
    }
}
