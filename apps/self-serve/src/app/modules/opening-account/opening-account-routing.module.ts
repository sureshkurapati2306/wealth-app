import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningAccountComponent } from './opening-account.component';
import { AccountDetailsReviewComponent } from './account-details-review/account-details-review.component';
import { PersonalContactDetailsComponent } from './personal-contact-details/personal-contact-details.component';
import { OtherAccountDetailsComponent } from './other-account-details/other-account-details.component';
import { StoreModule } from '@ngrx/store';
import * as fromRiskProfileQuestions from '../risk-profile/+state/risk-profile.reducer';


const routes: Routes = [{ path: '', component: OpeningAccountComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      fromRiskProfileQuestions.RISK_PROFILE_QUESTIONS_FEATURE_KEY,
      fromRiskProfileQuestions.reducer,
    ),
  ],
  exports: [RouterModule],
})
export class OpeningAccountRoutingModule {}

export const OPENING_ACCOUNT_COMPONENTS = [OpeningAccountComponent, PersonalContactDetailsComponent,
  OtherAccountDetailsComponent, AccountDetailsReviewComponent];
