import { Component, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {SnackBar} from '@cimb/shared/models';

@Component({
  selector: 'cimb-mint-snackbar',
  templateUrl: './mint-snackbar.component.html',
  styleUrls: ['./mint-snackbar.component.scss'],
})


export class MintSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: SnackBar,
    private snackBar: MatSnackBar
  ) {}

  get getToastIcon() {
    switch (this.data.snackType) {
      case 'success':
        return { type: this.data.snackType, icon: 'success' };
      case 'danger':
        return { type: this.data.snackType, icon: 'danger-1' };
      case 'warning':
        return { type: this.data.snackType, icon: 'warning' };
      case 'info':
        return { type: this.data.snackType, icon: 'info' };
    }
  }
  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
