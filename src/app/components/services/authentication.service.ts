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
import { Router } from '@angular/router';
import { HouseListingService } from '../../house-listing.service';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private data: HouseListingService,
    private router: Router, private cookie:CookieService) {}

    login(login: Login) {
        return this.http.post('http://192.168.2.24:3000/login', login)
            .map((response: Response) => {
                const a = JSON.stringify(response);
                const b = JSON.parse(a);
                const c = b._body;
                const d: Array<string> = c.split(":");

                this.data.userDetail = b._body;
                this.data.userName = d[1];
                this.data.userEmail = d[0];
                this.cookie.put('loginCookie',this.data.userName)
                let user = response.toString();
                return user;
            });
    }


}
