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
import { HouseListingService } from '../../house-listing.service';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private data: HouseListingService) {}

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

                let user = response.toString();
                // console.log(user);
                localStorage.setItem('currentUser', JSON.stringify(user));

                return user;
            });
    }

    logout() {

        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}