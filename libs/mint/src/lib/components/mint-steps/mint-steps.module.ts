import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressStepComponent } from './progress-step/progress-step.component';

@NgModule({
  declarations: [ProgressStepComponent],
  imports: [CommonModule],
  exports: [ProgressStepComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintStepsModule {}
