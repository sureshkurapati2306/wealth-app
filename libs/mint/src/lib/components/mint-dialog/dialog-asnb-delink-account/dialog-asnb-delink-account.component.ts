import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { path } from 'apps/self-serve/src/app/shared/config/path';
import { AsnbService } from 'apps/self-serve/src/app/modules/asnb/services/asnb.service';

@Component({
    selector: 'cimb-dialog-asnb-delink-account',
    templateUrl: './dialog-asnb-delink-account.component.html',
    styleUrls: ['./dialog-asnb-delink-account.component.scss'],
})
export class DialogAsnbDelinkAccountComponent {
    constructor(
        private router: Router,
        private asnbService: AsnbService,
        private dialogRef: MatDialogRef<DialogAsnbDelinkAccountComponent>,
    ) {}

    confirmDelinkAccount(): void {
        if (this.asnbService.sendDelinkAccountEvent()) {
            this.router.navigate([path.WEALTH_DASHBOARD]);
        } else {
            this.dialogRef.close();
        }
    }
}
