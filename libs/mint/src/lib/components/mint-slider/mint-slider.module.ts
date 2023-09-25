import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSliderComponent } from './dashboard-slider/dashboard-slider.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [DashboardSliderComponent, ],
  imports: [CommonModule, MatSliderModule, MatCheckboxModule],
  exports: [DashboardSliderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintSliderModule {}
