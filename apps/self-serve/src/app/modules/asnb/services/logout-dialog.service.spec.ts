import { TestBed } from '@angular/core/testing';

import { LogoutDialogService } from './logout-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { DialogAlertComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-alert/dialog-alert.component';
import * as LogoutAction from '../../../core/state/logout/logout.action';

describe('LogoutDialogService', () => {
    let service: LogoutDialogService;
    let storeMock: Partial<Store>;
    let routerMock: Partial<Router>;
    let dialogMock: Partial<MatDialog>;

    beforeEach(() => {
        storeMock = {
            select: jest.fn().mockReturnValue(of({})),
            dispatch: jest.fn(),
        };

        routerMock = {
            navigate: jest.fn(),
        };
        dialogMock = {
            open: jest.fn().mockReturnValue({
                afterClosed: () => {
                    return {
                        subscribe: (callback: any) => callback(),
                    };
                },
            }),
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: Store, useValue: storeMock },
                { provide: Router, useValue: routerMock },
                { provide: MatDialog, useValue: dialogMock },
            ],
        });
        service = TestBed.inject(LogoutDialogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open dialog and perform logout action', () => {
        // Arrange
        const userDataObj = {
            cifNumber: 'yourCifNumber',
            customer_id: 'yourCustomerId',
            customer_id_type: 'yourCustomerIdType',
        };

        dialogMock.open = jest.fn().mockReturnValue({
            afterClosed: () => ({
                subscribe: (callback: () => void) => callback(),
            }),
        });

        service.openDialogAndLogout(userDataObj);
        expect(dialogMock.open).toHaveBeenCalledWith(DialogAlertComponent, expect.any(Object));
        expect(storeMock.dispatch).toHaveBeenCalledWith(expect.any(LogoutAction.LogoutTransaction));
        expect(routerMock.navigate).toHaveBeenCalledWith(['/Logout']);
    });
});
