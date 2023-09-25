import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cimb-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.scss']
})
export class DialogPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<DialogPopupComponent>
  ) { }
  
  titleComments = '';
  subtitleComments = '';
  contentComments = ''
  imageSrc = ''
  

  ngOnInit(): void {
    this.titleComments = this.data.title;
    this.subtitleComments = this.data.subtitle;
    this.contentComments = this.data.content;
    this.imageSrc = this.data.imageSrc;
  }
  onClosePopup() { 
    this.dialogRef.close('cancel');
  }
    

}
