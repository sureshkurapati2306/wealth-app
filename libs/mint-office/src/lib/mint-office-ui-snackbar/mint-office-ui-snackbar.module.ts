import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  exports: [
    SnackbarComponent,
  ],
})
export class MintOfficeUiSnackbarModule { }
