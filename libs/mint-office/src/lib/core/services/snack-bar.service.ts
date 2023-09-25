import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../mint-office-ui-snackbar/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  openSnackbar(message: string, duration: number, type: 'success' | 'warning' | 'danger') {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['top', type],
      data: { message: message, snackType: type }
    });
  }

  dismissSnackbar() {
    this._snackBar.dismiss()
  }
}
