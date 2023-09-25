import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SWITCH_REQUEST_COMPONENTS,
  SwitchRequestRoutingModule,
} from './switch-request-completed-routing.module';

import { CimbCommonModule } from '@cimb/common';
import { MintCardModule } from '@cimb/mint';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [...SWITCH_REQUEST_COMPONENTS],
  imports: [
    CommonModule,
    SwitchRequestRoutingModule,
    MintCardModule,
    MatSnackBarModule,
    MatButtonModule,
    CimbCommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwitchRequestCompletedModule {}
