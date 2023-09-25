import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureAsnbSettingsComponent } from './mint-office-feature-asnb-settings.component';
import { ScheduledDowntimeFormComponent } from './scheduled-downtime-form/scheduled-downtime-form.component';
import { FundSuspensionFormComponent } from './fund-suspension-form/fund-suspension-form.component';
import { OperationHoursFormComponent } from './operation-hours-form/operation-hours-form.component';
import { FundLibraryFormComponent } from './fund-library-form/fund-library-form.component';
import { UrlMaintenanceFormComponent } from './url-maintenance-form/url-maintenance-form.component';

import { FormAllFundsComponent } from './transaction-limit/form-all-funds/form-all-funds.component';
import { FormIndividualFundsComponent } from './transaction-limit/form-individual-funds/form-individual-funds.component';
const routes: Routes = [
    {
        path: '',
        component: MintOfficeFeatureAsnbSettingsComponent,
    },
    {
        path: 'asnb-settings?/:id',
        component: MintOfficeFeatureAsnbSettingsComponent,
    },
    {
        path: 'add',
        component: ScheduledDowntimeFormComponent,
    },
    {
        path: 'edit-suspension/:id',
        component: FundSuspensionFormComponent,
    },
    {
        path: 'edit-operation-hours',
        component: OperationHoursFormComponent,
    },
    {
        path: 'add-fund',
        data: {
            type: 'add',
            title: 'Add New Fund',
        },
        component: FundLibraryFormComponent,
    },
    {
        path: 'edit-fund/:id',
        data: {
            type: 'edit',
            title: 'Edit Fund',
        },
        component: FundLibraryFormComponent,
    },
    {
        path: 'add-url',
        data: {
            type: 'add',
            title: 'Add New URL',
        },
        component: UrlMaintenanceFormComponent,
    },
    {
        path: 'edit-url/:id',
        data: {
            type: 'edit',
            title: 'Edit URL',
        },
        component: UrlMaintenanceFormComponent,
    },
    {
        path: 'edit-all-limit',
        component: FormAllFundsComponent,
    },
    {
        path: 'edit-individual-limit/:id',
        component: FormIndividualFundsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MintOfficeFeatureAsnbSettingsRoutingModule {}

export const ASNB_SETTINGS = [
    MintOfficeFeatureAsnbSettingsComponent,
    FundSuspensionFormComponent,
    OperationHoursFormComponent,
    FundLibraryFormComponent,
    FormAllFundsComponent,
    FormIndividualFundsComponent,
];
