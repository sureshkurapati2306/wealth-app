import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentQuestionsComponent } from './components/investment-questions/investment-questions.component';
import { ProfileResultsComponent } from './components/profile-results/profile-results.component';

const routes: Routes = [
    {
        path: 'questions',
        component: InvestmentQuestionsComponent,
    },
    {
        path: 'results',
        component: ProfileResultsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RiskProfileRoutingModule {}

export const RISK_PROFILE_COMPONENTS = [
    InvestmentQuestionsComponent,
    ProfileResultsComponent,
];
