import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app.routing.module';
import { MintModule } from '@cimb/mint';
import { MintOfficeUiLoadingIndicatorModule, MintOfficeUiSnackbarModule } from '@cimb/mint-office';
import { CimbCommonModule } from '@cimb/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

import { AuthTokenInterceptor } from '../../../../libs/mint-office/src/lib/core/interceptor/auth-token.interceptor';
import { ErrorInterceptor } from '../../../../libs/mint-office/src/lib/core/interceptor/error.interceptor';
import { CoreModule } from 'libs/mint-office/src/lib/core/core.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutsModule,
    MintModule,
    MintOfficeUiLoadingIndicatorModule,
    MintOfficeUiSnackbarModule,
    CoreModule,
    CimbCommonModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Wealth BackOffice',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: {disabled:true} 
    },
    {
      provide: 'environment', useValue: environment
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthTokenInterceptor, 
      multi: true 
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorInterceptor, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
