import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskProfileRoutingModule, RISK_PROFILE_COMPONENTS } from './risk-profile.routing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CimbCommonModule, RisksModule, StepperModule } from '@cimb/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MintMultiSelectChipModule, MintSingleSelectModule } from '@cimb/mint';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRiskProfileQuestions from './+state/risk-profile.reducer';
import { RiskProfileQuestionsEffects } from './+state/risk-profile.effects';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { KeywordDescriptionsComponent } from './components/keyword-descriptions/keyword-descriptions.component';
import { ProfileSummariesComponent } from './components/profile-summaries/profile-summaries.component';
import { CompareProfilesComponent } from './components/compare-profiles/compare-profiles.component';
import { ProfileSuggestionsComponent } from './components/profile-suggestions/profile-suggestions.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [
        ...RISK_PROFILE_COMPONENTS,
        QuestionFormComponent,
        KeywordDescriptionsComponent,
        ProfileSummariesComponent,
        CompareProfilesComponent,
        ProfileSuggestionsComponent,
    ],
    imports: [
        CommonModule,
        RiskProfileRoutingModule,
        CimbCommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatStepperModule,
        CdkStepperModule,
        RisksModule,
        StepperModule,
        MatTabsModule,
        MintMultiSelectChipModule,
        MintSingleSelectModule,
        StoreModule.forFeature(
            fromRiskProfileQuestions.RISK_PROFILE_QUESTIONS_FEATURE_KEY,
            fromRiskProfileQuestions.reducer,
        ),
        EffectsModule.forFeature([RiskProfileQuestionsEffects]),
    ],
})
export class RiskProfileModule {}
