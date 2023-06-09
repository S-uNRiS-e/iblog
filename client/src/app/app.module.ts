import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './core/token.interceptor';
import { SharedModule } from './modules/shared.module';

import { HotToastModule } from '@ngneat/hot-toast';
import { provideDialogConfig } from '@ngneat/dialog';
import { ErrorCatchingInterceptor } from './core/error-catching.intercaptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HotToastModule.forRoot(),
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideDialogConfig({
      closeButton:false
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
