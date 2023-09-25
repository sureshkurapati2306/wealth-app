import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons/icons.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports:[IconsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintIconModule { }
