import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { DialogPromptComponent } from './dialog-prompt/dialog-prompt.component';
import { DialogPromptCommentComponent } from './dialog-prompt-comment/dialog-prompt-comment.component';


@NgModule({
  declarations: [
    DialogPromptComponent,
    DialogPromptCommentComponent,
    DialogMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    DialogPromptComponent,
    DialogPromptCommentComponent,
    DialogMessageComponent
  ],
})
export class MintOfficeUiDialogModule { }
