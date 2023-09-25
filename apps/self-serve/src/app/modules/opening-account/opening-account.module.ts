import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
    OpeningAccountRoutingModule,
    OPENING_ACCOUNT_COMPONENTS,
} from './opening-account-routing.module';
import {
    MintButtonModule,
    MintDialogModule,
    MintInputModule,
    MintSelectModule,
    MintAutocompleteModule,
} from '@cimb/mint';
import { MatButtonModule } from '@angular/material/button';

import { CimbCommonModule } from '@cimb/common';
import { MintCardModule } from '@cimb/mint';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AccountOpeningResolver } from './opening-account.resolver';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [...OPENING_ACCOUNT_COMPONENTS],
    imports: [
        CommonModule,
        OpeningAccountRoutingModule,
        MatDialogModule,
        CimbCommonModule,
        MintCardModule,
        MintSelectModule,
        MintAutocompleteModule,
        MintInputModule,
        MatButtonModule,
        MintButtonModule,
        MintDialogModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
    ],
    providers: [AccountOpeningResolver],
})
export class OpeningAccountModule {}
