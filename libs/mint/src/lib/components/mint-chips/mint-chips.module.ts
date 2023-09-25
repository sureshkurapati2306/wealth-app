import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MintChipsComponent } from './mint-chips.component';

@NgModule({
  declarations: [MintChipsComponent],
  imports: [CommonModule],
  exports: [MintChipsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintChipsModule {}
