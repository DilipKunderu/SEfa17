import { Observable } from 'rxjs/Rx';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicDetails } from './subleaseForm01';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable()
export class HouseListingService {
  //declarations
  public isLoggedIn: boolean = false;
  public userDetail: string;
  public userName: string;
  public userEmail: string;

  public listingArray: Array<any> = [];
  public markers: Array<Marker> = [];
  public URL = 'http://192.168.2.24:3000/';
  res: Object;

  model = new BasicDetails('', '', '', '', '', '','', '', '', true, false, true, false, true, true,
  true, false, true, true, false, true, true, true, true, true, true,'rent',new Date(), new Date(), '', '');

  constructor(
    private http: HttpClient, 
    private router: Router,
    injector: Injector) {
      setTimeout(()=>this.http = injector.get(HttpClient));

    this.http.get('http://192.168.2.24:3000/lease/')
    .subscribe(res => {
      this.res = res;
      [].push.apply(this.listingArray, res);
    });
  }

  load(res: object, s: string) {
      const a = JSON.stringify(res);
      const b = JSON.parse(a);

      for (const entry of b) {
        const temp = JSON.stringify(entry);
        const t = JSON.parse(temp);

        const lat: number =  parseFloat(t._source.geolocation.lat);
        const lng: number =  parseFloat(t._source.geolocation.lon);
        const label: string = s;
        const draggable: boolean = false;

        this.markers.push({
         lat, lng, label, draggable
        });
    }
  }

  setLogin() {
    this.isLoggedIn = !(this.isLoggedIn);
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface ResponseInterface {
  _id: string;
 }