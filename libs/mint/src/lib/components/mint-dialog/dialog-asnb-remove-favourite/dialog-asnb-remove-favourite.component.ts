import { Component, OnInit, Inject } from '@angular/core';
import {
    AsnbFavourite,
    AsnbRemoveFavouriteRequest,
    AsnbRemoveFavouriteResponse,
} from 'apps/self-serve/src/app/modules/asnb/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AsnbService } from 'apps/self-serve/src/app/modules/asnb/services/asnb.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'cimb-dialog-asnb-remove-favourite',
    templateUrl: './dialog-asnb-remove-favourite.component.html',
    styleUrls: ['./dialog-asnb-remove-favourite.component.scss'],
})
export class DialogAsnbRemoveFavouriteComponent implements OnInit {
    favouriteData: AsnbFavourite;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AsnbFavourite,
        private dialogRef: MatDialogRef<DialogAsnbRemoveFavouriteComponent>,
        private router: Router,
        private asnbService: AsnbService,
    ) {}

    ngOnInit(): void {
        this.favouriteData = this.data;
    }

    confirmRemoveFavourite() {
        const payload: AsnbRemoveFavouriteRequest = {
            transId: this.favouriteData.transId,
        };
        this.asnbService
            .sendRemoveFavouriteEvent(payload)
            .pipe(take(1))
            .subscribe((response: AsnbRemoveFavouriteResponse) => {
                if (response.code == 200) {
                    this.dialogRef.close(true);
                } else {
                    this.dialogRef.close(false);
                }
            });
    }
}
