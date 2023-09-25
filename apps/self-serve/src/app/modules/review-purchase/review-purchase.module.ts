import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CimbCommonModule } from '@cimb/common';
import {
  ReviewPurchaseRoutingModule,
  REVIEW_PURCHASE_COMPONENTS,
} from './review-purchase-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MintCardModule, MintDialogModule } from '@cimb/mint';

@NgModule({
  declarations: [...REVIEW_PURCHASE_COMPONENTS],
  imports: [
    CommonModule,
    ReviewPurchaseRoutingModule,
    CimbCommonModule,
    MintCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MintDialogModule,
  ],
  providers: [
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewPurchaseModule {}
