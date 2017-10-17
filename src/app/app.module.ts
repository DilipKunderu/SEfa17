import { RouterModule } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID, NO_ERRORS_SCHEMA} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {AgmCoreModule} from '@agm/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './custom-material/custom-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';

import 'hammerjs';
import { routes } from './app.router';

import { SelectorComponent } from './components/selector/selector.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HelpComponent } from './components/help/help.component';
import { ListingDetailComponent } from './components/listing-detail/listing-detail.component';

import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    CarouselComponent,
    LoginComponent,
    SignupComponent,
    HelpComponent,
    ListingDetailComponent,
    HomeComponent,
    RouterModule
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDSFMoD5C6VpWI6D7uZd-OfvuZBUc8cdj8',
      libraries: ['places']
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    routes
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-US'},
  ],
  entryComponents: [SelectorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
