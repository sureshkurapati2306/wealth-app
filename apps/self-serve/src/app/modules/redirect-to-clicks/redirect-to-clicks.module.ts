import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  RedirectToClicksRoutingModule,
  REDIRECT_COMPONENTS,
} from './redirect-to-clicks-routing.module';

@NgModule({
  declarations: [...REDIRECT_COMPONENTS],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    RedirectToClicksRoutingModule,
    
  ],
})
export class RedirectToClicksModule {}
