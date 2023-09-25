import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintOfficeFeatureUnitTrustTransactionsComponent } from './mint-office-feature-unit-trust-transactions.component';
import { UtListTableComponent } from './ut-list-table/ut-list-table.component';
import { UtSearchFormComponent } from './ut-search-form/ut-search-form.component';

const routes: Routes = [
    {
        path: '',
        component: MintOfficeFeatureUnitTrustTransactionsComponent,
    },
    {
        path: 'detail/:id',
        loadChildren: () =>
            import('./unit-trust-detail/unit-trust-detail.module').then(
                (m) => m.UnitTrustDetailModule,
            ),
    },
    {
        path: 'sms-detail',
        loadChildren: () =>
            import(
                'libs/mint-office/src/lib/mint-office-feature-sms-delivery-log/sms-delivery-detail/sms-delivery-detail.module'
            ).then((m) => m.SmsDeliveryDetailModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MintOfficeFeatureUnitTrustTransactionsRoutingModule {}

// Manage components in one place
export const BACK_OFFICE_COMPONENTS = [
    MintOfficeFeatureUnitTrustTransactionsComponent,
    UtListTableComponent,
    UtSearchFormComponent,
];
