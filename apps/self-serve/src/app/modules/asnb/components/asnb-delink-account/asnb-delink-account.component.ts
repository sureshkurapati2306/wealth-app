import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAsnbDelinkAccountComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-delink-account/dialog-asnb-delink-account.component';

@Component({
    selector: 'cimb-asnb-delink-account',
    templateUrl: './asnb-delink-account.component.html',
    styleUrls: ['./asnb-delink-account.component.scss'],
})
export class AsnbDelinkAccountComponent {
    constructor(
        public dialog: MatDialog,
    ) {}

    openDialog() {
        this.dialog.open(DialogAsnbDelinkAccountComponent, {
            backdropClass: 'asnb-delink-account',
        });
    }
}
