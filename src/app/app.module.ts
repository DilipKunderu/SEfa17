import { HouseListingService } from './house-listing.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID, NO_ERRORS_SCHEMA, APP_INITIALIZER} from '@angular/core';
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

// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NouisliderModule } from 'ng2-nouislider';

import { NgDatepickerModule } from 'ng2-datepicker';
import { FileSelectDirective } from 'ng2-file-upload';

import 'hammerjs';
import { routes } from './app.router';
import {CookieService} from 'angular2-cookie/core';
import {AuthenticationService} from '../app/components/services/index'
// import { SelectorComponent } from './components/selector/selector.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HelpComponent } from './components/help/help.component';
import { ListingDetailComponent } from './components/listing-detail/listing-detail.component';

import { HomeComponent } from './components/home/home.component';
import { AddSubleaseFormComponent } from './components/add-sublease-form/add-sublease-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

// export function init (data: HouseListingService) {
//   return () => {
//     return data.load();
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    // SelectorComponent,
    CarouselComponent,
    LoginComponent,
    SignupComponent,
    HelpComponent,
    ListingDetailComponent,
    HomeComponent,
    AddSubleaseFormComponent,
    FileSelectDirective,
    UserListComponent
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
    NgDatepickerModule,
    NouisliderModule,
    // LeafletModule.forRoot(),
    routes
  ],
  providers: [
    {
      provide: LOCALE_ID, 
      useValue: 'en-US'
    },
    HouseListingService,
    CookieService,
    AuthenticationService,
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory:init,
  //   deps: [HouseListingService],
  //   multi: true
  // }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
