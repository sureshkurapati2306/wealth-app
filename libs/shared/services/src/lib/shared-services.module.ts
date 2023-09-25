import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundSwitchService } from './fund-switch/fund-switch.service';
import { AnalyticService } from './analytic/analytic.service';

@NgModule({
    imports: [CommonModule],
    providers: [
        FundSwitchService,
        AnalyticService
    ]
})
export class SharedServicesModule {}
