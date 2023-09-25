import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from './component/component.module';

@NgModule({
  imports: [CommonModule, ComponentModule],
  exports: [ComponentModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CimbCommonModule {}
