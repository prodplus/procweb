import {
  APP_BASE_HREF,
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localPt from '@angular/common/locales/pt';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localPt);

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskModule.forRoot(),
    NgxViacepModule,
    NgbModule,
    CoreModule,
    SharedModule,
    GoogleChartsModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
