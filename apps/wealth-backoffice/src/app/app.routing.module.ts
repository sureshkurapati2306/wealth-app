import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeLayoutComponent } from './layouts/backoffice-layout/backoffice-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthGuard } from '../../../../libs/mint-office/src/lib/core/guard/auth.guard';

const appRoutes: Routes = [
  {
    path: 'login',
    component: BackofficeLayoutComponent,
    loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureLoginModule),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureHomeModule),
      },
      {
        path: 'batch-file-scheduler',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureBatchFileSchedulerModule),
      },
      {
        path: 'asnb-report',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureAsnbReportsModule),
      },
      {
        path: 'asnb-report-old',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureAsnbReportsOldModule),
      },
      {
        path: 'unit-trust-transactions',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureUnitTrustTransactionsModule),
      },
      {
        path: 'sms-delivery-log',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureUnitTrustTransactionsModule),
      },
      {
        path: 'customer-support',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureCustomerSupportModule),
      },
      {
        path: 'ithm-reports',
        loadChildren: () =>  import('@cimb/mint-office').then(m => m.MintOfficeFeatureIthmReportsModule),
      },
      {
        path: 'ref-config',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureRefConfigModule),
      },
      {
        path: 'visibility-settings',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureVisibilitySettingsModule),
      },
      {
        path: 'administrator-portal',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureAdministratorPortalModule),
      },
      {
        path: 'asnb-settings',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureAsnbSettingsModule),
      },
      {
        path: 'user-whitelisting',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureUserWhitelistingModule),
      },
      {
        path: 'csat-reporting',
        loadChildren: () => import('@cimb/mint-office').then(m => m.MintOfficeFeatureCsatReportingModule),
      }
    ],
  },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
