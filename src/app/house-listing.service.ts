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
  public render: boolean = false;
  public listingArray: Array<any> = [];
  public markers: Array<Marker> = [
    {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ];
  public URL = 'http://10.136.39.201:3000/';
  res: Object;

  model = new BasicDetails('', '', '', '', '', '','', '', '', true, false, true, false, true, true,
  true, false, true, true, false, true, true, true, true, true, true,'rent',new Date(), new Date(), '', '');

  constructor(
    private http: HttpClient, 
    private router: Router,
    injector: Injector) {
      setTimeout(()=>this.http = injector.get(HttpClient));

    this.http.get('http://70.171.46.158:3000/leasemetadata/')
    .subscribe(res => {
      this.res = res;
      [].push.apply(this.listingArray, res);
    });
  }

  getLatLong() {
    for(const res of this.listingArray) {
      const a = JSON.stringify(res);
      const b = JSON.parse(a);

      for (const entry of b) {
        const temp = JSON.stringify(entry);
        const t = JSON.parse(temp);

        const lat: number =  parseFloat(t._source.geolocation.lat);
        const lng: number =  parseFloat(t._source.geolocation.lon);
        const label: string = 'A';
        const draggable: boolean = false;

        this.markers.push({
         lat, lng, label, draggable
        });
        this.render = true;
        console.log('pushed ' + lat + ' ' + lng);
      }

    }
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

  // onSubmit() {
  //   interface ResponseInterface {
  //     _id: string;
  //    }

  //   const req = this.http.post<ResponseInterface>('http://10.136.189.31:3000/add', this.model)
  //   .subscribe(
  //     res => {
  //       console.log(res);
  //       this.http.get('http://10.136.189.31:3000').subscribe(
  //         res1 => {
  //           console.log(res1);
  //         },
  //         err1 => {
  //           console.log(err1);
  //         }
  //       );
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
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