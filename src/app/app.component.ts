import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { HouseListingService } from './house-listing.service';
import {AuthenticationService} from '../app/components/services/index'
import {LoginComponent} from './components/login/login.component'
import 'rxjs/add/operator/filter';
import {CookieService} from 'angular2-cookie/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthenticationService, CookieService]
})

export class AppComponent implements OnInit {
  isLoggedIn:boolean;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private http: HttpClient,
    private data: HouseListingService,
    private signout:AuthenticationService,
    private cookie:CookieService
   ) {
      iconRegistry.addSvgIcon( 'logo',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/logo.svg'));
  }
  
  ngOnInit() {
  }

logout(){
  alert('logout')
  alert(this.cookie.get('loginCookie'))
  this.cookie.remove('loginCookie')
  alert(this.cookie.get('loginCookie'))
  window.location.reload();
}
}
