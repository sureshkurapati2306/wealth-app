import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './menu/menu.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, MatMenuModule, MatButtonModule],
  exports: [MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintMenuModule {}
