import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: string;
  icon: string;
  description: string;
  btnOkLabel: string;
  btnCancelLabel: string;
}


@Component({
  selector: 'cimb-office-dialog-prompt',
  templateUrl: './dialog-prompt.component.html',
  styleUrls: ['./dialog-prompt.component.scss']
})
export class DialogPromptComponent {

   //Default values
   dialogData: DialogData = {
    title: 'Dialog title',
    icon: 'icon-danger-1',
    description: '<p>Dialog descriptions.</p>',
    btnOkLabel: 'OK',
    btnCancelLabel: 'Cancel',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Partial<DialogData>,

    public dialogRef: MatDialogRef<DialogPromptComponent>,
    
  ) {
    this.dialogData = {
      ...this.dialogData,
      ...data
    }
  }


  clickOk() {
    this.dialogRef.close({
      result: 'ok'
    });
  }
}
