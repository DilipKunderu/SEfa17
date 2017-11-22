import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { MouseEvent as AGMMouseEvent } from '@agm/core';

import { HouseListingService } from './../../house-listing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  typeControl = new FormControl('', [Validators.required]);
  
    types = [
      {name: 'private bedroom'},
      {name: 'shared bedroom'},
      {name: 'single studio'},
      {name: 'shared studio'},
    ];

  res: Object;
  header: string = 'Gator Housing';

  startDate: Date = new Date();
  endDate: Date = new Date();

  someRange: number[] = [100, 1000];

  // google maps zoom level
  zoom: number = 8;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  public searchControl: FormControl;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: AGMMouseEvent) {
    this.data.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: 'D',
      draggable: true
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private data: HouseListingService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.zoom = 4;
    this.lat = 39.8282;
    this.lng = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          // this.latServ.currentLat.subscribe
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
          // this.popMarkers();
        });
      });
    });
  }

  onChange(e: Event) {
  
  }

  onRangeApply() {
    this.data.markers.length = 0;
    this.data.listingArray.length = 0;
    this.http.get('http://70.171.46.158:3000/price?min=' + this.someRange[0] + '&max=' + this.someRange[1] + '/')
      .subscribe(res => {
        this.res = res;
        [].push.apply(this.data.listingArray, res);

        this.data.load(res, 'R');
       
      //   const a = JSON.stringify(res);
      //   const b = JSON.parse(a);
  
      //   for (const entry of b) {
      //     const temp = JSON.stringify(entry);
      //     const t = JSON.parse(temp);
  
      //     const lat: number =  parseFloat(t._source.geolocation.lat);
      //     const lng: number =  parseFloat(t._source.geolocation.lon);
      //     const label: string = 'T2';
      //     const draggable: boolean = false;
      //     this.data.markers.push({
      //     lat: lat,
      //     lng: lng,
      //     label: label,
      //     draggable: false
      //   });
      // }
      });
  }

  onMappClick() {
    this.data.markers.length = 0;
    this.http.get('http://70.171.46.158:3000/leasemetadata')
    .subscribe(res => {
      this.data.load(res, 'M');
      
     //   const a = JSON.stringify(res);
     //   const b = JSON.parse(a);
 
     //   for (const entry of b) {
     //     const temp = JSON.stringify(entry);
     //     const t = JSON.parse(temp);
 
     //     const lat: number =  parseFloat(t._source.geolocation.lat);
     //     const lng: number =  parseFloat(t._source.geolocation.lon);
     //     const label: string = 'T2';
     //     const draggable: boolean = false;
     //     this.data.markers.push({
     //     lat: lat,
     //     lng: lng,
     //     label: label,
     //     draggable: false
     //   });
     // }
    });
  }

  onStartDateChange() {
  }

  onEndDateChange() {
    this.data.markers.length = 0;
    
    this.data.listingArray.length = 0;
    this.http.get('http://70.171.46.158:3000/date?min='
      + this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1)
      + '&max=' + this.endDate.getFullYear() + '-' + (this.endDate.getMonth() + 1))
      .subscribe(res => {
        this.res = res;
        console.log(res);
        [].push.apply(this.data.listingArray, res);

        this.data.load(res, 'D');
        
       //   const a = JSON.stringify(res);
       //   const b = JSON.parse(a);
   
       //   for (const entry of b) {
       //     const temp = JSON.stringify(entry);
       //     const t = JSON.parse(temp);
   
       //     const lat: number =  parseFloat(t._source.geolocation.lat);
       //     const lng: number =  parseFloat(t._source.geolocation.lon);
       //     const label: string = 'T2';
       //     const draggable: boolean = false;
 
       //     this.data.markers.push({
       //     lat: lat,
       //     lng: lng,
       //     label: label,
       //     draggable: false
       //   });
       // }
      });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
