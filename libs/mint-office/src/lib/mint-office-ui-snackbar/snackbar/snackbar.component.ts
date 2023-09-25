import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'cimb-office-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(
    private snackBar: MatSnackBar,
    public sbRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  get getIcon() {
    switch (this.data.snackType) {
      case 'success':
        return {type: this.data.snackType, icon: 'success'};
      case 'danger':
        return { type: this.data.snackType, icon: 'danger-1' };
      default:
        return {type: this.data.snackType, icon: 'warning'};
    }
  }

  dismissSnackbar() {
    this.snackBar.dismiss();
  }

}
