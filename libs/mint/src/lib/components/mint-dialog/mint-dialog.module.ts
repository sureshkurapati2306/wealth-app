import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DialogSelectTransactionComponent } from './dialog-select-transaction/dialog-select-transaction.component';
import { MatButtonModule } from '@angular/material/button';
import { DialogPortfolioComponent } from './dialog-portfolio/dialog-portfolio.component';
import { MintBoxModule } from '../mint-box/mint-box.module';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { DialogTermsAndConditionComponent } from './dialog-terms-and-condition/dialog-terms-and-condition.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { InvestmentComputationComponent } from './investment-computation/investment-computation.component';
import { MintInputModule } from '../mint-input/mint-input.module';
import { MintSelectModule } from '../mint-select/mint-select.module';
import { MintAutocompleteModule } from '../mint-autocomplete/mint-autocomplete.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MintFilterModule } from '../mint-filter/mint-filter.module';
import { DialogFundComponent } from './dialog-fund/dialog-fund.component';
import { MintCardModule } from '../mint-card/mint-card.module';
import { MintChartModule } from '../mint-chart/mint-chart.module';
import { DialogRiskCategoryComponent } from './dialog-risk-category/dialog-risk-category.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DialogTermsAndConditionContentComponent } from './dialog-terms-and-condition-content/dialog-terms-and-condition-content.component';
import { DialogConcurrentSessionAlertComponent } from './dialog-concurrent-session-alert/dialog-concurrent-session-alert.component';
import { DialogTermsAndConditionConventionalContentComponent } from './dialog-terms-and-condition-conventional-content/dialog-terms-and-condition-conventional-content.component';
import { DialogOtherAccountDetailComponent } from './dialog-other-account-detail/dialog-other-account-detail.component';
import { DialogTypeaheadMobileComponent } from './dialog-typeahead-mobile/dialog-typeahead-mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MintDialogComponent } from './mint-dialog.component';
import { MintDialogService } from './mint-dialog.service';
import { DialogAlertLandingPageComponent } from './dialog-alert-landing-page/dialog-alert-landing-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAvailableFunds from '../../../../../../apps/self-serve/src/app/modules/available-funds/+state/available-funds.reducer';
import { AvailableFundsEffects } from '../../../../../../apps/self-serve/src/app/modules/available-funds/+state/available-funds.effects';
import { DialogDropdownMobileComponent } from './dialog-dropdown-mobile/dialog-dropdown-mobile.component';
import { DialogAsnbConsentComponent } from './dialog-asnb-consent/dialog-asnb-consent.component';
import { DialogAsnbLinkErrorComponent } from './dialog-asnb-link-error/dialog-asnb-link-error.component';
import { DialogOtpLinkAsnbComponent } from './dialog-otp-link-asnb/dialog-otp-link-asnb.component';
import { DialogAsnbDelinkAccountComponent } from './dialog-asnb-delink-account/dialog-asnb-delink-account.component';
import { DialogAsnbRedirectionComponent } from './dialog-asnb-redirection/dialog-asnb-redirection.component';
import { DialogAsnbServiceHoursComponent } from './dialog-asnb-service-hours/dialog-asnb-service-hours.component';
import { DialogAsnbRemoveFavouriteComponent } from './dialog-asnb-remove-favourite/dialog-asnb-remove-favourite.component';
import { DialogAsnbServiceHoursGeneralComponent } from './dialog-asnb-service-hours-general/dialog-asnb-service-hours-general.component';
import { DialogCsatSurveyComponent } from './dialog-csat-survey/dialog-csat-survey.component';
@NgModule({
    declarations: [
        DialogSelectTransactionComponent,
        DialogPortfolioComponent,
        DialogAlertComponent,
        DialogTermsAndConditionComponent,
        DialogFormComponent,
        InvestmentComputationComponent,
        DialogFundComponent,
        DialogRiskCategoryComponent,
        DialogTermsAndConditionContentComponent,
        DialogConcurrentSessionAlertComponent,
        DialogTermsAndConditionConventionalContentComponent,
        DialogOtherAccountDetailComponent,
        DialogTypeaheadMobileComponent,
        MintDialogComponent,
        DialogAlertLandingPageComponent,
        DialogDropdownMobileComponent,
        DialogAsnbConsentComponent,
        DialogAsnbLinkErrorComponent,
        DialogOtpLinkAsnbComponent,
        DialogAsnbDelinkAccountComponent,
        DialogAsnbRedirectionComponent,
        DialogAsnbServiceHoursComponent,
        DialogAsnbRemoveFavouriteComponent,
        DialogAsnbServiceHoursGeneralComponent,
        DialogCsatSurveyComponent
    ],
    imports: [
        CommonModule,

        MatMenuModule,
        MintBoxModule,
        MatTabsModule,
        MintInputModule,
        MintSelectModule,
        MintAutocompleteModule,
        MatCheckboxModule,
        MatListModule,
        MintFilterModule,
        MintCardModule,
        MintChartModule,
        MatButtonToggleModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        StoreModule.forFeature(
            fromAvailableFunds.AVAILABLE_FUNDS_FEATURE_KEY,
            fromAvailableFunds.reducer,
        ),
        EffectsModule.forFeature([AvailableFundsEffects]),
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
    ],
    exports: [
        DialogSelectTransactionComponent,
        DialogPortfolioComponent,
        DialogAlertComponent,
        DialogTermsAndConditionComponent,
        DialogFormComponent,
        InvestmentComputationComponent,
        DialogFundComponent,
        DialogRiskCategoryComponent,
        DialogTermsAndConditionContentComponent,
        DialogConcurrentSessionAlertComponent,
        DialogTermsAndConditionConventionalContentComponent,
        DialogOtherAccountDetailComponent,
        DialogTypeaheadMobileComponent,
        DialogDropdownMobileComponent,
        DialogAsnbConsentComponent,
        DialogOtpLinkAsnbComponent,
        DialogAsnbDelinkAccountComponent,
        DialogAsnbRedirectionComponent,
        DialogAsnbRemoveFavouriteComponent,
        DialogAsnbServiceHoursGeneralComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [MintDialogService],
})
export class MintDialogModule {}
