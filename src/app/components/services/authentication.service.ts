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
                let user = response.toString();
                localStorage.setItem('currentUser', JSON.stringify(user));

                return user;
            });
    }

    logout() {

        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}