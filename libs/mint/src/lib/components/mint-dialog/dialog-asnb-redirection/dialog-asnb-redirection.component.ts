import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsnbService } from 'apps/self-serve/src/app/modules/asnb/services/asnb.service';
import { RedirectionInfo } from 'apps/self-serve/src/app/modules/asnb/models/asnb.model';

@Component({
    selector: 'cimb-dialog-asnb-redirection',
    templateUrl: './dialog-asnb-redirection.component.html',
    styleUrls: ['./dialog-asnb-redirection.component.scss'],
})

export class DialogAsnbRedirectionComponent {
    constructor(
        private router: Router,
        private asnbService: AsnbService,
        private dialogRef: MatDialogRef<DialogAsnbRedirectionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: RedirectionInfo
    ) {}

    redirectToLink(): void {
        this.router.navigate([])
            .then(() => { 
                window.open(this.data.url, '_blank'); 
            });
    }
}
