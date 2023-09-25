import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DashboardTopupComponent } from './dashboard-topup/dashboard-topup.component';
import { DashboardRedeemComponent } from './dashboard-redeem/dashboard-redeem.component';
import { DashboardSwitchComponent } from './dashboard-switch/dashboard-switch.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InputBasicComponent } from './input-basic/input-basic.component';
import { MatIconModule } from '@angular/material/icon';
import { InputAmountKeyComponent } from './input-amount-key/input-amount-key.component';
import { SharedStatesModule } from '@cimb/shared/states';
import { CoreModule } from '@cimb/core';
import { MintSliderModule } from '../mint-slider/mint-slider.module';
import { MintAutocompleteModule } from '../mint-autocomplete/mint-autocomplete.module';

@NgModule({
  declarations: [
    DashboardTopupComponent,
    DashboardRedeemComponent,
    DashboardSwitchComponent,
    InputBasicComponent,
    InputAmountKeyComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    SharedStatesModule,
    CoreModule,
    MintSliderModule,
    MintAutocompleteModule
  ],
  exports: [
    DashboardTopupComponent,
    DashboardRedeemComponent,
    DashboardSwitchComponent,
    InputBasicComponent,
    InputBasicComponent,
    InputAmountKeyComponent
  ],
  providers: [DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintInputModule {}
