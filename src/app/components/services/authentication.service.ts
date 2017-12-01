import {
    Injectable
}
from '@angular/core';
import {
    Http, Headers, Response
}
from '@angular/http';
import {
    Observable
}
from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {
    Login
}
from '../models/index';
// import {AppComponent} from '../../app.component'
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {}

    login(login: Login) {
        return this.http.post('http://174.64.102.57:3000/login', login)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.toString();
                // if (user && response.json().token) {
                  
                    // this.a.loginhide();
            //         let el = this.elementRef.nativeElement;
            // var s = this.a.select(el).
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                // }

                return user;
            });
    }

    logout() {

        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}