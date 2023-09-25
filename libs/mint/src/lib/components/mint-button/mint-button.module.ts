import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { ButtonPortfolioComponent } from './button-portfolio/button-portfolio.component';
import { ButtonAddComponent } from './button-add/button-add.component';
import { MatMenuModule } from '@angular/material/menu';
import { MintDialogModule } from '../mint-dialog/mint-dialog.module';
import { MintBoxModule } from '../mint-box/mint-box.module';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ButtonPortfolioComponent, ButtonAddComponent, ButtonToggleComponent,],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatButtonToggleModule,
    MintDialogModule,
    MintBoxModule,
    DragDropModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [ButtonPortfolioComponent, ButtonAddComponent, ButtonToggleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintButtonModule {}
