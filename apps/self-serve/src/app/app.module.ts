import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgIdleModule } from '@ng-idle/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { MintModule } from '@cimb/mint';
import { AppRoutingModule } from './app.routing.module';
import { LayoutModule } from './layouts/layout.module';

import { environment } from '../environments/environment';
import * as fromStore from './core/state/reducers';
import { DashboardEffects } from './core/state/dashbord/dashboard.effects';
import { AuthEffects } from './core/state/auth/auth.effects';
import { AccountOpeningEffects } from './core/state/account-opening/account.effects';
import { CimbCommonModule } from '@cimb/common';
import { AppInterceptor } from './core/interceptors/app.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AvailableFundsEffects } from './core/state/availableFunds/availableFunds.effects';
import { LogoutEffects } from './core/state/logout/logout.effects';
import { CartEffects } from './core/state/cart/cart.effects';
import { UserEffects } from './core/state/user/user.effects';
import { AppGuard } from './core/guards/app.guard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '@cimb/core';
import { ClicksEffects } from './core/state/clicks/clicks.effects';
import { CifInquiryEffects } from './core/state/cifInquiry/cifInquiry.effects';
import { DowntimeGuard } from './core/guards/downtime.guard';
import { NTPGuard } from './core/guards/ntp.guard';
import { LandingPageEffects } from './core/state/landing-page/landing-page.effects';
import { CSATSurveyEffects }  from './core/state/csat-survey/csat-survey.effects';
import * as CSATSurvey from './core/state/csat-survey/csat-survey.reducer';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NgIdleModule.forRoot(),

    StoreModule.forRoot(fromStore.appReducer),
    // Layout module
    LayoutModule,

    // Libs
    MintModule,
    CimbCommonModule,
    EffectsModule.forRoot([
      DashboardEffects,
      AuthEffects,
      UserEffects,
      AvailableFundsEffects,
      LogoutEffects,
      AccountOpeningEffects,
      CartEffects,
      ClicksEffects,
      CifInquiryEffects,
      LandingPageEffects,
      CSATSurveyEffects
    ]),
    StoreModule.forFeature(CSATSurvey.CSATSurveyFeatureKey ,CSATSurvey.csatSurveyReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    HttpService,
    MatSnackBar,
    AppGuard,
    DowntimeGuard,
    NTPGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
