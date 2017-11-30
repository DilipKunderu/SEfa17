import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { HouseListingService } from './house-listing.service';
import {AuthenticationService} from '../app/components/services/index'
import {LoginComponent} from './components/login/login.component'
import 'rxjs/add/operator/filter';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthenticationService]
})

export class AppComponent implements OnInit {
  isLoggedIn:boolean;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private http: HttpClient,
    private data: HouseListingService,
    private signout:AuthenticationService
   ) {
      iconRegistry.addSvgIcon( 'logo',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/logo.svg'));

  }
  loginhide(){
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("signup").style.visibility = "hidden";
    document.getElementById("logout").style.visibility = "visible";
  }
  ngOnInit() {
    document.getElementById("logout").style.visibility = "hidden";
  }

logout(){
 this.signout.logout();
 document.getElementById("logout").style.visibility = "hidden";
 document.getElementById("login").style.visibility = "visible";
 document.getElementById("signup").style.visibility = "visible";
}
}
