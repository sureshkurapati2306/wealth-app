import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MintDialogConfig } from './mint-dialog.type';

@Component({
    selector: 'cimb-mint-dialog',
    templateUrl: './mint-dialog.component.html',
    styleUrls: ['./mint-dialog.component.scss'],
})
export class MintDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: MintDialogConfig,
        public matDialogRef: MatDialogRef<MintDialogComponent>
    ) {}
}
