import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { MintButtonModule, MintCardModule } from '@cimb/mint';

import {
  MaintenancePageRoutingModule,
  GETTING_STARTED_COMPONENTS,
} from './maintenance-page-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [GETTING_STARTED_COMPONENTS],
  imports: [
    CommonModule,
    MaintenancePageRoutingModule,
    MintButtonModule,
    MatGridListModule,
    MatCardModule,
    MintCardModule,
    MatButtonToggleModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaintenancePageModule {}
