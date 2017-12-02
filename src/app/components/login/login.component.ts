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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
 
  constructor(private route: ActivatedRoute,
      private router: Router, private authenticationService: AuthenticationService,
    private listing: HouseListingService,private app:AppComponent) {}

  ngOnInit() {
      this.authenticationService.logout();
  }

  loginSubmit(form: any) {    
      this.authenticationService.login(form)
          .subscribe(
              data => {
                  this.router.navigate(["/home"]);
                    this.listing.setLogin();
                    this.app.loginhide();
              },
              error => {
                  alert("Email or password incorrect: " + error);
                  var resetForm =<HTMLFormElement>document.getElementById("loginform");
                  resetForm.reset();
                  return;
              });
  }


}