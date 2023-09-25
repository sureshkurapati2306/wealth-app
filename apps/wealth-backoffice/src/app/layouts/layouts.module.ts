import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackofficeLayoutComponent } from './backoffice-layout/backoffice-layout.component';
import { CimbCommonModule } from '@cimb/common';
import { MatButtonModule } from '@angular/material/button';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';


@NgModule({
  declarations: [
    BackofficeLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CimbCommonModule,
    MatButtonModule
  ],
  exports: [
    BackofficeLayoutComponent
  ]
})
export class LayoutsModule { }
