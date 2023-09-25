import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { RegistrationLayoutComponent } from './layouts/registration-layout/registration-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { LogoutLayoutComponent } from './layouts/logout-layout/logout-layout.component';
import { AppGuard } from './core/guards/app.guard';
import { NTPGuard } from './core/guards/ntp.guard';
import { InitialDataResolver } from './app.resolvers';
import { path } from '../app/shared/config/path';
import { DowntimeGuard } from './core/guards/downtime.guard';
import { AccountOpeningResolver } from './modules/opening-account/opening-account.resolver';
import { InvesmentOptionsResolver } from './modules/select-investment-options/select-investment-options.resolver';

const appRoutes: Routes = [
    { path: '', redirectTo: path.WEALTH_DASHBOARD, pathMatch: 'full' },
    {
        path: path.WEALTH_DASHBOARD,
        component: DashboardLayoutComponent,
        canActivate: [DowntimeGuard],
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./modules/wealth-dashboard/wealth-dashboard.module').then(
                        (m) => m.WealthDashboardModule,
                    ),
            },
        ],
    },
    {
        path: '',
        component: RegistrationLayoutComponent,
        canActivate: [AppGuard],
        children: [
            {
                path: 'review-purchase',
                loadChildren: () =>
                    import('./modules/review-purchase/review-purchase.module').then(
                        (m) => m.ReviewPurchaseModule,
                    ),
            },
            {
                path: 'available-funds',
                loadChildren: () =>
                    import('./modules/available-funds/available-funds.module').then(
                        (m) => m.AvailableFundsModule,
                    ),
            },
            {
                path: 'portfolio-recommendation',
                loadChildren: () =>
                    import(
                        './modules/portfolio-recommendation/portfolio-recommendation.module'
                    ).then((m) => m.PortfolioRecommendationModule),
            },
            {
                path: 'account-details',
                loadChildren: () =>
                    import('./modules/account-details/account-details.module').then(
                        (m) => m.AccountDetailsModule,
                    ),
            },
            {
                path: 'investment-goals',
                loadChildren: () =>
                    import('./modules/investment-goals/investment-goals.module').then(
                        (m) => m.InvestmentGoalsModule,
                    ),
            },
            {
                path: 'assets-portfolio',
                loadChildren: () =>
                    import(
                        './modules/investment-assets-portfolio/investment-assets-portfolio.module'
                    ).then((m) => m.InvestmentAssetsPortfolioModule),
            },
            {
                path: 'purchase-summary',
                loadChildren: () =>
                    import('./modules/purchase-summary/purchase-summary.module').then(
                        (m) => m.PurchaseSummaryModule,
                    ),
            },
            {
                path: 'financial-position',
                loadChildren: () =>
                    import('./modules/financial-position/financial-position.module').then(
                        (m) => m.FinancialPositionModule,
                    ),
            },
            {
                path: path.INVESTMENT_OPTION,
                resolve: {
                    clicksData: InvesmentOptionsResolver,
                },
                loadChildren: () =>
                    import(
                        './modules/select-investment-options/select-investment-options.module'
                    ).then((m) => m.SelectInvestmentOptionsModule),
            },
            {
                path: 'recommended-assets',
                loadChildren: () =>
                    import(
                        './modules/recommended-assets-funds/recommended-assets-funds.module'
                    ).then((m) => m.RecommendedAssetsFundsModule),
            },
            {
                path: 'transaction-success',
                loadChildren: () =>
                    import(
                        './modules/transaction-request-success/transaction-request-success.module'
                    ).then((m) => m.TransactionRequestSuccessModule),
            },
            {
                path: 'investment-proficiency',
                loadChildren: () =>
                    import('./modules/investment-proficiency/investment-proficiency.module').then(
                        (m) => m.InvestmentProficiencyModule,
                    ),
            },
            {
                path: 'checkout-redemption',
                loadChildren: () =>
                    import('./modules/checkout-redemption/checkout-redemption.module').then(
                        (m) => m.CheckoutRedemptionModule,
                    ),
            },
            {
                path: 'redemption-request-completed',
                loadChildren: () =>
                    import(
                        './modules/checkout-redemption/redemption-request-completed/redemption-request-completed.module'
                    ).then((m) => m.RedemptionRequestCompletedModule),
            },
            {
                path: 'checkout-switch',
                loadChildren: () =>
                    import('./modules/checkout-switch/checkout-switch.module').then(
                        (m) => m.CheckoutSwitchModule,
                    ),
            },
            {
                path: 'switch-request-completed',
                loadChildren: () =>
                    import(
                        './modules/checkout-switch/switch-request-completed/switch-request-completed.module'
                    ).then((m) => m.SwitchRequestCompletedModule),
            },
            {
                path: 'cart',
                loadChildren: () => import('./modules/cart/cart.module').then((m) => m.CartModule),
            },
            {
                path: 'cart-redemption-summary',
                loadChildren: () =>
                    import(
                        './modules/cart/cart-redemption-summary/cart-redemption-summary.module'
                    ).then((m) => m.CartRedemptionSummaryModule),
            },
            {
                path: 'cart-switch-summary',
                loadChildren: () =>
                    import('./modules/cart/cart-switch-summary/cart-switch-summary.module').then(
                        (m) => m.CartSwitchSummaryModule,
                    ),
            },
            {
                path: path.OPENING_ACCOUNT,
                resolve: {
                    clicksData: AccountOpeningResolver,
                },
                loadChildren: () =>
                    import('./modules/opening-account/opening-account.module').then(
                        (m) => m.OpeningAccountModule,
                    ),
            },
            {
                path: 'risk-profile',
                loadChildren: () =>
                    import('./modules/risk-profile/risk-profile.module').then(
                        (m) => m.RiskProfileModule,
                    ),
            },
            {
                path: 'landing-page',
                loadChildren: () =>
                    import('./modules/landing-page/landing-page.module').then(
                        (m) => m.LandingPageModule,
                    ),
            },
        ],
    },

    {
        path: path.ASNB_DASHBOARD,
        component: DashboardLayoutComponent,
        canActivate: [AppGuard, DowntimeGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/asnb/asnb.module').then((m) => m.AsnbModule),
            },
        ],
    },

    {
        path: path.DASHBOARD,
        component: DashboardLayoutComponent,
        canActivate: [AppGuard, NTPGuard, DowntimeGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
        ],
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: [
            {
                path: path.MAINTENANCE,
                loadChildren: () =>
                    import('./modules/maintenance-page/maintenance-page.module').then(
                        (m) => m.MaintenancePageModule,
                    ),
            },
        ],
    },
    {
        path: path.PAGE_NOT_FOUND,
        component: CommonLayoutComponent,
        canActivate: [AppGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./modules/page-not-found/page-not-found.module').then(
                        (m) => m.PageNotFoundModule,
                    ),
            },
        ],
    },
    {
        path: path.LOGOUT,
        component: LogoutLayoutComponent,
        canActivate: [AppGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./modules/logout-page/logout-page.module').then(
                        (m) => m.LogoutPageModule,
                    ),
            },
        ],
    },
    {
        path: path.TRANSACTION_LOGOUT,
        component: LogoutLayoutComponent,
        canActivate: [AppGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./modules/transaction-logout-page/transaction-logout-page.module').then(
                        (m) => m.TransactionLogoutPageModule,
                    ),
            },
        ],
    },
    {
        path: path.REDIRECT_TO_CLICKS,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./modules/redirect-to-clicks/redirect-to-clicks.module').then(
                        (m) => m.RedirectToClicksModule,
                    ),
            },
        ],
    },
    {
        path: 'SystemDownTime',
        component: CommonLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./modules/systemdowntime-page/systemdowntime-page.module').then(
                        (m) => m.SystemdowntimePageModule,
                    ),
            },
        ],
    },
    {
        path: 'unableToProceed',
        component: CommonLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./modules/unabletoproceed-page/unabletoproceed-page.module').then(
                        (m) => m.UnabletoproceedPageModule,
                    ),
            },
        ],
    },

    { path: '**', redirectTo: path.PAGE_NOT_FOUND },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
