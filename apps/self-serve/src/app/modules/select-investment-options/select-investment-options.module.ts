import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    SelectInvestmentOptionsRoutingModule,
    SELECT_INVESTMENT_OPTIONS_COMPONENTS,
} from './select-investment-options-routing.module';
import { CimbCommonModule } from '@cimb/common';
import { MintBoxModule } from '@cimb/mint';
import { MatTabsModule } from '@angular/material/tabs';
import { InvesmentOptionsResolver } from './select-investment-options.resolver';

@NgModule({
    declarations: [...SELECT_INVESTMENT_OPTIONS_COMPONENTS],
    imports: [
        CommonModule,
        CimbCommonModule,
        MintBoxModule,
        MatTabsModule,
        SelectInvestmentOptionsRoutingModule,
    ],
    providers: [InvesmentOptionsResolver],
})
export class SelectInvestmentOptionsModule {}
