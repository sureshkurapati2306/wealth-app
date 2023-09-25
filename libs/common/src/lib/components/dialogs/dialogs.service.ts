import { Injectable } from '@angular/core';
import { MintDialogService } from '@cimb/mint';

@Injectable({
    providedIn: 'root',
})
export class DialogsService {
    constructor(private _mintDialogService: MintDialogService) {}

    showDialogIfSolePropCustomer(): void {
        this._mintDialogService.open({
            title: `Unable to Transact <br> (Sole Proprietor Customer)`,
            message: `For Unit Trust transactions as a sole proprietor customer, please visit any CIMB branch.`,
            actions: {
                confirm: {
                    label: 'Okay',
                    click: () => null,
                },
                cancel: {
                    show: false,
                },
            },
        });
    }
}
