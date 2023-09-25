import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertWarningComponent } from './alert-warning/alert-warning.component';

@NgModule({
  declarations: [AlertWarningComponent],
  imports: [CommonModule],
  exports: [AlertWarningComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintAlertModule {}
