import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CardCurrentValueComponent } from './card-current-value/card-current-value.component';
import { CardTotalReturnsComponent } from './card-total-returns/card-total-returns.component';
import { CardTotalInvestedComponent } from './card-total-invested/card-total-invested.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardAboutFundComponent } from './card-about-fund/card-about-fund.component';
import { CardFundDocumentComponent } from './card-fund-document/card-fund-document.component';
import { CardFundInvestComponent } from './card-fund-invest/card-fund-invest.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CardPaymentAccountComponent } from './card-payment-account/card-payment-account.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CardFundTransactComponent } from './card-fund-transact/card-fund-transact.component';
import { MatRadioModule } from '@angular/material/radio';
import { MintSliderModule } from '../mint-slider/mint-slider.module';
import { MintInputModule } from '../mint-input/mint-input.module';
import { CardNoticeComponent } from './card-notice/card-notice.component';
import { CardInvestmentSummaryComponent } from './card-investment-summary/card-investment-summary.component';
import { CardPurchaseTotalComponent } from './card-purchase-total/card-purchase-total.component';
import { CardTacComponent, FormatTimePipe } from './card-tac/card-tac.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CardSwitchInvestmentComponent } from './card-switch-investment/card-switch-investment.component';
import { CardSwitchSummaryComponent } from './card-switch-summary/card-switch-summary.component';
import { CardCartComponent } from './card-cart/card-cart.component';
import { CardCartDefaultTotalComponent } from './card-cart-default-total/card-cart-default-total.component';
import { CardCartSwitchComponent } from './card-cart-switch/card-cart-switch.component';
import { CardAccountDetailsComponent } from './card-account-details/card-account-details.component';
import { MintListModule } from '../mint-list/mint-list.module';
import { MintRedeemModule } from '../mint-list/dashboard-redeem-value/mint-redeem.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MintAutocompleteModule } from '../mint-autocomplete/mint-autocomplete.module';

@NgModule({
  declarations: [
    FormatTimePipe,
    CardCurrentValueComponent,
    CardTotalReturnsComponent,
    CardTotalInvestedComponent,
    CardAboutFundComponent,
    CardFundDocumentComponent,
    CardFundInvestComponent,
    CardPaymentAccountComponent,
    CardFundTransactComponent,
    CardNoticeComponent,
    CardInvestmentSummaryComponent,
    CardPurchaseTotalComponent,
    CardTacComponent,
    FormatTimePipe,
    CardSwitchInvestmentComponent,
    CardSwitchSummaryComponent,
    CardCartComponent,
    CardCartDefaultTotalComponent,
    CardCartSwitchComponent,
    CardAccountDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatRadioModule,
    MintSliderModule,
    MintInputModule,
    MatButtonToggleModule,
    MintListModule,
    MintRedeemModule,
    MatSliderModule,
    MatCheckboxModule,
    MintAutocompleteModule
  ],
  exports: [CardCurrentValueComponent,
    CardTotalReturnsComponent,
    CardTotalInvestedComponent,
    CardAboutFundComponent,
    CardFundDocumentComponent,
    CardFundInvestComponent,
    CardPaymentAccountComponent,
    CardFundTransactComponent,
    CardNoticeComponent,
    CardInvestmentSummaryComponent,
    CardPurchaseTotalComponent,
    CardTacComponent,
    FormatTimePipe,
    CardSwitchInvestmentComponent,
    CardSwitchSummaryComponent,
    CardCartComponent,
    CardCartDefaultTotalComponent,
    CardCartSwitchComponent,
    CardAccountDetailsComponent,
  ],
  providers: [DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MintCardModule {}
