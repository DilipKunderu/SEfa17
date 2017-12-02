import {
  Component, OnInit
}
from '@angular/core';
import {
  Router
}
from '@angular/router';

import {
  UserService
}
from '../services/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,
      private userService: UserService) {}

  ngOnInit() {}

  signUpSubmit(form: any) {
    if(form.password != form.cpassword){
      alert("Password doernot match with confirm password")
      var resetForm =<HTMLFormElement>document.getElementById("signupForm");
      resetForm.reset();
      return;
    }
      this.userService.create(form)
          .subscribe(
              data => {
                  // set success message and pass true paramater to persist the message after redirecting to the login page
                  alert('Registration successful');
                  this.router.navigate(['/login']);
              },
              error => {
                  alert(error);
              });
  }
}