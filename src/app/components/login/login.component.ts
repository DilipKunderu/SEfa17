import {
  Component, OnInit
}
from '@angular/core';
import {
  AuthenticationService
}
from '../services/index';
import {
  Router, ActivatedRoute
}
from '@angular/router';
import { HouseListingService } from '../../house-listing.service';
import {AppComponent} from '../../app.component';
import { ViewChild } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, CookieService]
})
export class LoginComponent implements OnInit {
 
  constructor(private route: ActivatedRoute,
      private router: Router, private authenticationService: AuthenticationService,
    private listing: HouseListingService,private app:AppComponent, private cookie:CookieService) {}
  ngOnInit() {
      // this.authenticationService.logout();
  }

  loginSubmit(form: any) {    
      this.authenticationService.login(form)
          .subscribe(
              data => {
                this.cookie.put('loginCookie', 'loginCookie')
                // this.cookie.setCookie('cookieName', 'cookieValue', 1)
                  this.router.navigate(["/home"]);
                  // console.log(data);
                  // this.listing.userDetail = data;
                    this.listing.setLogin();
                    // this.app.loginhide();
              },
              error => {
                  alert("Email or password incorrect: " + error);
                  var resetForm =<HTMLFormElement>document.getElementById("loginform");
                  resetForm.reset();
                  return;
              });
  }


}