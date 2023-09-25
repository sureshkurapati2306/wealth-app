import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'cimb-dialog-asnb-service-hours',
    templateUrl: './dialog-asnb-service-hours.component.html',
    styleUrls: ['./dialog-asnb-service-hours.component.scss'],
})
export class DialogAsnbServiceHoursComponent {
    constructor(public dialogRef: MatDialogRef<DialogAsnbServiceHoursComponent>) {}

    onClose() {
        this.dialogRef.close();
    }
}
