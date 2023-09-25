import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewRoutingModule } from './add-new-routing.module';
import { AddNewComponent } from './add-new.component';
import { MintOfficeUiBreadcrumbsModule } from '../../mint-office-ui-breadcrumbs/mint-office-ui-breadcrumbs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
    declarations: [AddNewComponent],
    imports: [
      CommonModule,
      AddNewRoutingModule,
      MintOfficeUiBreadcrumbsModule,
      ReactiveFormsModule,
      FormsModule,
      MatButtonModule,
      MatInputModule,
      MatSelectModule,
      MatIconModule
    ]
  })
  export class AddNewModule { }