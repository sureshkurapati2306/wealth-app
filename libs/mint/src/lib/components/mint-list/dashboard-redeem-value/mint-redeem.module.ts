import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
 import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRedeemValueComponent } from './dashboard-redeem-value.component';
import { MatButtonModule } from '@angular/material/button';
import { MintInputModule } from '../../mint-input/mint-input.module';
@NgModule({
  declarations: [
    DashboardRedeemValueComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule,
    MintInputModule,
    MatDialogModule,
    MatSliderModule,
  ],
  exports: [
    DashboardRedeemValueComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintRedeemModule {}
